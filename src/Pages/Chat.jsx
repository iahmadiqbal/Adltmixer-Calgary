// Updated UI - v2.0
import React, { useState, useEffect, useRef } from "react";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Simple Clean Header */}
      <motion.div
        className="bg-white shadow-sm fixed top-20 left-0 right-0 z-50 border-b border-gray-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
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
                  className="w-11 h-11 rounded-full object-cover"
                />
                {otherUser.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{displayName}</h3>
                <p className="text-xs text-gray-500">
                  {otherUser.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              className="text-gray-700 hover:bg-gray-100 p-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Messages Area - WhatsApp Style */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 max-w-5xl mx-auto w-full mt-32 mb-24"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: "#f9fafb",
        }}
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
                className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`max-w-xs lg:max-w-md`}>
                  {isImageMessage && imageUrl ? (
                    <div
                      className={`rounded-lg overflow-hidden shadow-md ${
                        isMe ? "bg-pink-500" : "bg-white"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt="Shared"
                        className="w-full h-48 object-cover cursor-pointer"
                      />
                      <div
                        className={`px-3 py-1 text-xs ${isMe ? "text-pink-100" : "text-gray-500"}`}
                      >
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2 rounded-lg shadow-sm ${
                        isMe
                          ? "bg-pink-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${isMe ? "text-pink-100" : "text-gray-500"}`}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Clean & Simple */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowGallery(!showGallery)}
              className={`${showGallery ? "text-pink-600" : "text-gray-600"} hover:bg-gray-100 p-2 rounded-full`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image size={22} />
            </motion.button>
            <motion.button
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smile size={22} />
            </motion.button>
            <input
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:bg-gray-200 transition text-gray-800 placeholder-gray-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              disabled={sending}
            />
            <motion.button
              onClick={sendMessage}
              disabled={sending || !text.trim()}
              className="bg-pink-500 text-white p-2.5 rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: sending ? 1 : 1.05 }}
              whileTap={{ scale: sending ? 1 : 0.95 }}
            >
              <Send size={20} />
            </motion.button>
          </div>

          {/* Gallery Popup */}
          <AnimatePresence>
            {showGallery && (
              <motion.div
                className="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="text-pink-500" size={18} />
                    <h4 className="font-medium text-gray-700 text-sm">
                      Share a photo
                    </h4>
                  </div>
                  <motion.button
                    onClick={() => setShowGallery(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Send
                          size={16}
                          className="text-white opacity-0 hover:opacity-100"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Chat;
