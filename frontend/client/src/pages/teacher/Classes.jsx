"use client";
import { useState } from "react";
import { Sidebar } from "../../components/SidebarTeacher";
import TeacherName from "../../components/ProfileNameTeacher";
import { ToastContainer, toast } from "react-toastify"; // Add Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

function Classes() {
  // const [userName] = useState("");

  const [subject, setSubject] = useState("");
  const [endDate, setEndDate] = useState("");
  const [group, setGroup] = useState("");
  const [isMentor, setIsMentor] = useState("No");
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");

  const groups = Array.from({ length: 32 }, (_, i) => i + 1);

  const subjects = [
    "Advance Java",
    "Data Structures",
    "Machine Learning",
    "Cyber Security",
    "Cloud Computing",
  ];

  const handleAddOrUpdateClass = () => {
    if (!subject || !endDate || !selectedGroup) {
      toast.error("❌ Please fill all fields before adding/updating a class!");
      return;
    }

    const newClass = { subject, endDate, group: selectedGroup, isMentor };

    if (editIndex !== null) {
      const updatedClasses = [...classes];
      updatedClasses[editIndex] = newClass;
      setClasses(updatedClasses);
      toast.success("✅ Class updated successfully!");
      setEditIndex(null);
    } else {
      setClasses([...classes, newClass]);
      toast.success("✅ Class added successfully!");
    }

    // Reset form
    setSubject("");
    setEndDate("");
    setSelectedGroup("");
    setIsMentor("No");
  };

  const handleDeleteClass = (index) => {
    const updatedClasses = classes.filter((_, i) => i !== index);
    setClasses(updatedClasses);
    toast.success("🗑️ Class deleted successfully!");
  };

  const handleEditClass = (index) => {
    const classToEdit = classes[index];
    setSubject(classToEdit.subject);
    setEndDate(classToEdit.endDate);
    setSelectedGroup(classToEdit.group);
    setIsMentor(classToEdit.isMentor);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* ToastContainer inside page */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />

        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Link Yourself to the Classes You Guide as a Mentor.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Add Class Section */}
          <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Edit Class" : "Add Class"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject Dropdown */}
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjects.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              {/* Course End Date */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded w-full"
              />

              {/* Group Selection Dropdown */}
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 rounded w-full"
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

              {/* Mentor Selection */}
              <select
                value={isMentor}
                onChange={(e) => setIsMentor(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="No">Not a Mentor</option>
                <option value="Yes">Mentor</option>
              </select>
            </div>

            {/* Add or Update Button */}
            <button
              onClick={handleAddOrUpdateClass}
              className="mt-4 bg-blue-600 text-white w-full sm:w-auto px-6 py-2 rounded"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {/* Class List Section */}
          <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 tablet:mb-0 mb-10">
            <h2 className="text-lg font-semibold mb-4">Class List</h2>
            {classes.length > 0 ? (
              <ul className="border rounded-lg divide-y">
                {classes.map((cls, index) => (
                  <li
                    key={index}
                    className="p-3 flex flex-wrap gap-4 justify-between items-center"
                  >
                    <span className="w-full sm:w-auto">{cls.subject}</span>
                    <span className="w-full sm:w-auto">End Date: {cls.endDate}</span>
                    <span className="w-full sm:w-auto">Group: {cls.group}</span>
                    <span className="w-full sm:w-auto">
                      {cls.isMentor === "Yes" ? "Mentor" : "Not a Mentor"}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleEditClass(index)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClass(index)}
                        className="bg-red-500 text-white px-4 py-1 rounded w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No classes added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classes;
