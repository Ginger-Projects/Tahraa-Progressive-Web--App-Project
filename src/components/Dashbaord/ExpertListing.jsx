import React, { useState } from "react";
import "./ExpertsListing.css";
import ExpertCard from "./ExpertCard";
import PackageCard from "./PackageCard";

const ExpertsListing = ({ activeTab, experts, packages }) => {
  const [viewType, setViewType] = useState("grid"); // "grid" | "list"
  const list = activeTab === "experts" ? experts : packages;

  return (
    <section className="exp-listing-section">

      {/* HEADER */}
      <div className="exp-listing-header">
        <div className="exp-results">
          <span className="exp-results-label">Search results:</span>
          <span className="exp-results-count">
            {activeTab === "experts"
              ? "72 Vocal Experts available"
              : "12 Packages available"}
          </span>
        </div>

        {/* VIEW TOGGLE BUTTONS */}
        <div className="exp-view-toggle">
          <button
            className={`view-btn ${viewType === "grid" ? "active" : ""}`}
            onClick={() => setViewType("grid")}
          >
            <span className="view-icon grid" />
          </button>

          <button
            className={`view-btn ${viewType === "list" ? "active" : ""}`}
            onClick={() => setViewType("list")}
          >
            <span className="view-icon list" />
          </button>
        </div>
      </div>

      {/* LISTING */}
      <div className={`exp-cards-grid ${viewType}`}>
        {activeTab === "experts"
          ? list.map((exp) => (
              <ExpertCard key={exp.id} data={exp} view={viewType} />
            ))
          : list.map((pkg) => (
              <PackageCard key={pkg.id} data={pkg} view={viewType} />
            ))}
      </div>

      {/* PAGINATION */}
      <div className="exp-pagination">
        <button className="BTNsliderMain">
          <div className="rectangle-2" />
          <div className="label">‹</div>
        </button>

        <span className="page-text">1 / 20</span>

        <button className="BTNsliderMain">
          <div className="rectangle-2 active" />
          <div className="label">›</div>
        </button>
      </div>
    </section>
  );
};

export default ExpertsListing;
