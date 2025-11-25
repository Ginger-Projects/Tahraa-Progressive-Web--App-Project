import React from "react";
import "./Footer.css";
import Fb from "../../assets/images/fb.png"; 
import Insta from "../../assets/images/insta.png"; 
import Logo from "../../assets/images/logo-white.png"; 


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
        </div>

        {/* Navigation Links */}
        <ul className="footer-links">
          <li>Reach us</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>Code of conduct</li>
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
