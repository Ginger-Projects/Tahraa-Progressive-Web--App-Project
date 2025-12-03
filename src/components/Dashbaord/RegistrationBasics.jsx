import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationBasics.css";
import leftImage from "../../assets/images/registration-left.png"; // TODO: replace with actual asset if different
import logoImage from "../../assets/images/logo.png";

const RegistrationBasics = () => {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState("");
  const [nationalityValue, setNationalityValue] = useState("");
  const [residenceValue, setResidenceValue] = useState("");
  const [dobValue, setDobValue] = useState("");
  const dobInputRef = useRef(null); // visible text field
  const dobPickerRef = useRef(null); // hidden native date input

  const detectCountryFromPhone = (value) => {
    const v = value.replace(/\s+/g, "");
    if (v.startsWith("+91") || v.startsWith("91")) return { flag: "🇮🇳", name: "India" };
    if (v.startsWith("+974") || v.startsWith("974")) return { flag: "🇶🇦", name: "Qatar" };
    if (v.startsWith("+971") || v.startsWith("971")) return { flag: "🇦🇪", name: "United Arab Emirates" };
    if (v.startsWith("+966") || v.startsWith("966")) return { flag: "🇸🇦", name: "Saudi Arabia" };
    return { flag: "🇶🇦", name: "Qatar" }; // default
  };

  const getFlagFromPhone = (value) => {
    return detectCountryFromPhone(value).flag;
  };

  const getFlagFromCountry = (value) => {
    const v = value.toLowerCase().replace(/\s+/g, "");

    // Match by country name
    if (v.includes("india")) return "🇮🇳";
    if (v.includes("qatar")) return "🇶🇦";
    if (v.includes("unitedarab") || v.includes("uae")) return "🇦🇪";
    if (v.includes("saudi")) return "🇸🇦";

    // Match common dial codes typed into these fields
    if (v.startsWith("+91") || v.startsWith("91")) return "🇮🇳";
    if (v.startsWith("+974") || v.startsWith("974")) return "🇶🇦";
    if (v.startsWith("+971") || v.startsWith("971")) return "🇦🇪";
    if (v.startsWith("+966") || v.startsWith("966")) return "🇸🇦";

    return "🇶🇦"; // default
  };

  return (
    <section className="registration-main">
      <div className="registration-page">
        {/* LEFT PANEL - Image + text */}
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
              Experts spent approximately 5 hours a week on unbillable tasks such as
              looking for clients, administration tasks and upskilling
            </h2>
            <p className="registration-left-subtext">
              Freelancer Study 2025, Freelancermap
            </p>
            <div className="registration-left-follow">
              <span>Follow us on:</span>
              <div className="registration-left-socials">
                <span className="registration-left-social"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H8V10.5H6V8H8V6C8 5.20435 8.31607 4.44129 8.87868 3.87868C9.44129 3.31607 10.2044 3 11 3H13V5.5H12C11.448 5.5 11 5.448 11 6V8H13.5L12.5 10.5H11V16H14C15.103 16 16 15.103 16 14V2C16 0.897 15.103 0 14 0Z" fill="white"/>
</svg></span>
                <span className="registration-left-social" >
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

        {/* RIGHT PANEL - Form card */}
        <div className="registration-right">
            <div>
          <div className="registration-stepper">
            <div className="registration-step registration-step-active">
              <div className="registration-step-circle">1</div>
              <div className="registration-step-text">
                <div className="registration-step-title">In Progress</div>
                <div className="registration-step-sub">Basics</div>
              </div>
              <div className="registration-step-line" />
            </div>
            <div className="registration-step">
              <div className="registration-step-circle">2</div>
              <div className="registration-step-text">
                <div className="registration-step-title">Almost there</div>
                <div className="registration-step-sub">Experience &amp; Qualification</div>
              </div>
              <div className="registration-step-line" />
            </div>
            <div className="registration-step">
              <div className="registration-step-circle">3</div>
              <div className="registration-step-text">
                <div className="registration-step-title">Finish line</div>
                <div className="registration-step-sub">Business Setup</div>
              </div>
              <div className="registration-step-line registration-step-line-end" />
            </div>
          </div>

          <h1 className="registration-title">
            Registration <span>| Basics</span>
          </h1>

          {/* Form grid */}
          <div className="registration-form">
            {/* Row 1: Full name, Email address */}
            <div className="registration-row">
              <div className="registration-field">
                <input type="text" placeholder="Full name*" />
              </div>
              <div className="registration-field">
                <input type="email" placeholder="Email address*" />
              </div>
            </div>

            {/* Row 2: Phone number (with flag), QID/Passport */}
            <div className="registration-row">
              <div className="registration-field">
                <div className="registration-flag-input">
                  <span className="registration-flag-icon">{getFlagFromPhone(phoneValue)}</span>
                  <span className="registration-flag-divider">|</span>
                  <input
                    type="tel"
                    placeholder="Phone number*"
                    value={phoneValue}
                    onChange={(e) => {
                      const next = e.target.value;
                      setPhoneValue(next);
                    }}
                  />
                </div>
              </div>
              <div className="registration-field">
                <input type="text" placeholder="QID/Passport*" />
              </div>
            </div>

            {/* Row 3: Date of birth, Gender */}
            <div className="registration-row">
              <div className="registration-field">
                <div className="registration-date-input">
                  <input
                    ref={dobInputRef}
                    type="text"
                    placeholder="Date of birth*"
                    className="registration-date-input-field"
                    value={dobValue}
                    onChange={(e) => setDobValue(e.target.value)}
                  />
                  <input
                    ref={dobPickerRef}
                    type="date"
                    className="registration-date-hidden-picker"
                    onChange={(e) => {
                      const v = e.target.value; // yyyy-mm-dd
                      if (!v) {
                        setDobValue("");
                        return;
                      }
                      const [year, month, day] = v.split("-");
                      setDobValue(`${day}-${month}-${year}`);
                    }}
                  />
                  <span
                    className="registration-date-icon"
                    aria-hidden="true"
                    onClick={() => {
                      if (dobPickerRef.current && dobPickerRef.current.showPicker) {
                        dobPickerRef.current.showPicker();
                      } else if (dobInputRef.current) {
                        dobInputRef.current.focus();
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.75 0C6.16421 0 6.5 0.33579 6.5 0.75V2.25C6.5 2.66421 6.16421 3 5.75 3C5.33579 3 5 2.66421 5 2.25V0.75C5 0.33579 5.33579 0 5.75 0Z"
                        fill="#898989"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.75 0C16.1642 0 16.5 0.33579 16.5 0.75V2.25C16.5 2.66421 16.1642 3 15.75 3C15.3358 3 15 2.66421 15 2.25V0.75C15 0.33579 15.3358 0 15.75 0Z"
                        fill="#898989"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 7.25C0 6.83579 0.33579 6.5 0.75 6.5H20.75C21.1642 6.5 21.5 6.83579 21.5 7.25C21.5 7.66421 21.1642 8 20.75 8H0.75C0.33579 8 0 7.66421 0 7.25Z"
                        fill="#898989"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.69358 1.5H12.8064C14.6442 1.49998 16.0998 1.49997 17.239 1.65314C18.4114 1.81076 19.3604 2.14288 20.1088 2.89124C20.8571 3.63961 21.1892 4.58856 21.3469 5.76098C21.5 6.90019 21.5 8.3558 21.5 10.1936V12.3064C21.5 14.1442 21.5 15.5998 21.3469 16.739C21.1892 17.9114 20.8571 18.8604 20.1088 19.6088C19.3604 20.3571 18.4114 20.6892 17.239 20.8469C16.0998 21 14.6442 21 12.8064 21H8.69359C6.85583 21 5.40019 21 4.26098 20.8469C3.08856 20.6892 2.13961 20.3571 1.39124 19.6088C0.64288 18.8604 0.31076 17.9114 0.15314 16.739C-2.96086e-05 15.5998 -1.95468e-05 14.1442 4.53202e-07 12.3064V10.1936C-1.95468e-05 8.3558 -2.96086e-05 6.90019 0.15314 5.76098C0.31076 4.58856 0.64288 3.63961 1.39124 2.89124C2.13961 2.14288 3.08856 1.81076 4.26098 1.65314C5.40019 1.49997 6.85582 1.49998 8.69358 1.5ZM4.46085 3.13976C3.45476 3.27502 2.87511 3.52869 2.4519 3.9519C2.02869 4.37511 1.77502 4.95476 1.63976 5.96085C1.50159 6.98851 1.5 8.3432 1.5 10.25V12.25C1.5 14.1568 1.50159 15.5115 1.63976 16.5392C1.77502 17.5452 2.02869 18.1249 2.4519 18.5481C2.87511 18.9713 3.45476 19.225 4.46085 19.3602C5.48851 19.4984 6.84318 19.5 8.75 19.5H12.75C14.6568 19.5 16.0115 19.4984 17.0392 19.3602C18.0452 19.225 18.6249 18.9713 19.0481 18.5481C19.4713 18.1249 19.725 17.5452 19.8602 16.5392C19.9984 15.5115 20 14.1568 20 12.25V10.25C20 8.3432 19.9984 6.98851 19.8602 5.96085C19.725 4.95476 19.4713 4.37511 19.0481 3.9519C18.6249 3.52869 18.0452 3.27502 17.0392 3.13976C16.0115 3.00159 14.6568 3 12.75 3H8.75C6.84318 3 5.48851 3.00159 4.46085 3.13976Z"
                        fill="#898989"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.25 14C14.8358 14 14.5 14.3358 14.5 14.75C14.5 15.1642 14.8358 15.5 15.25 15.5C15.6642 15.5 16 15.1642 16 14.75C16 14.3358 15.6642 14 15.25 14ZM13 14.75C13 13.5074 14.0074 12.5 15.25 12.5C16.4926 12.5 17.5 13.5074 17.5 14.75C17.5 15.9926 16.4926 17 15.25 17C14.0074 17 13 15.9926 13 14.75Z"
                        fill="#898989"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="registration-field">
                <select
                  className="registration-timezone-select"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Gender*
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Row 4: Nationality (with auto flag), Country of residence (with auto flag) */}
            <div className="registration-row">
              <div className="registration-field">
                <div className="registration-flag-input">
                  <span className="registration-flag-icon">{getFlagFromCountry(nationalityValue)}</span>
                  <span className="registration-flag-divider">|</span>
                  <select style={{border : 'none'}}
                    className="registration-select"
                    value={nationalityValue}
                    onChange={(e) => setNationalityValue(e.target.value)}
                  >
                    <option value="">Nationality*</option>
                    <option value="Qatar">Qatar</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>
              </div>
              <div className="registration-field">
                <div className="registration-flag-input">
                  <span className="registration-flag-icon">{getFlagFromCountry(residenceValue)}</span>
                  <span className="registration-flag-divider">|</span>
                  <select style={{border : 'none'}}
                    className="registration-select"
                    value={residenceValue}
                    onChange={(e) => setResidenceValue(e.target.value)}
                  >
                    <option value="">Country of residence*</option>
                    <option value="Qatar">Qatar</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="registration-row d-flex">
              <div className="registration-field registration-field-visa">
                <label>
                  Do you have a valid work visa to work in your country of residence?
                </label>
                <div className="registration-radio-group">
                  <label>
                    <input style={{padding : "10px"}} type="radio" name="visa" /> Yes
                  </label>
                  <label>
                    <input style={{padding : "10px"}} type="radio" name="visa" /> No
                  </label>
                </div>
              </div>
            </div>

            <div className="registration-row">
              {/* Time Zone dropdown */}
              <div className="registration-field">
                <select className="registration-select registration-timezone-select" defaultValue="">
                  <option value="" disabled>
                    Time Zone*
                  </option>
                  <option value="Asia/Qatar">Asia/Qatar (GMT+3)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                  <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                </select>
              </div>

              {/* Photo upload with camera icon */}
              <div className="registration-field">
                <div className="registration-upload-input">
                  <input
                    type="text"
                    placeholder="Please upload a photo of yourself"
                    className="registration-upload-text"
                    readOnly
                  />
                  <label className="registration-upload-icon">
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="registration-upload-hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.5 3L6.25 4.5H4C2.89543 4.5 2 5.39543 2 6.5V14.5C2 15.6046 2.89543 16.5 4 16.5H16C17.1046 16.5 18 15.6046 18 14.5V6.5C18 5.39543 17.1046 4.5 16 4.5H13.75L12.5 3H7.5Z"
                        stroke="#898989"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="10"
                        cy="10.5"
                        r="3"
                        stroke="#898989"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            </div>

            <div className="registration-row registration-row-textarea">
              <div className="registration-field registration-field-full">
                <textarea placeholder="Please tell us more about yourself*" />
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
                onClick={() => navigate("/regitraion-education")}
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


            </div>
          {/* Stepper */}
          <div>
                        <p className="registration-recaptcha">
              Protected by reCAPTCHA and subject to the Tahraa
              <span> Privacy Policy</span> and <span>Terms of Use</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationBasics;
