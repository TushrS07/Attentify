import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, CalendarDays, ClipboardList,
  Stethoscope, UserCircle, LogOut } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/api";

const navLinks = [
  { to: "/student", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/student/timetable", label: "Time Table", Icon: CalendarDays },
  { to: "/student/attendance", label: "Attendance", Icon: ClipboardList },
  { to: "/student/medical", label: "Medical Leave", Icon: Stethoscope },
  { to: "/student/profile", label: "Profile", Icon: UserCircle },
];

export default function HeaderStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!e.target.closest(".taskbar") && !e.target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [isOpen]);

  const handleLogout = async (e) => {
    e?.preventDefault();
    setIsOpen(false);
    try {
      await axios.post(`${API_URL}/api/student/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/student/login"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100" : "bg-white shadow-sm border-b border-slate-100"
    }`}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white font-bold text-xs">A</div>
          <span className="text-lg font-bold text-slate-900 tracking-tight font-serif">Attentify</span>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full uppercase tracking-wider hidden sm:inline">Student</span>
        </Link>

        <button className="text-slate-700 menu-button custom:hidden p-1.5 rounded-md hover:bg-slate-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out taskbar overflow-y-auto border-l border-slate-100`}>
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="text-white font-bold tracking-tight">Attentify</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map(({ to, label, Icon }) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium">
              <Icon size={16} /> {label}
            </Link>
          ))}

          <div className="border-t border-slate-100 pt-3 mt-3">
            <button onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1] custom:hidden" onClick={() => setIsOpen(false)} />
      )}
    </header>
  );
}
