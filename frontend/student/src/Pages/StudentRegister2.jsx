import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { API_URL } from "../config/api";

export default function StudentRegister2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: "",
    groupNumber: "",
    dob: "",
    guardianName: "",
    guardianPhoneNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    // Check if all fields are filled
    for (const field in formData) {
      if (formData[field] === "") {
        toast.error(`${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required.`);
        return false;
      }
    }

    // Check if non-negative numbers for rollNumber, groupNumber, and guardianPhoneNo
    if (formData.rollNumber < 0 || formData.groupNumber < 0 || formData.guardianPhoneNo < 0) {
      toast.error("Roll number, group number, and guardian phone number must be non-negative.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate the form
    if (!validateForm()) {
      return; // If validation fails, don't proceed with submission
    }
    // console.log(formData);
    try {
      const response = await axios.put(
        `${API_URL}/api/student/details`,
        formData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success(response.data.message + ", Redirecting...."); // Success toast
        // Show success toast and redirect after 2 seconds
        setTimeout(() => {
          navigate("/StudentRegister2/Image");
        }, 2000);
      } else {
        toast.error("Registration failed"); // Error toast
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error registering student"); // Error toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row relative">
      <div className="flex-1 p-6 lg:p-16 flex items-center">
        <div className="max-w-xl mx-auto lg:mx-20 lg:mt-0 md:mt-20">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4 text-center lg:text-left">
            Revolutionize your
            <span className="block text-blue-700 mt-2">attendance with AI</span>
          </h1>
          <p className="text-gray-600 mt-4 text-center lg:text-left text-md lg:text-base">
            — accurate, effortless, and secure tracking.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 lg:mt-10 md:mt-0 sm:mt-0">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
          <form className="space-y-4 lg:space-y-6">
            {[ 
              "rollNumber",
              "groupNumber",
              "dob",
              "guardianName",
              "guardianPhoneNo",
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  id={field}
                  type={
                    field === "dob"
                      ? "date"
                      : field.includes("Number") || field.includes("Phone")
                      ? "number"
                      : "text"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer /> {/* ToastContainer to display notifications */}
    </div>
  );
}
