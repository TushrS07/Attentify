// API Configuration - reads from environment variables
// In development, uses defaults. In production, set VITE_* env vars

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const FACE_RECOGNITION_URL = import.meta.env.VITE_FACE_RECOGNITION_URL || 'http://localhost:5006';

// Reusable function to create role-specific API endpoints
function createApiConfig(role) {
  return {
    LOGIN: `${API_URL}/api/${role}/login`,
    LOGOUT: `${API_URL}/api/${role}/logout`,
    FORGOT_PASSWORD: `${API_URL}/api/${role}/forgot-password`,
    RESET_PASSWORD: `${API_URL}/api/${role}/reset-password`,
    SEND_OTP_PHONE: `${API_URL}/api/${role}/sendotpphone`,
    SEND_OTP_EMAIL: `${API_URL}/api/${role}/sendotpemail`,
    VERIFY_PHONE_OTP: `${API_URL}/api/${role}/verify-phone-otp`,
    VERIFY_EMAIL_OTP: `${API_URL}/api/${role}/verify-email-otp`,
  };
}

export const ADMIN_API = {
  ...createApiConfig('admin'),
  GENERATE_CREDENTIALS: `${API_URL}/api/admin/generatecredentials`,
};

export const STUDENT_API = {
  ...createApiConfig('student'),
  REGISTER: `${API_URL}/api/student/register`,
  PROTECTED: `${API_URL}/api/student/protected`,
  DETAILS: `${API_URL}/api/student/details`,
  UPLOAD_IMAGE: `${API_URL}/api/student/upload-image`,
  RECOGNIZE_FACE: `${FACE_RECOGNITION_URL}/recognize`,
};

export const TEACHER_API = {
  ...createApiConfig('teacher'),
  PROFILE: `${API_URL}/api/teacher/profile`,
  SUBJECTS: `${API_URL}/api/teacher/subjects`,
  ALL_STUDENTS: `${API_URL}/api/teacher/allstudents`,
  START_SESSION: `${API_URL}/api/attendance/start-session`,
  RECORD_ATTENDANCE: `${API_URL}/api/attendance/record`,
  GET_ATTENDANCE: `${API_URL}/api/attendance/records`,
  RECOGNIZE_FACE: `${FACE_RECOGNITION_URL}/recognize`,
  SYNC_FACES: `${FACE_RECOGNITION_URL}/sync-faces`,
};
