import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/logo4Navbar.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-pink-600 font-semibold"
        : "text-gray-700 hover:text-pink-600"
    }`;

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="AdultMixer Logo"
            className="h-16 md:h-18 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/explore" className={linkClass}>
            Explore
          </NavLink>
          <NavLink to="/matches" className={linkClass}>
            Matches
          </NavLink>
          <NavLink to="/pricing" className={linkClass}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-5 space-y-3 text-lg font-medium">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-lg ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-lg ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/matches"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-lg ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            Matches
          </NavLink>

          <NavLink
            to="/pricing"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-lg ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            Pricing
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full px-3 py-2 rounded-lg ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            Contact
          </NavLink>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block w-full text-center px-4 py-2 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className="block w-full text-center px-4 py-2 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
