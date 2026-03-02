import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Heart, MessageCircle, Sparkles, X, Send, Smile, Image, Camera } from "lucide-react";
import api from "../services/api";

const Matches = () => {
  console.log("MATCHES PAGE MOUNTED");

  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
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

      {/* Chat Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={selectedUser.img} 
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg"
                      alt={selectedUser.name}
                    />
                    {selectedUser.status === "Online" && (
                      <motion.div 
                        className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                    <p className="text-pink-100 text-sm">{selectedUser.status}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedUser(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-pink-50/30 to-purple-50/30">
                {chatMessages.length === 0 ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <MessageCircle size={64} className="mb-4 text-pink-300" />
                    <p className="text-lg">Start a conversation with {selectedUser.name}</p>
                    <p className="text-sm">Say hi and break the ice! 👋</p>
                  </motion.div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, x: msg.sender === "me" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`max-w-xs lg:max-w-md ${msg.sender === "me" ? "order-2" : "order-1"}`}>
                        {msg.type === "image" ? (
                          <div className={`rounded-2xl shadow-md overflow-hidden ${
                            msg.sender === "me" ? "rounded-br-none" : "rounded-bl-none"
                          }`}>
                            <img 
                              src={msg.imageUrl} 
                              alt="Shared" 
                              className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                            />
                          </div>
                        ) : (
                          <div className={`px-5 py-3 rounded-2xl shadow-md ${
                            msg.sender === "me" 
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-none" 
                              : "bg-white text-gray-800 rounded-bl-none"
                          }`}>
                            <p className="text-sm md:text-base">{msg.text}</p>
                          </div>
                        )}
                        <p className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <div className="p-5 bg-white border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setShowGallery(!showGallery)}
                    className="text-pink-500 hover:bg-pink-50 p-2 rounded-full transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image size={24} />
                  </motion.button>
                  <motion.button
                    className="text-pink-500 hover:bg-pink-50 p-2 rounded-full transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Smile size={24} />
                  </motion.button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>

                {/* Gallery Popup */}
                <AnimatePresence>
                  {showGallery && (
                    <motion.div
                      className="mt-4 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Camera className="text-pink-500" size={20} />
                          <h4 className="font-semibold text-gray-800">Share a Photo</h4>
                        </div>
                        <motion.button
                          onClick={() => setShowGallery(false)}
                          className="text-gray-500 hover:text-gray-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={20} />
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {galleryImages.map((img, idx) => (
                          <motion.div
                            key={idx}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSendImage(img)}
                          >
                            <img 
                              src={img} 
                              alt={`Gallery ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                              <span className="text-white text-xs font-semibold">Send</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
