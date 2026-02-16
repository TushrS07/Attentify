// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify and ToastContainer

// export default function StudentRegister() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Edge case handling
//     if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // Ensure phone number is non-negative
//     if (parseInt(formData.phone) <= 0) {
//       toast.error("Phone number must be a positive number");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/student/register`,
//         formData,
//         { withCredentials: true }
//       );

//       // Show success toast and redirect after a delay to allow the toast to appear
//       toast.success("Registration successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/VerificationPage", { state: { email: response.data.email } });
//       }, 2000); // Delay for toast to be visible before redirecting
//     } catch (error) {
//       console.error("Registration error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
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

//       <div className="flex-1 flex items-center justify-center p-6 lg:p-8 lg:mt-10 md:mt-0 sm:mt-0">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
//           <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
//             {["name", "phone", "email", "password", "confirmPassword"].map(
//               (field) => (
//                 <div key={field}>
//                   <label
//                     htmlFor={field}
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     {field.replace(/([A-Z])/g, " $1").trim()}
//                   </label>
//                   <input
//                     placeholder={field}
//                     id={field}
//                     type={
//                       field.includes("password")
//                         ? "password"
//                         : field === "email"
//                         ? "email"
//                         : "text"
//                     }
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={formData[field] || ""}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Register
//             </button>
//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/studentlogin"
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Add ToastContainer to display toasts */}
//       <ToastContainer />
//     </div>
//   );
// }
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify and ToastContainer

// export default function StudentRegister() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Edge case handling
//     if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // Ensure phone number is non-negative
//     if (parseInt(formData.phone) <= 0) {
//       toast.error("Phone number must be a positive number");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/student/register`,
//         formData,
//         { withCredentials: true }
//       );

//       // Show success toast and redirect after a delay to allow the toast to appear
//       toast.success("Registration successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/verificationpage", { state: { email: response.data.email } });
//       }, 2000); // Delay for toast to be visible before redirecting
//     } catch (error) {
//       console.error("Registration error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
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

//       <div className="flex-1 flex items-center justify-center p-6 lg:p-8 lg:mt-10 md:mt-0 sm:mt-0">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
//           <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
//             {["name", "phone", "email", "password", "confirmPassword"].map(
//               (field) => (
//                 <div key={field}>
//                   <label
//                     htmlFor={field}
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     {field.replace(/([A-Z])/g, " $1").trim()}
//                   </label>
//                   <input
//                     placeholder={field}
//                     id={field}
//                     type={
//                       field.includes("password")
//                         ? "password"
//                         : field === "email"
//                         ? "email"
//                         : "text"
//                     }
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={formData[field] || ""}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Register
//             </button>
//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/studentlogin"
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Add ToastContainer to display toasts */}
//       <ToastContainer />
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../config/api";
import "react-toastify/dist/ReactToastify.css"; // Important: import Toastify CSS

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (parseInt(formData.phone) <= 0) {
      toast.error("Phone number must be a positive number");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        API.REGISTER,
        formData,
        { withCredentials: true }
      );

      toast.success("Registration successful!", {
        autoClose: 2000, // Toast visible for 2 seconds
        onClose: () => {
          navigate("/verificationpage", { state: { email: response.data.email } });
        },
      });

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row">
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
          <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
            {["name", "phone", "email", "password", "confirmPassword"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    placeholder={field}
                    id={field}
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/studentlogin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Toast Container to show toasts */}
      <ToastContainer position="top-right" />
    </div>
  );
}
