import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaTimes, FaListOl } from "react-icons/fa";
import { FaChevronDown, FaChevronUp, FaRegUser, FaTable, FaRegEdit, FaNotesMedical    } from "react-icons/fa";
import { TbLayoutDashboard, TbLogout  } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSpreadsheet } from "react-icons/bi";


export default function Header() {
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleTaskbar = () => {
    setIsTaskbarOpen(!isTaskbarOpen);
  };

  const closeTaskbar = () => {
    setIsTaskbarOpen(false);
  };

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  // Close taskbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".taskbar") && !event.target.closest(".menu-button")) {
        closeTaskbar();
      }
    };

    if (isTaskbarOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isTaskbarOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Attentify
        </Link>

        {/* Menu Button (visible on small screens) */}
        <button className="text-5xl text-black menu-button custom:hidden" onClick={toggleTaskbar}>
          <IoReorderThreeOutline />
        </button>
      </div>

      {/* Taskbar Popup */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isTaskbarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out taskbar`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button className="text-xl text-gray-700" onClick={closeTaskbar}>
            <FaTimes />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <Link to="/teacher" className="flex items-center gap-2 justify-start text-gray-700 hover:text-blue-600">
              <TbLayoutDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/teacher/timetable" className="flex items-center gap-2 justify-start text-gray-700 hover:text-blue-600">
              <FaTable />
              Time Table
            </Link>
          </li>
          
          {/* Attendance Section */}
          <li>
            <button
              onClick={() => toggleSubMenu("attendance")}
              className="flex justify-between w-full text-gray-700 hover:text-blue-600"
            >
              Attendance {expandedMenu === "attendance" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedMenu === "attendance" && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link to="/teacher/takeattendance" className="flex items-center gap-2 justify-start text-gray-600 hover:text-blue-500">
                    <IoMdCheckmarkCircleOutline />
                    Mark Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/teacher/editattendance" className="flex items-center gap-2 justify-start text-gray-600 hover:text-blue-500">
                    <FaRegEdit  />
                    Edit Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/teacher/generatesheet" className="flex items-center gap-2 justify-start text-gray-600 hover:text-blue-500">
                    <BiSpreadsheet />
                    Generate Sheet
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Classes Section */}
          <li>
            <button
              onClick={() => toggleSubMenu("classes")}
              className="flex justify-between w-full text-gray-700 hover:text-blue-600"
            >
              Students {expandedMenu === "classes" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedMenu === "classes" && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link to="/teacher/studentlist" className="flex items-center gap-2 justify-start text-gray-600 hover:text-blue-500">
                    <FaListOl />
                    Student List
                  </Link>
                </li>
                <li>
                  <Link to="/teacher/medicalreport" className="flex items-center gap-2 justify-start text-gray-600 hover:text-blue-500">
                    <FaNotesMedical  />  
                    Medical Report
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Profile Section */}
          <li>
            <Link to="/teacher/profile" className="flex items-center gap-2 justify-start text-gray-700 hover:text-blue-600">
              <FaRegUser />
              Profile
            </Link>
          </li>

          {/* Logout Section */}
          <li>
            <Link to="/teacher/login" className="flex items-center gap-2 justify-start text-gray-700 hover:text-blue-600">
              <TbLogout />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
