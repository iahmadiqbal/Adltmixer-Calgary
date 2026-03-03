import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Fetching profile, id:", id);
      setLoading(true);

      try {
        let response;
        if (id) {
          console.log("Fetching user by ID:", id);
          response = await api.get(`/users/${id}`);
        } else {
          console.log("Fetching current user profile");
          response = await api.get("/users/me/profile");
        }

        console.log("Profile response:", response.data);
        setUser(response.data);

        if (!id) {
          setFormData({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            bio: response.data.bio || "",
            profileImageUrl: response.data.profileImageUrl || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        alert("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    console.log("Field changed:", e.target.name, "=", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    alert("HANDLE SAVE EXECUTED - Check console and Network tab!");
    console.log("=== SAVE CLICKED ===");
    console.log("isEditing:", isEditing);
    console.log("Sending data:", formData);

    try {
      console.log("Making API call to PATCH /users/me/profile");
      const response = await api.patch("/users/me/profile", formData);
      console.log("API Response:", response.data);
      setUser(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      console.error("Error details:", error.response?.data);
      alert(
        "Failed to update profile: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleEditClick = () => {
    console.log("Edit button clicked - setting isEditing to true");
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    console.log("Cancel button clicked - resetting form");
    setIsEditing(false);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
      profileImageUrl: user.profileImageUrl || "",
    });
  };

  console.log("Profile render - isOwnProfile:", !id, "isEditing:", isEditing);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Profile not found 😕
      </motion.div>
    );
  }

  const isOwnProfile = !id;
  const displayName = `${user.firstName} ${user.lastName || ""}`.trim();
  const age = user.birthDate
    ? new Date().getFullYear() - new Date(user.birthDate).getFullYear()
    : null;
  const imageUrl =
    user.profileImageUrl && user.profileImageUrl.trim() !== ""
      ? user.profileImageUrl
      : "https://via.placeholder.com/400x400?text=Profile";

  return (
    <div className="min-h-screen pt-24 px-4 bg-pink-50">
      <motion.div
        className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 text-center relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {user.isOnline !== undefined && (
          <motion.span
            className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full ${
              user.isOnline
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {user.isOnline ? "Online" : "Offline"}
          </motion.span>
        )}

        <motion.img
          src={imageUrl}
          alt={displayName}
          className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-pink-200"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=Profile";
          }}
        />

        {isOwnProfile && isEditing ? (
          <motion.div
            className="mt-4 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows="3"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input
              type="text"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleChange}
              placeholder="Profile Image URL"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </motion.div>
        ) : (
          <>
            <motion.h1
              className="text-3xl font-bold mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-pink-600">Name:</span> {displayName}
              {age && (
                <>
                  <br />
                  <span className="text-pink-600">Age:</span> {age}
                </>
              )}
            </motion.h1>

            <motion.p
              className="text-pink-600 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {user.bio || "No bio available"}
            </motion.p>
          </>
        )}

        <motion.div
          className="mt-6 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isOwnProfile ? (
            <>
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      alert("BUTTON CLICKED!");
                      console.log("Direct onClick fired");
                      handleSave();
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#db2777",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    💾 SAVE CHANGES (TEST)
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="w-full py-3 border rounded-xl text-gray-600 hover:bg-gray-50 transition transform hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition transform hover:scale-105 active:scale-95"
                >
                  Edit Profile
                </button>
              )}
            </>
          ) : (
            <>
              <motion.button
                onClick={() => navigate(`/chat/${user.id}`)}
                className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Message 💬
              </motion.button>

              <motion.button
                onClick={() => navigate(-1)}
                className="w-full py-3 border rounded-xl text-gray-600 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
