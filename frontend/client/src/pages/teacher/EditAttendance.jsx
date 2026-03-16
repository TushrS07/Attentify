"use client";
import { useState } from "react";
import { Sidebar } from "../../components/SidebarTeacher";
import TeacherName from "../../components/ProfileNameTeacher";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

function EditAttendance() {
  const [userName] = useState("John");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [searchSubject, setSearchSubject] = useState("");

  const groups = Array.from({ length: 32 }, (_, i) => i + 1);
  const subjects = ["Advance Java", "Data Structures", "Machine Learning"];
  const statuses = ["Present", "Absent", "Late"];

  const handleMarkAttendance = () => {
    if (!selectedGroup || !selectedSubject || !selectedStatus) {
      toast.error("Please select Group, Subject, and Status before marking attendance.");
      return;
    }
    toast.success("Attendance marked successfully!");
    // Reset fields after successful marking
    setSelectedGroup("");
    setSelectedSubject("");
    setSelectedStatus("");
  };

  const handleShowStudent = () => {
    if (!rollNumber || !searchSubject) {
      toast.error("Please enter Roll Number and select Subject to search.");
      return;
    }
    toast.success(`Showing attendance details for Roll No: ${rollNumber}`);
    // Reset fields after successful search
    setRollNumber("");
    setSearchSubject("");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5 ml-0 custom:ml-64">
        {/* ToastContainer inside the page */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />

        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Ensure Accuracy — Review and Edit Student Attendance Seamlessly.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Mark Attendance Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Mark Everyone</h2>
            <div className="flex flex-wrap gap-4">
              {/* Group Dropdown */}
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 rounded w-full md:w-1/4"
              >
                <option value="" disabled>
                  Select Group
                </option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>

              {/* Subject Dropdown */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border p-2 rounded w-full md:w-1/4"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border p-2 rounded w-full md:w-1/4"
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Mark Button */}
              <button
                onClick={handleMarkAttendance}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Mark Attendance
              </button>
            </div>
          </div>

          {/* Search Student Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Search Student</h2>
            <div className="flex flex-wrap gap-4">
              {/* Roll Number Input */}
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Roll Number"
                className="border p-2 rounded w-full md:w-1/4"
              />

              {/* Subject Dropdown */}
              <select
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="border p-2 rounded w-full md:w-1/4"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {/* Show Button */}
              <button
                onClick={handleShowStudent}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Show
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAttendance;
