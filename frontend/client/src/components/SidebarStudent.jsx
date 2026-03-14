import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { STUDENT_API as API } from "../config/api";
import {
  LayoutDashboard, CalendarDays, ClipboardList,
  Stethoscope, UserCircle, LogOut
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Time Table", href: "/student/timetable", icon: CalendarDays },
  { label: "Attendance", href: "/student/attendance", icon: ClipboardList },
  { label: "Medical Leave", href: "/student/medical", icon: Stethoscope },
  { label: "Profile", href: "/student/profile", icon: UserCircle },
];

export function SidebarStudent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API.LOGOUT, {}, { withCredentials: true });
      toast.success("You have successfully logged out!");
      setTimeout(() => navigate("/student/login"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-slate-900 text-slate-200 w-64 min-h-screen flex flex-col static top-0 left-0 hidden custom:flex shadow-xl z-10 border-r border-slate-800">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-900/40">
            A
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-white">Attentify</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex-1 px-3 py-4 space-y-0.5 text-sm font-medium">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.label}>
              <Link to={item.href}>
                <span
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                    active
                      ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Icon
                    size={16}
                    className={active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}
                  />
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-slate-800 pt-4">
        <button onClick={handleLogout} className="w-full">
          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all duration-150 text-sm font-medium group">
            <LogOut size={16} className="text-slate-500 group-hover:text-red-400" />
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
