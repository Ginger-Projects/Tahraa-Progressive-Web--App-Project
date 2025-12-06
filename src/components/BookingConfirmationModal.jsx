import React from "react";
import "./BookingConfirmationModal.css";
import glossyLeft from "../assets/images/glossy-left.svg";
import glossyTop from "../assets/images/glossy-top.svg";

const BookingConfirmationModal = ({ isOpen, onClose, onConfirm, validityStart, validityEnd }) => {
  if (!isOpen) return null;

  return (
    <div className="bcm-overlay">
      <div className="bcm-modal">
        {/* Glossy overlay elements */}
        <div className="bcm-glossy-left">
          <img src={glossyLeft} alt="" />
        </div>
        <div className="bcm-glossy-top">
          <img src={glossyTop} alt="" />
        </div>

        {/* Close Button */}
        <button className="bcm-close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="bcm-content">
          <div className="bcm-text-section">
            <h2 className="bcm-title">Are you sure you want to book the package?</h2>
            <p className="bcm-description">
              {validityStart && validityEnd
                ? `Your booking will be valid from ${validityStart} to ${validityEnd}.`
                : "Please confirm your booking."}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bcm-actions">
          <button className="bcm-btn bcm-btn-cancel" onClick={onClose}>
            {/* Top glossy line */}
            <svg className="bcm-btn-glossy-top" width="272" height="6" viewBox="0 0 272 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_f_151_2845)">
                <path d="M2.59375 2.59399H268.44" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
              </g>
              <defs>
                <filter id="filter0_f_151_2845" x="1.43051e-05" y="1.43051e-05" width="271.033" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2845"/>
                </filter>
              </defs>
            </svg>
            {/* Left glossy effect */}
            <svg className="bcm-btn-vector" width="10" height="40" viewBox="0 0 10 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_f_151_2844)">
                <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="white" fillOpacity="0.3"/>
                <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="url(#paint0_linear_151_2844)"/>
              </g>
              <defs>
                <filter id="filter0_f_151_2844" x="1.43051e-05" y="1.43051e-05" width="9.98044" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2844"/>
                </filter>
                <linearGradient id="paint0_linear_151_2844" x1="2.44141" y1="3.36733" x2="5.30773" y2="5.2808" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            <span>Cancel</span>
          </button>
          <button className="bcm-btn bcm-btn-confirm w-100" onClick={onConfirm}>
            {/* Top glossy line */}
            <svg className="bcm-btn-glossy-top" width="272" height="6" viewBox="0 0 272 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_f_151_2845)">
                <path d="M2.59375 2.59399H268.44" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
              </g>
              <defs>
                <filter id="filter0_f_151_2845" x="1.43051e-05" y="1.43051e-05" width="271.033" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2845"/>
                </filter>
              </defs>
            </svg>
            {/* Left glossy effect */}
            <svg className="bcm-btn-vector" width="10" height="40" viewBox="0 0 10 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_f_151_2844)">
                <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="white" fillOpacity="0.3"/>
                <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="url(#paint0_linear_151_2844)"/>
              </g>
              <defs>
                <filter id="filter0_f_151_2844" x="1.43051e-05" y="1.43051e-05" width="9.98044" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2844"/>
                </filter>
                <linearGradient id="paint0_linear_151_2844" x1="2.44141" y1="3.36733" x2="5.30773" y2="5.2808" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
