import React, { useState, useEffect } from "react";
import Header from "../../components/Dashbaord/Header";
import ExpertsBanner from "../../components/Dashbaord/ExpertBanner";
import ExpertsListing from "../../components/Dashbaord/ExpertListing";
import FAQSection from "../../components/Dashbaord/FAQSection";
import { Footer } from "../../components/Home/Footer";
import { getExpertService, getPackages } from "../../services/expertService";

import "./ExpertsPage.css";

const PackagesPage = () => {
  const [activeTab, setActiveTab] = useState("packages");

  const PAGE_LIMIT = 4;

  const [experts, setExperts] = useState([]);
  const [packages, setPackages] = useState([]);

  const [expertsPage, setExpertsPage] = useState(1);
  const [expertsTotalPages, setExpertsTotalPages] = useState(1);

  const [packagesPage, setPackagesPage] = useState(1);
  const [packagesTotalPages, setPackagesTotalPages] = useState(1);

  const [searchName, setSearchName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchExpertsData = async () => {
      try {
        const res = await getExpertService(expertsPage, PAGE_LIMIT, searchName);
        const payload = res?.data || {};
        const list = payload.experts || [];
        const totalCount = payload.totalExpertsCount || list.length || 0;

        setExperts(list);
        setExpertsTotalPages(Math.max(1, Math.ceil(totalCount / PAGE_LIMIT)));
      } catch (error) {
        console.error("Failed to load experts", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchExpertsData();
  }, [expertsPage, searchName]);

  useEffect(() => {
    const fetchPackagesData = async () => {
      try {
        const res = await getPackages(packagesPage, PAGE_LIMIT, searchName);
        const payload = res?.data || {};
        const list = payload.packages || [];
        const totalCount = payload.totalPackagesCount || list.length || 0;

        setPackages(list);
        setPackagesTotalPages(Math.max(1, Math.ceil(totalCount / PAGE_LIMIT)));
      } catch (error) {
        console.error("Failed to load packages", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchPackagesData();
  }, [packagesPage, searchName]);

  const handleSearch = (term) => {
    const value = term || "";
    setSearchName(value);
    // reset pages when a new search is performed
    setExpertsPage(1);
    setPackagesPage(1);
    setIsSearching(true);
  };

  return (
    <div className="experts-page">
      <Header />
      <ExpertsBanner
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={handleSearch}
        isSearching={isSearching}
      />
      <ExpertsListing
        activeTab={activeTab}
        experts={experts}
        packages={packages}
        expertsPage={expertsPage}
        expertsTotalPages={expertsTotalPages}
        packagesPage={packagesPage}
        packagesTotalPages={packagesTotalPages}
        onChangeExpertsPage={setExpertsPage}
        onChangePackagesPage={setPackagesPage}
      />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default PackagesPage;
