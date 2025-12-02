import React from "react";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";
import HowItWorks from "../../components/Dashbaord/HowItWorks";

// How It Works page pre-set for Experts
const HowItWorksExpertsMain = () => {
  return (
    <>
      <Header />
      <HowItWorks initialAudience="experts" tabMode="routes" />
      <Footer />
    </>
  );
};

export default HowItWorksExpertsMain;
