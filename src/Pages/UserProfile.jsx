import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, FileText, Image, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
      profileImageUrl: user.profileImageUrl || "",
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("=== SUBMITTING PROFILE UPDATE ===");
      console.log("Form data:", formData);

      // Make actual API call to backend
      const response = await api.patch("/users/me/profile", formData);

      console.log("API Response:", response.data);

      // Update local context with response from server
      updateUser(response.data);

      toast.success("Profile updated successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#F0FDF4",
          color: "#16A34A",
          fontWeight: "500",
          borderRadius: "10px",
          padding: "12px 20px",
          boxShadow: "0 4px 12px rgba(22, 163, 74, 0.15)",
        },
        iconTheme: {
          primary: "#16A34A",
          secondary: "#F0FDF4",
        },
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      console.error("Error response:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#FEF2F2",
            color: "#DC2626",
            fontWeight: "500",
            borderRadius: "10px",
            padding: "12px 20px",
          },
        },
      );

      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-4 py-28">
      <Toaster />

      <motion.div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100"
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
            <User className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Update your profile information
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {formData.profileImageUrl ? (
            <img
              src={formData.profileImageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-pink-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center border-4 border-pink-300">
              <User size={48} className="text-pink-600" />
            </div>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                First Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Last Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Email (Read-only)
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Bio
            </label>
            <div className="relative">
              <FileText
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Profile Image URL
            </label>
            <div className="relative">
              <Image
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="url"
                name="profileImageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.profileImageUrl}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <Save size={20} />
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default UserProfile;
