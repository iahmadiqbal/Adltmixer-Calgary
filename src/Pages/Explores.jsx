import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Explore = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /* ================= STATES ================= */
  const [isAdult, setIsAdult] = useState(null);
  const [filter, setFilter] = useState("everyone");
  const [profiles, setProfiles] = useState([]);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILES ================= */
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/discover");
        setProfiles(response.data);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  /* ================= AGE CHECK ================= */
  useEffect(() => {
    const verified = localStorage.getItem("adultVerified");
    if (verified === "true") setIsAdult(true);
    else setIsAdult(false);
  }, []);

  const handleAgeYes = () => {
    localStorage.setItem("adultVerified", "true");
    setIsAdult(true);
  };

  const handleAgeNo = () => {
    navigate("/");
  };

  /* ================= FILTER LOGIC ================= */
  const filteredProfiles =
    filter === "everyone"
      ? profiles
      : filter === "man"
        ? profiles.filter((p) => p.gender && p.gender.toUpperCase() === "MALE")
        : filter === "woman"
          ? profiles.filter(
              (p) => p.gender && p.gender.toUpperCase() === "FEMALE",
            )
          : profiles;

  /* ================= ACTIONS ================= */
  const handleSkip = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  const handleLike = async (profile) => {
    const userId = profile.id;

    if (liked.includes(userId)) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      alert("Please login to like profiles");
      navigate("/login");
      return;
    }

    setLiked([...liked, userId]);

    try {
      await api.post("/likes", { toUserId: userId });
    } catch (error) {
      console.error("Like failed:", error);
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "You already liked this user"
      ) {
        // Already liked, keep the state
      } else if (error.response?.status === 401) {
        alert("Please login to like profiles");
        navigate("/login");
        setLiked(liked.filter((id) => id !== userId));
      } else {
        alert("Failed to like user. Please try again.");
        setLiked(liked.filter((id) => id !== userId));
      }
    }
  };

  /* ================= AGE POPUP ================= */
  if (isAdult === false) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-pink-600">
            18+ Age Verification
          </h2>
          <p className="text-gray-600 mt-4">
            This website contains adult content. You must be at least 18 years
            old to continue.
          </p>
          <div className="mt-8 flex gap-4">
            <motion.button
              onClick={handleAgeNo}
              className="flex-1 py-3 rounded-xl border hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No
            </motion.button>
            <motion.button
              onClick={handleAgeYes}
              className="flex-1 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes, I'm 18+
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-10 relative overflow-hidden">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600 text-lg">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* HEADER */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="text-pink-500 fill-pink-500" size={32} />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Explore Matches
          </h1>
          <Heart className="text-pink-500 fill-pink-500" size={32} />
        </motion.div>
        <p className="text-gray-600 text-lg">
          Discover real adults nearby. Filter by preference and connect with
          confidence.
        </p>
      </motion.div>

      {/* FILTER BUTTONS */}
      <motion.div
        className="flex justify-center gap-4 mb-12 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {["everyone", "man", "woman"].map((type, index) => (
          <motion.button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              filter === type
                ? "bg-pink-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === "everyone" && "Everyone"}
            {type === "man" && "Men"}
            {type === "woman" && "Women"}
          </motion.button>
        ))}
      </motion.div>

      {/* PROFILES */}
      {filteredProfiles.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredProfiles.map((user, index) => {
              const age = user.birthDate
                ? new Date().getFullYear() -
                  new Date(user.birthDate).getFullYear()
                : null;
              const displayName =
                `${user.firstName} ${user.lastName || ""}`.trim();
              const imageUrl =
                user.profileImageUrl && user.profileImageUrl.trim() !== ""
                  ? user.profileImageUrl
                  : "https://via.placeholder.com/400x400?text=Profile";

              const isLiked = liked.includes(user.id);

              return (
                <motion.div
                  key={user.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-1 transition"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <img
                    src={imageUrl}
                    alt={displayName}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Profile";
                    }}
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold">
                      {displayName}
                      {age ? `, ${age}` : ""}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {user.bio || "No bio available"}
                    </p>
                    <div className="mt-6 flex gap-4">
                      <motion.button
                        onClick={() => handleSkip(user.id)}
                        className="flex-1 py-3 rounded-xl border flex justify-center items-center gap-2 hover:bg-gray-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X /> Skip
                      </motion.button>
                      <motion.button
                        onClick={() => !isLiked && handleLike(user)}
                        disabled={isLiked}
                        className={`flex-1 py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition ${
                          isLiked
                            ? "bg-red-100 text-red-600 cursor-not-allowed"
                            : "bg-white border text-gray-600 hover:bg-gray-100"
                        }`}
                        whileHover={!isLiked ? { scale: 1.05 } : {}}
                        whileTap={!isLiked ? { scale: 0.95 } : {}}
                      >
                        <Heart
                          className={`${
                            isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        {isLiked ? "Liked" : "Like"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="text-center mt-20 text-gray-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Users size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">No profiles available</h2>
          <p>Try changing filters or come back later.</p>
        </motion.div>
      )}

      {/* LIKED COUNTER */}
      <AnimatePresence>
        {liked.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ❤️ Liked: {liked.length}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Explore;
