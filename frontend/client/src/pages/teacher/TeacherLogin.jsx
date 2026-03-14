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
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        setTimeout(() => navigate("/teacher"), 1500);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.warn("First-time login detected. Redirecting to password reset...");
          setTimeout(() => navigate("/teacher/resetpassword"), 2000);
        } else if (error.response.status === 404) {
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
    <div className="min-h-screen flex font-sans text-slate-900 selection:bg-blue-200">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-900 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-slate-700 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-900/50 border border-blue-600/40">A</div>
            <span className="text-2xl font-bold text-white tracking-tight font-serif">Attentify</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-widest">Faculty</span>
          </div>

          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/70 border border-slate-700 text-slate-400 text-xs font-medium mb-6">
              <GraduationCap size={13} className="text-blue-400" /> Faculty Portal
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight font-serif">
              Manage your classes efficiently.
            </h1>
            <p className="text-slate-400 leading-relaxed text-base font-light">
              Log in to securely track attendance, generate reports, and manage your academic schedules through our professional portal.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-1 bg-slate-700 rounded-full" />
            <div className="h-1 w-8 bg-slate-500 rounded-full" />
            <div className="h-1 w-1 bg-slate-700 rounded-full" />
          </div>
          <p className="text-xs text-slate-600 font-medium tracking-widest uppercase">Secure Faculty Portal</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-white text-sm">A</div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-serif">Attentify</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">Faculty Sign In</h2>
            <p className="mt-1.5 text-sm text-slate-500">Welcome back. Please enter your credentials below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">Email address</label>
              <input
                id="email" type="email" autoComplete="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="faculty@institution.edu"
                className="block w-full rounded-lg border border-slate-200 py-2.5 px-4 text-slate-900 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all bg-slate-50 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-slate-200 py-2.5 px-4 pr-11 text-slate-900 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-all bg-slate-50 focus:bg-white outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" id="remember-me" checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-800 cursor-pointer" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="/teacher/forgotpassword" className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-sm transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
