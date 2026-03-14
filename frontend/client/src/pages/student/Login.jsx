import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config/api";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/student/user/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", "student-authenticated");
        setTimeout(() => navigate("/student"), 1500);
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;

        if (message === "Verify Otp") {
          toast.info("OTP verification required. Redirecting...");
          setTimeout(() => navigate("/student/verificationpage"), 1500);
        } else if (message === "Fill All the details") {
          toast.info("Please complete your registration.");
          setTimeout(() => navigate("/student/register2"), 1500);
        } else if (message === "Verify your image") {
          toast.info("Please verify your image.");
          setTimeout(() => navigate("/student/register2/image"), 1500);
        } else {
          toast.error(message || "Login failed. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Left Section */}
      <div className="flex-1 p-6 lg:p-16 flex items-center ml-10">
        <div className="max-w-xl mx-auto lg:mx-0">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4 text-center lg:text-left">
            Revolutionize your
            <span className="block text-blue-700 mt-2">attendance with AI</span>
          </h1>
          <p className="text-gray-600 mt-4 text-center lg:text-left text-sm lg:text-base">
            — accurate, effortless, and secure tracking.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/student/forgotpassword"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => navigate("/student/register")}
              >
                Register here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
