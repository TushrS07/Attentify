import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STUDENT_API as API } from "../../config/api";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function StudentLogin() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.LOGIN, formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        setTimeout(() => navigate("/student/profile"), 2000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials. Please try again.");
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-bold text-white text-lg border border-white/30">A</div>
            <span className="text-2xl font-bold text-white tracking-tight">Attentify</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/70 border border-white/20 uppercase tracking-widest">Student</span>
          </div>

          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6">
              <ShieldCheck size={13} /> Secure Academic Portal
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight">
              Access your academic dashboard.
            </h1>
            <p className="text-white/70 leading-relaxed text-base font-light">
              Log in to securely view your attendance records, performance analytics, and class schedules.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-white/40 font-medium tracking-widest uppercase">Enterprise-Grade Security</p>
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
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1535]">Welcome back</h2>
            <p className="mt-1.5 text-sm text-[#9b93be]">Please enter your credentials to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Email address</label>
              <input
                id="email" type="email" autoComplete="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@institution.edu"
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
                <input type="checkbox" checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-[#ddd8f0] cursor-pointer" />
                <span className="text-sm text-[#4a4560]">Remember me</span>
              </label>
              <Link to="/student/forgotpassword" className="text-sm font-semibold text-[#3b1e8a] hover:text-[#2d1669] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button type="submit"
              className="w-full py-2.5 px-4 text-white font-semibold rounded-lg shadow transition-all text-sm"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#4a4560]">
            Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/student/register")}
              className="font-semibold text-[#3b1e8a] hover:text-[#2d1669] transition-colors">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
