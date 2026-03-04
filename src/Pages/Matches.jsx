import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Heart, MessageCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Matches = () => {
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      // Check if user is logged in
      if (!authLoading && !user) {
        setLoading(false);
        return;
      }

      if (authLoading) {
        return;
      }

      try {
        const response = await api.get("/users/matches");
        setMatches(response.data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        alert("Failed to load matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user, authLoading]);

  const filtered = matches.filter((m) => {
    const fullName =
      `${m.user.firstName} ${m.user.lastName || ""}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Loading matches...</p>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto mb-4 text-pink-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Please login to see your matches
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your matches and connections.
          </p>
          <motion.button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Now
          </motion.button>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            You don't have any matches yet.
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring and liking profiles to find your matches!
          </p>
          <motion.button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Profiles
          </motion.button>
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

      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="text-pink-500" size={32} />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Matches
          </h1>
          <Heart className="text-pink-500 fill-pink-500" size={32} />
        </motion.div>
        <p className="text-gray-600 text-lg">
          Discover amazing connections waiting for you
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="max-w-2xl mx-auto mb-12 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <Search
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-pink-500"
            size={24}
          />
          <input
            className="w-full pl-14 pr-5 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
            placeholder="Search your perfect match..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-purple-500" size={20} />
          </motion.div>
        </div>
      </motion.div>

      {/* Matches Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {filtered.map((match, index) => {
          const userObj = match.user || match.matchedUser || match;
          const userId = userObj.id;
          const imageUrl =
            userObj.profileImageUrl || "https://via.placeholder.com/400";
          const fullName =
            `${userObj.firstName} ${userObj.lastName || ""}`.trim();
          const age = userObj.birthDate
            ? new Date().getFullYear() -
              new Date(userObj.birthDate).getFullYear()
            : null;

          return (
            <motion.div
              key={match.matchId}
              className="group relative backdrop-blur-md bg-white/80 rounded-3xl shadow-xl border border-white/50 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5, type: "spring" }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <motion.img
                  src={imageUrl}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <motion.div
                  className={`absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 ${
                    userObj.isOnline
                      ? "bg-green-500/90 text-white"
                      : "bg-gray-500/90 text-white"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      userObj.isOnline ? "bg-white" : "bg-gray-300"
                    }`}
                    animate={userObj.isOnline ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold">
                    {userObj.isOnline ? "Online" : "Offline"}
                  </span>
                </motion.div>

                {/* Floating Hearts */}
                <motion.div
                  className="absolute top-4 left-4"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <Heart
                    className="text-white fill-pink-500 drop-shadow-lg"
                    size={24}
                  />
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {fullName}
                    {age ? `, ${age}` : ""}
                  </h2>
                  {userObj.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {userObj.bio}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/chat/${userId}`);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} />
                    Chat
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${userId}`);
                    }}
                    className="px-5 py-3 backdrop-blur-md bg-white/80 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

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

export default Matches;
