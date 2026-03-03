import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Explore = () => {
  console.log("Explores component mounted");
  const navigate = useNavigate();

  const [isAdult, setIsAdult] = useState(null);
  const [filter, setFilter] = useState("everyone");
  const [profiles, setProfiles] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    console.log("Fetching discover users");
    api
      .get("/users/discover")
      .then((res) => {
        console.log("Discover response:", res.data);
        setProfiles(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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

  const handleSkip = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  const handleLike = async (profile) => {
    console.log("Liking profile:", profile);

    const userId = profile.user ? profile.user.id : profile.id;

    console.log("Extracted user ID:", userId);

    if (liked.includes(userId)) {
      setLiked(liked.filter((id) => id !== userId));
    } else {
      setLiked([...liked, userId]);

      try {
        console.log("Sending like request with toUserId:", userId);
        await api.post("/likes", { toUserId: userId });
        console.log(`Successfully liked user ${userId}`);
      } catch (error) {
        console.error("Like failed:", error);
        console.error("Error response:", error.response?.data);
        alert("Failed to like user. Please try again.");
        setLiked(liked.filter((id) => id !== userId));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-28 px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
          Explore Matches
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover real adults nearby. Filter by preference and connect with
          confidence.
        </p>
      </motion.div>

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
                user.firstName + (user.lastName ? ` ${user.lastName}` : "");
              const imageUrl =
                user.profileImageUrl && user.profileImageUrl.trim() !== ""
                  ? user.profileImageUrl
                  : "https://via.placeholder.com/400x400?text=Profile";

              const userId = user.user ? user.user.id : user.id;

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
                        onClick={() => handleLike(user)}
                        className={`flex-1 py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition
                        ${
                          liked.includes(userId)
                            ? "bg-red-100 text-red-600"
                            : "bg-white border text-gray-600 hover:bg-gray-100"
                        }
                      `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart
                          className={`${
                            liked.includes(userId)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        {liked.includes(userId) ? "Liked" : "Like"}
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
    </div>
  );
};

export default Explore;
