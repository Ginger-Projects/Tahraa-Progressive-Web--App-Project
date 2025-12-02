import React, { useState } from "react";
import "./Header.css";
import kate from '../../assets/images/kate.png'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  const navLinkClass = (path) => {
    const isHowItWorks = path === "/how-it-works-learners";
    const isActive = isHowItWorks
      ? pathname === "/how-it-works-learners" || pathname === "/how-it-works-experts"
      : pathname === path;

    return `${isActive ? "active" : ""} text-decoration-none`.trim();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="exp-header">
      <div className="exp-header-left">
        <Link to='/' className="exp-logo"><img src={Logo} alt="" /></Link>

        <nav className={`exp-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/our-experts" className={navLinkClass("/our-experts")}>Our Experts and Packages</Link>
          <Link to="/how-it-works-learners" className={navLinkClass("/how-it-works-learners")}>How It Works</Link>
          <Link to="/reach-us" className={navLinkClass("/reach-us")}>Reach Us</Link>
        </nav>
      </div>

      {/* Mobile Menu Toggle Button - Positioned on Right */}
      <button 
        className="exp-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Desktop Header Right */}
      <div className={`exp-header-right ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="exp-user-info">
          <div className="exp-user-text">
            <span className="exp-user-name">Kate Bishop</span>
            <span className="exp-user-email">katebishop@gmail.com</span>
          </div>
          <div className="exp-avatar">
            <img src={kate} alt="Kate Bishop" />
          </div>
        </div>

        <div className="exp-lang-wrapper">
          <button
            className="exp-lang-btn"
            type="button"
            onClick={() => setLangOpen((open) => !open)}
          >
            {language} <span className="exp-lang-chevron">▾</span>
          </button>

          {langOpen && (
            <div className="exp-lang-menu">
              <button
                type="button"
                className={`exp-lang-option ${language === "EN" ? "active" : ""}`}
                onClick={() => {
                  setLanguage("EN");
                  setLangOpen(false);
                }}
              >
                EN
              </button>
              <button
                type="button"
                className={`exp-lang-option ${language === "AR" ? "active" : ""}`}
                onClick={() => {
                  setLanguage("AR");
                  setLangOpen(false);
                }}
              >
                AR
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
