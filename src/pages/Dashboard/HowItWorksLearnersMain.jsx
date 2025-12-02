import React from "react";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";
import HowItWorks from "../../components/Dashbaord/HowItWorks";

// How It Works page pre-set for Learners
const HowItWorksLearnersMain = () => {
  return (
    <>
      <Header />
      <HowItWorks initialAudience="learners" tabMode="routes" />
      <Footer />
    </>
  );
};

export default HowItWorksLearnersMain;
