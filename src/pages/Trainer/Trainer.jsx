import TraineeHeader from "../../components/trainee/header";
import WelcomeCard from "../../components/trainee/WelcomeCard";
import ScheduleSection from "../../components/trainee/ScheduleSection";
import MyExperts from "../../components/trainee/MyExperts";
import Packages from "../../components/trainee/Packages";
import CourseCard from "../../components/trainee/GroupCourse";
import PackageSummary from "../../components/trainee/PackageSummary";
import { Footer } from "../../components/Home/Footer";
import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./Trainer.css";

const Trainer = () => {
  const [loadingCount, setLoadingCount] = useState(0);
  const loading = loadingCount > 0;

  const handleSectionLoadingChange = (isLoading) => {
    setLoadingCount((prev) => {
      const next = isLoading ? prev + 1 : prev - 1;
      return next < 0 ? 0 : next;
    });
  };

  return (
    <div className="trainer-container">
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#ffffff",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader /> 
        </div>
      )}
      <TraineeHeader />

      <div className="trainer-page">
        <div className="trainer-grid">
          {/* Left column: Welcome + Group course */}
          <div className="left-column">
            <WelcomeCard />
            <CourseCard onLoadingChange={handleSectionLoadingChange} />
          </div>

          {/* Right column: Schedule + Experts */}
          <div className="right-column">
            <ScheduleSection onLoadingChange={handleSectionLoadingChange} />
            <div className="experts-row">
              <MyExperts onLoadingChange={handleSectionLoadingChange} />
              <Packages onLoadingChange={handleSectionLoadingChange} />
            </div>
          </div>
        </div>

        <PackageSummary />
      </div>

      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Trainer;
