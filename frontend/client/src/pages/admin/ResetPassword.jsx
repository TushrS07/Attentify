import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_API as API } from "../../config/api";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic password validation
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API.RESET_PASSWORD,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Password reset successfully!");
        setTimeout(() => navigate("/admin/login"), 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === "Session expired. Please log in again.") {
          toast.error("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/admin/login"), 2000);
        } else {
          toast.error(error.response.data.message || "An error occurred. Please try again.");
        }
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
      <ToastContainer />

      {/* Left Section */}
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

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-600 mt-2">Enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
              <input
                type="password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your old password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your new password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/admin/login")}
                className="text-sm text-blue-600 hover:text-blue-700 mt-4"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
