import React from "react";
import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <>
    {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-40">
        <motion.div 
          className="max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Contact AdultMixer Calgary
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-pink-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We're here to help. Whether you have questions, feedback, or safety
            concerns, our support team is always ready to assist you.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

export default ContactHeader;
