// **** uploading image through backend **** //

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { UserCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { STUDENT_API as API } from "../../config/api";

export default function Image() {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null); // base64 data URL
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [rollNumber, setRollNumber] = useState("");
  const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/student/details",
  //         { withCredentials: true }
  //       );
  //       setRollNumber(response.data.student.rollNumber);
  //     } catch (error) {
  //       toast.error("Failed to fetch student data.");
  //       console.error(error);
  //     }
  //   };
  //   fetchStudentData();
  // }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (error) {
      toast.error("Failed to access camera.");
      console.error(error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 🔁 CHANGED: store base64 data URL instead of blob URL
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // data:image/png;base64,....
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // CHANGE: Upload to backend route instead of Cloudinary directly
  const uploadAndNavigate = async () => {
    if (!capturedImage) {
      toast.error("No captured image to upload.");
      return;
    }
    setUploading(true);
    toast.info("Uploading image...");

    try {
      // Get Blob from blob URL
      const blob = await fetch(capturedImage).then((res) => res.blob());
      // Convert blob to base64
      const base64Image = await blobToBase64(blob);

      // POST to backend
      const res = await axios.post(
        API.UPLOAD_IMAGE,
        {
          image: base64Image, // CHANGE: send base64
        },
        { withCredentials: true } 
      );

      console.log("Backend upload response:", res.data);
      toast.success("Image uploaded successfully!");
      setTimeout(() => navigate("/student"), 1500);
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        console.error("Backend response:", error.response.data);
      }
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 mt-16">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Capture Your Image
      </h1>

      <div className="relative w-full max-w-md flex justify-center items-center bg-white rounded-xl shadow-xl p-4 aspect-[5/5]">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-xl w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="rounded-xl w-full h-full object-cover"
            />
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <UserCircle size={100} />
                <p className="text-md mt-2">Camera is Off</p>
              </div>
            )}
          </>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      <div className="mt-4 custom1:text-lg text-sm text-red-600 text-center px-4">
        <p>
          Note* : Make sure the image is clear, well-lit, and without obstructions
          for better recognition.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        {!cameraActive && !capturedImage && (
          <button
            onClick={startCamera}
            className="px-6 py-3 bg-green-600 text-white rounded-lg text-md font-semibold hover:bg-green-700"
          >
            Start Camera
          </button>
        )}

        {cameraActive && (
          <button
            onClick={captureImage}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-md font-semibold hover:bg-yellow-600"
          >
            Capture
          </button>
        )}

        {capturedImage && (
          <>
            <button
              onClick={() => {
                setCapturedImage(null);
                startCamera();
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg text-md font-semibold hover:bg-purple-700"
            >
              Retake
            </button>
            <button
              onClick={uploadAndNavigate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-md font-semibold hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}


