import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_API as API } from "../../config/api";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API.LOGIN, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        setTimeout(() => navigate("/student"), 2000); 
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
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-200">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {/* Left Section - Graphic / Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-white shadow-sm font-serif text-xl border border-slate-700">
              A
            </div>
            <span className="text-2xl font-bold text-white tracking-tight font-serif">Attentify</span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700 tracking-wider">ADMIN</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight font-serif">
              System Administration
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Securely access the central management console to configure system settings, manage credentials, and oversee platform operations.
            </p>
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
             <div className="h-1.5 w-1.5 bg-slate-700 rounded-full"></div>
             <div className="h-1.5 w-1.5 bg-slate-700 rounded-full"></div>
             <div className="h-1.5 w-8 bg-slate-500 rounded-full"></div>
          </div>
          <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Secure Operations Console</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-24 xl:px-32 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden mb-10 flex items-center space-x-3 justify-center">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center font-bold text-white shadow-sm font-serif">
              A
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-serif">Attentify</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
              Admin Authentication
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Please authenticate to access the administration console.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                  Administrator Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="admin@institution.edu"
                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-slate-700 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link to="/admin/forgotpassword" className="font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all border border-slate-950"
                >
                  Authenticate
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}