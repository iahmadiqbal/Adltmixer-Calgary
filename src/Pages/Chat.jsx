// Updated UI - v3.0 with animated background theme
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Smile,
  Image,
  Camera,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth();
  const messagesEndRef = useRef(null);

  const [matchData, setMatchData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages] = useState([
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=500",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500",
  ]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) {
      setLoading(false);
      setError("Please log in to view chat");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    if (!id) {
      setLoading(false);
      setError("Invalid chat");
      return;
    }

    const fetchChatData = async () => {
      try {
        setLoading(true);
        setError(null);

        const matchResponse = await api.get(`/messages/match/${id}`);
        setMatchData(matchResponse.data);

        const messagesResponse = await api.get(
          `/messages/${matchResponse.data.matchId}`,
        );
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Failed to load chat:", error);
        const errorMsg = error.response?.data?.message || "Failed to load chat";
        setError(errorMsg);
        if (error.response?.status === 404) {
          setTimeout(() => navigate("/matches"), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [id, currentUser, authLoading, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || sending || !matchData) return;

    const messageContent = text.trim();
    setText("");
    setSending(true);

    try {
      const response = await api.post("/messages", {
        matchId: matchData.matchId,
        content: messageContent,
      });

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
      setText(messageContent);
    } finally {
      setSending(false);
    }
  };

  const sendImage = async (imageUrl) => {
    if (sending || !matchData) return;

    setSending(true);
    setShowGallery(false);

    try {
      const response = await api.post("/messages", {
        matchId: matchData.matchId,
        content: `[Image: ${imageUrl}]`,
      });

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to send image:", error);
      alert("Failed to send image. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <p className="text-xl text-gray-600">Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/matches")}
          className="px-6 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <p className="text-xl text-gray-600 mb-4">Match not found</p>
        <button
          onClick={() => navigate("/matches")}
          className="px-6 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  const otherUser = matchData.otherUser;
  const displayName =
    `${otherUser.firstName} ${otherUser.lastName || ""}`.trim();
  const profileImage =
    otherUser.profileImageUrl || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen pt-24 px-4 pb-10 relative overflow-hidden">
      {/* Animated Background - Matching Matches/Explore Theme */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.div
        className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl border border-white/50 p-4 mb-6 max-w-4xl mx-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:bg-gray-100 p-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={22} />
            </motion.button>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/profile/${id}`)}
            >
              <div className="relative">
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                />
                {otherUser.isOnline && (
                  <motion.span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {displayName}
                </h3>
                <p className="text-xs text-gray-500">
                  {otherUser.isOnline ? "🟢 Online" : "⚫ Offline"}
                </p>
              </div>
            </div>
          </div>

          <motion.button
            className="text-gray-700 hover:bg-gray-100 p-2 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreVertical size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Area */}
      <motion.div
        className="backdrop-blur-lg bg-white/60 rounded-3xl shadow-xl border border-white/50 p-6 max-w-4xl mx-auto mb-6 overflow-y-auto"
        style={{ minHeight: "500px", maxHeight: "calc(100vh - 350px)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            const isImageMessage = msg.content.startsWith("[Image:");
            const imageUrl = isImageMessage
              ? msg.content.match(/\[Image: (.*)\]/)?.[1]
              : null;

            return (
              <motion.div
                key={msg.id}
                className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`max-w-xs lg:max-w-md`}>
                  {isImageMessage && imageUrl ? (
                    <motion.div
                      className={`rounded-2xl overflow-hidden shadow-lg ${
                        isMe
                          ? "bg-gradient-to-br from-pink-500 to-purple-600"
                          : "bg-white"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={imageUrl}
                        alt="Shared"
                        className="w-full h-48 object-cover cursor-pointer"
                      />
                      <div
                        className={`px-3 py-2 text-xs ${isMe ? "text-pink-100" : "text-gray-500"}`}
                      >
                        {formatTime(msg.createdAt)}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`px-5 py-3 rounded-2xl shadow-md ${
                        isMe
                          ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-xs mt-1.5 ${isMe ? "text-pink-100" : "text-gray-500"}`}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input Area */}
      <motion.div
        className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl border border-white/50 p-4 max-w-4xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setShowGallery(!showGallery)}
            className={`${showGallery ? "text-pink-600 bg-pink-50" : "text-gray-600"} hover:bg-gray-100 p-2.5 rounded-full transition`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image size={22} />
          </motion.button>
          <motion.button
            className="text-gray-600 hover:bg-gray-100 p-2.5 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Smile size={22} />
          </motion.button>
          <input
            className="flex-1 px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-gray-800 placeholder-gray-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            disabled={sending}
          />
          <motion.button
            onClick={sendMessage}
            disabled={sending || !text.trim()}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: sending ? 1 : 1.1 }}
            whileTap={{ scale: sending ? 1 : 0.95 }}
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
                  <h4 className="font-semibold text-gray-700">Share a photo</h4>
                </div>
                <motion.button
                  onClick={() => setShowGallery(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-white p-1.5 rounded-full"
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
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Send size={20} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

export default Chat;
