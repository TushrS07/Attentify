
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom";
import ArrowIcon from "../assets/arrow-down-svgrepo-com.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menuItems = [
  { label: "Dashboard", href: "/teacher" },
  { label: "Time Table", href: "/teacher/timetable" },
  {
    label: "Attendance",
    subItems: [
      { label: "Take Attendance", href: "/teacher/takeattendance" },
      { label: "Edit Attendance", href: "/teacher/editattendance" },
      { label: "Generate Sheet", href: "/teacher/generatesheet" },
    ],
  },
  {
    label: "Students",
    subItems: [
      { label: "Student List", href: "/teacher/studentlist" },
      { label: "Medical Report", href: "/teacher/medicalreport" },
    ],
  },
  { label: "Classes", href: "/teacher/classes" },
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
    <nav className="bg-slate-900 text-slate-200 w-64 min-h-screen p-4 static top-0 left-0 hidden custom:block shadow-lg z-10">
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
      <div className="mt-8 mb-10 px-4">
        <h2 className="text-xl font-bold tracking-tight text-white">Attentify</h2>
        <p className="text-xs text-slate-400 mt-1">Faculty Portal</p>
      </div>
      <ul className="text-sm font-medium">
        {menuItems.map((item) => (
          <li key={item.label} className="mb-1">
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-slate-800 hover:text-white text-slate-300"
                >
                  <span>{item.label}</span>
                  <img
                    src={ArrowIcon}
                    alt="Toggle"
                    className={`transition-transform duration-300 invert opacity-70 ${
                      openSubMenus[item.label] ? "rotate-180" : ""
                    }`}
                    width={12}
                    height={12}
                  />
                </button>
                {openSubMenus[item.label] && (
                  <ul className="ml-4 mt-1 border-l border-slate-700 pl-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href} className="mb-1">
                        <Link to={subItem.href}>
                          <span
                            className={`block px-4 py-2 rounded-md transition-colors text-xs ${
                              location.pathname === subItem.href
                                ? "bg-blue-600 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
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
                className={item.label === "Logout" ? "block mt-8" : "block"}
              >
                <span
                  className={`block px-4 py-2.5 rounded-md transition-colors ${
                    location.pathname === item.href ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
