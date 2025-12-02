import React from "react";
import "./SliderThree.css";

// Import your images here (replace placeholders)
import Package1 from "../../assets/images/package1.png";
import Package2 from "../../assets/images/package2.png";
import Package3 from "../../assets/images/package3.png";
import Package4 from "../../assets/images/package4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import Next from "../../assets/images/next.png";
import Prev from "../../assets/images/prev.png";
import File from "../../assets/images/file.png";
import Clock from "../../assets/images/clock.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export const SliderThree = () => {
  return (
    <section className='sliderthree-section container-fluid py-5'>
      <div className='wrap-div'>
        <div className='header-row  d-flex justify-content-between align-items-center flex-md-row flex-column'>
          <div>
            <h2 className='experts-title'>Tailored packages for hobbies <br /> and lifestyle changes</h2>
            <p className='experts-subtitle'>Pick a package. Choose your session schedule. Make it your experience.</p>
          </div>

          <button className='BTN3'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

           <Link to="/our-packages" className='label text-decoration-none'>View All</Link>
          </button>
        </div>

        <div className='experts-slider-container position-relative'>
          {/* Left Arrow */}
          <button className='arrow-btn left-arrow'>
            <img src={Prev} alt='' />
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".right-arrow",
              prevEl: ".left-arrow",
            }}
            onInit={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = ".left-arrow";
                swiper.params.navigation.nextEl = ".right-arrow";
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 4 },
            }}
            className='experts-swiper'
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className='expert-cards'>
                <img src={Package1} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Introduction to Basic Vocal Training
                  </h4>
                  <p className='expert-role'>
                    Gunner S Torres • <span>Vocal Training</span>
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <img className="img-fluid" src={ File } alt="" /> 12 Session
                    </p>
                    <span><img src={Clock} alt="" />50 Min / Session</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    <Link to="/our-packages" className='text-decoration-none w-100'>
                      <button type='button' className='home-package-btn'>
                        <span className='home-package-btn-vector-left'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="26"
                            viewBox="0 0 8 26"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4872)">
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="white"
                                fillOpacity="0.3"
                              />
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="url(#paint0_linear_183_4872)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4872"
                                x="-0.0000202656"
                                y="-0.0000202656"
                                width="7.4047"
                                height="25.191"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4872"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_183_4872"
                                x1="1.55786"
                                y1="2.14539"
                                x2="3.51447"
                                y2="3.89157"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-vector-top'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="92"
                            height="4"
                            viewBox="0 0 92 4"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4873)">
                              <path
                                d="M1.65527 1.65527H89.6043"
                                stroke="white"
                                strokeWidth="0.194735"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4873"
                                x="0.0000407691"
                                y="-0.0000202656"
                                width="91.2596"
                                height="3.31059"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4873"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-label'>Learn More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className='expert-cards'>
                <img src={Package2} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Introduction to Basic Vocal Training
                  </h4>
                  <p className='expert-role'>
                    Gunner S Torres • <span>Vocal Training</span>
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <img className="img-fluid" src={ File } alt="" /> 12 Session
                    </p>
                    <span><img src={Clock} alt="" />50 Min / Session</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    <Link to="/our-packages" className='text-decoration-none w-100'>
                      <button type='button' className='home-package-btn'>
                        <span className='home-package-btn-vector-left'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="26"
                            viewBox="0 0 8 26"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4872)">
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="white"
                                fillOpacity="0.3"
                              />
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="url(#paint0_linear_183_4872)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4872"
                                x="-0.0000202656"
                                y="-0.0000202656"
                                width="7.4047"
                                height="25.191"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4872"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_183_4872"
                                x1="1.55786"
                                y1="2.14539"
                                x2="3.51447"
                                y2="3.89157"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-vector-top'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="92"
                            height="4"
                            viewBox="0 0 92 4"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4873)">
                              <path
                                d="M1.65527 1.65527H89.6043"
                                stroke="white"
                                strokeWidth="0.194735"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4873"
                                x="0.0000407691"
                                y="-0.0000202656"
                                width="91.2596"
                                height="3.31059"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4873"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-label'>Learn More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className='expert-cards'>
                <img src={Package3} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Introduction to Basic Vocal Training
                  </h4>
                  <p className='expert-role'>
                    Gunner S Torres • <span>Vocal Training</span>
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <img className="img-fluid" src={ File } alt="" /> 12 Session
                    </p>
                    <span><img src={Clock} alt="" />50 Min / Session</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    <Link to="/our-packages" className='text-decoration-none w-100'>
                      <button type='button' className='home-package-btn'>
                        <span className='home-package-btn-vector-left'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="26"
                            viewBox="0 0 8 26"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4872)">
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="white"
                                fillOpacity="0.3"
                              />
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="url(#paint0_linear_183_4872)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4872"
                                x="-0.0000202656"
                                y="-0.0000202656"
                                width="7.4047"
                                height="25.191"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4872"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_183_4872"
                                x1="1.55786"
                                y1="2.14539"
                                x2="3.51447"
                                y2="3.89157"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-vector-top'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="92"
                            height="4"
                            viewBox="0 0 92 4"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4873)">
                              <path
                                d="M1.65527 1.65527H89.6043"
                                stroke="white"
                                strokeWidth="0.194735"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4873"
                                x="0.0000407691"
                                y="-0.0000202656"
                                width="91.2596"
                                height="3.31059"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4873"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-label'>Learn More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <div className='expert-cards'>
                <img src={Package4} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Introduction to Basic Vocal Training
                  </h4>
                  <p className='expert-role'>
                    Gunner S Torres • <span>Vocal Training</span>
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <img className="img-fluid" src={ File } alt="" /> 12 Session
                    </p>
                    <span><img src={Clock} alt="" />50 Min / Session</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    <Link to="/our-packages" className='text-decoration-none w-100'>
                      <button type='button' className='home-package-btn'>
                        <span className='home-package-btn-vector-left'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="26"
                            viewBox="0 0 8 26"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4872)">
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="white"
                                fillOpacity="0.3"
                              />
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="url(#paint0_linear_183_4872)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4872"
                                x="-0.0000202656"
                                y="-0.0000202656"
                                width="7.4047"
                                height="25.191"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4872"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_183_4872"
                                x1="1.55786"
                                y1="2.14539"
                                x2="3.51447"
                                y2="3.89157"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-vector-top'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="92"
                            height="4"
                            viewBox="0 0 92 4"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4873)">
                              <path
                                d="M1.65527 1.65527H89.6043"
                                stroke="white"
                                strokeWidth="0.194735"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4873"
                                x="0.0000407691"
                                y="-0.0000202656"
                                width="91.2596"
                                height="3.31059"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4873"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-label'>Learn More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='expert-cards'>
                <img src={Package1} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Introduction to Basic Vocal Training
                  </h4>
                  <p className='expert-role'>
                    Gunner S Torres • <span>Vocal Training</span>
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      12 Session
                    </p>
                    <span>50 Min / Session</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    <Link to="/our-packages" className='text-decoration-none w-100'>
                      <button type='button' className='home-package-btn'>
                        <span className='home-package-btn-vector-left'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="26"
                            viewBox="0 0 8 26"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4872)">
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="white"
                                fillOpacity="0.3"
                              />
                              <path
                                d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z"
                                fill="url(#paint0_linear_183_4872)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4872"
                                x="-0.0000202656"
                                y="-0.0000202656"
                                width="7.4047"
                                height="25.191"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4872"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_183_4872"
                                x1="1.55786"
                                y1="2.14539"
                                x2="3.51447"
                                y2="3.89157"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-vector-top'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="92"
                            height="4"
                            viewBox="0 0 92 4"
                            fill="none"
                          >
                            <g filter="url(#filter0_f_183_4873)">
                              <path
                                d="M1.65527 1.65527H89.6043"
                                stroke="white"
                                strokeWidth="0.194735"
                                strokeLinecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_183_4873"
                                x="0.0000407691"
                                y="-0.0000202656"
                                width="91.2596"
                                height="3.31059"
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
                                  stdDeviation="0.778941"
                                  result="effect1_foregroundBlur_183_4873"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='home-package-btn-label'>Learn More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Right Arrow */}
          <button className='arrow-btn right-arrow'>
            <img src={Next} alt='' />
          </button>
        </div>
      </div>
    </section>
  );
};
