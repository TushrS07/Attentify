import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LayoutDashboard, CalendarDays, ClipboardCheck,
  ClipboardEdit, FileSpreadsheet, Users, FileText, BookOpen, UserCircle, LogOut } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/api";

export default function HeaderTeacher() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e?.preventDefault();
    setIsOpen(false);
    try {
      await axios.post(`${API_URL}/api/teacher/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/teacher/login"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

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

  const toggleSub = (key) => setExpandedMenu(expandedMenu === key ? null : key);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#e8e6f0]" : "bg-white shadow-sm border-b border-[#e8e6f0]"
    }`}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow"
            style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>A</div>
          <span className="text-lg font-bold text-[#1a1535] tracking-tight">Attentify</span>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#f3f0ff] text-[#3b1e8a] border border-[#d5cbfe] rounded-full uppercase tracking-wider hidden sm:inline">Faculty</span>
        </Link>

        <button className="text-[#4a4560] menu-button custom:hidden p-1.5 rounded-md hover:bg-[#f3f0ff] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`fixed top-14 right-0 h-[calc(100vh-56px)] w-72 bg-white shadow-2xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out taskbar overflow-y-auto border-l border-[#e8e6f0] z-40`}>
        <div className="flex justify-between items-center p-4 border-b border-[#e8e6f0]" style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #4e2aad 100%)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="text-white font-bold tracking-tight">Attentify</span>
          </div>
          <button className="text-white/70 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { to: "/teacher", label: "Dashboard", Icon: LayoutDashboard },
            { to: "/teacher/timetable", label: "Time Table", Icon: CalendarDays },
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-sm font-medium">
              <Icon size={16} /> {label}
            </Link>
          ))}

          {/* Attendance submenu */}
          <button onClick={() => toggleSub("attendance")}
            className="flex justify-between items-center w-full px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-sm font-medium">
            <span className="flex items-center gap-3"><ClipboardCheck size={16} /> Attendance</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${expandedMenu === "attendance" ? "rotate-180" : ""}`} />
          </button>
          {expandedMenu === "attendance" && (
            <div className="ml-7 space-y-0.5 border-l border-[#e8e6f0] pl-3">
              {[
                { to: "/teacher/takeattendance", label: "Take Attendance", Icon: ClipboardCheck },
                { to: "/teacher/editattendance", label: "Edit Attendance", Icon: ClipboardEdit },
                { to: "/teacher/generatesheet", label: "Generate Sheet", Icon: FileSpreadsheet },
              ].map(({ to, label, Icon }) => (
                <Link key={to} to={to} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-xs font-medium">
                  <Icon size={13} /> {label}
                </Link>
              ))}
            </div>
          )}

          {/* Students submenu */}
          <button onClick={() => toggleSub("students")}
            className="flex justify-between items-center w-full px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-sm font-medium">
            <span className="flex items-center gap-3"><Users size={16} /> Students</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${expandedMenu === "students" ? "rotate-180" : ""}`} />
          </button>
          {expandedMenu === "students" && (
            <div className="ml-7 space-y-0.5 border-l border-[#e8e6f0] pl-3">
              {[
                { to: "/teacher/studentlist", label: "Student List", Icon: Users },
                { to: "/teacher/medicalreport", label: "Medical Report", Icon: FileText },
              ].map(({ to, label, Icon }) => (
                <Link key={to} to={to} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-xs font-medium">
                  <Icon size={13} /> {label}
                </Link>
              ))}
            </div>
          )}

          {[
            { to: "/teacher/classes", label: "Classes", Icon: BookOpen },
            { to: "/teacher/profile", label: "Profile", Icon: UserCircle },
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a] transition-colors text-sm font-medium">
              <Icon size={16} /> {label}
            </Link>
          ))}

          <div className="border-t border-[#e8e6f0] pt-3 mt-3">
            <button onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1a1535]/20 backdrop-blur-sm z-30 custom:hidden" onClick={() => setIsOpen(false)} />
      )}
    </header>
  );
}
