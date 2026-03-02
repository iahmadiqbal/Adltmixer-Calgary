import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Chat = () => {
  const { id } = useParams();
  const matchId = id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${matchId}`);
        setMessages(response.data);

        if (response.data.length > 0) {
          const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
          const firstMessage = response.data[0];
          const otherUserId =
            firstMessage.senderId === currentUserId
              ? firstMessage.receiverId
              : firstMessage.senderId;
          setOtherUser({ name: "Match" });
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [matchId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const response = await api.post("/messages", {
        matchId,
        content: text.trim(),
      });

      setMessages([...messages, response.data]);
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-gray-100">
      <motion.div
        className="bg-pink-600 text-white p-4 text-center font-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Chat with {otherUser?.name || "Match"}
      </motion.div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, i) => {
            const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
            const isMe = msg.senderId === currentUserId;

            return (
              <motion.div
                key={i}
                className={`max-w-xs px-4 py-2 rounded-xl ${
                  isMe ? "ml-auto bg-pink-600 text-white" : "bg-white"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {msg.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        className="p-4 flex gap-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          className="flex-1 px-4 py-2 rounded-xl border"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <motion.button
          onClick={sendMessage}
          className="px-6 py-2 bg-pink-600 text-white rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Chat;
