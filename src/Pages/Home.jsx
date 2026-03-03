import React from "react";
import HeroSection from "../components/homeComponents/HeroSection";
import FeaturesSection from "../components/homeComponents/FeaturesSection";
import CallToAction from "../components/homeComponents/CallToAction";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-8">
      <HeroSection />
      <FeaturesSection />
      {/* <CallToAction /> */}
    </div>
  );
};

export default Home;
