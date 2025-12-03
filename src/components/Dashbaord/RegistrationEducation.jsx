import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationBasics.css";
import leftImage from "../../assets/images/education-bg.png";
import logoImage from "../../assets/images/logo.png";

const RegistrationEducation = () => {
  const navigate = useNavigate();

  return (
    <section className="registration-main">
      <div className="registration-page">
        {/* LEFT PANEL - same as Basics */}
        <div className="registration-left">
          <button
            type="button"
            className="registration-logo"
            onClick={() => navigate("/")}
          >
            <img src={logoImage} alt="Yanmu logo" />
          </button>

          <div className="registration-left-image-wrap">
            <img src={leftImage} alt="Freelancer playing guitar" />
          </div>
          <div className="registration-left-overlay">
            <h2 className="registration-left-heading">
              Tahraa wants to give you
              <br />
              those hours back
            </h2>

            <div className="registration-left-follow">
              <span>Follow us on:</span>
              <div className="registration-left-socials">
                <span className="registration-left-social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H8V10.5H6V8H8V6C8 5.20435 8.31607 4.44129 8.87868 3.87868C9.44129 3.31607 10.2044 3 11 3H13V5.5H12C11.448 5.5 11 5.448 11 6V8H13.5L12.5 10.5H11V16H14C15.103 16 16 15.103 16 14V2C16 0.897 15.103 0 14 0Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="registration-left-social">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 1.44578C10.1205 1.44578 10.4096 1.44578 11.2771 1.44578C12.0482 1.44578 12.4337 1.63855 12.7229 1.73494C13.1084 1.92771 13.3976 2.0241 13.6867 2.31325C13.9759 2.60241 14.1687 2.89157 14.2651 3.27711C14.3614 3.56627 14.4578 3.95181 14.5542 4.72289C14.5542 5.59036 14.5542 5.78313 14.5542 8C14.5542 10.2169 14.5542 10.4096 14.5542 11.2771C14.5542 12.0482 14.3614 12.4337 14.2651 12.7229C14.0723 13.1084 13.9759 13.3976 13.6867 13.6867C13.3976 13.9759 13.1084 14.1687 12.7229 14.2651C12.4337 14.3614 12.0482 14.4578 11.2771 14.5542C10.4096 14.5542 10.2169 14.5542 8 14.5542C5.78313 14.5542 5.59036 14.5542 4.72289 14.5542C3.95181 14.5542 3.56627 14.3614 3.27711 14.2651C2.89157 14.0723 2.60241 13.9759 2.31325 13.6867C2.0241 13.3976 1.83133 13.1084 1.73494 12.7229C1.63855 12.4337 1.54217 12.0482 1.44578 11.2771C1.44578 10.4096 1.44578 10.2169 1.44578 8C1.44578 5.78313 1.44578 5.59036 1.44578 4.72289C1.44578 3.95181 1.63855 3.56627 1.73494 3.27711C1.92771 2.89157 2.0241 2.60241 2.31325 2.31325C2.60241 2.0241 2.89157 1.83133 3.27711 1.73494C3.56627 1.63855 3.95181 1.54217 4.72289 1.44578C5.59036 1.44578 5.87952 1.44578 8 1.44578ZM8 0C5.78313 0 5.59036 0 4.72289 0C3.85542 0 3.27711 0.192772 2.79518 0.385543C2.31325 0.578314 1.83133 0.867471 1.3494 1.3494C0.867471 1.83133 0.674699 2.21687 0.385543 2.79518C0.192772 3.27711 0.0963856 3.85542 0 4.72289C0 5.59036 0 5.87952 0 8C0 10.2169 0 10.4096 0 11.2771C0 12.1446 0.192772 12.7229 0.385543 13.2048C0.578314 13.6867 0.867471 14.1687 1.3494 14.6506C1.83133 15.1325 2.21687 15.3253 2.79518 15.6145C3.27711 15.8072 3.85542 15.9036 4.72289 16C5.59036 16 5.87952 16 8 16C10.1205 16 10.4096 16 11.2771 16C12.1446 16 12.7229 15.8072 13.2048 15.6145C13.6867 15.4217 14.1687 15.1325 14.6506 14.6506C15.1325 14.1687 15.3253 13.7831 15.6145 13.2048C15.8072 12.7229 15.9036 12.1446 16 11.2771C16 10.4096 16 10.1205 16 8C16 5.87952 16 5.59036 16 4.72289C16 3.85542 15.8072 3.27711 15.6145 2.79518C15.4217 2.31325 15.1325 1.83133 14.6506 1.3494C14.1687 0.867471 13.7831 0.674699 13.2048 0.385543C12.7229 0.192772 12.1446 0.0963856 11.2771 0C10.4096 0 10.2169 0 8 0Z" fill="white"/>
  <path d="M8 3.85542C5.68675 3.85542 3.85542 5.68675 3.85542 8C3.85542 10.3133 5.68675 12.1446 8 12.1446C10.3133 12.1446 12.1446 10.3133 12.1446 8C12.1446 5.68675 10.3133 3.85542 8 3.85542ZM8 10.6988C6.55422 10.6988 5.30121 9.54217 5.30121 8C5.30121 6.55422 6.45783 5.30121 8 5.30121C9.44578 5.30121 10.6988 6.45783 10.6988 8C10.6988 9.44578 9.44578 10.6988 8 10.6988Z" fill="white"/>
  <path d="M12.241 4.72289C12.7733 4.72289 13.2048 4.29136 13.2048 3.75904C13.2048 3.22671 12.7733 2.79518 12.241 2.79518C11.7086 2.79518 11.2771 3.22671 11.2771 3.75904C11.2771 4.29136 11.7086 4.72289 12.241 4.72289Z" fill="white"/>
</svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Education step */}
        <div className="registration-right">
          <div>
            <div className="registration-stepper">
              <div className="registration-step">
                <div className="registration-step-circle" style={{ background: "#02B346", color: "#FFFFFF" }}>
                  1
                </div>
                <div className="registration-step-text">
                  <div className="registration-step-title">Finished</div>
                  <div className="registration-step-sub">Basics</div>
                </div>
                <div className="registration-step-line" />
              </div>

              <div className="registration-step registration-step-active">
                <div className="registration-step-circle">2</div>
                <div className="registration-step-text">
                  <div className="registration-step-title">In Progress</div>
                  <div className="registration-step-sub">Experience &amp; Qualification</div>
                </div>
                <div className="registration-step-line" />
              </div>

              <div className="registration-step">
                <div className="registration-step-circle" style={{ background: "#F3EFFF", color: "#775DA6" }}>
                  3
                </div>
                <div className="registration-step-text">
                  <div className="registration-step-title">Finish line</div>
                  <div className="registration-step-sub">Business Setup</div>
                </div>
                <div className="registration-step-line registration-step-line-end" />
              </div>
            </div>

            <h1 className="registration-title">
              Registration <span>| Experience &amp; Qualification</span>
            </h1>

            <div className="registration-form">
              {/* Row 1: Years of experience, What do you teach */}
              <div className="registration-row">
                <div className="registration-field">
                  <input type="text" placeholder="Years of experience*" />
                </div>
                <div className="registration-field">
                  <select className="registration-select" defaultValue="">
                    <option value="" disabled>
                      What do you teach?*
                    </option>
                    <option value="boxing">Boxing</option>
                    <option value="candle_making">Candle making</option>
                    <option value="chess">Chess</option>
                    <option value="crafts">Crafts</option>
                    <option value="crochet">Crochet</option>
                    <option value="culinary_arts">Culinary Arts</option>
                    <option value="jewellery_making">Jewellery making</option>
                    <option value="macrame">Macrame</option>
                    <option value="meditation">Meditation</option>
                    <option value="mixed_martial_arts">Mixed Martial Arts</option>
                    <option value="music">Music</option>
                    <option value="origami">Origami</option>
                    <option value="personal_training">Personal Training</option>
                    <option value="pilates">Pilates</option>
                    <option value="pottery">Pottery</option>
                    <option value="quilling">Quilling</option>
                    <option value="sewing">Sewing</option>
                    <option value="soap_making">Soap making</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Mode of delivery, Fee range */}
              <div className="registration-row">
                <div className="registration-field">
                  <select className="registration-select" defaultValue="">
                    <option value="" disabled>
                      Mode of delivery*
                    </option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="registration-field">
                  <select className="registration-select" defaultValue="">
                    <option value="" disabled>
                      Fee range per session (QAR)*
                    </option>
                    <option value="50_100">50-100</option>
                    <option value="100_300">100-300</option>
                    <option value="300_500">300 - 500</option>
                    <option value="500_plus">500 and above</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Languages spoken */}
              <div className="registration-row registration-row-textarea">
                <div className="registration-field registration-field-full">
                  <input type="text" placeholder="Languages spoken*" />
                </div>
              </div>

              {/* Do you have existing learners/students? */}
              <div className="registration-row registration-row-textarea">
                <div className="registration-field registration-field-full registration-field-visa">
                  <label>Do you have existing learners/students?*</label>
                  <div className="registration-radio-group">
                    <label>
                      <input style={{padding : "10px"}} type="radio" name="existingLearners" /> Yes
                    </label>
                    <label>
                      <input style={{padding : "10px"}} type="radio" name="existingLearners" /> No
                    </label>
                  </div>
                </div>
              </div>

              {/* Upload section */}
              <div className="registration-row registration-row-textarea area">
                <div className="registration-field registration-field-full">
                  <label style={{fontFamily : "poppins" }}>Please upload photos of your previous work or a self introductory video*</label>
                  <div className="registration-upload-input">
                    <input
                      type="text"
                      className="registration-upload-text"
                      placeholder="Link from YouTube"
                    />
                    <span className="registration-upload-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <g clip-path="url(#clip0_189_1019)">
    <path d="M0.8409 13.159C1.9621 14.2803 3.78003 14.2803 4.90123 13.159L8.0651 9.99517C6.94753 10.1248 6.27365 9.74823 6.04839 9.69172L3.74115 11.999C3.26136 12.4787 2.48078 12.4787 2.00098 11.999C1.52118 11.5193 1.52118 10.7386 2.00098 10.2589C2.08953 10.1702 5.73362 6.52616 5.61847 6.64141C6.08652 6.17326 6.87842 6.16129 7.35854 6.64141C7.39742 6.68029 7.42669 6.7244 7.45916 6.76681C7.63219 6.75025 7.79732 6.78272 7.93863 6.64141L8.77411 5.80593C8.69315 5.69538 8.6187 5.58142 8.51862 5.48133C7.4065 4.36911 5.54851 4.39111 4.45829 5.48133L0.8409 9.09871C-0.2803 10.2199 -0.2803 12.0378 0.8409 13.159Z" fill="#898989"/>
    <path d="M13.1593 0.840898C12.0381 -0.280299 10.2202 -0.280299 9.09901 0.840898L6.0723 3.86761C7.18987 3.73794 7.86374 4.11466 8.089 4.17106L10.2592 2.00097C10.739 1.52118 11.5195 1.52118 11.9993 2.00097C12.4791 2.48077 12.4791 3.26135 11.9993 3.74114L9.18617 6.55423L8.51892 7.22137C8.05087 7.68963 7.25897 7.7016 6.77885 7.22137C6.73997 7.1826 6.71071 7.13849 6.67824 7.09608C6.5052 7.11264 6.34007 7.08006 6.19876 7.22137L5.36328 8.05685C5.44424 8.1674 5.51869 8.28147 5.61877 8.38156C6.7309 9.49378 8.58888 9.47167 9.67911 8.38156L13.1593 4.90122C14.2805 3.78002 14.2805 1.9621 13.1593 0.840898Z" fill="#898989"/>
  </g>
  <defs>
    <clipPath id="clip0_189_1019">
      <rect width="14" height="14" fill="white"/>
    </clipPath>
  </defs>
</svg>
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      margin: "12px 0",
                      color: "rgba(37,37,37,0.5)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Or
                  </div>

                  <div
                    className="registration-upload-input design"
                    style={{ background: "#f8f8f8", borderStyle: "dashed" }}
                  >
                    <span className="registration-upload-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 16V10M12 10L9.5 12.5M12 10L14.5 12.5"
                          stroke="#775da6"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 17C4.34315 17 3 15.6569 3 14C3 12.5044 4.09267 11.2486 5.54896 11.0342C5.8179 9.27495 7.29189 8 9.08333 8C9.84593 8 10.5482 8.24678 11.1119 8.66745C11.733 7.08137 13.1913 6 14.9167 6C17.0549 6 18.7917 7.73686 18.7917 9.87507C20.0812 10.1042 21 11.2143 21 12.5417C21 14.1455 19.7292 15.4167 18.1254 15.4167H16"
                          stroke="#775da6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="registration-upload-text" style={{ border: "none" }}>
                      Drag &amp; drop image or
                      <span className="registration-upload-helper-link"> Browse</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Have you received any certification for what you teach? */}
              <div className="registration-row registration-row-textarea">
                <div className="registration-field registration-field-full registration-field-visa">
                  <label>Have you received any certification for what you teach?*</label>
                  <div className="registration-radio-group">
                    <label>
                      <input style={{padding : "10px"}} type="radio" name="certification" /> Yes
                    </label>
                    <label>
                      <input style={{padding : "10px"}} type="radio" name="certification" /> No
                    </label>
                  </div>
                </div>
              </div>

              {/* Certification details row */}
              <div className="registration-row">
                <div className="registration-field">
                  <input type="text" placeholder="Name of certification (optional)" />
                </div>
                <div className="registration-field">
                  <input type="text" placeholder="Expiry date (optional)" />
                </div>
              </div>
            </div>

            <div className="registration-buttons">
              <button
                type="button"
                className="registration-btn registration-btn-clear"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="40"
                  viewBox="0 0 11 40"
                  fill="none"
                  style={{ position: "absolute", left: '4px', top: "50%", transform: "translateY(-50%)" }}
                >
  <g filter="url(#filter0_f_162_2214)">
    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="white" fill-opacity="0.3"/>
    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="url(#paint0_linear_162_2214)"/>
  </g>
  <defs>
    <filter id="filter0_f_162_2214" x="1.43051e-05" y="1.43051e-05" width="10.6172" height="39.6726" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_162_2214"/>
    </filter>
    <linearGradient id="paint0_linear_162_2214" x1="2.44141" y1="3.36733" x2="5.4245" y2="5.61461" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="306"
                  height="6"
                  viewBox="0 0 306 6"
                  fill="none"
                   style={{ position: "absolute", left: '-30px', top: '4px' }}
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
                      x="1.43051e-05"
                      y="1.43051e-05"
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
                Clear
              </button>
              <button
                type="button"
                className="registration-btn registration-btn-next"
                style={{ position: "relative", overflow: "hidden" }}
                onClick={() => navigate("/registration-work")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="40"
                  viewBox="0 0 11 40"
                  fill="none"
                  style={{ position: "absolute", left: '4px', top: "50%", transform: "translateY(-50%)" }}
                >
                  <g filter="url(#filter0_f_162_2214)">
                    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="white" fillOpacity="0.3" />
                    <path d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z" fill="url(#paint0_linear_162_2214)" />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="6"
                  viewBox="0 0 306 6"
                  fill="none"
                  style={{ position: "absolute", left: '-30px', top: '4px' }}
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
                      x="1.43051e-05"
                      y="1.43051e-05"
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
                Next
              </button>
            </div>

          </div>

          <p className="registration-recaptcha">
            Protected by reCAPTCHA and subject to the Tahraa
            <span> Privacy Policy</span> and <span>Terms of Use</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationEducation;