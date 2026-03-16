from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import os
import requests
import datetime
from pymongo import MongoClient
from threading import Lock
import logging
from pathlib import Path
from dotenv import load_dotenv
from deepface import DeepFace
from scipy.spatial.distance import cosine

load_dotenv() 

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Get allowed origins from env or use defaults
ALLOWED_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:5173,http://localhost:5174,http://localhost:5175').split(',')
CORS(app, origins=ALLOWED_ORIGINS)

# Thread-safe face data storage
face_data_lock = Lock()
known_face_encodings = []
known_face_names = []  # Stores rollNumbers

# MongoDB connection settings from global .env
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

# DeepFace model to use — Facenet is fast and accurate
DEEPFACE_MODEL = "Facenet"
# Cosine distance threshold: lower = stricter. 0.4 works well for Facenet
RECOGNITION_THRESHOLD = float(os.getenv('RECOGNITION_THRESHOLD', 0.4))


def get_face_embedding(img_rgb):
    """Extract face embedding from an RGB numpy image using DeepFace."""
    try:
        # DeepFace expects BGR
        img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        result = DeepFace.represent(
            img_path=img_bgr,
            model_name=DEEPFACE_MODEL,
            enforce_detection=True,
            detector_backend="opencv"
        )
        if not result:
            return None
        return np.array(result[0]['embedding'])
    except Exception as e:
        logger.warning(f"DeepFace embedding failed: {e}")
        return None


