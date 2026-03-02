import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full bg-gray-50">
      {/* ================= HEADER WITH BACKGROUND IMAGE ================= */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Us Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="px-8 py-3 bg-white text-pink-600 font-bold text-sm rounded-full shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300">
              CONTACT US
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Let's Connect
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            We're here to help you find meaningful connections
          </motion.p>
        </motion.div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <motion.section 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-16 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <InfoCard
          icon={<Mail size={40} />}
          title="Email Us"
          text="support@adultmixercalgary.com"
          delay={0.1}
        />
        <InfoCard
          icon={<Phone size={40} />}
          title="Call Us"
          text="+1 (587) 123-4567"
          delay={0.3}
        />
        <InfoCard
          icon={<MapPin size={40} />}
          title="Location"
          text="Calgary, Alberta, Canada"
          delay={0.5}
        />
      </motion.section>

      {/* ================= FORM + TEXT ================= */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 mb-24">
        {/* FORM */}
        <motion.div 
          className="bg-white p-10 rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Send Us a Message
          </motion.h2>

          <motion.form 
            className="space-y-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.input
              type="text"
              placeholder="Your Full Name"
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              required
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />

            <motion.input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              required
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />

            <motion.textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              required
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            ></motion.textarea>

            <motion.button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Secure Message
            </motion.button>

            <motion.p 
              className="text-xs text-gray-500 text-center mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Your information is private and will never be shared.
            </motion.p>
          </motion.form>
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Safe. Private. Confidential.
          </motion.h3>
          <motion.p 
            className="text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            AdultMixer Calgary is a trusted adult dating platform focused on
            privacy, safety, and real connections. Our support team is trained
            to handle all inquiries discreetly and professionally.
          </motion.p>

          <motion.p 
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            If you have concerns regarding account security, abuse reports, or
            privacy issues, please contact us immediately. Your safety matters
            to us.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= MAP ================= */}
      <motion.section 
        className="max-w-6xl mx-auto px-6 mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Find Us in Calgary
        </motion.h2>
        <motion.div 
          className="rounded-3xl overflow-hidden shadow-lg h-96"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=calgary&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AdultMixer Calgary Location"
          ></iframe>
        </motion.div>
      </motion.section>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */

const InfoCard = ({ icon, title, text, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-2xl shadow-md text-center hover:-translate-y-1 transition"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="text-pink-600 mx-auto mb-3 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </motion.div>
  );
};

export default Contact;
