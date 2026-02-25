import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$2.99",
      period: "per month",
      color: "from-blue-600 to-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      features: [
        { text: "Browse Profiles", included: true },
        { text: "Send Messages", included: false },
        { text: "Video Chat Access", included: false },
        { text: "Priority Support", included: false },
        { text: "Advanced Matching", included: false },
      ],
    },
    {
      name: "Standard",
      price: "$5.99",
      period: "per month",
      color: "from-pink-600 to-pink-600",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
      popular: true,
      features: [
        { text: "Browse Profiles", included: true },
        { text: "Send Messages", included: true },
        { text: "Video Chat Access", included: true },
        { text: "Priority Support", included: false },
        { text: "Advanced Matching", included: false },
      ],
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      color: "from-gray-800 to-gray-800",
      buttonColor: "bg-gray-800 hover:bg-gray-900",
      features: [
        { text: "Browse Profiles", included: true },
        { text: "Send Messages", included: true },
        { text: "Video Chat Access", included: true },
        { text: "Priority Support", included: true },
        { text: "Advanced Matching", included: true },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-20 lg:mb-24 px-2"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-5">
            Choose Your Perfect Plan
          </h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
            Find the right plan for your dating journey. All plans include basic
            features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-10 lg:gap-12 max-w-md md:max-w-none mx-auto px-4"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative w-full"
            >
              <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col pt-16 md:pt-20 pb-6 md:pb-8 px-4 md:px-6">
                {/* Plan Header with Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className={`w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-2xl absolute -top-14 md:-top-16 left-1/2 transform -translate-x-1/2`}
                >
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {plan.name}
                  </span>
                </motion.div>

                {/* Price Section */}
                <div className="text-center mb-6 md:mb-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
                      {plan.period}
                    </p>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-5 md:mb-6"></div>

                {/* Features List */}
                <div className="flex-grow mb-5 md:mb-6">
                  <ul className="space-y-3 md:space-y-4">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="flex items-center gap-2 md:gap-3"
                      >
                        {feature.included ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 md:w-5 md:h-5 text-red-400 flex-shrink-0" />
                        )}
                        <span
                          className={`text-xs md:text-sm ${
                            feature.included
                              ? "text-gray-700 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2.5 md:py-3 rounded-xl text-white font-semibold ${plan.buttonColor} transition-all duration-300 shadow-lg text-sm md:text-base`}
                >
                  BUY NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-10 md:mt-12 lg:mt-16 px-4"
        >
          <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
            Need a custom plan for your organization?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-all duration-300 shadow-lg text-sm md:text-base"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
