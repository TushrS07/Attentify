import React, { useState, Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Shared components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ToastContainer from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { I } from "./components/Icons";

// Lazy loading fallback
const Loader = () => (
  <div className="at-root" style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
    <div className="at-spinner"/>
  </div>
);

// Public pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Student auth pages
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import StudentRegister2 from "./pages/student/StudentRegister2";
import StudentVerificationPage from "./pages/student/VerificationPage";
import StudentForgotPassword from "./pages/student/ForgotPassword";
const StudentFaceCapture = lazy(() => import("./pages/student/Image"));

// Student app pages
import StudentDashboard from "./pages/student/Student";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";
import StudentMedical from "./pages/student/StudentMedical";
import StudentTimetable from "./pages/student/StudentTimeTable";

// Teacher auth pages
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherResetPassword from "./pages/teacher/ResetPassword";
import TeacherForgotPassword from "./pages/teacher/ForgotPassword";

// Teacher app pages
import TeacherDashboard from "./pages/teacher/Teacher";
const TakeAttendance = lazy(() => import("./pages/teacher/TakeAttendanceNew"));
import EditAttendance from "./pages/teacher/EditAttendance";
const GenerateSheet = lazy(() => import("./pages/teacher/GenerateSheet"));
import TeacherClasses from "./pages/teacher/Classes";
const TeacherStudentList = lazy(() => import("./pages/teacher/StudentList"));
import MedicalReport from "./pages/teacher/MedicalReport";
import TeacherTimetable from "./pages/teacher/TimeTable";
import TeacherProfile from "./pages/teacher/TeacherProfile";

// Admin auth pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/ForgotPassword";
import AdminResetPassword from "./pages/admin/ResetPassword";
import AdminVerificationPage from "./pages/admin/VerificationPage";

// Admin app pages
import AdminDashboard from "./pages/admin/AdminPage";

import "./index.css";

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="at-root" style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{textAlign:'center', maxWidth:440, padding:20}}>
            <div style={{width:52, height:52, margin:'0 auto 18px', borderRadius:'50%', background:'#FEE2E2', color:'var(--err)', display:'flex', alignItems:'center', justifyContent:'center'}}><I.alert size={26}/></div>
            <h1 className="at-serif" style={{fontSize:42, margin:'0 0 10px'}}>Something went wrong.</h1>
            <p style={{color:'var(--ink-3)', fontSize:13.5, marginBottom:20}}>We've logged the issue. Try reloading.</p>
            <button className="at-btn primary lg" onClick={() => window.location.reload()}><I.refresh size={13}/> Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppLayoutFixed = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const crumbMap = { student: 'Student', teacher: 'Faculty', admin: 'Admin console' };

  return (
    <div className="at-root">
      <div className={`at-app ${role === 'admin' ? 'admin-theme' : ''}`} style={role === 'admin' ? { background: '#0B1220' } : {}}>
        <div className={`at-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}/>
        <div className="at-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <I.menu size={18}/>
        </div>
        <Sidebar role={role} onClose={() => setSidebarOpen(false)} sidebarOpen={sidebarOpen}/>
        <div className="at-main" style={role === 'admin' ? { background: '#0F1628', color: '#E6E8EE' } : {}}>
          <Header
            crumb={crumbMap[role]}
            title=""
            style={role === 'admin' ? { background: '#0F1628', borderBottomColor: '#1C2333' } : {}}
          />
          <div className="at-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => (
  <ErrorBoundary>
    <ToastContainer />
    <Suspense fallback={<Loader />}>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Student Auth */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/register2" element={<StudentRegister2 />} />
      <Route path="/student/register2/image" element={<StudentFaceCapture />} />
      <Route path="/student/verificationpage" element={<StudentVerificationPage />} />
      <Route path="/student/forgotpassword" element={<StudentForgotPassword />} />

      {/* Student App */}
      <Route path="/student" element={<ProtectedRoute><AppLayoutFixed role="student"><StudentDashboard /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/student/attendance" element={<ProtectedRoute><AppLayoutFixed role="student"><StudentAttendance /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute><AppLayoutFixed role="student"><StudentProfile /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/student/medical" element={<ProtectedRoute><AppLayoutFixed role="student"><StudentMedical /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/student/timetable" element={<ProtectedRoute><AppLayoutFixed role="student"><StudentTimetable /></AppLayoutFixed></ProtectedRoute>} />

      {/* Teacher Auth */}
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/resetpassword" element={<TeacherResetPassword />} />
      <Route path="/teacher/forgotpassword" element={<TeacherForgotPassword />} />

      {/* Teacher App */}
      <Route path="/teacher" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TeacherDashboard /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/newattendance" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TakeAttendance /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/editattendance" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><EditAttendance /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/generatesheet" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><GenerateSheet /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/classes" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TeacherClasses /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/studentlist" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TeacherStudentList /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/medicalreport" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><MedicalReport /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/timetable" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TeacherTimetable /></AppLayoutFixed></ProtectedRoute>} />
      <Route path="/teacher/profile" element={<ProtectedRoute role="teacher"><AppLayoutFixed role="teacher"><TeacherProfile /></AppLayoutFixed></ProtectedRoute>} />

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
      <Route path="/admin/resetpassword" element={<AdminResetPassword />} />
      <Route path="/admin/verificationpage" element={<AdminVerificationPage />} />

      {/* Admin App */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AppLayoutFixed role="admin"><AdminDashboard /></AppLayoutFixed></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  </ErrorBoundary>
);

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
