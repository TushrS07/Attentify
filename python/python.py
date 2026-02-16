from flask import Flask, request, jsonify
import face_recognition
from flask_cors import CORS
import numpy as np
import cv2
import os
import requests
from io import BytesIO
from pymongo import MongoClient
from threading import Lock
import logging
from pathlib import Path
from dotenv import load_dotenv

# Load .env from project root (parent directory)
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

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
known_face_names = []  # This will store rollNumbers

# MongoDB connection settings from global .env
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('DB_NAME', 'attentify')


def get_face_encoding_from_url(image_url):
    """Download image from URL and extract face encoding."""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        
        # Convert to numpy array
        img_array = np.frombuffer(response.content, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        if img is None:
            logger.warning(f"Failed to decode image from URL: {image_url}")
            return None
        
        # Convert BGR to RGB
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Get face encodings
        face_locations = face_recognition.face_locations(rgb_img)
        if not face_locations:
            logger.warning(f"No face detected in image: {image_url}")
            return None
        
        face_encodings = face_recognition.face_encodings(rgb_img, face_locations)
        if not face_encodings:
            logger.warning(f"Could not encode face from image: {image_url}")
            return None
        
        return face_encodings[0]
    
    except requests.RequestException as e:
        logger.error(f"Error downloading image from {image_url}: {e}")
        return None
    except Exception as e:
        logger.error(f"Error processing image from {image_url}: {e}")
        return None


def get_face_encoding_from_file(file_path):
    """Load face encoding from local file."""
    try:
        img = face_recognition.load_image_file(file_path)
        face_encodings = face_recognition.face_encodings(img)
        
        if not face_encodings:
            logger.warning(f"No face detected in file: {file_path}")
            return None
        
        return face_encodings[0]
    
    except Exception as e:
        logger.error(f"Error processing file {file_path}: {e}")
        return None


def load_faces_from_database():
    """Load face encodings from MongoDB (students with uploadedImageUrl)."""
    global known_face_encodings, known_face_names
    
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        students_collection = db['students']
        
        # Find all students with uploaded images and rollNumbers
        students = students_collection.find(
            {
                'uploadedImageUrl': {'$exists': True, '$ne': None, '$ne': ''},
                'rollNumber': {'$exists': True, '$ne': None, '$ne': ''}
            },
            {'rollNumber': 1, 'uploadedImageUrl': 1, 'name': 1}
        )
        
        new_encodings = []
        new_names = []
        success_count = 0
        fail_count = 0
        
        for student in students:
            roll_number = student.get('rollNumber')
            image_url = student.get('uploadedImageUrl')
            name = student.get('name', 'Unknown')
            
            if not roll_number or not image_url:
                continue
            
            logger.info(f"Processing face for student: {name} ({roll_number})")
            encoding = get_face_encoding_from_url(image_url)
            
            if encoding is not None:
                new_encodings.append(encoding)
                new_names.append(roll_number)  # Store rollNumber for attendance matching
                success_count += 1
            else:
                fail_count += 1
        
        client.close()
        
        # Thread-safe update
        with face_data_lock:
            known_face_encodings = new_encodings
            known_face_names = new_names
        
        logger.info(f"Loaded {success_count} faces successfully, {fail_count} failed")
        return success_count, fail_count
    
    except Exception as e:
        logger.error(f"Error loading faces from database: {e}")
        return 0, 0


def load_faces_from_folder():
    """Fallback: Load faces from local 'faces' folder."""
    global known_face_encodings, known_face_names
    
    faces_dir = "faces"
    
    if not os.path.exists(faces_dir):
        logger.warning(f"Faces directory '{faces_dir}' does not exist")
        os.makedirs(faces_dir, exist_ok=True)
        return 0, 0
    
    new_encodings = []
    new_names = []
    success_count = 0
    fail_count = 0
    
    for img_file in os.listdir(faces_dir):
        if not img_file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        
        img_path = os.path.join(faces_dir, img_file)
        roll_number = os.path.splitext(img_file)[0]  # Filename without extension = rollNumber
        
        logger.info(f"Processing local face: {img_file}")
        encoding = get_face_encoding_from_file(img_path)
        
        if encoding is not None:
            new_encodings.append(encoding)
            new_names.append(roll_number)
            success_count += 1
        else:
            fail_count += 1
    
    with face_data_lock:
        known_face_encodings = new_encodings
        known_face_names = new_names
    
    logger.info(f"Loaded {success_count} faces from folder, {fail_count} failed")
    return success_count, fail_count


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    with face_data_lock:
        face_count = len(known_face_encodings)
    
    return jsonify({
        "status": "healthy",
        "loaded_faces": face_count
    })


@app.route('/sync-faces', methods=['POST'])
def sync_faces():
    """Sync faces from database (Cloudinary URLs)."""
    try:
        source = request.json.get('source', 'database') if request.is_json else 'database'
        
        if source == 'folder':
            success, failed = load_faces_from_folder()
        else:
            success, failed = load_faces_from_database()
        
        return jsonify({
            "status": "success",
            "message": f"Synced faces from {source}",
            "loaded": success,
            "failed": failed,
            "total_faces": len(known_face_encodings)
        })
    
    except Exception as e:
        logger.error(f"Error syncing faces: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route('/add-face', methods=['POST'])
def add_face():
    """Add a single face to the recognition system."""
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
        
        encoding = get_face_encoding_from_url(image_url)
        
        if encoding is None:
            return jsonify({
                "status": "error",
                "message": "Could not detect/encode face from provided image"
            }), 400
        
        with face_data_lock:
            # Remove existing encoding for this rollNumber if exists
            if roll_number in known_face_names:
                idx = known_face_names.index(roll_number)
                known_face_names.pop(idx)
                known_face_encodings.pop(idx)
            
            known_face_encodings.append(encoding)
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
    """Recognize a face from uploaded image."""
    try:
        # Validate input
        if 'image' not in request.files:
            return jsonify({
                "status": "error",
                "message": "No image file provided",
                "name": "UNKNOWN",
                "confidence": 0
            }), 400
        
        file = request.files['image']
        
        if not file.filename:
            return jsonify({
                "status": "error",
                "message": "Empty filename",
                "name": "UNKNOWN",
                "confidence": 0
            }), 400
        
        # Read and decode image
        npimg = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({
                "status": "error",
                "message": "Could not decode image",
                "name": "UNKNOWN",
                "confidence": 0
            }), 400
        
        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Detect faces
        face_locations = face_recognition.face_locations(rgb_frame)
        
        if not face_locations:
            return jsonify({
                "status": "No face detected",
                "name": "UNKNOWN",
                "confidence": 0
            })
        
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
        
        if not face_encodings:
            return jsonify({
                "status": "No face detected",
                "name": "UNKNOWN",
                "confidence": 0
            })
        
        # Thread-safe read of known faces
        with face_data_lock:
            if not known_face_encodings:
                return jsonify({
                    "status": "error",
                    "message": "No faces registered. Please sync faces first.",
                    "name": "UNKNOWN",
                    "confidence": 0
                }), 503  # Service Unavailable
            
            local_encodings = known_face_encodings.copy()
            local_names = known_face_names.copy()
        
        # Try to match each detected face
        for fc_encoding in face_encodings:
            matches = face_recognition.compare_faces(local_encodings, fc_encoding, tolerance=0.6)
            face_distances = face_recognition.face_distance(local_encodings, fc_encoding)
            
            if len(face_distances) == 0:
                continue
            
            best_match_index = np.argmin(face_distances)
            
            if matches[best_match_index]:
                name = local_names[best_match_index]
                confidence = (1 - face_distances[best_match_index]) * 100
                
                logger.info(f"Recognized: {name} with confidence: {confidence:.2f}%")
                
                return jsonify({
                    "status": "Face recognized",
                    "name": name,
                    "confidence": round(confidence, 2)
                })
        
        # No match found
        return jsonify({
            "status": "Face not recognized",
            "name": "UNKNOWN",
            "confidence": 0
        })
    
    except Exception as e:
        logger.error(f"Error during recognition: {e}")
        return jsonify({
            "status": "error",
            "message": str(e),
            "name": "UNKNOWN",
            "confidence": 0
        }), 500


@app.route('/faces', methods=['GET'])
def list_faces():
    """List all registered faces (rollNumbers)."""
    with face_data_lock:
        return jsonify({
            "status": "success",
            "count": len(known_face_names),
            "faces": known_face_names
        })


@app.route('/remove-face/<roll_number>', methods=['DELETE'])
def remove_face(roll_number):
    """Remove a face from the recognition system."""
    with face_data_lock:
        if roll_number not in known_face_names:
            return jsonify({
                "status": "error",
                "message": f"Face with rollNumber {roll_number} not found"
            }), 404
        
        idx = known_face_names.index(roll_number)
        known_face_names.pop(idx)
        known_face_encodings.pop(idx)
    
    logger.info(f"Removed face for rollNumber: {roll_number}")
    
    return jsonify({
        "status": "success",
        "message": f"Face removed for rollNumber: {roll_number}",
        "total_faces": len(known_face_names)
    })


# Initialize faces on startup
def initialize():
    """Initialize face data on application startup."""
    logger.info("Initializing face recognition service...")
    
    # Try database first, fallback to folder
    success, failed = load_faces_from_database()
    
    if success == 0:
        logger.info("No faces loaded from database, trying local folder...")
        success, failed = load_faces_from_folder()
    
    logger.info(f"Initialization complete. {len(known_face_encodings)} faces loaded.")


if __name__ == '__main__':
    initialize()
    port = int(os.environ.get('PYTHON_PORT', 5006))
    debug = os.environ.get('NODE_ENV', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
