// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/student/protected`, { 
      withCredentials: true 
    })
    .then(() => setAuth(true))
    .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/student/login" replace />;
};

export default ProtectedRoute;
