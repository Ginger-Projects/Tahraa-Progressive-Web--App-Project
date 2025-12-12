import React, { useState } from "react";
import "./ForgotPassword.css";
import Girl from "../assets/images/girl.png";
import Smile from "../assets/images/cry.png";
import Logo from "../assets/images/logo.png";
import BigLine from "../assets/images/bigline.png";
import { Link } from "react-router-dom";
import TermsOfUse from './Legal/TermsOfUse';
import PrivacyPolicy from './Legal/PrivacyPolicy';
import LegalModal from '../components/LegalModal';

import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setSubmitting(true);
      const response = await forgotPassword({ email });
      if (response && response.success) {
        toast.success(response.message || "Password reset link sent to your email");
      } else {
        // Fallback if success is false but no error thrown
        toast.error(response?.message || "Failed to send reset link");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='fp-page'>
      <div className='fp-wrapper'>
        {/* LEFT SECTION */}
        <div className='fp-left'>
          <div className='fp-logo'>
            <Link to='/'><img src={Logo} alt='' /></Link>
          </div>

          <div className='fp-emoji mt-5'>
            <img src={Smile} alt='' />
          </div>

          <h1 className='fp-title'>
            Snap! Forgot your <br /> password?
          </h1>
          <p className='fp-subtitle mt-2'>We’ve got you covered.</p>

          <form className='fp-form mt-4' onSubmit={handleSubmit}>
            <label className='fp-label'>Email address</label>
            <input
              type='email'
              className='fp-input mt-3'
              placeholder='Enter your email address*'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />

            <button className='BTN-2 mt-3' type="submit" disabled={submitting}>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src={BigLine} />

              <div className='label'>{submitting ? "Sending..." : "Send Reset Link"}</div>
            </button>
          </form>

          <p className='fp-help m-0'>
            Want to help?{' '}
            <button
              className='fp-link'
              onClick={() => {
                window.open('https://wa.me/918089765505', '_blank');
              }}
            >
              Contact us on WhatsApp
            </button>
          </p>


          <p className='fp-footer-note'>
            Protected by reCAPTCHA and subject to the Tahraa{" "}
            <span
              className="link-text"
              onClick={() => setShowPrivacyModal(true)}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Privacy Policy
            </span>{" "}
            and{" "}
            <span
              className="link-text"
              onClick={() => setShowTermsModal(true)}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Terms of Service
            </span>
            .
          </p>

          {showTermsModal && (
            <LegalModal
              isOpen={showTermsModal}
              onClose={() => setShowTermsModal(false)}
            >
              <TermsOfUse />
            </LegalModal>
          )}

          {showPrivacyModal && (
            <LegalModal
              isOpen={showPrivacyModal}
              onClose={() => setShowPrivacyModal(false)}
            >
              <PrivacyPolicy />
            </LegalModal>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className='fp-right'>
          <button className='BTN'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <Link className='label' to='/login'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='18' viewBox='0 0 16 18' fill='none'>
                <g filter='url(#filter0_d_62_1576)'>
                  <path
                    d='M3.82843 6.77822H16V8.77822H3.82843L9.1924 14.1421L7.7782 15.5563L0 7.77822L7.7782 0L9.1924 1.41421L3.82843 6.77822Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_d_62_1576'
                    x='0'
                    y='0'
                    width='16'
                    height='17.3463'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1.79' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
                    <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_62_1576' />
                    <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_62_1576' result='shape' />
                  </filter>
                </defs>
              </svg>{" "}
              Back to Login
            </Link>
          </button>

          <div className='fp-image-box'>
            <img src={Girl} alt='Reset Password Illustration' className='fp-img img-fluid' />
          </div>

          <p className='fp-bottom-text'>Please check your inbox to reset your password.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
