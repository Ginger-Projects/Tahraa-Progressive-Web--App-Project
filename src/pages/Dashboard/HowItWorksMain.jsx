import React from "react";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";
import HowItWorks from "../../components/Dashbaord/HowItWorks";

// Dashboard "How It Works" main page shell
// You can plug in your Header, main content sections, and Footer here.

const HowItWorksMain = () => {
  return (
    <>
      <Header />

      <HowItWorks />

      <Footer />
    </>
  );
};

export default HowItWorksMain;