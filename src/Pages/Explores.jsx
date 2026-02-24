import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const allProfiles = [
  /* ================= WOMEN ================= */
  { id: 1, name: "Sophia", age: 24, gender: "woman", img: "https://i.pravatar.cc/400?img=44", bio: "Love deep conversations & romantic evenings." },
  { id: 2, name: "Emily", age: 23, gender: "woman", img: "https://i.pravatar.cc/400?img=48", bio: "Creative soul 🎨 | Coffee over clubs." },
  { id: 3, name: "Olivia", age: 26, gender: "woman", img: "https://i.pravatar.cc/400?img=49", bio: "Travel addict ✈️ | Sunset lover." },
  { id: 4, name: "Ava", age: 25, gender: "woman", img: "https://i.pravatar.cc/400?img=47", bio: "Positive vibes only 🌸" },
  { id: 5, name: "Mia", age: 22, gender: "woman", img: "https://i.pravatar.cc/400?img=32", bio: "Introvert but fun once comfortable." },
  { id: 6, name: "Charlotte", age: 27, gender: "woman", img: "https://i.pravatar.cc/400?img=10", bio: "Looking for real chemistry 💕" },
  { id: 7, name: "Amelia", age: 29, gender: "woman", img: "https://i.pravatar.cc/400?img=16", bio: "Wine, music & good talks." },
  { id: 8, name: "Harper", age: 24, gender: "woman", img: "https://i.pravatar.cc/400?img=19", bio: "Nature lover 🌿" },
  { id: 9, name: "Ella", age: 26, gender: "woman", img: "https://i.pravatar.cc/400?img=20", bio: "Soft heart, strong mind." },
  { id: 10, name: "Grace", age: 28, gender: "woman", img: "https://i.pravatar.cc/400?img=21", bio: "Meaningful connections only." },
  { id: 11, name: "Lily", age: 21, gender: "woman", img: "https://i.pravatar.cc/400?img=22", bio: "Young, wild & honest." },
  { id: 12, name: "Chloe", age: 25, gender: "woman", img: "https://i.pravatar.cc/400?img=23", bio: "Late-night talks hit different." },

  /* ================= MEN ================= */
  { id: 16, name: "Daniel", age: 28, gender: "man", img: "https://i.pravatar.cc/400?img=14", bio: "Fitness lover • Honest vibes." },
  { id: 17, name: "Ryan", age: 30, gender: "man", img: "https://i.pravatar.cc/400?img=12", bio: "Entrepreneur mindset." },
  { id: 18, name: "Ethan", age: 26, gender: "man", img: "https://i.pravatar.cc/400?img=11", bio: "Gym, grind & growth." },
  { id: 19, name: "Noah", age: 24, gender: "man", img: "https://i.pravatar.cc/400?img=56", bio: "Calm energy, real talks." },
  { id: 20, name: "Liam", age: 27, gender: "man", img: "https://i.pravatar.cc/400?img=13", bio: "Looking for something meaningful." },
  { id: 21, name: "Lucas", age: 29, gender: "man", img: "https://i.pravatar.cc/400?img=8", bio: "Driven & focused." },
  { id: 22, name: "Mason", age: 31, gender: "man", img: "https://i.pravatar.cc/400?img=57", bio: "Good vibes only 😌" },
  { id: 23, name: "Logan", age: 25, gender: "man", img: "https://i.pravatar.cc/400?img=58", bio: "Music & midnight drives." },
  { id: 24, name: "Jacob", age: 25, gender: "man", img: "https://i.pravatar.cc/400?img=59", bio: "Simple man, deep emotions." },
  { id: 25, name: "Aiden", age: 23, gender: "man", img: "https://i.pravatar.cc/400?img=51", bio: "Let's see where it goes." },
  { id: 26, name: "Henry", age: 32, gender: "man", img: "https://i.pravatar.cc/400?img=52", bio: "Mature & respectful." },
  { id: 27, name: "Leo", age: 26, gender: "man", img: "https://i.pravatar.cc/400?img=53", bio: "Adventure seeker 🌍" },
  { id: 28, name: "Jack", age: 29, gender: "man", img: "https://i.pravatar.cc/400?img=54", bio: "Looking for sparks ✨" },
  { id: 29, name: "Owen", age: 27, gender: "man", img: "https://i.pravatar.cc/400?img=55", bio: "Calm, caring & honest." },
  { id: 30, name: "Theo", age: 24, gender: "man", img: "https://i.pravatar.cc/400?img=56", bio: "Young heart, old soul." },

  /* ================= EVERYONE ================= */
  { id: 31, name: "Alex", age: 26, gender: "everyone", img: "https://i.pravatar.cc/400?img=60", bio: "Open-minded & friendly." },
  { id: 32, name: "Taylor", age: 28, gender: "everyone", img: "https://i.pravatar.cc/400?img=61", bio: "Let's connect naturally." },
  { id: 33, name: "Jordan", age: 25, gender: "everyone", img: "https://i.pravatar.cc/400?img=62", bio: "Energy matters ✨" },
  { id: 34, name: "Casey", age: 70, gender: "everyone", img: "https://i.pravatar.cc/400?img=63", bio: "Good conversations win." },
  { id: 35, name: "Morgan", age: 49, gender: "everyone", img: "https://i.pravatar.cc/400?img=64", bio: "Respect & honesty first." },
  { id: 36, name: "Riley", age: 57, gender: "everyone", img: "https://i.pravatar.cc/400?img=65", bio: "Looking for real vibes." },
  { id: 37, name: "George", age: 71, gender: "everyone", img: "https://i.pravatar.cc/400?img=66", bio: "No drama, just connection." },
  { id: 38, name: "Parker", age: 26, gender: "everyone", img: "https://i.pravatar.cc/400?img=67", bio: "Fun, chill & real." },
  { id: 39, name: "Avery", age: 22, gender: "everyone", img: "https://i.pravatar.cc/400?img=68", bio: "Still exploring life 🌱" },
  { id: 40, name: "Skyler", age: 55, gender: "everyone", img: "https://i.pravatar.cc/400?img=69", bio: "Let's talk & see." },
  { id: 41, name: "Jamie", age: 80, gender: "everyone", img: "https://i.pravatar.cc/400?img=70", bio: "Emotionally available." },
];




