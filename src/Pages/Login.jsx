// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, Mail, Lock, Heart } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("All fields are required");
//       toast.error("Please fill in all fields", {
//         duration: 3000,
//         position: "top-center",
//         style: {
//           background: "#FEF2F2",
//           color: "#DC2626",
//           fontWeight: "500",
//           borderRadius: "10px",
//           padding: "12px 20px",
//           boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
//         },
//         iconTheme: {
//           primary: "#DC2626",
//           secondary: "#FEF2F2",
//         },
//       });
//       return;
//     }

//     setError("");
//     setIsLoading(true);

//     // Mock authentication
//     setTimeout(() => {
//       const mockUser = {
//         id: "1",
//         email: formData.email,
//         firstName: "Ahmad",
//         lastName: "Khan",
//         bio: "Hello! I'm using AdultMixer Calgary",
//         profileImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
//       };

//       const mockToken = "mock-jwt-token-" + Date.now();

//       login(mockUser, mockToken);

//       toast.success("Login successful! Redirecting...", {
//         duration: 2000,
//         position: "top-center",
//         style: {
//           background: "#F0FDF4",
//           color: "#16A34A",
//           fontWeight: "500",
//           borderRadius: "10px",
//           padding: "12px 20px",
//           boxShadow: "0 4px 12px rgba(22, 163, 74, 0.15)",
//         },
//         iconTheme: {
//           primary: "#16A34A",
//           secondary: "#F0FDF4",
//         },
//       });

//       setTimeout(() => {
//         navigate("/explore");
//       }, 2000);

//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-4 py-28">
//       <Toaster />

//       <motion.div
//         className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, type: "spring" }}
//       >
//         {/* Header with Icon */}
//         <motion.div
//           className="text-center mb-8"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
//             <Heart className="text-white" size={32} fill="white" />
//           </div>
//           <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-600 text-sm">
//             Login to Adultmixer Calgary ❤️
//           </p>
//         </motion.div>

//         {error && (
//           <motion.div
//             className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <span>⚠️</span>
//             <span>{error}</span>
//           </motion.div>
//         )}

//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2 text-sm">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail
//                 className="absolute left-4 top-3.5 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="your.email@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2 text-sm">
//               Password
//             </label>
//             <div className="relative">
//               <Lock
//                 className="absolute left-4 top-3.5 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-3.5 cursor-pointer text-gray-500 hover:text-pink-600 transition"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             whileHover={{ scale: isLoading ? 1 : 1.02 }}
//             whileTap={{ scale: isLoading ? 1 : 0.98 }}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </motion.button>
//         </motion.form>

//         {/* Footer */}
//         <motion.div
//           className="text-center mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//         >
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-pink-600 font-semibold hover:text-pink-700 transition"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = response.data;

      if (!user || !token) {
        throw new Error("Invalid server response");
      }

      // Save to AuthContext + localStorage
      login(user, token);

      toast.success("Login successful!");

      navigate("/explore");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err.response?.data?.message || "Invalid email or password";
      const statusCode = err.response?.status;

      setError(message);

      // Special handling for unverified email (403)
      if (statusCode === 403) {
        toast.error(message, {
          duration: 5000,
          icon: "📧",
        });

        // Show option to resend verification
        setTimeout(() => {
          const shouldResend = window.confirm(
            "Would you like to resend the verification email?",
          );
          if (shouldResend) {
            navigate("/resend-verification");
          }
        }, 2000);
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-4 py-28">
      <Toaster />

      <motion.div
        className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {/* Header */}
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
            Welcome Back
          </h2>

          <p className="text-gray-600 text-sm">
            Login to Adultmixer Calgary ❤️
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Email */}
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none"
              />
            </div>
          </div>

          {/* Password */}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold rounded-xl disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
