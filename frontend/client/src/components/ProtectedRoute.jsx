// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const endpointMap = {
  student: `${API_URL}/api/student/protected`,
  teacher: `${API_URL}/api/teacher/profile`,
  admin: `${API_URL}/api/admin/protected`,
};

const loginMap = {
  student: "/student/login",
  teacher: "/teacher/login",
  admin: "/admin/login",
};

const ProtectedRoute = ({ children, role = "student" }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const endpoint = endpointMap[role] || endpointMap.student;
    axios
      .get(endpoint, { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, [role]);

  if (auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#3b1e8a] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const loginPath = loginMap[role] || loginMap.student;
  return auth ? children : <Navigate to={loginPath} replace />;
};

export default ProtectedRoute;
