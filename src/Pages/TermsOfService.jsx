import React from "react";
import { motion } from "framer-motion";
import { FileText, Users, AlertCircle, CheckCircle, XCircle, Scale, Shield, Bell } from "lucide-react";

const TermsOfService = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Adultmixer Calgary, you accept and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, please do not use our services. Your continued use of the platform constitutes acceptance of any updates to these terms. These terms apply to all users, including visitors, registered members, and premium subscribers. By creating an account, you represent that you are at least 18 years old and have the legal capacity to enter into this agreement.",
    },
    {
      icon: CheckCircle,
      title: "User Responsibilities & Account Security",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as necessary. You must notify us immediately of any unauthorized access or security breach. You are solely responsible for your interactions with other users and agree to exercise caution and common sense when meeting people online. You must not share your password with others or allow others to access your account.",
    },
    {
      icon: Shield,
      title: "Eligibility & Age Requirements",
      content:
        "You must be at least 18 years of age to create an account and use our services. By registering, you represent and warrant that you meet this age requirement and have the legal right to use our platform. We reserve the right to request proof of age and to terminate accounts of users who do not meet our age requirements. Users must also comply with all local, state, and federal laws regarding online conduct and acceptable content.",
    },
    {
      icon: XCircle,
      title: "Prohibited Activities & Conduct",
      content:
        "You may not use our platform to harass, abuse, threaten, or harm others. Posting false information, impersonating others, or engaging in fraudulent activities is strictly prohibited. You must not upload content that is illegal, offensive, discriminatory, or violates others' rights. Spamming, soliciting money, promoting commercial services, or using automated systems to access our platform is forbidden. We reserve the right to suspend or terminate accounts that violate these terms without prior notice or refund.",
    },
    {
      icon: FileText,
      title: "Content Ownership & User-Generated Content",
      content:
        "You retain ownership of all content you post on our platform, including photos, messages, and profile information. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content for the purpose of operating and promoting our services. You represent that you have all necessary rights to the content you post and that it does not violate any third-party rights. We reserve the right to remove any content that violates these terms or is deemed inappropriate.",
    },
    {
      icon: Scale,
      title: "Intellectual Property Rights",
      content:
        "All content on Adultmixer Calgary, including text, graphics, logos, icons, images, audio clips, software, and the overall design, is our property or licensed to us and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or create derivative works without our explicit written permission. The Adultmixer Calgary name, logo, and all related marks are our trademarks and may not be used without authorization.",
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability & Disclaimers",
      content:
        "We provide our services 'as is' and 'as available' without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free. We are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of our platform, including but not limited to loss of data, revenue, or profits. Our total liability to you for any claims is limited to the amount you paid us in the past 12 months. We are not responsible for the conduct of other users or for any offline interactions.",
    },
    {
      icon: Users,
      title: "Premium Subscriptions & Payments",
      content:
        "Premium features are available through paid subscriptions. All fees are non-refundable unless otherwise stated or required by law. Subscriptions automatically renew unless you cancel before the renewal date. You authorize us to charge your payment method for all fees incurred. We reserve the right to change our pricing and subscription plans with advance notice. If you dispute a charge, please contact our support team within 30 days of the transaction.",
    },
    {
      icon: XCircle,
      title: "Account Termination & Suspension",
      content:
        "We reserve the right to suspend or terminate your account at any time for violations of these terms, suspicious activity, or at our sole discretion. You may also delete your account at any time through your account settings. Upon termination, your right to use our services immediately ceases, and we may delete your data in accordance with our privacy policy. Termination does not relieve you of any obligations incurred prior to termination. We are not liable for any damages resulting from account suspension or termination.",
    },
    {
      icon: Scale,
      title: "Dispute Resolution & Governing Law",
      content:
        "These terms are governed by the laws of Alberta, Canada, without regard to conflict of law principles. Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in Calgary, Alberta, rather than in court, except where prohibited by law. You agree to waive your right to participate in class action lawsuits. If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full effect.",
    },
    {
      icon: Bell,
      title: "Modifications to Terms & Services",
      content:
        "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice. We may update these terms periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes by posting the updated terms on this page and updating the 'Effective Date.' Your continued use of our services after changes constitutes acceptance of the modified terms. If you do not agree to the changes, you must stop using our services and delete your account.",
    },
    {
      icon: FileText,
      title: "Contact & Support",
      content:
        "If you have any questions, concerns, or complaints about these Terms of Service, please contact our support team through the contact page or email us directly. We strive to respond to all inquiries within 48 hours. For legal matters, you may contact our legal department. We value your feedback and are committed to providing excellent customer service and addressing any issues promptly.",
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center"
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By using Adultmixer Calgary, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Effective Date: February 25, 2026
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
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Important Notice</h3>
              <p className="text-pink-100 leading-relaxed mb-4">
                These terms constitute a legally binding agreement between you and Adultmixer Calgary. 
                If you have any questions about these terms, please contact our legal team before using our services.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-100 transition"
              >
                Contact Legal Team
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            By continuing to use Adultmixer Calgary, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
