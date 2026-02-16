// API Configuration - reads from environment variables
// In development, uses defaults. In production, set VITE_* env vars

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const FACE_RECOGNITION_URL = import.meta.env.VITE_FACE_RECOGNITION_URL || 'http://localhost:5006';

// API Endpoints
export const API = {
  // Auth
  LOGIN: `${API_URL}/api/teacher/login`,
  LOGOUT: `${API_URL}/api/teacher/logout`,
  FORGOT_PASSWORD: `${API_URL}/api/teacher/forgot-password`,
  RESET_PASSWORD: `${API_URL}/api/teacher/reset-password`,
  
  // Profile
  PROFILE: `${API_URL}/api/teacher/profile`,
  SUBJECTS: `${API_URL}/api/teacher/subjects`,
  
  // Students
  ALL_STUDENTS: `${API_URL}/api/teacher/allstudents`,
  
  // Attendance
  START_SESSION: `${API_URL}/api/attendance/start-session`,
  RECORD_ATTENDANCE: `${API_URL}/api/attendance/record`,
  GET_ATTENDANCE: `${API_URL}/api/attendance/records`,
  
  // Face Recognition (Python service)
  RECOGNIZE_FACE: `${FACE_RECOGNITION_URL}/recognize`,
  SYNC_FACES: `${FACE_RECOGNITION_URL}/sync-faces`,
  
  // Student verification (used in teacher verification page)
  SEND_OTP_PHONE: `${API_URL}/api/student/sendotpphone`,
  SEND_OTP_EMAIL: `${API_URL}/api/student/sendotpemail`,
  VERIFY_PHONE_OTP: `${API_URL}/api/student/verify-phone-otp`,
  VERIFY_EMAIL_OTP: `${API_URL}/api/student/verify-email-otp`,
};

export default API;
