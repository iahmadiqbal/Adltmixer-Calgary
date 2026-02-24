import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfoCards = () => {
  return (
    <>
      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mb-14">
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:-translate-y-1 transition cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Mail className="mx-auto text-pink-600 mb-3" size={40} />
          <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
          <p className="text-gray-600 mt-2">support@adultmixercalgary.com</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:-translate-y-1 transition cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Phone className="mx-auto text-pink-600 mb-3" size={40} />
          <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
          <p className="text-gray-600 mt-2">+1 (587) 123-4567</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:-translate-y-1 transition cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <MapPin className="mx-auto text-pink-600 mb-3" size={40} />
          <h3 className="text-xl font-bold text-gray-800">Location</h3>
          <p className="text-gray-600 mt-2">Calgary, Alberta, Canada</p>
        </motion.div>
      </section>
    </>
  );
};

export default ContactInfoCards;
