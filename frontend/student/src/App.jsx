// App.jsx
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation, Navigate } from "react-router-dom";
import StudentRegister from "./Pages/StudentRegister";
import StudentRegister2 from "./Pages/StudentRegister2";
import Image from "./Pages/Image";
import VerificationPage from "./Pages/VerificationPage";
import Header from "./components/Header";
import StudentLogin from "./Pages/StudentLogin";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";
import Student from "./Pages/Student";
import StudentAttendance from "./Pages/StudentAttendance";
import StudentMedical from "./Pages/StudentMedical";
import StudentTimetable from "./Pages/StudentTimeTable";
import Footer from "./components/Footer";
import MainLoader from "./Pages/MainLoader";
import StudentProfile from "./Pages/StudentProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import "./App.css";

// Layout component with dynamic footer visibility
const Layout = ({ children }) => {
  const location = useLocation();

  const hideFooterRoutes = [
    "/studentregister",
    "/verificationpage",
    "/studentregister2",
    "/studentregister2/image",
    "/studentlogin",
    "/resetpassword",
    "/forgotpassword",
  ];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <MainLoader className="fade-out-loader" />;

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route index path="/" element={<Home />} />
        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/studentregister2" element={<StudentRegister2 />} />
        <Route path="/studentregister2/image" element={<Image />} />
        <Route path="/verificationpage" element={<VerificationPage />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentprofile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentattendance"
          element={
            <ProtectedRoute>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentmedical"
          element={
            <ProtectedRoute>
              <StudentMedical />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studenttimetable"
          element={
            <ProtectedRoute>
              <StudentTimetable />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
