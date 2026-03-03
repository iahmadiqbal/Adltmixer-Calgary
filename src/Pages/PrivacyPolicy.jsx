import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us when creating your profile, including your name, email address, date of birth, gender, location, photos, and preferences for matches. We also collect information about your interactions on our platform, such as profiles you view, messages you send, and matches you make. Additionally, we automatically collect device information, IP address, browser type, and usage data to improve our services and ensure platform security.",
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content:
        "We use your information to create and maintain your account, facilitate connections with other users, and provide personalized match recommendations based on your preferences. Your data helps us improve our matching algorithm, send you notifications about new matches and messages, process payments for premium features, and ensure the safety and security of our community. We also use aggregated data for analytics to enhance user experience and develop new features.",
    },
    {
      icon: Database,
      title: "Data Storage & Security",
      content:
        "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information. Your data is encrypted both in transit and at rest using AES-256 encryption. We store your information on secure servers located in Canada and comply with all applicable data protection regulations. Our team regularly updates security protocols and monitors for potential threats. We retain your data for as long as your account is active or as needed to provide services.",
    },
    {
      icon: Eye,
      title: "Information Sharing & Visibility",
      content:
        "We do not sell your personal information to third parties. Your profile information, including photos and bio, is visible to other users based on your privacy settings and matching preferences. We may share limited information with trusted service providers who assist in operating our platform, such as payment processors, cloud hosting services, and customer support tools. These providers are contractually obligated to protect your data. We may also disclose information if required by law or to protect the rights and safety of our users.",
    },
    {
      icon: UserCheck,
      title: "Your Rights & Choices",
      content:
        "You have complete control over your personal information. You can access, update, or delete your profile data at any time through your account settings. You have the right to download a copy of your data, restrict certain data processing activities, and object to automated decision-making. You can manage your privacy settings to control who can see your profile and contact you. You can opt-out of marketing communications while still receiving essential service notifications. If you wish to delete your account, all your data will be permanently removed within 30 days.",
    },
    {
      icon: Bell,
      title: "Cookies & Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze platform usage. Essential cookies are necessary for the platform to function properly. Analytics cookies help us understand how users interact with our services. You can control cookie preferences through your browser settings, though disabling certain cookies may limit functionality. We also use third-party analytics tools like Google Analytics to gather insights about user behavior and improve our services.",
    },
    {
      icon: Shield,
      title: "Children's Privacy",
      content:
        "Our platform is strictly for users aged 18 and above. We do not knowingly collect information from individuals under 18 years of age. If we become aware that a user is underage, we will immediately terminate their account and delete all associated data. Parents or guardians who believe their child has provided information to us should contact our support team immediately.",
    },
    {
      icon: Database,
      title: "International Data Transfers",
      content:
        "While our primary servers are located in Canada, we may transfer your data to service providers in other countries for processing and storage. When we transfer data internationally, we ensure appropriate safeguards are in place, including standard contractual clauses and compliance with applicable data protection laws. Your data is always protected regardless of where it is processed.",
    },
    {
      icon: Bell,
      title: "Updates to This Policy",
      content:
        "We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of any significant changes by posting the new policy on this page, updating the 'Last Updated' date, and sending you an email notification if the changes materially affect your rights. We encourage you to review this policy periodically to stay informed about how we protect your information.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: February 25, 2026
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center"
                >
                  <section.icon className="w-6 h-6 text-pink-600" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">Questions About Privacy?</h3>
          <p className="text-pink-100 mb-6">
            If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
