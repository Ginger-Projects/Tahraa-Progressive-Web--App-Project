import React, { useState } from "react";
import Header from "../../components/Dashbaord/Header";
import ExpertsBanner from "../../components/Dashbaord/ExpertBanner";
import ExpertsListing from "../../components/Dashbaord/ExpertListing";
import FAQSection from "../../components/Dashbaord/FAQSection";
import {Footer} from '../../components/Home/Footer';
import { expertsData } from "../../components/Dashbaord/expertsData";
import { packagesData } from "../../components/Dashbaord/packagesData";

import "./ExpertsPage.css";

const ExpertsPage = () => {
  const [activeTab, setActiveTab] = useState("experts");

  return (
    <div className="experts-page">
      <Header />
      <ExpertsBanner activeTab={activeTab} setActiveTab={setActiveTab} />
      <ExpertsListing
        activeTab={activeTab}
        experts={expertsData}
        packages={packagesData}
      />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default ExpertsPage;
