import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TEACHER_API as API } from "../../config/api";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API.LOGIN, formData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (response.status === 200) {
        if (response.data.firstTimeLogin) {
          toast.warn("First-time login detected. Redirecting to password reset...");
          setTimeout(() => navigate("/teacher/resetpassword"), 1500);
        } else {
          toast.success("Login successful!");
          setTimeout(() => navigate("/teacher"), 1500);
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Teacher not found. Please check your email.");
        } else if (error.response.status === 400) {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ background: "#f7f8fc" }}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-[#6d4ed7] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-bold text-white text-lg border border-white/30">A</div>
            <span className="text-2xl font-bold text-white tracking-tight">Attentify</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/70 border border-white/20 uppercase tracking-widest">Faculty</span>
          </div>

          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6">
              <GraduationCap size={13} className="text-white/70" /> Faculty Portal
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight">
              Manage your classes efficiently.
            </h1>
            <p className="text-white/70 leading-relaxed text-base font-light">
              Log in to securely track attendance, generate reports, and manage your academic schedules through our professional portal.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-white/40 font-medium tracking-widest uppercase">Secure Faculty Portal</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>A</div>
            <span className="text-2xl font-bold text-[#1a1535] tracking-tight">Attentify</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1535]">Faculty Sign In</h2>
            <p className="mt-1.5 text-sm text-[#9b93be]">Welcome back. Please enter your credentials below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Email address</label>
              <input
                id="email" type="email" autoComplete="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="faculty@institution.edu"
                className="block w-full rounded-lg border border-[#ddd8f0] py-2.5 px-4 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-[#ddd8f0] py-2.5 px-4 pr-11 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b93be] hover:text-[#3b1e8a] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" id="remember-me" checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-[#ddd8f0] cursor-pointer" />
                <span className="text-sm text-[#4a4560]">Remember me</span>
              </label>
              <a href="/teacher/forgotpassword" className="text-sm font-semibold text-[#3b1e8a] hover:text-[#2d1669] transition-colors">
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 px-4 text-white font-semibold rounded-lg shadow transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
