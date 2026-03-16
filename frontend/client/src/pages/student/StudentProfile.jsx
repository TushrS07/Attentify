"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarStudent } from "../../components/SidebarStudent";
import axios from "axios";
import { Pencil, UserCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STUDENT_API as API } from "../../config/api";

export default function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    rollno: "",
    groupno: "",
    department: "CSE",
    guardianName: "",
    guardianNumber: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get(API.DETAILS, {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data.success) {
          const profileData = response.data.student;
          setProfile({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            groupno: profileData.groupNumber || "",
            rollno: profileData.rollNumber || "",
            department: profileData.department || "CSE",
            guardianName: profileData.guardianName || "",
            guardianNumber: profileData.guardianPhoneNo || "",
            image: profileData.uploadedImageUrl || "",
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

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleEditClick = async () => {
    if (editing) {
      try {
        const {
          name,
          phone,
          rollno,
          groupno,
          department,
          guardianName,
          guardianNumber,
          image,
        } = profile;

        const response = await axios.put(
          API.DETAILS,
          {
            name,
            phone,
            rollno,
            groupno,
            department,
            guardianName,
            guardianNumber,
            image,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Error updating profile");
      }
    }
    setEditing(!editing);
  };

  return (
    <div className="flex">
      <SidebarStudent />
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
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome, {profile.name || "Student"}!
            </h1>
            <p className="text-white text-sm lg:text-base">
              View and update your profile information here.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 max-w-7xl border border-gray-200 mx-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <UserCircle size={32} /> Student Profile
            </h2>
          </div>

          {/* Avatar section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-md mb-4 object-cover"
            />

            {editing && (
              <button
                type="button"
                onClick={() => navigate("/student/register2/image")}
                className="text-sm bg-gray-100 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                Change photo
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
            <Field label="Name" value={profile.name} field="name" editing={editing} handleChange={handleChange} />
            <div>
              <label className="block text-md font-semibold text-gray-600">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm outline-none"
              />
            </div>
            <Field label="Phone" value={profile.phone} field="phone" editing={editing} handleChange={handleChange} />
            <Field label="Roll No." value={profile.rollno} field="rollno" editing={editing} handleChange={handleChange} />
            <Field label="Group No." value={profile.groupno} field="groupno" editing={editing} handleChange={handleChange} />
            <Field label="Department" value={profile.department} field="department" editing={editing} handleChange={handleChange} />
            <Field label="Guardian Name" value={profile.guardianName} field="guardianName" editing={editing} handleChange={handleChange} />
            <Field label="Guardian Number" value={profile.guardianNumber} field="guardianNumber" editing={editing} handleChange={handleChange} />
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

function Field({ label, value, field, editing, handleChange }) {
  return (
    <div>
      <label className="block text-md font-semibold text-gray-600">{label}</label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
        />
      ) : (
        <p className="mt-1 text-gray-900">{value}</p>
      )}
    </div>
  );
}
