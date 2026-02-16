import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the teacher is authenticated (e.g., by checking for a token in localStorage or a cookie)
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
