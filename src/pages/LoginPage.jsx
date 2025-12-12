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
  console.log("location", from);

  const searchParams = new URLSearchParams(from?.search || "");
  const invite = searchParams.get("invite");
  const packageId = searchParams.get("packageId");
  console.log("invite", invite, packageId);

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
              <input
                type='password'
                className='lp-input'
                placeholder='Enter your password*'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
              />
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
