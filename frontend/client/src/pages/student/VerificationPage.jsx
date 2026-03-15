import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config/api";
import { ShieldCheck, Mail, Smartphone, RefreshCw } from "lucide-react";

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
    let i;
    if (smsTimer > 0) i = setInterval(() => setSmsTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [smsTimer]);

  useEffect(() => {
    let i;
    if (emailTimer > 0) i = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [emailTimer]);

  const resendSmsOtp = async () => {
    try {
      const email = Cookies.get("email");
      const phone = Cookies.get("phone");
      if (!email || !phone) { toast.error("Email or phone not found in cookies"); return; }
      const res = await axios.post(`${API_URL}/api/student/sendotpphone`, {}, { withCredentials: true });
      if (res.data.message) { toast.success(res.data.message); setSmsTimer(1); }
    } catch { toast.error("Failed to resend SMS OTP"); }
  };

  const resendEmailOtp = async () => {
    try {
      const email = Cookies.get("email");
      if (!email) { toast.error("Email not found in cookies"); return; }
      const res = await axios.post(`${API_URL}/api/student/sendotpemail`, {}, { withCredentials: true });
      if (res.data.message) { toast.success(res.data.message); setEmailTimer(1); }
    } catch { toast.error("Failed to resend email OTP"); }
  };

  const verifySmsOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/student/verify-phone-otp`, { phoneOtp: smsOtp.join("") }, { withCredentials: true });
      if (res.data.message) { toast.success(res.data.message); setIsSmsVerified(true); }
    } catch { toast.error("Failed to verify SMS OTP"); }
  };

  const verifyEmailOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/student/verify-email-otp`, { emailOtp: emailCode.join("") }, { withCredentials: true });
      if (res.data.message) { toast.success(res.data.message); setIsEmailVerified(true); }
    } catch { toast.error("Failed to verify Email OTP"); }
  };

  const handleOtpChange = (index, value, type) => {
    if (!/^[0-9]?$/.test(value)) return;
    if (type === "sms") {
      const n = [...smsOtp]; n[index] = value; setSmsOtp(n);
      if (value && index < 5) smsRefs.current[index + 1]?.focus();
    } else {
      const n = [...emailCode]; n[index] = value; setEmailCode(n);
      if (value && index < 5) emailRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e, type) => {
    if (e.key === "Backspace") {
      const arr = type === "sms" ? smsOtp : emailCode;
      if (!arr[index] && index > 0) {
        (type === "sms" ? smsRefs : emailRefs).current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (isSmsVerified && isEmailVerified) {
      toast.success("Verification successful!");
      setTimeout(() => navigate("/student/register2"), 2000);
    }
  }, [isSmsVerified, isEmailVerified, navigate]);

  const OtpGroup = ({ digits, refs, onChange, timer, onResend, onVerify, isVerified, label, Icon }) => (
    <div className={`p-5 rounded-xl border ${isVerified ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"} transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isVerified ? "bg-emerald-100" : "bg-blue-100"}`}>
            <Icon size={15} className={isVerified ? "text-emerald-600" : "text-blue-600"} />
          </div>
          <span className="font-semibold text-slate-800 text-sm">{label}</span>
        </div>
        {isVerified && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            <ShieldCheck size={12} /> Verified
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-4 justify-center">
        {digits.map((digit, i) => (
          <input
            key={i} type="text" maxLength="1" value={digit}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e, label === "SMS Code" ? "sms" : "email")}
            ref={(el) => (refs.current[i] = el)}
            className={`otp-box ${digit ? "filled" : ""}`}
            disabled={isVerified}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={onResend} disabled={timer > 0}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white">
          <RefreshCw size={12} />
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </button>
        <button onClick={onVerify} disabled={isVerified || digits.some(d => !d)}
          className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            isVerified
              ? "bg-emerald-500 text-white cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          }`}>
          {isVerified ? "✓ Verified" : "Verify"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex font-sans text-slate-900">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-blue-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg border border-blue-500/40">A</div>
            <span className="text-2xl font-bold text-white tracking-tight font-serif">Attentify</span>
          </div>

          <div className="w-14 h-14 bg-blue-800/60 border border-blue-700/60 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="text-blue-300" size={28} />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight font-serif">
            Verify your identity.
          </h1>
          <p className="text-blue-200/80 leading-relaxed text-base font-light">
            We've sent 6-digit verification codes to your registered phone number and email address.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-blue-500 font-medium tracking-widest uppercase">Two-Factor Verification</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 lg:px-16 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center font-bold text-white text-sm">A</div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-serif">Attentify</span>
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Account Verification</h2>
            <p className="mt-1.5 text-sm text-slate-500">Enter the OTP codes sent to your phone and email.</p>
          </div>

          <div className="space-y-4">
            <OtpGroup
              digits={emailCode} refs={emailRefs}
              onChange={(i, v) => handleOtpChange(i, v, "email")}
              timer={emailTimer} onResend={resendEmailOtp}
              onVerify={verifyEmailOtp} isVerified={isEmailVerified}
              label="Email Code" Icon={Mail}
            />
            <OtpGroup
              digits={smsOtp} refs={smsRefs}
              onChange={(i, v) => handleOtpChange(i, v, "sms")}
              timer={smsTimer} onResend={resendSmsOtp}
              onVerify={verifySmsOtp} isVerified={isSmsVerified}
              label="SMS Code" Icon={Smartphone}
            />
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Both codes must be verified to continue registration.
          </p>
        </div>
      </div>
    </div>
  );
}
