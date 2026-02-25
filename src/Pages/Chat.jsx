import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import profiles from "../data/profiles";

const Chat = () => {
  const { id } = useParams();
  const user = profiles.find(p => p.id === Number(id));

  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! How are you?" },
  ]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;
    setMessages([...messages, { from: "me", text }]);
    setText("");
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-gray-100">
      <motion.div 
        className="bg-pink-600 text-white p-4 text-center font-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Chat with {user.name}
      </motion.div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-xl ${
                msg.from === "me"
                  ? "ml-auto bg-pink-600 text-white"
                  : "bg-white"
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
