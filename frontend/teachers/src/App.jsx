// import React, { useEffect, useState } from "react";
// import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

// import Teacher from "./Pages/Teacher";
// import TeacherLogin from "./Pages/TeacherLogin";
// import VerificationPage from "./Pages/VerificationPage";
// import Header from "./components/Header";
// import ResetPassword from "./Pages/ResetPassword";
// import GenerateSheet from "./Pages/GenerateSheet";
// import TimeTable from "./Pages/TimeTable";
// import TakeAttendance from "./Pages/TakeAttendance";
// import AttendanceNew from "./pages/TakeAttendanceNew";
// import EditAttendance from "./Pages/EditAttendance";
// import Classes from "./Pages/Classes";
// import NotFound from "./Pages/NotFound";
// import Footer from "./components/Footer";
// import MainLoader from "./Pages/MainLoader";
// import TeacherProfile from "./Pages/TeacherProfile";
// import ForgotPassword from "./Pages/ForgotPassword";
// import MedicalLeavePage from "./pages/MedicalReport";
// import StudentList from "./pages/StudentList";

// import "./App.css";

// // Layout component with dynamic footer visibility
// const Layout = ({ children }) => {
//   const location = useLocation();

//   const hideFooterRoutes = [
//     "/teacherlogin",
//     "/verificationpage",
//     "/resetpassword",
//     "/forgotpassword",
//   ];

//   const hideFooter = hideFooterRoutes.includes(location.pathname);

//   return (
//     <>
//       <Header />
//       {children}
//       {!hideFooter && <Footer />}
//     </>
//   );
// };

// const AppContent = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 2000);
//   }, []);

//   if (loading) return <MainLoader className="fade-out-loader" />;

//   return (
//   <Layout>
//     <Routes>
        
//       {/* Registration & Authentication Teacher*/}
//       <Route path="/" element={<TeacherLogin />} />
//       {/* <Route path="/verificationpage" element={<VerificationPage />} /> */}
      
//       <Route path="/forgotpassword" element={<ForgotPassword />} />
//       <Route path="/resetpassword" element={<ResetPassword />} />
  
//       {/* Teacher Pages */}
//       <Route path="/teacher" element={<Teacher />} />
//       <Route path="/teacherprofile" element={<TeacherProfile />} />

//       {/* <Route path="/studentlist" element={<StudentList />} /> */}
//       <Route path="/generatesheet" element={<GenerateSheet />} />
//       <Route path="/timetable" element={<TimeTable />} />
//       <Route path="/takeattendance" element={<TakeAttendance />} />
//       <Route path="/newattendance" element={<AttendanceNew/>} />
//       <Route path="/editattendance" element={<EditAttendance />} />
//       <Route path="/classes" element={<Classes />} />
//       <Route path="/medicalreport" element={<MedicalLeavePage />} />
//       <Route path="/studentlist" element={<StudentList />} />
  
//       {/* Fallback */}
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   </Layout>
  
//   );
// };

// const App = () => (
//   <Router>
//     <AppContent />
//   </Router>
// );

// export default App;

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import Teacher from "./Pages/Teacher";
import TeacherLogin from "./Pages/TeacherLogin";
import VerificationPage from "./Pages/VerificationPage";
import Header from "./components/Header";
import ResetPassword from "./Pages/ResetPassword";
import GenerateSheet from "./Pages/GenerateSheet";
import TimeTable from "./Pages/TimeTable";
import TakeAttendance from "./Pages/TakeAttendance";
import AttendanceNew from "./pages/TakeAttendanceNew";
import EditAttendance from "./Pages/EditAttendance";
import Classes from "./Pages/Classes";
import NotFound from "./Pages/NotFound";
import Footer from "./components/Footer";
import MainLoader from "./Pages/MainLoader";
import TeacherProfile from "./Pages/TeacherProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import MedicalLeavePage from "./pages/MedicalReport";
import StudentList from "./pages/StudentList";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

// Layout component with dynamic footer visibility
const Layout = ({ children }) => {
  const location = useLocation();

  const hideFooterRoutes = [
    "/teacherlogin",
    "/verificationpage",
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
        {/* Registration & Authentication Teacher */}
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        
        {/* Protected Routes for Teacher */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <Teacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherprofile"
          element={
            <ProtectedRoute>
              <TeacherProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generatesheet"
          element={
            <ProtectedRoute>
              <GenerateSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <TimeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/takeattendance"
          element={
            <ProtectedRoute>
              <TakeAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newattendance"
          element={
            <ProtectedRoute>
              <AttendanceNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editattendance"
          element={
            <ProtectedRoute>
              <EditAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicalreport"
          element={
            <ProtectedRoute>
              <MedicalLeavePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentlist"
          element={
            <ProtectedRoute>
              <StudentList />
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
