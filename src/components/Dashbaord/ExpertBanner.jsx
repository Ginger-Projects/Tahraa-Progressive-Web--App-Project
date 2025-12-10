import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExpertsBanner.css";
import Button from "../../components/Button";

const ExpertsBanner = ({ activeTab, setActiveTab, onSearch, isSearching }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFee, setSelectedFee] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedTrainee, setSelectedTrainee] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Languages spoken");
  const navigate = useNavigate();

  return (
    <section className='exp-banner'>
      <div className='exp-banner-inner'>
        <h1 className='exp-banner-title'>Find Reliable And Experienced Experts</h1>
        <p className='exp-banner-subtitle'>Your search ends here. Pick an expert of your choice.</p>

        <div className='exp-banner-toggle'>
          <button
            className={`toggle-btn ${activeTab === "experts" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("experts");
              navigate("/our-experts");
            }}
          >
            Expert
          </button>
          <button
            className={`toggle-btn ${activeTab === "packages" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("packages");
              navigate("/our-packages");
            }}
          >
            Packages
          </button>
        </div>

        {/* Search */}
        <div className='exp-search-row'>
          <div className='exp-search-input'>
            <span className='search-icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                <g opacity='0.5'>
                  <path
                    d='M8.625 16.3125C4.3875 16.3125 0.9375 12.8625 0.9375 8.625C0.9375 4.3875 4.3875 0.9375 8.625 0.9375C12.8625 0.9375 16.3125 4.3875 16.3125 8.625C16.3125 12.8625 12.8625 16.3125 8.625 16.3125ZM8.625 2.0625C5.0025 2.0625 2.0625 5.01 2.0625 8.625C2.0625 12.24 5.0025 15.1875 8.625 15.1875C12.2475 15.1875 15.1875 12.24 15.1875 8.625C15.1875 5.01 12.2475 2.0625 8.625 2.0625Z'
                    fill='#252525'
                  />
                  <path
                    d='M16.5001 17.0625C16.3576 17.0625 16.2151 17.01 16.1026 16.8975L14.6026 15.3975C14.3851 15.18 14.3851 14.82 14.6026 14.6025C14.8201 14.385 15.1801 14.385 15.3976 14.6025L16.8976 16.1025C17.1151 16.32 17.1151 16.68 16.8976 16.8975C16.7851 17.01 16.6426 17.0625 16.5001 17.0625Z'
                    fill='#252525'
                  />
                </g>
              </svg>
            </span>
            <input
              type='text'
              placeholder='Search name or keyword'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Button
            label={isSearching ? 'Searching...' : 'Search'}
            bg='#02B346'
            onClick={() => {
              if (onSearch) {
                onSearch(searchText);
              }
            }}
          />
        </div>

        {/* Filter Row (4 fields, as in Figma) */}
        {/* <div className='exp-filter-row'>
          <FilterSelect
            label='Fee Range'
            value={selectedFee}
            options={["All", "QAR 100-200", "QAR 200-300", "QAR 300+"]}
            onSelect={setSelectedFee}
          />
          <FilterSelect
            label='Experience'
            value={selectedExperience}
            options={["All", "Beginner", "5+ Years", "10+ Years"]}
            onSelect={setSelectedExperience}
          />
          <FilterSelect
            label='Type of Trainees'
            value={selectedTrainee}
            options={["All", "Kids", "Adults", "Mixed"]}
            onSelect={setSelectedTrainee}
          />
          <FilterSelect
            label='Sort by'
            value={selectedSort}
            options={["Languages spoken", "Price Low–High", "Most Rated"]}
            onSelect={setSelectedSort}
          />
        </div> */}
      </div>
    </section>
  );
};

export default ExpertsBanner;

const FilterSelect = ({ label, value, options = [], onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='exp-filter-select' style={{ position: "relative" }}>
      <span className='exp-filter-label'>{label}:</span>

      <button className='exp-filter-pill' onClick={() => setOpen(!open)}>
        {value}
        <span className='exp-filter-chevron'>
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='7' viewBox='0 0 14 7' fill='none'>
            <path d='M0 0L6.6366 6.6366L13.2732 0H0Z' fill='#775DA6' />
          </svg>
        </span>
      </button>

      {open && (
        <div className='exp-filter-dropdown'>
          {options.map((opt, i) => (
            <div
              key={i}
              className='exp-filter-option'
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
