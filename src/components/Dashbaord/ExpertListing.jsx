import React, { useState } from "react";
import "./ExpertsListing.css";
import ExpertCard from "./ExpertCard";
import PackageCard from "./PackageCard";
import gridIcon from "../../assets/images/grid.svg";
import listIcon from "../../assets/images/list.svg";

const ExpertsListing = ({
  activeTab,
  experts,
  packages,
  expertsPage = 1,
  expertsTotalPages = 1,
  packagesPage = 1,
  packagesTotalPages = 1,
  onChangeExpertsPage,
  onChangePackagesPage,
  expertsTotalCount,
  packagesTotalCount,
  isSearching,
}) => {
  const [viewType, setViewType] = useState("grid"); // "grid" | "list"
  const list = activeTab === "experts" ? experts : packages;

  const currentPage =
    activeTab === "experts" ? expertsPage : packagesPage;
  const totalPages =
    activeTab === "experts" ? expertsTotalPages : packagesTotalPages;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrev = () => {
    if (currentPage <= 1) return;

    if (activeTab === "experts") {
      onChangeExpertsPage && onChangeExpertsPage(currentPage - 1);
    } else {
      onChangePackagesPage && onChangePackagesPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage >= totalPages) return;

    if (activeTab === "experts") {
      onChangeExpertsPage && onChangeExpertsPage(currentPage + 1);
    } else {
      onChangePackagesPage && onChangePackagesPage(currentPage + 1);
    }
  };

  const totalExpertsLabel =
    typeof expertsTotalCount === "number"
      ? expertsTotalCount
      : Array.isArray(experts)
      ? experts.length
      : 0;

  const totalPackagesLabel =
    typeof packagesTotalCount === "number"
      ? packagesTotalCount
      : Array.isArray(packages)
      ? packages.length
      : 0;

  const resultsText = isSearching
    ? "Loading..."
    : activeTab === "experts"
    ? `${totalExpertsLabel} Experts available`
    : `${totalPackagesLabel} Packages available`;

  return (
    <section className="exp-listing-section">

      {/* HEADER */}
      <div className="exp-listing-header">
        <div className="exp-results">
          <span className="exp-results-label">Search results:</span>
          <span className="exp-results-count">{resultsText}</span>
        </div>

        {/* VIEW TOGGLE BUTTONS */}
        <div className="exp-view-toggle">
          <button
            className={`view-btn ${viewType === "grid" ? "active" : ""}`}
            onClick={() => setViewType("grid")}
          >
            <span className="view-icon grid">
              <img src={gridIcon} alt="Grid view" />
            </span>
          </button>

          <button
            className={`view-btn ${viewType === "list" ? "active" : ""}`}
            onClick={() => setViewType("list")}
          >
            <span className="view-icon list">
              <img src={listIcon} alt="List view" />
            </span>
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
        <button className="BTNsliderMain" onClick={handlePrev}>
          <div className={`rectangle-2 ${hasPrev ? "active" : ""}`} />
          <div className="label">
            ‹
          </div>
        </button>

        <span className="page-text">
          {currentPage} / {totalPages}
        </span>

        <button className="BTNsliderMain" onClick={handleNext}>
          <div className={`rectangle-2 ${hasNext ? "active" : ""}`} />
          <div className="label">
            ›
          </div>
        </button>
      </div>
    </section>
  );
};

export default ExpertsListing;
