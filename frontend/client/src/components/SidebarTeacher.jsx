import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("You have successfully logged out!");
    setTimeout(() => navigate("/teacher/login"), 1000);
  };

  const isActive = (href) => location.pathname === href;
  const isGroupActive = (subItems) => subItems?.some((s) => location.pathname === s.href);

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
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Faculty Portal</p>
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
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                      active
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"} />
                      {item.label}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 text-slate-500 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <ul className="mt-0.5 ml-6 pl-3 border-l border-slate-800 space-y-0.5">
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <li key={sub.href}>
                            <Link to={sub.href}>
                              <span
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 ${
                                  isActive(sub.href)
                                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                      isActive(item.href)
                        ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/40"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive(item.href) ? "text-white" : "text-slate-500 group-hover:text-slate-300"}
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
