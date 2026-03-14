import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-4 bgf text-gray-700 shadow-inner px-10 py-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Attentify</h1>
          <p className="mt-2 text-sm text-gray-600">
            An AI-powered facial recognition attendance system designed for modern education institutions.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Contact Us</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              123 EduTech Street, Delhi, India
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              support@attentify.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Connect With Us</h2>
          <div className="flex space-x-4 text-xl text-gray-600">
            <a href="mailto:support@attentify.com" className="hover:text-blue-600"><FaEnvelope /></a>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaGithub /></a>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaLinkedin /></a>
          </div>
          <p className="mt-4 text-sm text-gray-500">&copy; {new Date().getFullYear()} Attentify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
