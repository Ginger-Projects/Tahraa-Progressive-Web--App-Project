import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Reachus.css";
import "../trainee/header.css";
import Logo from "../../assets/images/logo.png";
import kate from "../../assets/images/kate.png";
import Phone from "../../assets/images/phone.png";
import Mail from "../../assets/images/mail.png";
import BtnLeftGlow from "../../assets/images/btn-left-glow.svg";
import BtnTopLine from "../../assets/images/btn-top-line.svg";
import Fb from "../../assets/images/fb-reach.png";
import Insta from "../../assets/images/insta-reach.png";
import Maill from "../../assets/images/mail-reach.png";
import ProfilePopup from "../trainee/ProfilePopup";
import { useSelector } from "react-redux";
import Profile from '../../assets/images/placeholder.jpg'
import { toast } from "react-toastify";
import { submitReachUs } from "../../services/public/public";


const Reachus = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector((state) => state.trainee.user);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "fullName" ? "name" : id === "phone" ? "mobile" : id]: value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Message length validation (minimum 15 characters)
    if (formData.message.trim().length < 15) {
      toast.error("Message must be at least 15 characters long");
      return;
    }

    try {
      setSubmitting(true);

      toast.success("Message sent successfully! We'll get back to you soon.");
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting reach us form:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="main-reach">
      <div className="reachus-page">
        {/* Page-specific header bar matching the Reach Us design */}
        <header className="reachus-header">
          <div className="reachus-header-left">
            <Link to="/" className="reachus-logo">
              <img src={Logo} alt="Tahraa" />
            </Link>

            <nav className={`reachus-nav ${isNavOpen ? "reachus-nav-open" : ""}`}>
              <Link to="/our-experts" className="reachus-nav-link">
                Our Experts and Packages
              </Link>
              <Link to="/how-it-works-learners" className="reachus-nav-link">
                How It Works
              </Link>
              <span className="reachus-nav-link reachus-nav-link-active">Reach Us</span>
            </nav>
          </div>
          {user && (<div className="reachus-header-right">
            <div
              className="reachus-header-avatar"
              onClick={() => setIsProfileOpen(true)}
            >
              <img src={user?.profileImage || Profile} alt="" />
            </div>
            <button
              type="button"
              className="reachus-nav-toggle"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>)}

        </header>

        <div className="reachus-wrapper">
          <div className="reachus-banner">
            {/* LEFT: Text + contact details */}
            <div className="reachChild">
              <h2 className="reachus-left-title">How Can Yanmu <br /> Assistants Help You?</h2>
              <p className="reachus-left-text">
                Drop in your requests or feedback and we&apos;ll get back to you as soon as possible.
              </p>

              <div className="reachus-contact-block">
                <div className="reachus-contact-item">
                  <div className="reachus-social-circle"><img src={Phone} alt="" /></div>
                  <div className="reachus-contact-text">
                    <div>+974 1234 5678</div>
                    <div>+974 8765 4321</div>
                  </div>
                </div>

                <div className="reachus-contact-item">
                  <div className="reachus-social-circle"><img src={Mail} alt="" /></div>
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
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={submitting}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={submitting}
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
                    value={formData.mobile}
                    onChange={handleInputChange}
                    disabled={submitting}
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
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={submitting}
                  />
                </div>

                <div className="reachus-submit-wrap">
                  <button
                    type="button"
                    className="reachus-submit-btn"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <img src={BtnLeftGlow} alt="" className="reachus-btn-left-glow" />
                    <img src={BtnTopLine} alt="" className="reachus-btn-top-line" />
                    <span className="reachus-submit-text">
                      {submitting ? "Sending..." : "Submit"}
                    </span>
                  </button>
                  <p className="reachus-note">We&apos;ll get back to you in 1-2 business days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright + social, inside the page background (Figma footer text) */}

        </div>
      </div>
      <ProfilePopup open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <div className="reachus-footer-strip">
        <div className="reachus-socials">
          <div className="reachus-social-circle"><img src={Fb} alt="" /></div>
          <div className="reachus-social-circle"><img src={Insta} alt="" /></div>
          <div className="reachus-social-circle"><img src={Maill} alt="" /></div>
        </div>

        <p className="reachus-footer-text">
          Copyright © 2025 Yanmu. All rights reserved. Developed by Ginger Technologies.
        </p>
      </div>
    </section>
  );
};

export default Reachus;

