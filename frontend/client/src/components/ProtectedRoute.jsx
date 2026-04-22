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
      <div className="at-root" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div className="at-spinner" style={{margin:'0 auto 12px'}}/>
          <div style={{fontSize:12, color:'var(--ink-3)'}}>Loading...</div>
        </div>
      </div>
    );
  }

  const loginPath = loginMap[role] || loginMap.student;
  return auth ? children : <Navigate to={loginPath} replace />;
};

export default ProtectedRoute;
