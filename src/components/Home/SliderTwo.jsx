import React from "react";
import "./SliderTwo.css";

// Import your images here (replace placeholders)
import Expert1 from "../../assets/images/expert1.png";
import Expert2 from "../../assets/images/expert2.png";
import Expert3 from "../../assets/images/expert3.png";
import Expert4 from "../../assets/images/expert4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import Next from "../../assets/images/Next.png";
import Prev from "../../assets/images/Prev.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const SliderTwo = () => {
  return (
    <section className='experts-section container-fluid py-5'>
      <div className='wrap-div w-100'>
        <div className='header-row  d-flex justify-content-between align-items-center flex-md-row flex-column'>
          <div>
            <h2 className='experts-title'>Find Reliable And Experienced Experts</h2>
            <p className='experts-subtitle'>Your search ends here. Pick an expert of your choice.</p>
          </div>

          <button className='BTNslider2'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

            <div className='label'>View All</div>
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
            spaceBetween={24}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 18 },
               768: { slidesPerView: 2, spaceBetween: 18 },
              1130: { slidesPerView: 3, spaceBetween: 24 },
              1400: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className='experts-swiper'
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className='expert-card'>
                <img src={Expert1} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Tony Stark <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    Vocal Trainer | <span>10 Years of experience</span>
                  </p>
                  <p className='speak'>
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>English , Arabic +2
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR 250/hr
                    </p>
                    <span>140 Active Students</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    {/* Primary Button */}
                    <button className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>
                    

                    {/* Green Button */}
                    <button className='BTN-2slider'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Enquire</div>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className='expert-card'>
                <img src={Expert2} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Natasha Romanoff <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    Yoga Instructor | <span>7 Years of experience</span>
                  </p>
                  <p className='speak'>
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>English , Arabic +2
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR 250/hr
                    </p>
                    <span>140 Active Students</span>
                  </div>

                  <div className='btn-box d-flex gap-3 mt-3'>
                    <button className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>

                     <button className='BTN-2slider'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Enquire</div>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className='expert-card'>
                <img src={Expert3} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Bruce Banner <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    Fitness Coach | <span>12 Years of experience</span>
                  </p>
                  <p className='speak'>
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>English , Arabic +2
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR 250/hr
                    </p>
                    <span>140 Active Students</span>
                  </div>

                  <div className='btn-box d-flex gap-3 mt-3'>
                    <button className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>

                     <button className='BTN-2slider'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Enquire</div>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <div className='expert-card'>
                <img src={Expert4} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Peter Parker <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    Photography Mentor | <span>5 Years</span>
                  </p>

                  <p className='speak'>
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>English , Arabic +2
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR 250/hr
                    </p>
                    <span>140 Active Students</span>
                  </div>

                  <div className='btn-box d-flex gap-3 mt-3'>
                    <button className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>

                     <button className='BTN-2slider'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Enquire</div>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='expert-card'>
                <img src={Expert1} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    Tony Stark <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    Vocal Trainer | <span>10 Years of experience</span>
                  </p>
                  <p className='speak'>
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>English , Arabic +2
                  </p>
                  <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR 250/hr
                    </p>
                    <span>140 Active Students</span>
                  </div>
                  <div className='btn-box d-flex gap-3 mt-3'>
                    {/* Primary Button */}
                    <button className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>

                    {/* Green Button */}
                     <button className='BTN-2slider'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Enquire</div>
                    </button>
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
