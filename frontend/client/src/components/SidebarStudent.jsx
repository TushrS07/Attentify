
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { STUDENT_API as API } from "../config/api";

const taskMenuItems = [
  { label: "Dashboard", href: "/student" },
  { label: "Time Table", href: "/student/timetable" },
  { label: "Attendance", href: "/student/attendance" },
  { label: "Medical Report", href: "/student/medical" },
  { label: "Profile", href: "/student/profile" },
  { label: "Logout", href: "/student/login" },
];

export function SidebarStudent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API.LOGOUT, {}, {
        withCredentials: true
      });

      toast.success("You have successfully logged out!");

      setTimeout(() => {
        navigate("/student/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };


  return (
    <nav className="bg-slate-900 text-slate-200 w-64 min-h-screen p-4 static top-0 left-0 hidden custom:block shadow-lg">
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
        <p className="text-xs text-slate-400 mt-1">Student Portal</p>
      </div>
      <ul className="text-sm font-medium">
        {taskMenuItems.map((item) => (
          <li key={item.label} className="mb-1">
            {item.label === "Logout" ? (
              <button onClick={handleLogout} className="w-full text-left mt-8">
                <span
                  className={`block px-4 py-2.5 rounded-md transition-colors hover:bg-slate-800 hover:text-white text-slate-300`}
                >
                  Logout
                </span>
              </button>
            ) : (
              <Link to={item.href}>
                <span
                  className={`block px-4 py-2.5 rounded-md transition-colors ${location.pathname === item.href ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
