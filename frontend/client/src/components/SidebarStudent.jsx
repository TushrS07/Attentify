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
      navigate("/student/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="hidden custom:flex flex-col bg-white border-r border-[#e8e6f0] w-64 min-h-screen shadow-sm z-10 pt-14">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#e8e6f0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
            style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
            A
          </div>
          <div>
            <h2 className="text-[15px] font-bold tracking-tight text-[#1a1535]">Attentify</h2>
            <p className="text-[10px] text-[#9b93be] uppercase tracking-widest font-semibold">Student Portal</p>
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                    active
                      ? "bg-[#f3f0ff] text-[#3b1e8a] font-semibold"
                      : "text-[#4a4560] hover:bg-[#f7f5ff] hover:text-[#3b1e8a]"
                  }`}
                >
                  <Icon
                    size={16}
                    className={active ? "text-[#3b1e8a]" : "text-[#9b93be]"}
                  />
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-[#e8e6f0] pt-4">
        <button onClick={handleLogout} className="w-full">
          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-red-50 hover:text-red-600 transition-all duration-150 text-sm font-medium">
            <LogOut size={16} className="text-[#9b93be]" />
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
