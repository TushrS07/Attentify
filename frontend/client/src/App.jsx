import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ---- Student Pages ----
import StudentRegister from "./pages/student/StudentRegister";
import StudentRegister2 from "./pages/student/StudentRegister2";
import Image from "./pages/student/Image";
import StudentVerificationPage from "./pages/student/VerificationPage";
import StudentLogin from "./pages/student/StudentLogin";
import StudentResetPassword from "./pages/student/ResetPassword";
import StudentForgotPassword from "./pages/student/ForgotPassword";
import StudentDashboard from "./pages/student/Student";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentMedical from "./pages/student/StudentMedical";
import StudentTimetable from "./pages/student/StudentTimeTable";
import StudentProfile from "./pages/student/StudentProfile";
import Home from "./pages/student/Home";

// ---- Teacher Pages ----
import TeacherDashboard from "./pages/teacher/Teacher";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherResetPassword from "./pages/teacher/ResetPassword";
import TeacherForgotPassword from "./pages/teacher/ForgotPassword";
import GenerateSheet from "./pages/teacher/GenerateSheet";
import TeacherTimeTable from "./pages/teacher/TimeTable";
import TakeAttendance from "./pages/teacher/TakeAttendance";
import TakeAttendanceNew from "./pages/teacher/TakeAttendanceNew";
import EditAttendance from "./pages/teacher/EditAttendance";
import Classes from "./pages/teacher/Classes";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import MedicalReport from "./pages/teacher/MedicalReport";
import StudentList from "./pages/teacher/StudentList";

// ---- Admin Pages ----
import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/ForgotPassword";
import AdminResetPassword from "./pages/admin/ResetPassword";
import AdminVerificationPage from "./pages/admin/VerificationPage";

// ---- Shared Components ----
import NotFound from "./pages/student/NotFound";
import MainLoader from "./pages/student/MainLoader";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// ---- Headers ----
import HeaderStudent from "./components/HeaderStudent";
import HeaderTeacher from "./components/HeaderTeacher";
import HeaderAdmin from "./components/HeaderAdmin";

import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const isTeacher = path.startsWith("/teacher");
  const isAdmin = path.startsWith("/admin");
  const isStudentRoute = path.startsWith("/student");
  // The home route or generic routes default to student header for now
  const isStudent = isStudentRoute || (!isTeacher && !isAdmin);

  const publicRoutes = [
    "/login",
    "/verificationpage",
    "/resetpassword",
    "/forgotpassword",
    "/register",
  ];

  const isPublicRoute = publicRoutes.some((route) => path.includes(route)) || path === "/";

  return (
    <>
      {!isPublicRoute && isTeacher && <HeaderTeacher />}
      {!isPublicRoute && isAdmin && <HeaderAdmin />}
      {!isPublicRoute && isStudent && <HeaderStudent />}
      
      {children}
      
      {!isPublicRoute && <Footer />}
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
        {/* ================= STUDENT ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/register2" element={<StudentRegister2 />} />
        <Route path="/student/register2/image" element={<Image />} />
        <Route path="/student/verificationpage" element={<StudentVerificationPage />} />
        <Route path="/student/forgotpassword" element={<StudentForgotPassword />} />
        <Route path="/student/resetpassword" element={<StudentResetPassword />} />
        
        <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/attendance" element={<ProtectedRoute><StudentAttendance /></ProtectedRoute>} />
        <Route path="/student/medical" element={<ProtectedRoute><StudentMedical /></ProtectedRoute>} />
        <Route path="/student/timetable" element={<ProtectedRoute><StudentTimetable /></ProtectedRoute>} />

        {/* ================= TEACHER ROUTES ================= */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/forgotpassword" element={<TeacherForgotPassword />} />
        <Route path="/teacher/resetpassword" element={<TeacherResetPassword />} />

        <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/profile" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />
        <Route path="/teacher/generatesheet" element={<ProtectedRoute><GenerateSheet /></ProtectedRoute>} />
        <Route path="/teacher/timetable" element={<ProtectedRoute><TeacherTimeTable /></ProtectedRoute>} />
        <Route path="/teacher/takeattendance" element={<ProtectedRoute><TakeAttendance /></ProtectedRoute>} />
        <Route path="/teacher/newattendance" element={<ProtectedRoute><TakeAttendanceNew /></ProtectedRoute>} />
        <Route path="/teacher/editattendance" element={<ProtectedRoute><EditAttendance /></ProtectedRoute>} />
        <Route path="/teacher/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
        <Route path="/teacher/medicalreport" element={<ProtectedRoute><MedicalReport /></ProtectedRoute>} />
        <Route path="/teacher/studentlist" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
        <Route path="/admin/resetpassword" element={<AdminResetPassword />} />
        <Route path="/admin/verificationpage" element={<AdminVerificationPage />} />
        
        <Route path="/admin" element={<AdminPage />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<NotFound />} />
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
