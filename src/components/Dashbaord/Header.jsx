import React, { useState } from "react";
import "./Header.css";
import "../trainee/header.css";
import kate from '../../assets/images/kate.png'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePopup from "../trainee/ProfilePopup";
const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  const { user } = useSelector((state) => state.trainee);

  const displayName =
    user?.name || user?.fullName || user?.username || user?.email || "User";

  const displayEmail = user?.email || user?.username || "";

  const profileImage =
    user?.profileImage || user?.imageUrl || user?.photo || kate;

  const navLinkClass = (path) => {
    const isHowItWorks = path === "/how-it-works-learners";
    const isActive = isHowItWorks
      ? pathname === "/how-it-works-learners" || pathname === "/how-it-works-experts"
      : pathname === path;

    return `${isActive ? "active" : ""} text-decoration-none`.trim();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
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
            <span className="exp-user-name">{displayName}</span>
            <span className="exp-user-email">{displayEmail}</span>
          </div>
          <div
            className="exp-avatar"
            onClick={() => setIsProfileOpen(true)}
          >
            <img src={profileImage} alt={displayName} />
          </div>
        </div>
      </div>
    </header>

    <ProfilePopup open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Header;
