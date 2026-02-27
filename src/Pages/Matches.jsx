import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Heart, MessageCircle, Sparkles, X, Send, Smile, Image, Camera } from "lucide-react";
import profiles from "../data/profiles";

const Matches = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages] = useState([
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=500",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500",
  ]);
  const navigate = useNavigate();

  const filtered = profiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      setChatMessages([...chatMessages, { text: message, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage("");
      
      // Simulate response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Hey! Thanks for your message 😊", 
          sender: selectedUser.name, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    }
  };

  const handleSendImage = (imageUrl) => {
    if (selectedUser) {
      setChatMessages([...chatMessages, { 
        type: "image", 
        imageUrl, 
        sender: "me", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setShowGallery(false);
      
      // Simulate response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Wow! Beautiful picture! 😍", 
          sender: selectedUser.name, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    }
  };

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
        <p className="text-gray-600 text-lg">Discover amazing connections waiting for you</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="max-w-2xl mx-auto mb-12 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-pink-500" size={24} />
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
        {filtered.map((user, index) => (
          <motion.div 
            key={user.id} 
            className="group relative backdrop-blur-md bg-white/80 rounded-3xl shadow-xl border border-white/50 overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5, type: "spring" }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
              <motion.img 
                src={user.img} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Status Badge */}
              <motion.div 
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 ${
                  user.status === "Online" 
                    ? "bg-green-500/90 text-white" 
                    : "bg-gray-500/90 text-white"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full ${user.status === "Online" ? "bg-white" : "bg-gray-300"}`}
                  animate={user.status === "Online" ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-semibold">{user.status}</span>
              </motion.div>

              {/* Floating Hearts */}
              <motion.div
                className="absolute top-4 left-4"
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <Heart className="text-white fill-pink-500 drop-shadow-lg" size={24} />
              </motion.div>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {user.name}, {user.age}
                </h2>
                <p className="text-sm text-gray-600">Click to view profile</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(user);
                    setChatMessages([]);
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
                    navigate(`/profile/${user.id}`);
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
                background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)"
              }}
            />
          </motion.div>
        ))}
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
