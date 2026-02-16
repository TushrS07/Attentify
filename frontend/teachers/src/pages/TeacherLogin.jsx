// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TeacherLogin() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/teacher/login",
//         formData,
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       );

//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         toast.success("Login successful!");
//         setTimeout(() => navigate("/teacher"), 1500);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Error response:", error.response.data);

//         if (error.response.status === 403) {
//           toast.warn("First-time login detected. Redirecting to password reset...");
//           setTimeout(() => navigate("/resetpassword"), 2000);
//         } else if (error.response.status === 404) {
//           toast.error("Teacher not found. Please check your email.");
//         } else if (error.response.status === 400) {
//           toast.error("Invalid credentials. Please try again.");
//         } else {
//           toast.error("Login failed. Please try again.");
//         }
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         toast.error("No response from server. Please try again later.");
//       } else {
//         console.error("Request setup error:", error.message);
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
//       <ToastContainer />
//       <div className="flex-1 p-6 lg:p-16 flex items-center">
//         <div className="max-w-xl mx-auto lg:mx-20 lg:mt-0 md:mt-20">
//           <h1 className="text-3xl lg:text-5xl font-semibold mb-4 text-center lg:text-left">
//             Revolutionize your
//             <span className="block text-blue-700 mt-2">attendance with AI</span>
//           </h1>
//           <p className="text-gray-600 mt-4 text-center lg:text-left text-md lg:text-base">
//             — accurate, effortless, and secure tracking.
//           </p>
//         </div>
//       </div>

//       <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
//           <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   type="checkbox"
//                   checked={formData.rememberMe}
//                   onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Remember me</label>
//               </div>
//               <a href="/forgotpassword" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        API.LOGIN,
        formData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        setTimeout(() => navigate("/teacher"), 1500);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);

        if (error.response.status === 403) {
          toast.warn("First-time login detected. Redirecting to password reset...");
          setTimeout(() => navigate("/resetpassword"), 2000);
        } else if (error.response.status === 404) {
          toast.error("Teacher not found. Please check your email.");
        } else if (error.response.status === 400) {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Request setup error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
      <ToastContainer />
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

      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="/forgotpassword" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
