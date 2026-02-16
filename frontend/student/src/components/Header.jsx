"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { TbLayoutDashboard, TbLogout } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSpreadsheet } from "react-icons/bi";
import { FaRegUser, FaTable } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/api";

export default function Header() {
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();

  const toggleTaskbar = () => setIsTaskbarOpen((s) => !s);
  const closeTaskbar = () => setIsTaskbarOpen(false);

  const handleLogout = async (e) => {
    e?.preventDefault();
    closeTaskbar();
    try {
      await axios.post(
        `${API_URL}/api/student/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      // navigate immediately or after a short delay so user sees the toast
      setTimeout(() => navigate("/studentlogin"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".taskbar") && !event.target.closest(".menu-button")) {
        closeTaskbar();
      }
    };

    if (isTaskbarOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isTaskbarOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">Attendify</Link>

        <button
          className="text-5xl text-black menu-button custom:hidden"
          onClick={toggleTaskbar}
          aria-expanded={isTaskbarOpen}
          aria-controls="mobile-taskbar"
        >
          <IoReorderThreeOutline />
        </button>
      </div>

      <div
        id="mobile-taskbar"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isTaskbarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out taskbar`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button className="text-xl text-gray-700" onClick={closeTaskbar} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li>
            <Link onClick={closeTaskbar} to="/student" className="flex items-center gap-2">
              <TbLayoutDashboard /> Dashboard
            </Link>
          </li>

          <li>
            <Link onClick={closeTaskbar} to="/studenttimetable" className="flex items-center gap-2">
              <FaTable /> Time Table
            </Link>
          </li>

          <li>
            <Link onClick={closeTaskbar} to="/studentattendance" className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline /> Attendance
            </Link>
          </li>

          <li>
            <Link onClick={closeTaskbar} to="/studentmedical" className="flex items-center gap-2">
              <BiSpreadsheet /> Medical Report
            </Link>
          </li>

          <li>
            <Link onClick={closeTaskbar} to="/studentprofile" className="flex items-center gap-2">
              <FaRegUser /> Profile
            </Link>
          </li>

          {/* Logout as a button so it doesn't navigate prematurely */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-blue-600"
            >
              <TbLogout /> Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
