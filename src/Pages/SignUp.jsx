import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Calendar, Lock, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password on change
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.gender
    ) {
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

    // Check password strength
    const isPasswordStrong = Object.values(passwordStrength).every(
      (val) => val === true,
    );
    if (!isPasswordStrong) {
      setError("Password does not meet all requirements");
      toast.error("Password does not meet all requirements", {
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

    if (Number(formData.age) < 18) {
      setError("You must be 18+ to sign up");
      toast.error("You must be 18+ to sign up", {
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

    try {
      // Split full name into firstName and lastName
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || ""; // Join remaining parts as lastName

      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - Number(formData.age);
      const birthDate = `${birthYear}-01-01`;

      const response = await api.post("/auth/register", {
        firstName,
        lastName: lastName || undefined, // Send undefined if empty
        email: formData.email,
        password: formData.password,
        birthDate,
        gender: formData.gender,
      });

      // Show verification message
      toast.success(
        "Account created! Please check your email to verify your account 📧",
        {
          duration: 5000,
          position: "top-center",
          icon: "✉️",
          style: {
            background: "#DCFCE7",
            color: "#16A34A",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "16px",
          },
        },
      );

      // Redirect to login after showing message
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
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
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-4 py-20">
      <Toaster />

      <motion.div
        className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
            <Heart className="text-white" size={32} fill="white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join Adultmixer
          </h2>
          <p className="text-gray-600 text-sm">
            Find your perfect match in Calgary ❤️
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Age (18+ only)
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="99"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Gender
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="">Select your gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-500 hover:text-pink-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div
                className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${passwordStrength.hasMinLength ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.hasMinLength ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-xs ${passwordStrength.hasMinLength ? "text-green-600" : "text-gray-600"}`}
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${passwordStrength.hasUpperCase ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.hasUpperCase ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-xs ${passwordStrength.hasUpperCase ? "text-green-600" : "text-gray-600"}`}
                    >
                      One uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${passwordStrength.hasLowerCase ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.hasLowerCase ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-xs ${passwordStrength.hasLowerCase ? "text-green-600" : "text-gray-600"}`}
                    >
                      One lowercase letter (a-z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${passwordStrength.hasNumber ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.hasNumber ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-xs ${passwordStrength.hasNumber ? "text-green-600" : "text-gray-600"}`}
                    >
                      One number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-400"}`}
                    >
                      {passwordStrength.hasSpecialChar ? "✓" : "○"}
                    </span>
                    <span
                      className={`text-xs ${passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-600"}`}
                    >
                      One special character (!@#$%^&*)
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
        </motion.form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-semibold hover:text-pink-700 transition"
            >
              Login here
            </Link>
          </p>

          <p className="text-xs text-gray-500 mt-4">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
