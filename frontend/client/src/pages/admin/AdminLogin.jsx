import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_API as API } from "../../config/api";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.LOGIN, formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        setTimeout(() => navigate("/admin"), 2000);
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
    <div className="min-h-screen flex font-sans text-slate-900 selection:bg-slate-200">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -top-20 right-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm">A</div>
            <span className="text-2xl font-bold text-white tracking-tight font-serif">Attentify</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-widest">Admin</span>
          </div>

          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium mb-6">
              <ShieldCheck size={13} className="text-slate-500" /> Secure Operations Console
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight font-serif">
              System Administration
            </h1>
            <p className="text-slate-400 leading-relaxed text-base font-light">
              Securely access the central management console to configure settings, manage credentials, and oversee platform operations.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-1 bg-slate-700 rounded-full" />
            <div className="h-1 w-1 bg-slate-700 rounded-full" />
            <div className="h-1 w-8 bg-slate-500 rounded-full" />
          </div>
          <p className="text-xs text-slate-600 font-medium tracking-widest uppercase">Restricted Access</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white text-sm">A</div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-serif">Attentify</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">Admin Authentication</h2>
            <p className="mt-1.5 text-sm text-slate-500">Please authenticate to access the administration console.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">Administrator Email</label>
              <input
                id="email" type="email" autoComplete="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@institution.edu"
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
                <input type="checkbox" checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 cursor-pointer" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Link to="/admin/forgotpassword" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-sm transition-all text-sm">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}