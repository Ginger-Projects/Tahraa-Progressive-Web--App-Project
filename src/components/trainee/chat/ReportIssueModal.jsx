import React from "react";
import "./Chat.css";
import CloseIcon from "../../../assets/images/close.svg";

export default function ReportIssueModal({ open, onClose }) {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="chat-report-modal-backdrop" onClick={handleBackdropClick}>
      <div className="chat-report-modal">
        <button
          type="button"
          className="chat-report-modal-close"
          onClick={onClose}
          aria-label="Close report form"
        >
          <img src={CloseIcon} alt="Close" />
        </button>
        <h2 className="chat-report-modal-title">Having Trouble? Let Us Know.</h2>

        <form className="chat-report-modal-form">
          <div className="chat-report-field-group">
            <label className="chat-report-label" htmlFor="report-full-name">
              Full name
            </label>
            <input
              id="report-full-name"
              type="text"
              className="chat-report-input"
              placeholder="Enter your full name*"
            />
          </div>

          <div className="chat-report-field-group">
            <label className="chat-report-label" htmlFor="report-email">
              Email address
            </label>
            <input
              id="report-email"
              type="email"
              className="chat-report-input"
              placeholder="Enter your email address*"
            />
          </div>

          <div className="chat-report-field-group">
            <label className="chat-report-label" htmlFor="report-message">
              How can we help you?
            </label>
            <textarea
              id="report-message"
              className="chat-report-textarea"
              placeholder="Your Message*"
              rows={4}
            />
          </div>

          <button type="submit" className="chat-report-submit">
            <span className="chat-report-submit-highlight-left" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="43"
                viewBox="0 0 11 43"
                fill="none"
              >
                <g filter="url(#filter0_f_135_2106)">
                  <path
                    d="M3.01894 4.55305C3.20596 2.33977 5.92098 2.55929 7.11738 2.76588C7.36794 2.80914 7.45754 3.11302 7.29188 3.30591C6.70187 3.99296 5.61371 5.42275 5.34776 6.8915C3.99618 14.3559 4.39729 27.3515 4.61447 32.2969C4.67254 33.6193 4.52942 34.9351 4.17057 36.2092L3.01894 40.2978C3.01894 40.2978 2.17212 14.5749 3.01894 4.55305Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M3.01894 4.55305C3.20596 2.33977 5.92098 2.55929 7.11738 2.76588C7.36794 2.80914 7.45754 3.11302 7.29188 3.30591C6.70187 3.99296 5.61371 5.42275 5.34776 6.8915C3.99618 14.3559 4.39729 27.3515 4.61447 32.2969C4.67254 33.6193 4.52942 34.9351 4.17057 36.2092L3.01894 40.2978C3.01894 40.2978 2.17212 14.5749 3.01894 4.55305Z"
                    fill="url(#paint0_linear_135_2106)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_135_2106"
                    x="0"
                    y="0"
                    width="10.0193"
                    height="42.9403"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="1.32124"
                      result="effect1_foregroundBlur_135_2106"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_135_2106"
                    x1="2.64258"
                    y1="3.64465"
                    x2="5.53393"
                    y2="5.29379"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="chat-report-submit-highlight-top" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="592"
                height="6"
                viewBox="0 0 592 6"
                fill="none"
              >
                <g filter="url(#filter0_f_135_2107)">
                  <path
                    d="M2.80859 2.80762H588.831"
                    stroke="white"
                    strokeWidth="0.33031"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_135_2107"
                    x="0"
                    y="0"
                    width="591.638"
                    height="5.61529"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="1.32124"
                      result="effect1_foregroundBlur_135_2107"
                    />
                  </filter>
                </defs>
              </svg>
            </span>
            <span className="chat-report-submit-label">Submit</span>
          </button>
        </form>

        <p className="chat-report-footer-text">
         We'll get back to you in 1-2 business days.
        </p>
      </div>
    </div>
  );
}
