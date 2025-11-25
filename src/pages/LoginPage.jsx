import React, { useState } from "react";
import "./LoginPage.css";
import Person from "../assets/images/personTwo.png";
import BigLine from "../assets/images/bigline.png";
import Logo from "../assets/images/logo.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

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

  return (
    <div className='lp-page'>
      <div className='lp-wrapper'>
        {/* LEFT – FORM */}
        <div className='lp-left'>
          <div className='lp-logo'>
            <img src={Logo} alt='' />
          </div>

          <h1 className='lp-title'>Yay, you&apos;re back!</h1>
          <p className='lp-subtitle'>Let&apos;s pick up right where you left off.</p>

          <form className='lp-form'>
            {/* Email */}
            <div className='lp-field'>
              <label className='lp-label'>Email address</label>
              <input type='email' className='lp-input' placeholder='Enter your full name*' />
            </div>

            {/* Password */}
            <div className='lp-field'>
              <label className='lp-label'>Password</label>
              <input type='password' className='lp-input' placeholder='Enter your password*' />
            </div>

            {/* Sign in button */}
            <button className='BTN-2'>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src={BigLine} />

              <div className='label'>Sign in</div>
            </button>

            {/* Remember / Forgot */}
            <div className='lp-remember-row'>
              <label className='lp-remember'>
                <input type='checkbox' />
                <span>Remember me</span>
              </label>
              <Link type='button' to='/forgot-password' className='lp-link lp-link-small'>
                Forgot password
              </Link>
            </div>

            {/* Sign up text */}
            <p className='lp-signup-text'>
              Don&apos;t have an account?{" "}
              <button type='button' className='lp-link'>
                Sign Up
              </button>
            </p>

            {/* Terms / reCAPTCHA text */}
            <p className='lp-terms'>
              Protected by reCAPTCHA and subject to the Tahraa <a href='#privacy'>Privacy Policy</a> and{" "}
              <a href='#terms'>Terms of Service</a>.
            </p>
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