const Explore = () => {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [isAdult, setIsAdult] = useState(null);
  const [filter, setFilter] = useState("everyone");
  const [profiles, setProfiles] = useState(allProfiles);
  const [liked, setLiked] = useState([]);

  /* ================= AGE CHECK ================= */
  useEffect(() => {
    const verified = localStorage.getItem("adultVerified");
    if (verified === "true") setIsAdult(true);
    else setIsAdult(false);
  }, []);

  const handleAgeYes = () => {
    localStorage.setItem("adultVerified", "true");
    setIsAdult(true);
  };

  const handleAgeNo = () => {
    navigate("/");
  };

  /* ================= FILTER LOGIC ================= */
  const filteredProfiles =
    filter === "everyone"
      ? profiles
      : profiles.filter((p) => p.gender === filter);

  /* ================= ACTIONS ================= */
  const handleSkip = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

const handleLike = (profile) => {
  if (liked.includes(profile.id)) {
    setLiked(liked.filter((id) => id !== profile.id));
  } else {
    setLiked([...liked, profile.id]);
  }
};


  /* ================= AGE POPUP ================= */
  if (isAdult === false) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-pink-600">
            18+ Age Verification
          </h2>
          <p className="text-gray-600 mt-4">
            This website contains adult content. You must be at least 18 years
            old to continue.
          </p>

          <div className="mt-8 flex gap-4">
            <motion.button
              onClick={handleAgeNo}
              className="flex-1 py-3 rounded-xl border hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No
            </motion.button>
            <motion.button
              onClick={handleAgeYes}
              className="flex-1 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes, I'm 18+
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-28 px-6">
      {/* HEADER */}
      <motion.div 
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
          Explore Matches
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover real adults nearby. Filter by preference and connect with
          confidence.
        </p>
      </motion.div>

      {/* FILTER BUTTONS */}
      <motion.div 
        className="flex justify-center gap-4 mb-12 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {["everyone", "man", "woman"].map((type, index) => (
          <motion.button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              filter === type
                ? "bg-pink-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === "everyone" && "Everyone"}
            {type === "man" && "Men"}
            {type === "woman" && "Women"}
          </motion.button>
        ))}
      </motion.div>

      {/* PROFILES */}
      {filteredProfiles.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredProfiles.map((user, index) => (
              <motion.div
                key={user.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <img
                  src={user.img}
                  alt={user.name}
                  loading="lazy"
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">
                    {user.name}, {user.age}
                  </h2>
                  <p className="text-gray-600 mt-2">{user.bio}</p>

                  <div className="mt-6 flex gap-4">
                    <motion.button
                      onClick={() => handleSkip(user.id)}
                      className="flex-1 py-3 rounded-xl border flex justify-center items-center gap-2 hover:bg-gray-100"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X /> Skip
                    </motion.button>
                    <motion.button
                      onClick={() => handleLike(user)}
                      className={`flex-1 py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition
                        ${
                          liked.includes(user.id)
                            ? "bg-red-100 text-red-600"
                            : "bg-white border text-gray-600 hover:bg-gray-100"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart
                        className={`${
                          liked.includes(user.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                      {liked.includes(user.id) ? "Liked" : "Like"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center mt-20 text-gray-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Users size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">No profiles available</h2>
          <p>Try changing filters or come back later.</p>
        </motion.div>
      )}

      {/* LIKED COUNTER */}
      <AnimatePresence>
        {liked.length > 0 && (
          <motion.div 
            className="fixed bottom-6 right-6 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ❤️ Liked: {liked.length}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
