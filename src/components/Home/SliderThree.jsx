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
import { fetchPackages } from "../../features/slice/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export const SliderThree = () => {
  const {packages} = useSelector((state)=>state.packages);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPackages())
  },[])
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
                    {packages?.map((pkg) => (
  <SwiperSlide key={pkg._id}>
    <div className='expert-cards'>
      
      {/* PACKAGE IMAGE */}
      <img
        src={
          pkg.images && pkg.images.length > 0
            ? pkg.images[0]   // API image
            : Package1        // fallback
        }
        className='expert-img'
        alt={pkg.name}
      />

      <div className='expert-content'>
        {/* PACKAGE NAME */}
        <h4 className="expert-name" title={pkg.name}>
  {pkg.name}
</h4>


        {/* EXPERT + CATEGORY */}
        <p className='expert-role'>
          {pkg.expert?.name} • <span>{pkg.category?.name}</span>
        </p>

        {/* SESSIONS + TOTAL PRICE */}
        <div className='d-flex align-items-center justify-content-between expert-price'>
          <p>
            <img className="img-fluid" src={File} alt="" />{" "}
            {pkg.noOfSessions} Sessions
          </p>

          <span>
            Total: QAR {pkg.packageTotalPrice}
          </span>
        </div>

        {/* BUTTON */}
        <div className='btn-box d-flex gap-3 mt-3'>
          <Link to="/our-packages" className='text-decoration-none w-100'>
            <button type='button' className='home-package-btn'>
              <span className='home-package-btn-vector-left'>
                {/* (your svg icon unchanged) */}
              </span>

              <span className='home-package-btn-vector-top'>
                {/* (your svg icon unchanged) */}
              </span>

              <span className='home-package-btn-label'>Learn More</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  </SwiperSlide>
))}
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