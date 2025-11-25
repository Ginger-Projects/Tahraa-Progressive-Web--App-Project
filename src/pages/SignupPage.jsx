import React, { useState, useMemo } from "react";
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

  const strength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const marqueeCards = useMemo(
    () => [...mentors, ...mentors], // duplicate for seamless loop
    []
  );

  return (
    <div className="tahraa-page">
      <div className="tahraa-wrapper">
        {/* LEFT – FORM */}
        <div className="tahraa-left-panel">
          <div className="tahraa-logo"><img src={Logo} alt="" /></div>

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
                    type="date"
                    className="tahraa-input-inner"
                    placeholder="Select your DOB*"
                  />
                  <span className="tahraa-input-icon">
                    <span className="calendar-icon" />
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
                  type="password"
                  className="tahraa-input-inner"
                  placeholder="Enter your password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="tahraa-input-icon">
                  <span className="eye-icon" />
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

            {/* Buttons */}
          <button className='BTN-2'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <div className='label'>Sign Up</div>
          </button>

            <button className='BTN'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <div className='label'>Sign Up with Google</div>
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

        {/* RIGHT – AUTO SCROLLING CARDS */}
        <div className="tahraa-right-panel">
          <div className="tahraa-cards-scroller">
            <div className="tahraa-cards-track">
              {marqueeCards.map((mentor, idx) => (
                <article
                  className="tahraa-card"
                  key={`${mentor.name}-${idx}`}
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
  );
};

export default TahraaSignup;
