import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="exp-footer">
      <div className="exp-footer-inner">
        <div className="exp-footer-logo">Tahraa</div>

        <div className="exp-footer-social">
          <button>f</button>
          <button>in</button>
        </div>

        <div className="exp-footer-links">
          <a href="#">Reach us</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Code of conduct</a>
        </div>

        <p className="exp-footer-copy">
          Copyright © 2025 Tahraa. All rights reserved. Developed by Ginger
          Technologies.
        </p>
      </div>

      <button className="exp-whatsapp-btn">💬</button>
    </footer>
  );
};

export default Footer;
