import React from "react";
import { Link } from "react-router-dom";
import "./Reachus.css";
import Logo from "../../assets/images/logo.png";
import kate from "../../assets/images/kate.png";

const Reachus = () => {
  return (
    <section className="main-reach">
        <div className="reachus-page">
      {/* Page-specific header bar matching the Reach Us design */}
      <header className="reachus-header">
        <div className="reachus-header-left">
          <Link to="/" className="reachus-logo">
            <img src={Logo} alt="Tahraa" />
          </Link>

          <nav className="reachus-nav">
            <Link to="/our-experts" className="reachus-nav-link">
              Our Experts and Packages
            </Link>
            <Link to="/how-it-works-dashboard" className="reachus-nav-link">
              How It Works
            </Link>
            <span className="reachus-nav-link reachus-nav-link-active">Reach Us</span>
          </nav>
        </div>

        <div className="reachus-header-avatar" >
            <img src={kate} alt="" />
        </div>
      </header>

      <div className="reachus-wrapper">
        <div className="reachus-banner">
          {/* LEFT: Text + contact details */}
          <div className="reachChild">
            <h2 className="reachus-left-title">How Can Tahraa <br /> Assistants Help You?</h2>
            <p className="reachus-left-text">
              Drop in your requests or feedback and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="reachus-contact-block">
              <div className="reachus-contact-item">
                <div className="reachus-social-circle">☎</div>
                <div className="reachus-contact-text">
                  <div>+974 1234 5678</div>
                  <div>+974 8765 4321</div>
                </div>
              </div>

              <div className="reachus-contact-item">
                <div className="reachus-social-circle">✉</div>
                <div className="reachus-contact-text">
                  <div>support@yourbrand.com</div>
                  <div>info@yourbrand.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form card */}
          <div className="reachus-form-card">
            <div className="reachus-form-grid">
              <div>
                <label className="reachus-field-label" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="reachus-input"
                  placeholder="Enter your full name*"
                />
              </div>

              <div>
                <label className="reachus-field-label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="reachus-input"
                  placeholder="Enter your email address*"
                />
              </div>

              <div>
                <label className="reachus-field-label" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="reachus-input"
                  placeholder="Enter your phone number (Optional)"
                />
              </div>

              <div>
                <label className="reachus-field-label" htmlFor="message">
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  className="reachus-textarea"
                  placeholder="Your Message*"
                />
              </div>

              <div className="reachus-submit-wrap">
                <button type="button" className="reachus-submit-btn">
                  Submit
                </button>
                <p className="reachus-note">We&apos;ll get back to you in 1-2 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright + social, inside the page background (Figma footer text) */}
      
      </div>
      </div>
        <div className="reachus-footer-strip">
          <div className="reachus-socials">
            <div className="reachus-social-circle">f</div>
            <div className="reachus-social-circle">in</div>
            <div className="reachus-social-circle">✉</div>
          </div>

          <p className="reachus-footer-text">
            Copyright © 2025 Tahraa. All rights reserved. Developed by Ginger Technologies.
          </p>
        </div>
    </section>
  );
};

export default Reachus;
