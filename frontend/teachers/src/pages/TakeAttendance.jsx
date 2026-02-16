"use client";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Sidebar } from "../components/Sidebar";
import TeacherName from "../components/ProfileName";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { useNavigate } from "react-router-dom";

function TakeAttendance() {
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const webcamRef = useRef(null);
  const userName = "John Doe";
  const navigate = useNavigate();

  // Dummy student face data
  // const students = {
  //   "face-1": { name: "John Doe", roll: "101" },
  //   "face-2": { name: "Alice Smith", roll: "102" },
  //   "face-3": { name: "Bob Johnson", roll: "103" },
  // };

  const handleTakeAttendance = () => {
    navigate("/newattendance");
  };
  
    // setIsTakingAttendance(!isTakingAttendance);
    // if (!isTakingAttendance) {
    //   setAttendees([]); // Reset attendance list when restarted
    //   toast.info("Attendance started. Looking for faces...");
    // } else {
    //   toast.success("Attendance completed!");
    // }
  // };

  // Function to simulate face scanning
  useEffect(() => {
    let scanInterval;
    if (isTakingAttendance) {
      scanInterval = setInterval(() => {
        const detectedFace = `face-${Math.floor(Math.random() * 3) + 1}`; // Randomly pick a face
        const student = students[detectedFace];

        if (student && !attendees.some((s) => s.roll === student.roll)) {
          setAttendees((prev) => [...prev, student]);
          toast.success(`${student.name} detected!`);
        }
      }, 2000);
    } else {
      clearInterval(scanInterval);
    }

    return () => clearInterval(scanInterval);
  }, [isTakingAttendance, attendees]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
        {/* ToastContainer for displaying notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Say Goodbye to Manual Attendance — AI Handles It All with a Look.
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Camera Preview */}
          {isTakingAttendance && (
            <div className="w-full md:w-1/2 bg-gray-200 rounded-lg p-4 flex justify-center items-center">
              <Webcam ref={webcamRef} className="rounded-md w-full h-80" />
            </div>
          )}

          {/* Student List */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Scanned Students</h2>
            <ul>
              {attendees.length > 0 ? (
                attendees.map((student, index) => (
                  <li key={index} className="p-2 border-b flex justify-between">
                    <span>{student.name}</span>
                    <span className="text-gray-500">Roll No: {student.roll}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No students scanned yet.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Take Attendance Button */}
        <button
          onClick={handleTakeAttendance}
          className={`absolute bottom-0 right-6 px-6 py-2 text-white font-semibold rounded-md shadow-lg ${
            isTakingAttendance ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {isTakingAttendance ? "Done" : "Take Attendance"}
        </button>
      </div>
    </div>
  );
}

export default TakeAttendance;
