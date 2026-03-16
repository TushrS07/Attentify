import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 px-10 py-12 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg" style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}>A</div>
            <h1 className="text-lg font-bold text-white tracking-tight font-serif">Attentify</h1>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            An AI-powered facial recognition attendance system designed for modern educational institutions.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Contact Us</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#6d4ed7] flex-shrink-0" />
              <span>123 EduTech Street, Delhi, India</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#6d4ed7] flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#6d4ed7] flex-shrink-0" />
              <span>support@attentify.com</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Connect With Us</h2>
          <div className="flex space-x-4 mb-4">
            <a href="mailto:support@attentify.com"
              className="w-9 h-9 bg-slate-800 hover:bg-[#3b1e8a] border border-slate-700 hover:border-[#3b1e8a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
              <FaEnvelope size={14} />
            </a>
            <a href="https://github.com/attentify" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-800 hover:bg-[#3b1e8a] border border-slate-700 hover:border-[#3b1e8a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
              <FaGithub size={14} />
            </a>
            <a href="https://linkedin.com/company/attentify" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-800 hover:bg-[#3b1e8a] border border-slate-700 hover:border-[#3b1e8a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
              <FaLinkedin size={14} />
            </a>
          </div>
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} Attentify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
