import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Dashbaord/RegistrationBasics.css";
import welcomeImage from "../../assets/images/welcome-image.png";
import Logo from "../../assets/images/logo.png";

const WelcomeMain = () => {
  const navigate = useNavigate();
  return (
    <section className="registration-main" style={{ minHeight: "100vh" }}>
      <div
        className="registration-page"
        style={{ justifyContent: "center", minHeight: "100%", position: "relative" }}
      >
        {/* Top-left logo */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 30,
            fontFamily: "Goldman, Poppins, sans-serif",
            fontSize: 30,
            color: "#775da6",
          }}
        >
         <img src={Logo} alt="" />
        </div>

        {/* Single centered panel */}
        <div className="registration-right" style={{ width: "100%", alignItems: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            {/* Illustration */}
            <div style={{ marginTop: 80, marginBottom: 40 }}>
              <img
                src={welcomeImage}
                alt="Welcome"
                style={{ maxWidth: 420, width: "100%", display: "inline-block" }}
              />
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 40,
                color: "#252525",
                marginBottom: 16,
              }}
              className="work-title"
            >
              Welcome Aboard – Tahraa Team
            </h1>

            {/* Message */}
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 19,
                lineHeight: 1.5,
                color: "#898989",
                maxWidth: 926,
                margin: "0 auto 40px",
              }}
            >
              <p style={{ margin: 0 }} >Welcome to the Tahraa community!</p>
              <p style={{ margin: 0 }} className="work-descr">
                We’ve received your information and our team is currently reviewing it. You’ll hear from us shortly.
                Kindly check your mailbox for further communication.
              </p>
            </div>

            {/* Button */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 80 }}>
              <button
                type="button"
                className="registration-btn"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: "0 0 auto",
                  position: "relative",
                  overflow: "hidden",
                  background: "#02b346",
                  color: "#ffffff",
                  padding: "0 32px",
                  width: "auto",
                  height: 53,
                  borderRadius: 10,
                  boxShadow: "-3.7px -3.7px 6.3px rgba(0,0,0,0.3) inset",
                  maxWidth : "228px",
                  width : "100%",
                }}
                onClick={() => navigate("/")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="40"
                  viewBox="0 0 11 40"
                  fill="none"
                  style={{ position: "absolute", left: "4px", top: "50%", transform: "translateY(-50%)" }}
                >
                  <g filter="url(#filter0_f_162_2214)">
                    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="white" fillOpacity="0.3" />
                    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="url(#paint0_linear_162_2214)" />
                  </g>
                  <defs>
                    <filter
                      id="filter0_f_162_2214"
                      x="0"
                      y="0"
                      width="10.6172"
                      height="39.6726"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_162_2214" />
                    </filter>
                    <linearGradient
                      id="paint0_linear_162_2214"
                      x1="2.44141"
                      y1="3.36733"
                      x2="5.4245"
                      y2="5.61461"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="6"
                  viewBox="0 0 306 6"
                  fill="none"
                  style={{ position: "absolute", left: "-30px", top: "4px" }}
                >
                  <g filter="url(#filter0_f_162_2215)">
                    <path
                      d="M2.59375 2.59399H302.594"
                      stroke="white"
                      strokeWidth="0.305174"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_f_162_2215"
                      x="0"
                      y="0"
                      width="305.187"
                      height="5.18796"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_162_2215" />
                    </filter>
                  </defs>
                </svg>

                Back To Tahraa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMain;
