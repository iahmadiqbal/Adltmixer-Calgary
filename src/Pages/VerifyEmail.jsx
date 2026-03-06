import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader, Mail } from "lucide-react";
import api from "../services/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/auth/verify-email?token=${token}`);
      setStatus("success");
      setMessage(response.data.message || "Email verified successfully!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Verification failed. The link may be invalid or expired.",
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-4 py-28">
      <motion.div
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {/* Status Icon */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {status === "verifying" && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
              <Loader className="text-white animate-spin" size={40} />
            </div>
          )}

          {status === "success" && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <CheckCircle className="text-white" size={40} />
            </div>
          )}

          {status === "error" && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full mb-4">
              <XCircle className="text-white" size={40} />
            </div>
          )}

          <h2
            className={`text-3xl font-bold mb-2 ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                  ? "text-red-600"
                  : "text-purple-600"
            }`}
          >
            {status === "verifying" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </h2>
        </motion.div>

        {/* Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 text-base mb-6">{message}</p>

          {status === "success" && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 text-sm">
                  ✅ Your account is now active!
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Redirecting to login page...
                </p>
              </div>

              <motion.button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go to Login
              </motion.button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">
                  ❌ Unable to verify your email
                </p>
                <p className="text-red-600 text-sm mt-2">
                  The verification link may have expired or is invalid.
                </p>
              </div>

              <motion.button
                onClick={() => navigate("/resend-verification")}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request New Link
              </motion.button>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition"
              >
                Back to Login
              </button>
            </div>
          )}

          {status === "verifying" && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-purple-700 text-sm">
                Please wait while we verify your email address...
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
