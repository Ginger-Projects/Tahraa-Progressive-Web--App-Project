import React from "react";
import "./Slider.css";
import Music from "../../assets/images/music.png";
import Art from "../../assets/images/art.png";
import Yoga from "../../assets/images/yoga.png";
import Gym from "../../assets/images/gym.png";
import Next from "../../assets/images/next.png";
import Prev from "../../assets/images/prev.png";


// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const Slider = () => {
  return (
    <section className='category-section container-fluid text-center py-5'>
      <div className='d-flex flex-column align-items-center justify-content-between pt-5 pt-lg-0 pt-md-0'>
        <div className='wrap-div'>
          {/* Heading */}
          <h2 className='category-title mb-3'>Time To Reimagine What You Can Do</h2>

          <p className='category-subtitle mb-5'>
            Commodo condimentum est massa in enim fermentum. Mauris turpis et pellentesque.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className='position-relative wrap-div'>
          {/* Swiper Container */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".right-arrow",
              prevEl: ".left-arrow",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={4}
            spaceBetween={40}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            loop={true}
            className='category-swiper'
          >
            <SwiperSlide>
              <div className='category-item'>
                <img className='category-img' src={Music} alt='Music' />
                <p className='category-label mt-3'>Music</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='category-item'>
                <img className='category-img' src={Art} alt='Art' />
                <p className='category-label mt-3'>Art</p>
              </div>
            </SwiperSlide>
            

            <SwiperSlide>
              <div className='category-item'>
                <img className='category-img' src={Gym} alt='Gym' />
                <p className='category-label mt-3'>Gym</p>
              </div>
            </SwiperSlide>
            
            <SwiperSlide>
              <div className='category-item'>
                <img className='category-img' src={Yoga} alt='Yoga' />
                <p className='category-label mt-3'>Yoga</p>
              </div>
            </SwiperSlide>
            

            

                        

          </Swiper>

          {/* Navigation Arrows — YOUR original styles */}
          <button className='arrow-btn right-arrow'><img src={Next} alt="" /></button>
          <button className='arrow-btn left-arrow'><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
  <circle cx="36" cy="36" r="36" fill="white"/>
  <path d="M40.5 27.5L31.5 36.5L40.5 45.5" stroke="#775DA6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
        </div>
      </div>
    </section>
  );
};
