// API Configuration - reads from environment variables
// In development, uses defaults. In production, set VITE_* env vars

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const FACE_RECOGNITION_URL = import.meta.env.VITE_FACE_RECOGNITION_URL || 'http://localhost:5006';

// API Endpoints
export const API = {
  // Auth
  LOGIN: `${API_URL}/api/student/login`,
  LOGOUT: `${API_URL}/api/student/logout`,
  
  // OTP
  SEND_OTP_PHONE: `${API_URL}/api/student/sendotpphone`,
  SEND_OTP_EMAIL: `${API_URL}/api/student/sendotpemail`,
  VERIFY_PHONE_OTP: `${API_URL}/api/student/verify-phone-otp`,
  VERIFY_EMAIL_OTP: `${API_URL}/api/student/verify-email-otp`,
  
  // Admin
  GENERATE_CREDENTIALS: `${API_URL}/api/admin/generatecredentials`,
  
  // Password
  FORGOT_PASSWORD: `${API_URL}/api/teacher/forgot-password`,
  RESET_PASSWORD: `${API_URL}/api/teacher/reset-password`,
};

export default API;
