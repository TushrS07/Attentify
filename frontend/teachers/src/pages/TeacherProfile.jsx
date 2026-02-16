"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import teacher from "../assets/teacher.jpeg";
import { Pencil, UserCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API } from "../config/api";

export default function TeacherProfile() {
  const [teacherData, setTeacherData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    groups: [],
    teachesSubjects: [], // Initialize as empty array
    image: teacher,
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get(API.PROFILE, {
          withCredentials: true,
        });
        if (response.data.success) {
          const profileData = response.data.profile;
          setTeacherData(profileData);
          
          // Make sure to properly map the subjects from the API response
          setProfile({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            groups: profileData.groups || [],
            teachesSubjects: profileData.subjects || [], // Use subjects from API
            image: teacher
          });
        } else {
          toast.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error fetching profile data");
      }
    };

    profileData();
  }, []);

  // Fetch subjects list separately
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(API.SUBJECTS, {
          withCredentials: true,
        });
        if (response.data.success) {
          setSubjects(response.data.subjects);
        } else {
          toast.error("Failed to fetch subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Error fetching subjects");
      }
    };

    fetchSubjects();
  }, []);

  // For debugging
  useEffect(() => {
  }, [profile, subjects]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    setProfile((prev) => ({ 
      ...prev, 
      [field]: value.split(",").map((item) => item.trim()) 
    }));
  };

  const handleEditClick = async () => {
    if (editing) {
      // Save to backend
      try {
        const response = await axios.put(
          API.PROFILE,
          {
            name: profile.name,
            phone: profile.phone,
            subjects: profile.teachesSubjects, // Make sure the API expects 'subjects'
            groups: profile.groups
          },
          { withCredentials: true }
        );
  
        if (response.data.success) {
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating profile.");
      }
    } else {
      toast.info("You are now in edit mode.");
    }
  
    setEditing(!editing);
  };
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-20">
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
        <div className="mx-auto mb-6 max-w-7xl">
          <div className="pt-10 px-16 w-100 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, {profile.name || "Teacher"}!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Manage Attendance Seamlessly — Smart Tools for Smarter Classrooms.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 max-w-7xl border border-gray-200 mx-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <UserCircle size={32} /> Teacher Profile
            </h2>
          </div>

          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-blue-500 shadow-md mb-4"
            />
            {editing && (
              <input
                type="text"
                value={profile.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="mb-4 w-full max-w-md text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
            <div>
              <label className="block text-md font-bold text-gray-600">Name</label>
              {editing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.name}</p>
              )}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-600">Email</label>
              {editing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                  disabled={true} // Usually email shouldn't be editable
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.email}</p>
              )}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-600">Phone</label>
              {editing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-600">Mentor of Class</label>
              {editing ? (
                <input
                  type="text"
                  value={profile.groups.join(", ")}
                  onChange={(e) => handleArrayChange("groups", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Class A, Class B"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.groups.join(", ")}</p>
              )}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-600">Teaches Subjects</label>
              {editing ? (
                <select
                  multiple
                  value={profile.teachesSubjects}
                  onChange={(e) =>
                    handleChange(
                      "teachesSubjects",
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none h-24"
                >
                  {subjects && subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <option key={subject.code} value={subject.code}>
                        {subject.name} - {subject.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>No subjects available</option>
                  )}
                </select>
              ) : (
                <p className="mt-1 text-gray-900">
                  {profile.teachesSubjects && profile.teachesSubjects.length > 0 ? 
                    profile.teachesSubjects.join(", ") : 
                    "No subjects assigned"}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full align-center justify-end">
            <button
              onClick={handleEditClick}
              className="text-sm bg-blue-600 text-white mt-10 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 outline-none"
            >
              <Pencil size={16} /> {editing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}