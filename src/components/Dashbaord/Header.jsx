import React, { useState } from "react";
import "./Header.css";
import kate from '../../assets/images/kate.png'
import Logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="exp-header">
      <div className="exp-header-left">
        <Link to='/' className="exp-logo"><img src={Logo} alt="" /></Link>

        <nav className={`exp-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#" className="active">Our Experts and Packages</a>
          <a href="#">How It Works</a>
          <a href="#">Reach Us</a>
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

        <button className="exp-lang-btn">
          EN <span className="exp-lang-chevron">▾</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
