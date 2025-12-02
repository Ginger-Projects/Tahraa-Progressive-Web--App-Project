import React, { useState, useMemo, useRef } from "react";
import "./SignupPage.css";
import Person from '../assets/images/person.png'
import Tick from '../assets/images/verified.png'
import Logo from '../assets/images/logo.png'
import BigLine from '../assets/images/bigline.png'
import { Link } from "react-router-dom";
const mentors = [
  {
    name: "Peggy Carter",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
  {
    name: "Bucky Barnes",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
  {
    name: "Tony Stark",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
  {
    name: "Steve Rogers",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
  {
    name: "Natasha Romanoff",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
  {
    name: "Clint Barton",
    role: "Vocal Trainer",
    years: "10 Years of experience",
    image: Person,
  },
];

const getPasswordStrength = (password) => {
  if (!password) {
    return { score: 0, label: "Weak", message: "", color: "#e0e0e0" };
  }

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label = "Weak";
  let message = "Try adding more characters and symbols.";
  let color = "#ff5b5b";

  if (score >= 3 && score < 5) {
    label = "Medium";
    message = "Good, but you can make it even stronger.";
    color = "#ffb648";
  }

  if (score >= 5) {
    label = "Strong";
    message = "Your password is great. Nice work!";
    color = "#21c177";
  }

  const percent = Math.min(100, (score / 5) * 100);

  return {
    score,
    label,
    message,
    color,
    percent,
  };
};

const TahraaSignup = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dobInputRef = useRef(null);

  const strength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const marqueeCards = useMemo(
    () => [...mentors, ...mentors], // duplicate for seamless loop
    []
  );

  const leftColumnMentors = useMemo(
    () => marqueeCards.filter((_, idx) => idx % 2 === 0),
    [marqueeCards]
  );

  const rightColumnMentors = useMemo(
    () => marqueeCards.filter((_, idx) => idx % 2 === 1),
    [marqueeCards]
  );

  return (
    <div className="tahraa-page">
      <div className="tahraa-wrapper">
        {/* LEFT – FORM */}
        <div className="tahraa-left-panel">
          <div className="tahraa-logo"><Link to='/'><img src={Logo} alt='' /></Link></div>

          <h1 className="tahraa-title">Discover Yourself</h1>
          <p className="tahraa-subtitle">
            Its quite simple. Register for Free – Check out our hobby and
            lifestyle Experts – Pick a package of your choice.
          </p>

          <form className="tahraa-form">
            {/* Full name */}
            <div className="tahraa-field">
              <label className="tahraa-label">Full name</label>
              <input
                type="text"
                className="tahraa-input"
                placeholder="Enter your full name*"
              />
            </div>

            {/* Email */}
            <div className="tahraa-field">
              <label className="tahraa-label">Email address</label>
              <input
                type="email"
                className="tahraa-input"
                placeholder="Enter your email address*"
              />
            </div>

            {/* DOB + Gender */}
            <div className="tahraa-row">
              <div className="tahraa-field">
                <label className="tahraa-label">Date of birth</label>
                <div className="tahraa-input tahraa-input--with-icon">
                  <input
                    ref={dobInputRef}
                    type="date"
                    className="tahraa-input-inner"
                    placeholder="Select your DOB*"
                  />
                  <span className="tahraa-input-icon">
                    <span
                      className="calendar-icon"
                      onClick={() => {
                        if (dobInputRef.current) {
                          dobInputRef.current.showPicker?.();
                          dobInputRef.current.focus();
                        }
                      }}
                    />
                  </span>
                </div>
              </div>

              <div className="tahraa-field">
                <label className="tahraa-label">Gender</label>
                <div className="tahraa-input tahraa-input--with-icon">
                  <select className="tahraa-input-inner tahraa-select">
                    <option value="">Select your gender*</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="tahraa-input-icon">
                    <span className="chevron-icon" />
                  </span>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="tahraa-field">
              <label className="tahraa-label">Password</label>
              <div className="tahraa-input tahraa-input--with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  className="tahraa-input-inner"
                  placeholder="Enter your password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="tahraa-input-icon">
                  <button
                    type="button"
                    className={`eye-icon-btn ${showPassword ? "eye-icon-btn--active" : ""}`}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                    >
                      <path
                        d="M10.3687 0C15.5365 0 19.836 3.7184 20.7373 8.62568C19.836 13.5329 15.5365 17.2514 10.3687 17.2514C5.20079 17.2514 0.901393 13.5329 0 8.62568C0.901393 3.7184 5.20079 0 10.3687 0ZM10.3687 15.3345C14.4281 15.3345 17.9018 12.5091 18.781 8.62568C17.9018 4.74223 14.4281 1.91682 10.3687 1.91682C6.30917 1.91682 2.83553 4.74223 1.95625 8.62568C2.83553 12.5091 6.30917 15.3345 10.3687 15.3345ZM10.3687 12.9385C7.98675 12.9385 6.05582 11.0076 6.05582 8.62568C6.05582 6.24376 7.98675 4.31284 10.3687 4.31284C12.7505 4.31284 14.6815 6.24376 14.6815 8.62568C14.6815 11.0076 12.7505 12.9385 10.3687 12.9385ZM10.3687 11.0217C11.692 11.0217 12.7647 9.94895 12.7647 8.62568C12.7647 7.3024 11.692 6.22966 10.3687 6.22966C9.04542 6.22966 7.97264 7.3024 7.97264 8.62568C7.97264 9.94895 9.04542 11.0217 10.3687 11.0217Z"
                        fill="#898989"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              {/* Strength bar */}
              
              <div className="tahraa-password-bar">
                <div
                  className="tahraa-password-fill"
                  style={{
                    width: `${strength.percent || 0}%`,
                    backgroundColor: strength.color,
                  }}
                />
              </div>
              <div className="tahraa-password-meta">
                <div className="tahraa-password-message">
                  {strength.message}
                </div>
                <div className="tahraa-password-label">
                  {strength.label}
                </div>
              </div>
            </div>

            {/* Terms / Agreement */}
            <div className="tahraa-agreement">
              <input
                type="checkbox"
                className="tahraa-agreement-checkbox"
              />
              <p className="tahraa-agreement-text">
                <span>By signing up you agree to our </span>
                <a href="#terms-of-use">Terms of use</a>
                <span> and </span>
                <a href="#privacy-policy">Privacy policy</a>
                <span>.</span>
              </p>
            </div>

            {/* Buttons */}
          <button className='BTN-2'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <div className='label'>Sign Up</div>
          </button>

            <button className='BTNaa'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <div className='label'><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <g clip-path="url(#clip0_157_1480)">
    <g filter="url(#filter0_d_157_1480)">
      <path d="M15.856 8.60976C15.856 8.06155 15.8068 7.53442 15.7154 7.02838H8.43408V10.0189H12.5949C12.4156 10.9853 11.8709 11.8041 11.0521 12.3523V14.2922H13.5507C15.0126 12.9462 15.856 10.9642 15.856 8.60976Z" fill="white"/>
    </g>
    <g filter="url(#filter1_d_157_1480)">
      <path d="M8.43424 3.77778C9.56931 3.77778 10.5884 4.16785 11.3897 4.93394L13.6071 2.7165C12.2682 1.46897 10.5181 0.702881 8.43424 0.702881C5.41206 0.702881 2.79752 2.43536 1.52539 4.96205L4.1083 6.96512C4.71625 5.13776 6.42062 3.77778 8.43424 3.77778Z" fill="white"/>
    </g>
    <g filter="url(#filter2_d_157_1480)">
      <path d="M4.10811 9.90289C3.95348 9.43902 3.86563 8.94352 3.86563 8.43397C3.86563 7.92442 3.95348 7.42892 4.10811 6.96505L3 6.09949L1.5252 4.96198C0.984014 6.03932 0.702404 7.22834 0.702881 8.43397C0.702881 9.6815 1.00159 10.8623 1.5252 11.906L4.10811 9.90289Z" fill="white"/>
    </g>
    <g filter="url(#filter3_d_157_1480)">
      <path d="M8.43424 16.1651C10.5217 16.1651 12.2717 15.4728 13.5509 14.292L11.0523 12.3522C10.36 12.8161 9.47443 13.0902 8.43424 13.0902C6.42062 13.0902 4.71625 11.7302 4.1083 9.90283L2.5 11.0995L1.52539 11.9059C2.79752 14.4326 5.41206 16.1651 8.43424 16.1651Z" fill="white"/>
    </g>
  </g>
  <defs>
    <filter id="filter0_d_157_1480" x="8.43408" y="7.02838" width="7.42188" height="8.13379" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.87"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_1480"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_157_1480" result="shape"/>
    </filter>
    <filter id="filter1_d_157_1480" x="1.52539" y="0.702881" width="12.0818" height="7.13227" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.87"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_1480"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_157_1480" result="shape"/>
    </filter>
    <filter id="filter2_d_157_1480" x="0.702881" y="4.96198" width="3.40527" height="7.81397" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.87"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_1480"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_157_1480" result="shape"/>
    </filter>
    <filter id="filter3_d_157_1480" x="1.52539" y="9.90283" width="12.0254" height="7.13227" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.87"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_1480"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_157_1480" result="shape"/>
    </filter>
    <clipPath id="clip0_157_1480">
      <rect width="16.868" height="16.868" fill="white"/>
    </clipPath>
  </defs>
</svg> Sign Up with Google</div>
          </button>

            <div className="tahraa-login-hint">
              Already have an account? <Link type="button" to='/login'>Log in</Link>
            </div>

            <p className="tahraa-terms">
              Protected by reCAPTCHA and subject to the Tahraa{" "}
              <a href="#privacy">Privacy Policy</a> and{" "}
              <a href="#terms">Terms of Service</a>.
            </p>
          </form>
        </div>

        {/* RIGHT – AUTO SCROLLING CARDS (LEFT COLUMN UP, RIGHT COLUMN DOWN) */}
        <div className="tahraa-right-panel">
          <div className="tahraa-cards-scroller">
            {/* Left column – scrolls upward */}
            <div className="tahraa-cards-column tahraa-cards-column--up">
              <div className="tahraa-cards-track tahraa-cards-track--up">
                {leftColumnMentors.map((mentor, idx) => (
                  <article
                    className="tahraa-card"
                    key={`left-${mentor.name}-${idx}`}
                  >
                    <div className="tahraa-card-image-wrapper">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="tahraa-card-image"
                      />
                    </div>
                    <div className="tahraa-card-body">
                      <div className="tahraa-card-name-row">
                        <h3 className="tahraa-card-name">{mentor.name}</h3>
                        <img src={Tick} alt="" />
                      </div>
                      <p className="tahraa-card-meta">
                        {mentor.role}{" "}
                        <span className="dot-separator">|</span>{" "}
                        <span className="tahraa-card-years">
                          {mentor.years}
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right column – scrolls downward */}
            <div className="tahraa-cards-column tahraa-cards-column--down">
              <div className="tahraa-cards-track tahraa-cards-track--down">
                {rightColumnMentors.map((mentor, idx) => (
                  <article
                    className="tahraa-card"
                    key={`right-${mentor.name}-${idx}`}
                  >
                    <div className="tahraa-card-image-wrapper">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="tahraa-card-image"
                      />
                    </div>
                    <div className="tahraa-card-body">
                      <div className="tahraa-card-name-row">
                        <h3 className="tahraa-card-name">{mentor.name}</h3>
                        <img src={Tick} alt="" />
                      </div>
                      <p className="tahraa-card-meta">
                        {mentor.role}{" "}
                        <span className="dot-separator">|</span>{" "}
                        <span className="tahraa-card-years">
                          {mentor.years}
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TahraaSignup;
