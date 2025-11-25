import React from "react";
import "./SliderThree.css";

// Import your images here (replace placeholders)
import Package1 from "../../assets/images/package1.png";
import Package2 from "../../assets/images/package2.png";
import Package3 from "../../assets/images/package3.png";
import Package4 from "../../assets/images/package4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import Next from "../../assets/images/Next.png";
import Prev from "../../assets/images/Prev.png";
import File from "../../assets/images/file.png";
import Clock from "../../assets/images/clock.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const SliderThree = () => {
  return (
    <section className='sliderthree-section container-fluid py-5'>
      <div className='wrap-div'>
        <div className='header-row  d-flex justify-content-between align-items-start '>
          <div>
            <h2 className='experts-title'>Tailored packages for hobbies <br /> and lifestyle changes</h2>
            <p className='experts-subtitle'>Pick a package. Choose your session schedule. Make it your experience.</p>
          </div>

          <button className='BTN'>
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
