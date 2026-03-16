"use client";

import axios from "axios";
import { useState } from "react";
import TeacherName from "../../components/ProfileNameTeacher";
import { Sidebar } from "../../components/SidebarTeacher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { TEACHER_API as API } from "../../config/api";

export default function GenerateSheet() {
  const [attendanceRecords, setAttendanceRecords] = useState([]); // State to hold attendance records
  const [selectedGroup, setSelectedGroup] = useState("29");
  const [selectedSubject, setSelectedSubject] = useState("BT101");
  const [selectedDate, setSelectedDate] = useState("2025-05-04");
  const [selectedLectureSlot, setSelectedLectureSlot] = useState("1-3");
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  const groups = Array.from({ length: 32 }, (_, i) => i + 1);
  const lectureSlot = ['1-3', '3-5', '5-8'];
  const subjects = [
    "BT101",
    "BT102",
    "BT103",
    "BT104",
    "BT105",
  ];

  const handleGenerate = async () => {
    if (!selectedSubject || !selectedGroup || !selectedDate || !selectedLectureSlot) {
      toast.error("Please fill all fields before generating the sheet.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(API.GET_ATTENDANCE, {
        params: {
          subjectId: selectedSubject,
          sectionId: selectedGroup,
          date: selectedDate,
          lectures: selectedLectureSlot
        },
        withCredentials: true
      });

      // Check if we have attendance data
      if (response.data && response.data.attendance && response.data.attendance.length > 0) {
        // Store the teacher ID for download
        setTeacherId(response.data.teacherId || "");
        
        // Store the actual attendance records array
        setAttendanceRecords(response.data.attendance[0].attendance || []);
        
        toast.success("Sheet generated successfully!");
      } else {
        setAttendanceRecords([]);
        toast.warning("No attendance records found for the selected criteria.");
      }
    } catch (error) {
      console.error("Error generating sheet:", error);
      toast.error("Failed to generate sheet.");
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedSubject || !selectedGroup || !selectedDate || !selectedLectureSlot) {
      toast.error("Please select Subject, Group, and Date before downloading.");
      return;
    }

    if (attendanceRecords.length === 0) {
      toast.warning("No attendance data available to download.");
      return;
    }

    try {
      // Prepare the data to be exported
      const data = attendanceRecords.map(record => ({
        "Student ID": record.studentId || "N/A",
        "Roll Number": record.rollNumber || "N/A",
        "Attendance Status": record.status || "N/A",
        "Lecture Slot": selectedLectureSlot,
        "Section ID": selectedGroup, 
        "Subject ID": selectedSubject,
        "Teacher ID": teacherId,
        "Date": selectedDate
      }));

      // Create a worksheet from the data
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");

      // Export the workbook as an Excel file
      XLSX.writeFile(wb, `${selectedSubject}_Group${selectedGroup}_${selectedDate}_attendance.xlsx`);

      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Error downloading Excel:", error);
      toast.error("Failed to download Excel file.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5 ml-0 custom:ml-64">
        {/* ToastContainer */}
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
              Welcome back, <TeacherName />!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Generate Attendance Sheets Instantly for Any Class.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Generate Sheet</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>

              {/* Group Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Group
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>

              {/* Lecture Slot Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lecture Slot
                </label>
                <select
                  value={selectedLectureSlot}
                  onChange={(e) => setSelectedLectureSlot(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Select Lecture
                  </option>
                  {lectureSlot.map((lectures) => (
                    <option key={lectures} value={lectures}>
                      {lectures}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Generate Button */}
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`w-full ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 px-4 rounded-md shadow`}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Preview */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Attendance Preview</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <p>Loading attendance data...</p>
              </div>
            ) : attendanceRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-center w-96">Student ID</th>
                      <th className="border p-2 text-center w-96">Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border p-2 text-center">{record.studentId || 'N/A'}</td>
                        <td className="border p-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs text-center   font-medium ${
                            record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                            record.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status || 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No attendance records to display. Please generate a sheet first.</p>
              </div>
            )}
          </div>

          {/* Download Section */}
          <div className="mt-6 mb-10 flex justify-end gap-4">
            <button
              onClick={handleDownload}
              disabled={attendanceRecords.length === 0 || loading}
              className={`${
                attendanceRecords.length === 0 || loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } text-white py-2 px-6 rounded-md shadow`}
            >
              Download Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}