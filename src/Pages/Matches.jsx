import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Matches = () => {
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
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
  }, []);

  const filtered = matches.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Loading matches...</p>
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
        {filtered.map((user, index) => (
          <motion.div
            key={user.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <img src={user.img} className="h-48 w-full object-cover" />

            <div className="p-4 text-center">
              <h2 className="font-bold text-lg">
                {user.name}, {user.age}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  user.status === "Online"
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {user.status}
              </span>

              <motion.button
                onClick={() => navigate(`/chat/${user.id}`)}
                className="mt-3 w-full py-2 bg-pink-600 text-white rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Message 💬
              </motion.button>

              <motion.button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="mt-2 w-full py-2 border rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Matches;
