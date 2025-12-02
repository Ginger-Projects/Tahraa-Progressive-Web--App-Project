import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorks.css";

const HowItWorks = ({ initialAudience = "learners", tabMode = "local" }) => {
  const [audience, setAudience] = useState(initialAudience);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const navigate = useNavigate();

  const copyByAudience = {
    learners: {
      heading: "From Beginner to Pro: Step-by-Step",
      text:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    experts: {
      heading: "Grow Your Impact as an Expert",
      text:
        "Lorem ipsum is placeholder text used to preview how your expert journey and packages will look before going live to learners.",
    },
  };

  const faqs = [
    {
      question: "Lorem ipsum is placeholder text commonly used in the?",
      answer:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    {
      question: "Lorem ipsum is placeholder text commonly?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum is placeholder text commonly used in the?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      question: "Lorem ipsum is placeholder text commonly?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "Lorem ipsum is placeholder text commonly used in the?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
  ];

  const currentCopy = audience === "experts" ? copyByAudience.experts : copyByAudience.learners;

  const handleSelectLearners = () => {
    if (tabMode === "routes") {
      if (audience !== "learners") {
        navigate("/how-it-works-learners");
      }
    } else {
      setAudience("learners");
    }
  };

  const handleSelectExperts = () => {
    if (tabMode === "routes") {
      if (audience !== "experts") {
        navigate("/how-it-works-experts");
      }
    } else {
      setAudience("experts");
    }
  };

  return (
    <div className="hiw-page">
      <section className="hiw-hero">
        <div className="hiw-hero-inner hiw-container">
          <h1 className="hiw-title">Your Guide to Getting Started</h1>
          <p className="hiw-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut.
          </p>

          <div className="hiw-toggle-pill">
            <button
              className={`hiw-toggle-btn ${audience === "learners" ? "active" : ""}`}
              type="button"
              onClick={handleSelectLearners}
            >
              For Learners
            </button>
            <button
              className={`hiw-toggle-btn ${audience === "experts" ? "active" : ""}`}
              type="button"
              onClick={handleSelectExperts}
            >
              For Experts
            </button>
          </div>
        </div>
      </section>

      <section className="hiw-container hiw-video-section">
        <div className="hiw-video-card">
          <div className="hiw-video-overlay" />
          <div className="hiw-video-inner">
            <div className="hiw-video-play" />

            <div className="hiw-video-progress">
              <div className="hiw-progress-bar-bg">
                <div className="hiw-progress-bar-fill" />
              </div>
              <div className="hiw-progress-times">
                <span>17:49</span>
                <span>34:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-video-text">
          <h3 className="hiw-video-heading">{currentCopy.heading}</h3>
          <p className="hiw-video-copy">{currentCopy.text}</p>
        </div>
      </section>

      <section className="hiw-container hiw-faq-section">
        <h2 className="hiw-faq-title">Frequently asked questions</h2>

        <div className="hiw-faq-list">
          {faqs.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div className="hiw-faq-item" key={index}>
                <button
                  type="button"
                  className="hiw-faq-question-row"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                >
                  <p className="hiw-faq-question">{item.question}</p>
                  <span className="hiw-faq-icon">{isOpen ? "▴" : "▾"}</span>
                </button>
                {isOpen && <p className="hiw-faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
