import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-16">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Brand Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-pink-500">
            Adultmixer <span className="text-white">Calgary</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-lg leading-relaxed">
            A modern platform to connect, meet, and explore meaningful
            relationships.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-pink-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-pink-500 transition">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/matches" className="hover:text-pink-500 transition">
                Matches
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-500 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-pink-500 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-pink-500 transition">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <p className="text-center text-sm text-gray-500 py-5">
          © {new Date().getFullYear()} Adultmixer Calgary—All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
