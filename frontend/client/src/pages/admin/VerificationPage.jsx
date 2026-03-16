import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_API as API } from "../../config/api";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [smsOtp, setSmsOtp] = useState(["", "", "", "", "", ""]);
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [smsTimer, setSmsTimer] = useState(30);
  const [emailTimer, setEmailTimer] = useState(30);
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
    }
    return () => clearInterval(smsInterval);
  }, [smsTimer]);

  useEffect(() => {
    let emailInterval;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => {
        setEmailTimer((prevTimer) => prevTimer - 1);
      }, 1000);
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
      const response = await axios.post(API.SEND_OTP_PHONE, {}, { withCredentials: true });
      if (response.data.message) {
        toast.success(response.data.message);
        setSmsTimer(30);
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
      const response = await axios.post(API.SEND_OTP_EMAIL, {}, { withCredentials: true });
      if (response.data.message) {
        toast.success(response.data.message);
        setEmailTimer(30);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend email OTP");
    }
  };

  const verifySmsOtp = async () => {
    try {
      const phoneOtp = smsOtp.join("");
      const response = await axios.post(API.VERIFY_PHONE_OTP, { phoneOtp }, { withCredentials: true });
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
      const response = await axios.post(API.VERIFY_EMAIL_OTP, { emailOtp }, { withCredentials: true });
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
      toast.success("Verification successful!");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  }, [isSmsVerified, isEmailVerified, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">Verify Your Identity</h1>
          <p className="text-slate-500 mt-2 text-sm">Enter the OTPs sent to your email and phone.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
          {/* Email OTP */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">Email OTP</div>
            <p className="text-slate-500 text-xs mb-3">Enter the OTP sent to your email</p>
            <div className="flex gap-2 mb-3">
              {emailCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, "email")}
                  ref={(el) => (emailRefs.current[index] = el)}
                  className="w-10 h-10 border border-slate-200 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg transition-all hover:bg-slate-200 disabled:opacity-50"
                onClick={resendEmailOtp}
                disabled={emailTimer > 0}
              >
                {emailTimer > 0 ? `Resend (${emailTimer}s)` : "Resend OTP"}
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-all ${isEmailVerified ? "bg-emerald-500" : "bg-slate-900 hover:bg-slate-800"}`}
                onClick={verifyEmailOtp}
                disabled={isEmailVerified}
              >
                {isEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          {/* SMS OTP */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">SMS OTP</div>
            <p className="text-slate-500 text-xs mb-3">Enter the OTP sent to your phone</p>
            <div className="flex gap-2 mb-3">
              {smsOtp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, "sms")}
                  ref={(el) => (smsRefs.current[index] = el)}
                  className="w-10 h-10 border border-slate-200 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg transition-all hover:bg-slate-200 disabled:opacity-50"
                onClick={resendSmsOtp}
                disabled={smsTimer > 0}
              >
                {smsTimer > 0 ? `Resend (${smsTimer}s)` : "Resend OTP"}
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-all ${isSmsVerified ? "bg-emerald-500" : "bg-slate-900 hover:bg-slate-800"}`}
                onClick={verifySmsOtp}
                disabled={isSmsVerified}
              >
                {isSmsVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button onClick={() => navigate("/admin/login")}
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
