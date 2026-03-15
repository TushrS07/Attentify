import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { STUDENT_API as API } from "../../config/api";
import "react-toastify/dist/ReactToastify.css";
import { ShieldCheck, User, Phone, Mail, Lock, ArrowRight } from "lucide-react";

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (parseInt(formData.phone) <= 0) {
      toast.error("Phone number must be a positive number");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(API.REGISTER, formData, { withCredentials: true });

      toast.success("Registration successful!", {
        autoClose: 2000,
        onClose: () => {
          navigate("/student/verificationpage", { state: { email: response.data.email } });
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ background: "#f7f8fc" }}>
      <ToastContainer position="top-right" autoClose={3000} />

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
              <ShieldCheck size={13} /> Join the Community
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight">
              Revolutionize your attendance with AI.
            </h1>
            <p className="text-white/70 leading-relaxed text-base font-light">
              Create an account to experience accurate, effortless, and secure academic tracking.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <button 
            onClick={() => navigate("/student/login")}
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          >
            <span className="font-semibold text-sm">Access Portal</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>A</div>
            <span className="text-2xl font-bold text-[#1a1535] tracking-tight">Attentify</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1535]">Create your account</h2>
            <p className="mt-1.5 text-sm text-[#9b93be]">Fill in the details below to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="name" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4bcdf]" />
                  <input
                    id="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe"
                    className="block w-full rounded-lg border border-[#ddd8f0] py-2 px-10 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4bcdf]" />
                  <input
                    id="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="9876543210"
                    className="block w-full rounded-lg border border-[#ddd8f0] py-2 px-10 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4bcdf]" />
                <input
                  id="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="student@institution.edu"
                  className="block w-full rounded-lg border border-[#ddd8f0] py-2 px-10 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="password" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4bcdf]" />
                  <input
                    id="password" type="password" required value={formData.password} onChange={handleChange} placeholder="••••••••"
                    className="block w-full rounded-lg border border-[#ddd8f0] py-2 px-10 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1a1535] mb-1.5">Confirm</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4bcdf]" />
                  <input
                    id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
                    className="block w-full rounded-lg border border-[#ddd8f0] py-2 px-10 text-[#1a1535] text-sm placeholder:text-[#c4bcdf] focus:border-[#3b1e8a] focus:ring-2 focus:ring-[#3b1e8a]/20 transition-all bg-[#f7f8fc] focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-2.5 px-4 text-white font-semibold rounded-lg shadow transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>
              {isSubmitting ? "Creating Account..." : "Register"}
            </button>

            <p className="text-center text-sm text-[#4a4560] mt-6">
              Already have an account?{" "}
              <Link to="/student/login" className="text-[#3b1e8a] hover:text-[#2d1669] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
