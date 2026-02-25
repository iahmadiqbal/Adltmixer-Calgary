import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      toast.error("All fields are required", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#DC2626",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "16px",
        },
      });
      return;
    }

    setError("");
    console.log("Login Data:", formData);

    // Show success toast
    toast.success("Login Successful! Redirecting...", {
      duration: 2000,
      position: "top-center",
      icon: "✅",
      style: {
        background: "#DCFCE7",
        color: "#16A34A",
        fontWeight: "600",
        borderRadius: "12px",
        padding: "16px",
      },
    });

    // Auto-redirect to Explore page after 2 seconds
    setTimeout(() => {
      navigate("/explore");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-25">
      <Toaster />
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-pink-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Login to Adultmixer Calgary ❤️
        </motion.p>

        {error && (
          <motion.p
            className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.p>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white text-lg font-bold rounded-xl hover:bg-pink-700 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center text-sm text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-semibold">
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
