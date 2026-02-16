import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { API_URL } from "../config/api";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [smsOtp, setSmsOtp] = useState(["", "", "", "", "", ""]);
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [smsTimer, setSmsTimer] = useState(1);
  const [emailTimer, setEmailTimer] = useState(1);
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const smsRefs = useRef([]);
  const emailRefs = useRef([]);

  useEffect(() => {
    let smsInterval;
    if (smsTimer > 0) {
      smsInterval = setInterval(() => {
        setSmsTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(smsInterval);
    }
    return () => clearInterval(smsInterval);
  }, [smsTimer]);

  useEffect(() => {
    let emailInterval;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => {
        setEmailTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(emailInterval);
    }
    return () => clearInterval(emailInterval);
  }, [emailTimer]);

  const resendSmsOtp = async () => {
    try {
      const email = Cookies.get("email");
      const phone = Cookies.get("phone");

      if (!email || !phone) {
        toast.error("Email or phone not found in cookies");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/student/sendotpphone`,
        {},
        { withCredentials: true }
      );
      if (response.data.message) {
        toast.success(response.data.message);
        setSmsTimer(1); // Reset timer
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend SMS OTP");
    }
  };

  const resendEmailOtp = async () => {
    try {
      const email = Cookies.get("email");
      if (!email) {
        toast.error("Email not found in cookies");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/student/sendotpemail`,
        {},
        { withCredentials: true }
      );
      if (response.data.message) {
        toast.success(response.data.message);
        setEmailTimer(1); // Reset timer
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend email OTP");
    }
  };

  const verifySmsOtp = async () => {
    try {
      const phoneOtp = smsOtp.join("");
      const response = await axios.post(
        `${API_URL}/api/student/verify-phone-otp`,
        { phoneOtp },
        { withCredentials: true }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setIsSmsVerified(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify SMS OTP");
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const emailOtp = emailCode.join("");
      const response = await axios.post(
        `${API_URL}/api/student/verify-email-otp`,
        { emailOtp },
        { withCredentials: true }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify Email OTP");
    }
  };

  const handleOtpChange = (index, value, type) => {
    if (!/^[0-9]?$/.test(value)) return;
    if (type === "sms") {
      const newOtp = [...smsOtp];
      newOtp[index] = value;
      setSmsOtp(newOtp);
      if (value && index < smsOtp.length - 1) {
        smsRefs.current[index + 1].focus();
      }
    } else {
      const newCode = [...emailCode];
      newCode[index] = value;
      setEmailCode(newCode);
      if (value && index < emailCode.length - 1) {
        emailRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    if (isSmsVerified && isEmailVerified) {
      // Show success toast for successful verification
      toast.success("Verification successful!");

      setTimeout(() => {
        // Perform redirection after 2 seconds
        navigate("/studentregister2");
      }, 2000); // Redirect after 2 seconds
    }
  }, [isSmsVerified, isEmailVerified, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row mt-16 custom1:mt-0">
      <div className="flex-1 p-6 lg:p-16 flex items-center">
        <div className="max-w-xl mx-auto lg:mx-20">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4 text-center lg:text-left">
            Revolutionize your
            <span className="block text-blue-700 mt-2">attendance with AI</span>
          </h1>
          <p className="text-gray-600 mt-4 text-center lg:text-left text-md lg:text-base">
            — accurate, effortless, and secure tracking.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
          <div className="mb-6">
            <div className="text-lg font-medium mb-2">Email OTP</div>
            <p className="text-gray-700 mb-4">Enter the OTP sent to your email</p>
            <div className="flex gap-2 mb-4">
              {emailCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, "email")}
                  ref={(el) => (emailRefs.current[index] = el)}
                  className="w-8 h-8 phone:w-10 phone:h-10 border border-gray-300 rounded-md text-center font-bold text-xl focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                onClick={resendEmailOtp}
                disabled={emailTimer > 0}
              >
                {emailTimer > 0
                  ? `Resend OTP (in ${emailTimer}s)`
                  : "Resend OTP"}
              </button>
              <button
                className={`px-4 py-2 ${isEmailVerified ? "bg-green-500" : "bg-blue-500"} text-white rounded-md`}
                onClick={verifyEmailOtp}
                disabled={emailTimer > 0}
              >
                {isEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-lg font-medium mb-2">SMS OTP</div>
            <p className="text-gray-700 mb-4">Enter the OTP sent to your phone</p>
            <div className="flex gap-2 mb-4">
              {smsOtp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, "sms")}
                  ref={(el) => (smsRefs.current[index] = el)}
                  className="w-8 h-8 phone:w-10 phone:h-10 border border-gray-300 rounded-md text-center font-bold text-xl focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                onClick={resendSmsOtp}
                disabled={smsTimer > 0}
              >
                {smsTimer > 0 ? `Resend OTP (in ${smsTimer}s)` : "Resend OTP"}
              </button>
              <button
                className={`px-4 py-2 ${isSmsVerified ? "bg-green-500" : "bg-blue-500"} text-white rounded-md`}
                onClick={verifySmsOtp}
                disabled={smsTimer > 0}
              >
                {isSmsVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
}
