import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import profiles from "../data/profiles";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = profiles.find((p) => p.id === Number(id));

  const [liked, setLiked] = useState(false);

  // Load like status
  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    setLiked(likes.includes(Number(id)));
  }, [id]);

  // Like / Unlike
  const handleLike = () => {
    let likes = JSON.parse(localStorage.getItem("likes")) || [];
    if (likes.includes(Number(id))) {
      likes = likes.filter((l) => l !== Number(id));
      setLiked(false);
    } else {
      likes.push(Number(id));
      setLiked(true);
    }
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  // Safety check
  if (!user) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Profile not found 😕
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-pink-50">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 text-center relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Status Badge */}
        <motion.span
          className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full ${
            user.status === "Online"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {user.status}
        </motion.span>

        {/* Profile Image */}
        <motion.img
          src={user.img}
          alt={user.name}
          className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-pink-200"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        />

        {/* Name & Age */}
        <motion.h1 
          className="text-3xl font-bold mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
        <span className="text-pink-600">Name-</span>  {user.name} <br/> <span className="text-pink-600">Age-</span> {user.age}
        </motion.h1>

        {/* Bio */}
        <motion.p 
          className="text-pink-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user.bio}
        </motion.p>

        {/* Actions */}
        <motion.div 
          className="mt-6 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => navigate(`/chat/${user.id}`)}
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Message 💬
          </motion.button>

          <motion.button
            onClick={handleLike}
            className={`w-full py-3 rounded-xl font-semibold border transition ${
              liked
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-white text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {liked ? "❤️ Liked" : "🤍 Like Profile"}
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            className="w-full py-3 border rounded-xl text-gray-600 hover:bg-gray-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
