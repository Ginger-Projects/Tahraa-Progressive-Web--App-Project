import React, { useEffect } from "react";
import "./SliderTwo.css";

// Import your images here (replace placeholders)
import Expert1 from "../../assets/images/expert1.png";
import Expert2 from "../../assets/images/expert2.png";
import Expert3 from "../../assets/images/expert3.png";
import Expert4 from "../../assets/images/expert4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import Next from "../../assets/images/next.png";
import Prev from "../../assets/images/prev.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperts } from "../../features/slice/expertSlice";

export const SliderTwo = () => {
  const dispatch = useDispatch()
  const {experts} = useSelector((state) => state.experts);
  
  useEffect(()=>{
    dispatch(fetchExperts())
  },[])
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

            <Link to="/our-experts" className='label text-decoration-none'>View All</Link>
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
              1130: { slidesPerView: 3, spaceBetween: 24 },
              1400: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className='experts-swiper'
          >
            {/* Slide 1 */}
            {experts && experts.map((expert) => {
              const experience = expert.experienceAndQualifications || {};
              const yearsOfExperience = experience.yearsOfExperience;
              const feeRange = experience.feeRange;
              const teachingCategory = experience.teachingCategory?.name;
              const languages = (expert.languages || []).join(", ");

              return (
                <SwiperSlide key={expert._id}>
                  <div className='expert-card'>
                    <img
                      src={
                        expert.profileImage &&
                        (expert.profileImage.startsWith("http://") ||
                          expert.profileImage.startsWith("https://"))
                          ? expert.profileImage
                          : Expert4
                      }
                      className='expert-img'
                      alt='expert'
                    />
                    <div className='expert-content'>
                      <h4 className='expert-name'>
                        {expert.name}{" "}
                        <img src={Verified} className='img-fluid' alt='' />
                      </h4>
                      <p className='expert-role'>
                        {teachingCategory && `${teachingCategory} | `}
                        <span>
                          {yearsOfExperience
                            ? `${yearsOfExperience} Years of experience`
                            : "N/A"}
                        </span>
                      </p>
                      <p className='speak'>
                        <img src={Speak} alt='' />
                        <span>Speaks :</span>
                        {languages || " English , Arabic +2"}
                      </p>
                      <div className='d-flex align-items-center justify-content-between expert-price'>
                        <p>
                          <span>Free range: </span>
                          {feeRange || "QAR 250/hr"}
                        </p>
                        <span>
                          {expert.traineeCount
                            ? `${expert.traineeCount} Active Students`
                            : ""}
                        </span>
                      </div>
                      <div className='btn-box d-flex gap-3 mt-3'>
                        {/* Primary Button */}
                        <button className='BTNslider2'>
                          <div className='rectangle-2' />

                          <img
                            className='vector-2'
                            alt='Vector'
                            src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg'
                          />

                          <img
                            className='line'
                            alt='Line'
                            src='https://c.animaapp.com/RRnEyncc/img/line-1.svg'
                          />

                          <div className='label'>Book Session</div>
                        </button>

                        {/* Green Button */}
                        <button className='BTN-2slider'>
                          <div className='rectangle-2' />

                          <img
                            className='vector-2'
                            alt='Vector'
                            src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg'
                          />

                          <img
                            className='line'
                            alt='Line'
                            src='https://c.animaapp.com/RRnEyncc/img/line-1.svg'
                          />

                          <div className='label'>Enquire</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
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
