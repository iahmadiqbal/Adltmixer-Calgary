import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Award, Heart, Crown, Zap, Shield, Star } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    {
      name: "Starter",
      icon: Heart,
      tagline: "Perfect for beginners",
      price: billingCycle === "monthly" ? "$2.99" : "$29.99",
      originalPrice: billingCycle === "monthly" ? "" : "$35.88",
      period: billingCycle === "monthly" ? "per month" : "per year",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50 to-cyan-50",
      buttonGradient: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
      iconBg: "bg-gradient-to-br from-blue-400 to-cyan-400",
      features: [
        { text: "Browse unlimited profiles", included: true },
        { text: "5 likes per day", included: true },
        { text: "Basic matching algorithm", included: true },
        { text: "Send messages", included: false },
        { text: "Video chat access", included: false },
        { text: "See who liked you", included: false },
        { text: "Priority support", included: false },
        { text: "Advanced filters", included: false },
      ],
    },
    {
      name: "Premium",
      icon: Award,
      tagline: "Most popular choice",
      price: billingCycle === "monthly" ? "$5.99" : "$59.99",
      originalPrice: billingCycle === "monthly" ? "" : "$71.88",
      period: billingCycle === "monthly" ? "per month" : "per year",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgGradient: "from-pink-50 to-rose-50",
      buttonGradient: "from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
      iconBg: "bg-gradient-to-br from-pink-400 to-rose-400",
      popular: true,
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Unlimited likes", included: true },
        { text: "Send unlimited messages", included: true },
        { text: "Video chat access", included: true },
        { text: "See who liked you", included: true },
        { text: "Advanced matching AI", included: true },
        { text: "Priority support", included: false },
        { text: "Profile boost (2x/month)", included: false },
      ],
    },
    {
      name: "Elite",
      icon: Crown,
      tagline: "Ultimate experience",
      price: billingCycle === "monthly" ? "$9.99" : "$99.99",
      originalPrice: billingCycle === "monthly" ? "" : "$119.88",
      period: billingCycle === "monthly" ? "per month" : "per year",
      gradient: "from-purple-600 via-violet-600 to-indigo-600",
      bgGradient: "from-purple-50 to-violet-50",
      buttonGradient: "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
      iconBg: "bg-gradient-to-br from-purple-400 to-indigo-400",
      features: [
        { text: "Everything in Premium", included: true },
        { text: "Priority profile placement", included: true },
        { text: "Advanced filters & search", included: true },
        { text: "Read receipts", included: true },
        { text: "Incognito mode", included: true },
        { text: "Profile boost (unlimited)", included: true },
        { text: "24/7 VIP support", included: true },
        { text: "Exclusive events access", included: true },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 px-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Special Launch Offer - Save up to 20%</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Find Your Perfect Match
            </span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed text-lg">
            Choose the plan that fits your journey to love. All plans come with our happiness guarantee.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-semibold transition-colors ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative w-16 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg transition-all hover:shadow-xl"
            >
              <motion.div
                animate={{ x: billingCycle === "monthly" ? 2 : 34 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-400"}`}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-md md:max-w-none mx-auto"
        >
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative ${plan.popular ? "md:scale-105 lg:scale-110" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-4 -right-4 z-20"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-white" />
                      POPULAR
                    </div>
                  </motion.div>
                )}

                <div className={`relative bg-gradient-to-br ${plan.bgGradient} rounded-3xl shadow-2xl h-full flex flex-col p-8 border-2 border-white overflow-hidden ${plan.popular ? "ring-4 ring-pink-300 ring-opacity-50" : ""}`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-12 -mb-12" />

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    className={`w-16 h-16 ${plan.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Plan Name & Tagline */}
                  <div className="mb-6 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{plan.tagline}</p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6 relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-base text-gray-400 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 text-sm font-medium">{plan.period}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

                  {/* Features List */}
                  <div className="flex-grow mb-6 relative z-10">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            feature.included 
                              ? "bg-green-100" 
                              : "bg-gray-100"
                          }`}>
                            {feature.included ? (
                              <Check className="w-3 h-3 text-green-600 font-bold" />
                            ) : (
                              <X className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              feature.included 
                                ? "text-gray-800 font-medium" 
                                : "text-gray-400"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${plan.buttonGradient} transition-all duration-300 shadow-xl hover:shadow-2xl relative z-10 flex items-center justify-center gap-2`}
                  >
                    <Zap className="w-5 h-5" />
                    Get Started Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">100% Secure</h4>
                <p className="text-gray-600 text-sm">Your data is encrypted and protected</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">50K+ Matches</h4>
                <p className="text-gray-600 text-sm">Made every month on our platform</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">4.9/5 Rating</h4>
                <p className="text-gray-600 text-sm">From 10,000+ happy users</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          id="faqs"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 md:mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about our plans
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to new features. If you downgrade, changes will take effect at the end of your current billing cycle."
              },
              {
                question: "Are all profiles on AdultMixer Calgary verified?",
                answer: "Absolutely! We manually review every profile to ensure authenticity and safety. Our verification process includes photo verification and profile screening to maintain a trusted community of genuine users in Calgary."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All payments are processed securely with industry-standard encryption to protect your financial information."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time with no cancellation fees. You'll continue to have access to premium features until the end of your current billing period. Plus, we offer a 30-day money-back guarantee if you're not satisfied."
              },
              {
                question: "How does the matching algorithm work?",
                answer: "Our smart AI-powered matching algorithm analyzes your preferences, interests, location, and activity to suggest the most compatible matches in Calgary. Premium and Elite members get access to advanced matching features for even better results."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold group-open:rotate-45 transition-transform duration-300"
                    >
                      +
                    </motion.div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Contact Support
              </motion.button>
            </Link>
            <a href="#faqs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All FAQs
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 px-6 py-4 rounded-2xl">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-gray-800 font-semibold">
              30-Day Money Back Guarantee - No Questions Asked
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
