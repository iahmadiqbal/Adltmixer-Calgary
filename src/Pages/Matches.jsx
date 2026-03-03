import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Matches = () => {
  console.log("MATCHES PAGE MOUNTED");

  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      console.log("Fetching matches...");
      try {
        const response = await api.get("/users/matches");
        console.log("Matches response:", response.data);
        setMatches(response.data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        alert("Failed to load matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filtered = matches.filter((m) => {
    const fullName =
      `${m.user.firstName} ${m.user.lastName || ""}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Loading matches...</p>
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
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white">
      <motion.h1
        className="text-4xl font-bold text-center text-pink-600 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Matches ❤️
      </motion.h1>

      <motion.input
        className="block mx-auto mb-10 px-5 py-3 rounded-full border w-full max-w-md"
        placeholder="Search matches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {filtered.map((match, index) => {
          const imageUrl =
            match.user.profileImageUrl ||
            "https://via.placeholder.com/400x400?text=Profile";
          const fullName = `${match.user.firstName} ${match.user.lastName || ""}`;

          return (
            <motion.div
              key={match.matchId}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={imageUrl}
                alt={fullName}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=Profile";
                }}
              />

              <div className="p-4 text-center">
                <h2 className="font-bold text-lg">{fullName}</h2>

                {match.user.bio && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {match.user.bio}
                  </p>
                )}

                <span
                  className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                    match.user.isOnline
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {match.user.isOnline ? "Online" : "Offline"}
                </span>

                <motion.button
                  onClick={() => navigate(`/chat/${match.user.id}`)}
                  className="mt-3 w-full py-2 bg-pink-600 text-white rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Message 💬
                </motion.button>

                <motion.button
                  onClick={() => navigate(`/profile/${match.user.id}`)}
                  className="mt-2 w-full py-2 border rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Matches;
