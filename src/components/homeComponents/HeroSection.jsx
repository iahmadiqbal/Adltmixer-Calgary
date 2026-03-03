import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MessageCircle,
  Users,
  MapPin,
  Lock,
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-4 md:gap-6 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:pr-8"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Find Real Connections in{" "}
              <span className="text-yellow-300">Calgary</span>
            </motion.h1>

            <motion.p 
              className="mt-6 text-lg text-pink-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              AdultMixer Calgary is a premium dating platform designed for adults
              looking for genuine connections, meaningful conversations, and
              exciting experiences.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/explore"
                  className="bg-pink-700 px-6 py-3 rounded-xl font-semibold hover:bg-pink-800 transition"
                >
                  Explore Matches
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-center items-center mt-12 md:mt-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-7xl h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center px-4 sm:px-0">
              
              {/* Minimal Animated Particle Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: i % 2 === 0 ? '#ffffff' : '#fef3c7',
                    }}
                    animate={{
                      y: [0, -60, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.1, 0.3, 0.1],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>

              {/* Main Interactive Dating Wheel */}
              <div className="relative z-10">
                
                {/* Central Love Meter - Responsive */}
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-full p-4 sm:p-5 md:p-6 shadow-2xl border-2 sm:border-3 md:border-4 border-white/90">
                    <motion.div
                      className="text-white text-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div 
                        className="text-xl sm:text-2xl md:text-3xl mb-1"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        💖
                      </motion.div>
                      <div className="text-[8px] sm:text-[9px] md:text-xs font-bold tracking-wide opacity-90">LOVE METER</div>
                      <motion.div
                        className="text-sm sm:text-lg md:text-xl font-bold mt-1"
                        animate={{ 
                          color: ["#ffffff", "#fef08a", "#ffffff"],
                          textShadow: ["0 0 5px rgba(255,255,255,0.5)", "0 0 15px rgba(254,240,138,0.8)", "0 0 5px rgba(255,255,255,0.5)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        98%
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Rotating Dating Profiles Wheel - Responsive */}
                <motion.div
                  className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[
                    { emoji: "👩‍💼", name: "Sarah", age: "28", color: "from-pink-400 via-pink-500 to-rose-500", shadow: "shadow-pink-200" },
                    { emoji: "👨‍💻", name: "Mike", age: "32", color: "from-blue-400 via-blue-500 to-indigo-500", shadow: "shadow-blue-200" },
                    { emoji: "👩‍🎨", name: "Emma", age: "26", color: "from-purple-400 via-purple-500 to-pink-500", shadow: "shadow-purple-200" },
                    { emoji: "👨‍🍳", name: "Alex", age: "30", color: "from-emerald-400 via-teal-500 to-cyan-500", shadow: "shadow-emerald-200" },
                    { emoji: "👩‍⚕️", name: "Lisa", age: "29", color: "from-rose-400 via-pink-500 to-orange-400", shadow: "shadow-rose-200" },
                    { emoji: "👨‍🎓", name: "David", age: "27", color: "from-indigo-400 via-purple-500 to-pink-400", shadow: "shadow-indigo-200" },
                  ].map((profile, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
                    const radius = window.innerWidth < 640 ? 110 : window.innerWidth < 768 ? 125 : 140;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={index}
                        className={`absolute bg-gradient-to-br ${profile.color} rounded-xl sm:rounded-2xl p-2 sm:p-2.5 md:p-3 ${profile.shadow} shadow-lg border-2 border-white/80 cursor-pointer backdrop-blur-sm`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                          width: "55px",
                          height: "70px",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.15, type: "spring" }}
                        whileHover={{ 
                          scale: 1.15, 
                          zIndex: 50,
                          rotate: [0, -8, 8, 0],
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="text-center text-white"
                        >
                          <div className="text-lg sm:text-xl md:text-2xl mb-0.5">{profile.emoji}</div>
                          <div className="text-[9px] sm:text-[10px] md:text-xs font-bold drop-shadow-sm">{profile.name}</div>
                          <div className="text-[8px] sm:text-[9px] md:text-xs opacity-90">{profile.age}</div>
                        </motion.div>
                        
                        {/* Floating Hearts on Hover */}
                        <motion.div
                          className="absolute -top-1 -right-1 text-xs sm:text-sm md:text-base"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ 
                            scale: [0, 1.2, 1], 
                            opacity: [0, 1, 0.8],
                            rotate: [0, 180, 360] 
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          ❤️
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Interactive Match Sparks - Responsive */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-base sm:text-lg md:text-xl pointer-events-none drop-shadow-sm"
                    style={{
                      left: `${35 + (i % 3) * 30}%`,
                      top: `${30 + Math.floor(i / 3) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1.3, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 2.5 + i * 0.4,
                      repeatDelay: 4,
                    }}
                  >
                    ⚡
                  </motion.div>
                ))}

                {/* Success Explosion Effect - Responsive */}
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.8, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 6,
                    delay: 4,
                  }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl drop-shadow-lg">💥</div>
                </motion.div>
              </div>

              {/* Live Action Notifications - Responsive */}
              <motion.div
                className="absolute top-2 sm:top-3 md:top-5 right-2 sm:right-3 md:right-5 space-y-1.5 sm:space-y-2 md:space-y-3"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {[
                  { text: "New Match!", icon: "💕", color: "bg-gradient-to-r from-green-500 to-emerald-500", textColor: "text-white" },
                  { text: "Message", icon: "💌", color: "bg-gradient-to-r from-blue-500 to-cyan-500", textColor: "text-white" },
                  { text: "Liked", icon: "👍", color: "bg-gradient-to-r from-purple-500 to-pink-500", textColor: "text-white" },
                ].map((notification, index) => (
                  <motion.div
                    key={index}
                    className={`${notification.color} ${notification.textColor} px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 md:gap-3 backdrop-blur-sm border border-white/20`}
                    initial={{ scale: 0, x: 50 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 3 + index * 0.6, type: "spring" }}
                    whileHover={{ scale: 1.05, x: -5 }}
                  >
                    <motion.span
                      className="text-xs sm:text-sm md:text-base"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {notification.icon}
                    </motion.span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-semibold drop-shadow-sm">{notification.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Interactive Stats Dashboard - Responsive */}
              <motion.div
                className="absolute bottom-2 sm:bottom-3 md:bottom-5 left-2 sm:left-3 md:left-5 bg-gradient-to-br from-white via-pink-50 to-rose-50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 md:p-5 shadow-2xl border-2 border-pink-200"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-center">
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-2 sm:p-2.5 md:p-3">
                    <motion.div
                      className="text-base sm:text-xl md:text-2xl font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.span
                        className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent"
                        animate={{ 
                          backgroundPosition: ["0%", "100%", "0%"],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ backgroundSize: "200% auto" }}
                      >
                        1.2K
                      </motion.span>
                    </motion.div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs text-pink-700 font-semibold mt-0.5">Matches</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg p-2 sm:p-2.5 md:p-3">
                    <motion.div
                      className="text-base sm:text-xl md:text-2xl font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <motion.span
                        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent"
                        animate={{ 
                          backgroundPosition: ["0%", "100%", "0%"],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        style={{ backgroundSize: "200% auto" }}
                      >
                        89%
                      </motion.span>
                    </motion.div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs text-emerald-700 font-semibold mt-0.5">Success</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Action Buttons - Responsive */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-5 right-2 sm:right-3 md:right-5 flex gap-2 sm:gap-3 md:gap-4">
                <motion.button
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-xl border-2 border-white/20"
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)", 
                      "0 0 0 10px rgba(239, 68, 68, 0)", 
                      "0 0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl drop-shadow-sm">👎</span>
                </motion.button>
                
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-xl border-2 border-white/20"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)", 
                      "0 0 0 10px rgba(34, 197, 94, 0)", 
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl drop-shadow-sm">💖</span>
                </motion.button>
              </div>

              {/* Magic Wand Effect - Hidden on Mobile */}
              <motion.div
                className="hidden sm:block absolute text-2xl sm:text-3xl md:text-3xl pointer-events-none drop-shadow-lg"
                initial={{ x: -50, y: 100, opacity: 0, rotate: -45 }}
                animate={{ 
                  x: ["-50px", "calc(100% + 50px)"],
                  y: [100, 60, 140, 90],
                  opacity: [0, 0.8, 0.8, 0],
                  rotate: [-45, 45, -45, 45]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              >
                🪄✨
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST STATS ================= */}
      <section className="bg-white py-16">
        <motion.div 
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Stat value="50K+" label="Active Members" />
          <Stat value="100%" label="Verified Profiles" />
          <Stat value="24/7" label="Moderation" />
          <Stat value="Calgary" label="Local Community" />
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose{" "}
            <span className="text-pink-600">AdultMixer Calgary</span>?
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
          >
            <Feature
              icon={<Users size={32} />}
              title="Smart Matching"
              text="Advanced algorithms match you with people based on interests, preferences, and location."
              delay={0.2}
            />
            <Feature
              icon={<MessageCircle size={32} />}
              title="Instant Chat"
              text="Chat instantly with matches using a fast, secure, and private messaging system."
              delay={0.4}
            />
            <Feature
              icon={<ShieldCheck size={32} />}
              title="Verified Profiles"
              text="Every profile is manually reviewed to ensure safety and authenticity."
              delay={0.6}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <Step
              number="1"
              title="Create Your Profile"
              text="Sign up in minutes and build an attractive profile that reflects your personality."
              delay={0.2}
            />
            <Step
              number="2"
              title="Discover Matches"
              text="Browse and connect with local singles in Calgary that match your interests."
              delay={0.4}
            />
            <Step
              number="3"
              title="Start Connecting"
              text="Chat, meet, and build real connections with confidence and privacy."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* ================= SAFETY ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Your Safety Comes First
            </h2>

            <p className="text-gray-600 mb-4">
              AdultMixer Calgary is built with privacy and security at its core.
              We use industry-standard encryption and strict moderation policies.
            </p>

            <motion.ul 
              className="space-y-3 text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.li 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Lock className="text-pink-600" /> Secure data protection
              </motion.li>
              <motion.li 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <ShieldCheck className="text-pink-600" /> Profile verification
              </motion.li>
              <motion.li 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <MapPin className="text-pink-600" /> Local Calgary matches only
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div
            className="rounded-3xl shadow-xl w-full max-w-sm mx-auto h-80 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Safety"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Meet Someone Special?
          </h2>

          <p className="mt-4 text-pink-100">
           Join Adultmixer Calgary today & explore amazing connections waiting for you.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="inline-block mt-8 bg-white text-pink-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Join Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Feature = ({ icon, title, text, delay = 0 }) => (
  <motion.div 
    className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="text-pink-600 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </motion.div>
);

const Step = ({ number, title, text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <motion.div 
      className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-pink-600 text-white font-bold text-xl mb-4"
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {number}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.1 }}
  >
    <h3 className="text-3xl font-bold text-pink-600">{value}</h3>
    <p className="text-gray-600 mt-2">{label}</p>
  </motion.div>
);

export default HeroSection;
