import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TEACHER_API as API } from "../../config/api";
import { KeyRound, Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ new: false, confirm: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.newPassword.length < 8) { toast.error("Password must be at least 8 characters long."); setLoading(false); return; }
    if (formData.newPassword !== formData.confirmPassword) { toast.error("Passwords do not match."); setLoading(false); return; }
    try {
      const response = await axios.post(API.FORGOT_PASSWORD, { newPassword: formData.newPassword }, { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message || "Password updated successfully!");
        setTimeout(() => navigate("/teacher/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Please try again later.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-4 py-16">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f3f0ff] rounded-xl mb-4">
            <KeyRound size={22} className="text-[#3b1e8a]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a1535]">Forgot Password?</h1>
          <p className="text-[#4a4560] mt-2 text-sm">Enter a new password for your faculty account.</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e8e6f0] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "New Password", field: "new", placeholder: "Minimum 8 characters", key: "newPassword" },
              { label: "Confirm New Password", field: "confirm", placeholder: "Repeat your new password", key: "confirmPassword" }
            ].map(({ label, field, placeholder, key }) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-[#1a1535] mb-1.5">{label}</label>
                <div className="relative">
                  <input type={show[field] ? "text" : "password"} value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required placeholder={placeholder}
                    className="block w-full rounded-lg border border-[#e8e6f0] py-2.5 px-4 pr-11 text-[#1a1535] text-sm placeholder:text-[#9b93be] focus:ring-2 focus:ring-[#3b1e8a] focus:border-[#3b1e8a] transition-all bg-[#f7f8fc] focus:bg-white outline-none" />
                  <button type="button" onClick={() => setShow(s => ({ ...s, [field]: !s[field] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b93be] hover:text-[#3b1e8a] transition-colors">
                    {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-white font-semibold rounded-lg transition-all text-sm disabled:opacity-70 mt-2"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
              {loading ? "Updating..." : "Set New Password"}
            </button>
          </form>
          <div className="mt-5 text-center">
            <button onClick={() => navigate("/teacher/login")}
              className="text-sm text-[#4a4560] hover:text-[#3b1e8a] transition-colors">← Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
