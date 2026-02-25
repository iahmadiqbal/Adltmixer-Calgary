import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <>
      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <h3 className="text-xl font-bold text-pink-600 mb-2">
            Easy Matching
          </h3>
          <p className="text-gray-600">
            Smart AI-based matching helps you find profiles that fit your
            preferences.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <h3 className="text-xl font-bold text-pink-600 mb-2">
            Verified Profiles
          </h3>
          <p className="text-gray-600">
            Every user profile is checked for authenticity & safety.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <h3 className="text-xl font-bold text-pink-600 mb-2">Instant Chat</h3>
          <p className="text-gray-600">
            Chat instantly with matches using our fast & secure messaging
            system.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default FeaturesSection;
