"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom";
import ArrowIcon from "../assets/arrow-down-svgrepo-com.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menuItems = [
  { label: "Dashboard", href: "/teacher" },
  { label: "Time Table", href: "/timetable" },
  {
    label: "Attendance",
    subItems: [
      { label: "Take Attendance", href: "/takeattendance" },
      { label: "Edit Attendance", href: "/editattendance" },
      { label: "Generate Sheet", href: "/generatesheet" },
    ],
  },
  {
    label: "Students",
    subItems: [
      { label: "Student List", href: "/studentlist" },
      { label: "Medical Report", href: "/medicalreport" },
    ],
  },
  { label: "Classes", href: "/classes" },
  { label: "Profile", href: "/teacherprofile" },
  { label: "Logout", href: "/teacherlogin" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (label) => {
    setOpenSubMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = (e) => {
    e.preventDefault(); // STOP the Link's default navigation
    localStorage.removeItem("token"); // Remove the token from local storage
    toast.success("You have successfully logged out!");

    setTimeout(() => {
      navigate("/teacherlogin"); // Navigate manually after toast shows
    }, 1000); // Wait 2 seconds before redirect
  };

  return (
    <nav className="bgf text-black w-72 min-h-screen p-4 static top-0 left-0 hidden custom:block rounded-2xl border">
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
        {menuItems.map((item) => (
          <li key={item.label} className="mb-2">
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-blue-500 hover:text-white"
                >
                  <span>{item.label}</span>
                  <img
                    src={ArrowIcon}
                    alt="Toggle"
                    className={`transition-transform duration-300 ${
                      openSubMenus[item.label] ? "rotate-180" : ""
                    }`}
                    width={16}
                    height={16}
                  />
                </button>
                {openSubMenus[item.label] && (
                  <ul className="ml-4 mt-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href} className="mb-2">
                        <Link to={subItem.href}>
                          <span
                            className={`block p-2 rounded hover:bg-blue-500 hover:text-white ${
                              location.pathname === subItem.href
                                ? "bg-blue-500 text-white"
                                : ""
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={item.href}
                onClick={item.label === "Logout" ? handleLogout : undefined}
              >
                <span
                  className={`block p-2 rounded hover:bg-blue-500 hover:text-white ${
                    location.pathname === item.href ? "bg-blue-500 text-white" : ""
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
