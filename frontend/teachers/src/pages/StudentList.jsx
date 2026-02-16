"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";
import TeacherName from "../components/ProfileName";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [fileType, setFileType] = useState("Excel");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const groups = Array.from({ length: 32 }, (_, i) => i + 1);
  const fileTypes = ["Excel", "PDF"];

  // Fetch students when group is selected
  const handleGenerate = async () => {
    if (!selectedGroup) {
      toast.error("Please select a Group to fetch student data!");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`http://localhost:5000/api/teacher/allstudents`, {
        params: { group: selectedGroup },
        withCredentials: true
      });

      // Check if response contains valid students data
      if (response.data && response.data.students) {
        const students = response.data.students;

        if (students.length === 0) {
          toast.warning(`No students found in Group ${selectedGroup}`);
        } else {
          setStudents(students);
          toast.success(`Found ${students.length} students in Group ${selectedGroup}`);
        }
      } else {
        toast.warning("No student data available.");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch student data. Please try again.");
      setStudents([]); // Clear student data on failure
    } finally {
      setLoading(false); // Hide the loading indicator once the operation is complete
    }
  };


  // Download student data
  const handleDownload = () => {
    if (!selectedGroup) {
      toast.error("Please select a Group first!");
      return;
    }

    if (students.length === 0) {
      toast.warning("No student data available to download.");
      return;
    }

    try {
      if (fileType === "Excel") {
        // Create a worksheet
        const data = students.map(student => ({
          "Roll Number": student.rollNumber || "N/A",
          "Name": student.name || "N/A",
          "Email": student.email || "N/A",
          "Contact": student.phone || "N/A",
          "Section": selectedGroup,
          "Status": student.status || "Active"
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `Group${selectedGroup}`);
        XLSX.writeFile(wb, `Group${selectedGroup}_Students.xlsx`);
        toast.success("Excel file downloaded successfully!");
      } else {
        // For PDF, you would typically use a library like jsPDF
        // This is just a placeholder
        toast.info("PDF download functionality coming soon!");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(searchLower)) ||
      (student.rollNumber && student.rollNumber.toLowerCase().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
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
              Class Roster: All Students, One Place.
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Student Roster</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              {/* Generate Button */}
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !selectedGroup}
                  className={`w-full ${loading || !selectedGroup ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white py-2 px-4 rounded-md shadow`}
                >
                  {loading ? "Loading..." : "Fetch Students"}
                </button>
              </div>

              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, roll number or email..."
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Student Data Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Student Data</h2>
              {students.length > 0 && (
                <div className="text-sm text-gray-500">
                  Showing {filteredStudents.length} of {students.length} students
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Loading student data...</p>
              </div>
            ) : students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rollNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {student.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.phone || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {student.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="mt-2 text-gray-600">No student data available.</p>
                <p className="text-gray-500 text-sm">Select a group and click "Fetch Students" to view the data.</p>
              </div>
            )}
          </div>

          {/* Download Section */}
          <div className="mt-6 mb-10 flex justify-end gap-4">
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              disabled={students.length === 0}
              className={`p-2 border border-gray-300 rounded-md shadow-sm ${students.length === 0 ? "bg-gray-100 cursor-not-allowed" : "focus:ring-indigo-500 focus:border-indigo-500"
                }`}
            >
              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              onClick={handleDownload}
              disabled={students.length === 0 || loading}
              className={`${students.length === 0 || loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } text-white py-2 px-6 rounded-md shadow`}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;