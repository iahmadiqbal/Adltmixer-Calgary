import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo4Navbar.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

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
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition"
              >
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {!user.profileImageUrl && <User size={20} />}
                <span>{user.firstName}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-pink-50 transition text-gray-700"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-pink-50 transition text-left text-gray-700"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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

          {!user && (
            <>
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
            </>
          )}

          {user && (
            <>
              <div className="flex flex-col items-center space-y-2 px-4 py-3 border-t border-gray-200 mt-2 pt-4">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.firstName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-pink-300 shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {!user.profileImageUrl && (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center border-4 border-pink-300 shadow-lg">
                    <User size={32} className="text-white" />
                  </div>
                )}
                <span className="text-gray-800 font-bold text-xl">{user.firstName}</span>
              </div>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="block w-full text-center px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
