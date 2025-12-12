import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import Person from "../assets/images/personTwo.png";
import BigLine from "../assets/images/bigline.png";
import Logo from "../assets/images/logo.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginTrainee } from "../services/authService";
import { useDispatch } from "react-redux";
import { setTrainee } from "../features/slice/trainer/traineeSlice";
import TermsOfUse from './Legal/TermsOfUse';
import PrivacyPolicy from './Legal/PrivacyPolicy';
import LegalModal from '../components/LegalModal';

const slides = [
  {
    id: 1,
    text: `“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”`,
    name: "Jacob Markivoc",
    role: "Trainee",
    image: Person, // change paths to your images
  },
  {
    id: 2,
    text: `“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.”`,
    name: "Maria Johnson",
    role: "Student",
    image: Person,
  },
  {
    id: 3,
    text: `“Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.”`,
    name: "Alex Brown",
    role: "Trainee",
    image: Person,
  },
];

const LoginPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token =
      localStorage.getItem("traineeToken") ||
      sessionStorage.getItem("traineeToken");
    if (token) {
      navigate("/trainee");
    }
  }, [navigate]);

  const from = location.state?.from;
  console.log("location state from:", from);

  // Try to get invite/packageId from navigation state first, then fallback to current URL
  const stateSearchParams = new URLSearchParams(from?.search || "");
  const currentSearchParams = new URLSearchParams(location.search || "");

  const invite = stateSearchParams.get("invite") || currentSearchParams.get("invite");
  const packageId = stateSearchParams.get("packageId") || currentSearchParams.get("packageId");
  console.log("invite:", invite, "packageId:", packageId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setSubmitting(true);
      const payload = { email, password };
      const response = await loginTrainee(payload);

      if (response && (response.success || response.token || response.user)) {
        toast(
          <div className="projected-toast-text">{response.message}</div>,
          { className: "projected-toast" }  // optional if you're using the 3D box
        );

        let redirectTo = "/trainee";

        if (invite) {
          const qp = new URLSearchParams();
          if (packageId) {
            qp.set("packageId", packageId);
          }
          qp.set("invite", invite);
          redirectTo = `/expert-booking?${qp.toString()}`;
        }
        console.log("redirect", redirectTo);
        console.log("response.date", response.data);

        dispatch(setTrainee({ ...response.data, rememberMe }));
        navigate(redirectTo);


      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='lp-page'>
      <div className='lp-wrapper'>
        {/* LEFT – FORM */}
        <div className='lp-left'>
          <div className='lp-logo'>
            <Link to='/'><img src={Logo} alt='' /></Link>
          </div>

          <h1 className='lp-title'>Yay, you&apos;re back!</h1>
          <p className='lp-subtitle'>Let&apos;s pick up right where you left off.</p>

          <form className='lp-form' onSubmit={handleSubmit}>
            {/* Email */}
            <div className='lp-field'>
              <label className='lp-label'>Email address</label>
              <input
                type='email'
                className='lp-input'
                placeholder='Enter your email*'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
            </div>

            {/* Password */}
            <div className='lp-field'>
              <label className='lp-label'>Password</label>
              <div className='lp-input-wrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='lp-input'
                  placeholder='Enter your password*'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                />
                <span className='lp-eye-icon' onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                      <path d="M10.3687 0C15.5365 0 19.836 3.7184 20.7373 8.62568C19.836 13.5329 15.5365 17.2514 10.3687 17.2514C5.20079 17.2514 0.901393 13.5329 0 8.62568C0.901393 3.7184 5.20079 0 10.3687 0ZM10.3687 15.3345C14.4281 15.3345 17.9018 12.5091 18.781 8.62568C17.9018 4.74223 14.4281 1.91682 10.3687 1.91682C6.30917 1.91682 2.83553 4.74223 1.95625 8.62568C2.83553 12.5091 6.30917 15.3345 10.3687 15.3345ZM10.3687 12.9385C7.98675 12.9385 6.05582 11.0076 6.05582 8.62568C6.05582 6.24376 7.98675 4.31284 10.3687 4.31284C12.7505 4.31284 14.6815 6.24376 14.6815 8.62568C14.6815 11.0076 12.7505 12.9385 10.3687 12.9385ZM10.3687 11.0217C11.692 11.0217 12.7647 9.94895 12.7647 8.62568C12.7647 7.3024 11.692 6.22966 10.3687 6.22966C9.04542 6.22966 7.97264 7.3024 7.97264 8.62568C7.97264 9.94895 9.04542 11.0217 10.3687 11.0217Z" fill="#898989" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                      <path d="M10.3687 0C15.5365 0 19.836 3.7184 20.7373 8.62568C19.836 13.5329 15.5365 17.2514 10.3687 17.2514C5.20079 17.2514 0.901393 13.5329 0 8.62568C0.901393 3.7184 5.20079 0 10.3687 0ZM10.3687 15.3345C14.4281 15.3345 17.9018 12.5091 18.781 8.62568C17.9018 4.74223 14.4281 1.91682 10.3687 1.91682C6.30917 1.91682 2.83553 4.74223 1.95625 8.62568C2.83553 12.5091 6.30917 15.3345 10.3687 15.3345ZM10.3687 12.9385C7.98675 12.9385 6.05582 11.0076 6.05582 8.62568C6.05582 6.24376 7.98675 4.31284 10.3687 4.31284C12.7505 4.31284 14.6815 6.24376 14.6815 8.62568C14.6815 11.0076 12.7505 12.9385 10.3687 12.9385ZM10.3687 11.0217C11.692 11.0217 12.7647 9.94895 12.7647 8.62568C12.7647 7.3024 11.692 6.22966 10.3687 6.22966C9.04542 6.22966 7.97264 7.3024 7.97264 8.62568C7.97264 9.94895 9.04542 11.0217 10.3687 11.0217Z" fill="#898989" />
                      <path d="M2 15L19 2" stroke="#898989" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Sign in button */}
            <button className='BTN-2' type='submit' disabled={submitting}>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src={BigLine} />

              <div className='label'>{submitting ? "Signing in..." : "Sign in"}</div>
            </button>

            {/* Remember / Forgot */}
            <div className='lp-remember-row'>
              <label className='lp-remember'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link type='button' to='/forgot-password' className='lp-link lp-link-small'>
                Forgot password
              </Link>
            </div>

            {/* Sign up text */}
            <p className='lp-signup-text'>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  if (invite) {
                    const qp = new URLSearchParams();
                    if (packageId) {
                      qp.set("packageId", packageId);
                    }
                    qp.set("invite", invite);
                    navigate(`/signup?${qp.toString()}`);
                  } else {
                    navigate("/signup");
                  }
                }}
                type='button'
                className='lp-link'
              >
                Sign Up
              </button>
            </p>

            {/* Terms / reCAPTCHA text */}
            <p className='lp-terms'>
              Protected by reCAPTCHA and subject to the Yanmu{" "}
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
                <TermsOfUse isModal={true} />
              </LegalModal>
            )}

            {showPrivacyModal && (
              <LegalModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
              >
                <PrivacyPolicy isModal={true} />
              </LegalModal>
            )}
          </form>
        </div>

        {/* RIGHT – CAROUSEL */}
        <div className='lp-right'>
          <div className='lp-hero-card'>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
              className='lp-swiper'
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className='lp-slide'>
                    <img src={slide.image} alt={slide.name} className='lp-slide-img' />

                    {/* Blur quote box */}
                    <div className='lp-quote-box'>
                      <p className='lp-quote-text'>{slide.text}</p>
                      <p className='lp-quote-name'>
                        {slide.name} <span>- {slide.role}</span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Progress / bullets under blur */}
            <div className='lp-slide-progress'>
              {slides.map((_, i) => (
                <span key={i} className={"lp-progress-segment" + (i === activeIndex ? " lp-progress-segment-active" : "")}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
