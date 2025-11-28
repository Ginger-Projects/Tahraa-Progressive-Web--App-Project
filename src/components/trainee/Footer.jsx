import React from "react";
import { Facebook, Instagram, Mail } from "lucide-react";
import "./Footer.css"; // Import CSS

export default function FooterTrainee() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Site Title */}
        <div className="footer-title">
          <h2>Tahraa</h2>
        </div>

        {/* Social Buttons */}
        <div className="footer-socials">
          <button className="social-btn">
            <Facebook />
          </button>
          <button className="social-btn">
            <Instagram />
          </button>
          <button className="social-btn">
            <Mail />
          </button>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="#">Reach us</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Code of Conduct</a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          Copyright © 2025 Tahraa. All rights reserved. Developed by Ginger Technologies.
        </p>
      </div>
    </footer>
  );
}
