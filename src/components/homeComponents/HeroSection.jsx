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
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              alt="Dating"
              className="rounded-3xl shadow-2xl object-cover h-[420px] w-full"
            />
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

          <motion.img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt="Safety"
            className="rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
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
