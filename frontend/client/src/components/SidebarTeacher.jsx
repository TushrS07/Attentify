import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TEACHER_API as API } from "../config/api";
import {
  LayoutDashboard, CalendarDays, ClipboardCheck, ClipboardEdit,
  FileSpreadsheet, Users, FileText, BookOpen, UserCircle,
  LogOut, ChevronDown
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { label: "Time Table", href: "/teacher/timetable", icon: CalendarDays },
  {
    label: "Attendance",
    icon: ClipboardCheck,
    subItems: [
      { label: "Take Attendance", href: "/teacher/takeattendance", icon: ClipboardCheck },
      { label: "Edit Attendance", href: "/teacher/editattendance", icon: ClipboardEdit },
      { label: "Generate Sheet", href: "/teacher/generatesheet", icon: FileSpreadsheet },
    ],
  },
  {
    label: "Students",
    icon: Users,
    subItems: [
      { label: "Student List", href: "/teacher/studentlist", icon: Users },
      { label: "Medical Report", href: "/teacher/medicalreport", icon: FileText },
    ],
  },
  { label: "Classes", href: "/teacher/classes", icon: BookOpen },
  { label: "Profile", href: "/teacher/profile", icon: UserCircle },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (label) => {
    setOpenSubMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API.LOGOUT, {}, { withCredentials: true });
      toast.success("You have successfully logged out!");
      navigate("/teacher/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  const isActive = (href) => location.pathname === href;
  const isGroupActive = (subItems) => subItems?.some((s) => location.pathname === s.href);

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
            <p className="text-[10px] text-[#9b93be] uppercase tracking-widest font-semibold">Faculty Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex-1 px-3 py-4 space-y-0.5 text-sm font-medium overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.href ? isActive(item.href) : isGroupActive(item.subItems);
          const open = openSubMenus[item.label];

          return (
            <li key={item.label}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-150 ${
                      active
                        ? "bg-[#f3f0ff] text-[#3b1e8a] font-semibold"
                        : "text-[#4a4560] hover:bg-[#f7f5ff] hover:text-[#3b1e8a]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={active ? "text-[#3b1e8a]" : "text-[#9b93be]"} />
                      {item.label}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${active ? "text-[#3b1e8a]" : "text-[#9b93be]"} ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <ul className="mt-0.5 ml-6 pl-3 border-l border-[#e8e6f0] space-y-0.5">
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <li key={sub.href}>
                            <Link to={sub.href}>
                              <span
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 ${
                                  isActive(sub.href)
                                    ? "bg-[#3b1e8a] text-white font-semibold shadow-sm"
                                    : "text-[#4a4560] hover:bg-[#f3f0ff] hover:text-[#3b1e8a]"
                                }`}
                              >
                                <SubIcon size={13} />
                                {sub.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={item.href}>
                  <span
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                      isActive(item.href)
                        ? "bg-[#f3f0ff] text-[#3b1e8a] font-semibold"
                        : "text-[#4a4560] hover:bg-[#f7f5ff] hover:text-[#3b1e8a]"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive(item.href) ? "text-[#3b1e8a]" : "text-[#9b93be]"}
                    />
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Logout at bottom */}
      <div className="px-3 pb-5 border-t border-[#e8e6f0] pt-4">
        <button onClick={handleLogout} className="w-full">
          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#4a4560] hover:bg-red-50 hover:text-red-600 transition-all duration-150 text-sm font-medium">
            <LogOut size={16} className="text-[#9b93be] group-hover:text-red-500" />
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