def get_face_embedding_from_url(image_url):
    """Download image from URL and extract face embedding."""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()

        img_array = np.frombuffer(response.content, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        if img is None:
            logger.warning(f"Failed to decode image from URL: {image_url}")
            return None

        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return get_face_embedding(rgb_img)

    except requests.RequestException as e:
        logger.error(f"Error downloading image from {image_url}: {e}")
        return None
    except Exception as e:
        logger.error(f"Error processing image from {image_url}: {e}")
        return None


def get_face_embedding_from_file(file_path):
    """Load face embedding from a local file."""
    try:
        img = cv2.imread(file_path)
        if img is None:
            logger.warning(f"Failed to load image from file: {file_path}")
            return None

        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return get_face_embedding(rgb_img)

    except Exception as e:
        logger.error(f"Error processing file {file_path}: {e}")
        return None


def find_best_match(unknown_encoding, local_encodings, local_names):
    """Compare unknown encoding against known encodings using cosine distance."""
    if not local_encodings:
        return None, None, 0.0

    distances = [cosine(unknown_encoding, enc) for enc in local_encodings]
    best_idx = int(np.argmin(distances))
    best_distance = distances[best_idx]
    confidence = round((1 - best_distance) * 100, 2)

    if best_distance <= RECOGNITION_THRESHOLD:
        return local_names[best_idx], best_distance, confidence

    return None, best_distance, confidence


def load_faces_from_database():
    """Load face embeddings from MongoDB (students with faceEmbedding)."""
    global known_face_encodings, known_face_names

    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        students_collection = db['students']

        students = students_collection.find(
            {
                'faceEmbedding': {'$exists': True, '$ne': None},
                'rollNumber': {'$exists': True, '$ne': None, '$ne': ''}
            },
            {'rollNumber': 1, 'faceEmbedding': 1, 'name': 1}
        )

        new_encodings = []
        new_names = []
        success_count = 0
        fail_count = 0

        for student in students:
            roll_number = student.get('rollNumber')
            embedding_data = student.get('faceEmbedding')
            name = student.get('name', 'Unknown')

            if not roll_number or not embedding_data:
                continue

            try:
                # Convert embedding back to numpy array if stored as list
                embedding = np.array(embedding_data) if isinstance(embedding_data, list) else embedding_data
                new_encodings.append(embedding)
                new_names.append(roll_number)
                success_count += 1
                logger.info(f"Loaded face for student: {name} ({roll_number})")
            except Exception as e:
                logger.warning(f"Failed to load embedding for {roll_number}: {e}")
                fail_count += 1

        client.close()

        with face_data_lock:
            known_face_encodings = new_encodings
            known_face_names = new_names

        logger.info(f"Loaded {success_count} faces successfully, {fail_count} failed")
        return success_count, fail_count

    except Exception as e:
        logger.error(f"Error loading faces from database: {e}")
        return 0, 0


# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────

@app.route('/health', methods=['GET'])
def health_check():
    with face_data_lock:
        face_count = len(known_face_encodings)
    return jsonify({"status": "healthy", "loaded_faces": face_count})


@app.route('/sync-faces', methods=['POST'])
def sync_faces():
    """Reload all face encodings from MongoDB."""
    try:
        success, failed = load_faces_from_database()

        return jsonify({
            "status": "success",
            "message": "Synced faces from database",
            "loaded": success,
            "failed": failed,
            "total_faces": len(known_face_encodings)
        })

    except Exception as e:
        logger.error(f"Error syncing faces: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/add-face', methods=['POST'])
def add_face():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        roll_number = data.get('rollNumber')
        image_url = data.get('imageUrl')

        if not roll_number:
            return jsonify({"status": "error", "message": "rollNumber is required"}), 400
        if not image_url:
            return jsonify({"status": "error", "message": "imageUrl is required"}), 400

        embedding = get_face_embedding_from_url(image_url)

        if embedding is None:
            return jsonify({
                "status": "error",
                "message": "Could not detect/encode face from provided image"
            }), 400

        # Persist to MongoDB first — only update in-memory store on success
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        try:
            db = client[DB_NAME]
            students_collection = db['students']
            students_collection.update_one(
                {'rollNumber': roll_number},
                {'$set': {'faceEmbedding': embedding.tolist()}},
                upsert=True
            )
        finally:
            client.close()

        with face_data_lock:
            if roll_number in known_face_names:
                idx = known_face_names.index(roll_number)
                known_face_names.pop(idx)
                known_face_encodings.pop(idx)

            known_face_encodings.append(embedding)
            known_face_names.append(roll_number)

        logger.info(f"Added/updated face for rollNumber: {roll_number}")
        return jsonify({
            "status": "success",
            "message": f"Face added for rollNumber: {roll_number}",
            "total_faces": len(known_face_encodings)
        })

    except Exception as e:
        logger.error(f"Error adding face: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/recognize', methods=['POST'])
def recognize():
    try:
        if 'image' not in request.files:
            return jsonify({
                "status": "error", "message": "No image file provided",
                "name": "UNKNOWN", "confidence": 0
            }), 400

        file = request.files['image']
        if not file.filename:
            return jsonify({
                "status": "error", "message": "Empty filename",
                "name": "UNKNOWN", "confidence": 0
            }), 400

        npimg = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({
                "status": "error", "message": "Could not decode image",
                "name": "UNKNOWN", "confidence": 0
            }), 400

        rgb_frame = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        embedding = get_face_embedding(rgb_frame)

        if embedding is None:
            return jsonify({
                "status": "No face detected",
                "name": "UNKNOWN",
                "confidence": 0
            })

        with face_data_lock:
            if not known_face_encodings:
                return jsonify({
                    "status": "error",
                    "message": "No faces registered. Please call POST /sync-faces or POST /bootstrap-local-faces-to-db",
                    "name": "UNKNOWN",
                    "confidence": 0
                }), 503

            local_encodings = known_face_encodings.copy()
            local_names = known_face_names.copy()

        matched_name, distance, confidence = find_best_match(embedding, local_encodings, local_names)

        if matched_name:
            logger.info(f"Recognized: {matched_name} with confidence: {confidence:.2f}%")
            return jsonify({
                "status": "Face recognized",
                "name": matched_name,
                "confidence": confidence
            })

        return jsonify({
            "status": "Face not recognized",
            "name": "UNKNOWN",
            "confidence": confidence  # Still return how close the best match was
        })

    except Exception as e:
        logger.error(f"Error during recognition: {e}")
        return jsonify({
            "status": "error", "message": str(e),
            "name": "UNKNOWN", "confidence": 0
        }), 500


@app.route('/faces', methods=['GET'])
def list_faces():
    """List all currently loaded face rollNumbers."""
    with face_data_lock:
        return jsonify({
            "status": "success",
            "count": len(known_face_names),
            "faces": known_face_names
        })


@app.route('/mark-attendance', methods=['POST'])
def mark_attendance():
    """Mark attendance for a recognized student with rollNumber and confidence."""
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        roll_number = data.get('rollNumber')
        confidence = data.get('confidence', 0)
        timestamp = data.get('timestamp')  # ISO format timestamp from client

        if not roll_number:
            return jsonify({"status": "error", "message": "rollNumber is required"}), 400

        if confidence < 0 or confidence > 100:
            return jsonify({"status": "error", "message": "confidence must be between 0 and 100"}), 400

        # Connect to MongoDB and insert attendance record
        client = None
        try:
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
            db = client[DB_NAME]
            attendance_collection = db['attendances']

            # Create attendance record
            attendance_record = {
                'rollNumber': roll_number,
                'confidence': confidence,
                'timestamp': timestamp or datetime.datetime.utcnow().isoformat(),
                'recognized': confidence >= RECOGNITION_THRESHOLD  # True if confidence meets threshold
            }

            result = attendance_collection.insert_one(attendance_record)

            logger.info(f"Attendance marked for {roll_number} with confidence {confidence}%")
            return jsonify({
                "status": "success",
                "message": f"Attendance marked for rollNumber: {roll_number}",
                "attendanceId": str(result.inserted_id),
                "rollNumber": roll_number,
                "confidence": confidence,
                "recognized": confidence >= RECOGNITION_THRESHOLD
            }), 201
        finally:
            if client:
                client.close()

    except Exception as e:
        logger.error(f"Error marking attendance: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/remove-face/<roll_number>', methods=['DELETE'])
def remove_face(roll_number):
    """Remove a face by rollNumber from memory and MongoDB."""
    try:
        # Remove from memory
        with face_data_lock:
            if roll_number not in known_face_names:
                return jsonify({
                    "status": "error",
                    "message": f"Face with rollNumber {roll_number} not found"
                }), 404

            idx = known_face_names.index(roll_number)
            known_face_names.pop(idx)
            known_face_encodings.pop(idx)

        # Remove from MongoDB
        client = None
        try:
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
            db = client[DB_NAME]
            students_collection = db['students']
            students_collection.update_one(
                {'rollNumber': roll_number},
                {'$unset': {'faceEmbedding': ''}}
            )
        finally:
            if client:
                client.close()

        logger.info(f"Removed face for rollNumber: {roll_number}")
        return jsonify({
            "status": "success",
            "message": f"Face removed for rollNumber: {roll_number}",
            "total_faces": len(known_face_names)
        })

    except Exception as e:
        logger.error(f"Error removing face: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/bootstrap-local-faces-to-db', methods=['POST'])
def bootstrap_local_faces_to_db():
    """
    Bootstrap: Process local face images, extract embeddings, store in MongoDB.
    Assumes images are in 'faces/' folder with naming: {rollNumber}.{ext}
    """
    client = None
    try:
        data = request.json if request.is_json else {}
        source_folder = data.get('sourceFolder', 'faces')

        if not os.path.exists(source_folder):
            return jsonify({
                "status": "error",
                "message": f"Folder '{source_folder}' does not exist"
            }), 400

        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        students_collection = db['students']

        processed = 0
        uploaded = 0
        updated = 0
        failed = 0
        skipped = 0

        # Process each image file
        for img_file in os.listdir(source_folder):
            if not img_file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue

            img_path = os.path.join(source_folder, img_file)
            roll_number = os.path.splitext(img_file)[0]

            if not roll_number:
                skipped += 1
                logger.warning(f"Skipped {img_file} - no valid rollNumber")
                continue

            logger.info(f"Processing: {img_file} → rollNumber: {roll_number}")
            processed += 1

            # Extract embedding from local image
            embedding = get_face_embedding_from_file(img_path)

            if embedding is None:
                failed += 1
                logger.error(f"Failed to extract embedding from {img_file}")
                continue

            # Check if student exists
            student = students_collection.find_one({'rollNumber': roll_number})

            if student:
                # Update existing student
                students_collection.update_one(
                    {'rollNumber': roll_number},
                    {'$set': {'faceEmbedding': embedding.tolist()}}  # Store as list for JSON compatibility
                )
                updated += 1
                logger.info(f"Updated face embedding for rollNumber: {roll_number}")
            else:
                # Create new student record
                students_collection.insert_one({
                    'rollNumber': roll_number,
                    'faceEmbedding': embedding.tolist(),
                    'createdAt': datetime.datetime.utcnow()
                })
                uploaded += 1
                logger.info(f"Created new student with rollNumber: {roll_number}")

        # Reload faces into memory
        success, fail_load = load_faces_from_database()

        return jsonify({
            "status": "success",
            "message": f"Bootstrap complete. Processed {processed} images",
            "processed": processed,
            "uploaded": uploaded,
            "updated": updated,
            "skipped": skipped,
            "failed": failed,
            "faces_loaded_in_memory": success
        }), 201

    except Exception as e:
        logger.error(f"Error during bootstrap: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if client:
            client.close()


def initialize():
    """Initialize face data on application startup from MongoDB."""
    logger.info("Initializing face recognition service...")
    success, failed = load_faces_from_database()
    logger.info(f"Initialization complete. {len(known_face_encodings)} faces loaded. (Success: {success}, Failed: {failed})")
    
    if success == 0:
        logger.warning("⚠️ WARNING: No faces loaded from MongoDB on startup. Call POST /bootstrap-local-faces-to-db to load faces from local folder or use POST /add-face to enroll individual students.")


if __name__ == '__main__':
    initialize()
    port = int(os.environ.get('PYTHON_PORT', 5006))
    debug = os.environ.get('NODE_ENV', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
