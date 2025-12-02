import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Fb from "../../assets/images/fb.png"; 
import Insta from "../../assets/images/insta.png"; 
import Logo from "../../assets/images/footer-logo.png"; 
import Mail from "../../assets/images/mail-white.png"; 


export const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Background is applied via CSS */}

      <div className="footer-content">
        {/* Logo / Brand */}
        <h2 className="footer-logo"><img src={Logo} alt="" /></h2>

        {/* Social Icons */}
        <div className="footer-socials">
          <span className="social-icon"><img src={Fb} alt="" /></span>
          <span className="social-icon"><img src={Insta} alt="" /></span>
          <span className="social-icon"><img src={Mail} alt="" /></span>
        </div>

        {/* Navigation Links */}
        <ul className="footer-links">
          <li>
            <Link to="/reach-us">Reach us</Link>
          </li>
          <li>
            <Link to="/terms-of-use">Terms of Use</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/code-of-conduct">Code of conduct</Link>
          </li>
        </ul>

        {/* Bottom Copy */}
        <p className="footer-copy">
          Copyright © 2025 Tahraa. All rights reserved. Developed by Ginger
          Technologies.
        </p>
      </div>
    </footer>
  );
};
