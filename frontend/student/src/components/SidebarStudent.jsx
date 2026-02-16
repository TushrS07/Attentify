"use client";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API } from "../config/api";

const taskMenuItems = [
  { label: "Dashboard", href: "/student" },
  { label: "Time Table", href: "/studenttimetable" },
  { label: "Attendance", href: "/studentattendance" },
  { label: "Medical Report", href: "/studentmedical" },
  { label: "Profile", href: "/studentprofile" },
  { label: "Logout", href: "/studentlogin" },
];

export function SidebarStudent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API.LOGOUT, {}, {
        withCredentials: true
      });

      toast.success("You have successfully logged out!");

      setTimeout(() => {
        navigate("/studentlogin");
      }, 2000);

    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };


  return (
    <nav className="bgf text-black w-64 min-h-screen p-4 static top-0 left-0 hidden custom:block rounded-2xl border">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ul className="mt-20 text-md">
        {taskMenuItems.map((item) => (
          <li key={item.label} className="mb-2">
            {item.label === "Logout" ? (
              <button onClick={handleLogout} className="w-full text-left">
                <span
                  className={`block p-2 rounded hover:bg-blue-500 hover:text-white`}
                >
                  Logout
                </span>
              </button>
            ) : (
              <Link to={item.href}>
                <span
                  className={`block p-2 rounded hover:bg-blue-500 hover:text-white ${location.pathname === item.href ? "bg-blue-500 text-white" : ""
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
