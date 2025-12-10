import React, { useEffect, useState, useRef } from "react";
import "./SliderThree.css";

// Import your images here (replace placeholders)
import Package1 from "../../assets/images/package1.png";
import Package2 from "../../assets/images/package2.png";
import Package3 from "../../assets/images/package3.png";
import Package4 from "../../assets/images/package4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import File from "../../assets/images/file.png";
import Clock from "../../assets/images/clock.png";
import Next from "../../assets/images/next.png";
import Prev from "../../assets/images/prev.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { fetchPackages } from "../../features/slice/packageSlice";
import { useDispatch, useSelector } from "react-redux";

export const SliderThree = () => {
  const { packages } = useSelector((state) => state.packages);
  console.log("pack",packages);
  
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(() => {
    if (typeof window === "undefined") return 3;
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 2;
    return 1;
  });

  useEffect(() => {
    dispatch(fetchPackages({ page: 1, limit }));
  }, [dispatch, limit]);

  const updateNavState = (swiper, more) => {
    if (!swiper) return;
    const canPrev = !swiper.isBeginning;
    const canNext = more || !swiper.isEnd;
    setHasPrev(canPrev);
    setHasNext(canNext);
  };

  const handlePrev = () => {
    if (!hasPrev || !swiperRef.current) return;
    swiperRef.current.slidePrev();
    updateNavState(swiperRef.current, hasMore);
  };

  const handleNext = async () => {
    if (!hasNext || !swiperRef.current) return;

    const oldLength = packages ? packages.length : 0;
    const nextPage = page + 1;
    let moreFlag = hasMore;

    try {
      const payload = await dispatch(
        fetchPackages({ page: nextPage, limit })
      ).unwrap();

      const payloadData = payload || {};
      const newPackages =
        payloadData.data?.packages ||
        payloadData.packages ||
        [];

      if (newPackages.length > 0) {
        setPage(nextPage);
        const reachedEnd = newPackages.length < limit;
        const nextHasMore = !reachedEnd;
        setHasMore(nextHasMore);
        moreFlag = nextHasMore;

        const targetIndex = oldLength;

        setTimeout(() => {
          if (!swiperRef.current) return;
          if (typeof swiperRef.current.update === "function") {
            swiperRef.current.update();
          }
          if (typeof swiperRef.current.slideToLoop === "function") {
            swiperRef.current.slideToLoop(targetIndex);
          } else if (typeof swiperRef.current.slideTo === "function") {
            swiperRef.current.slideTo(targetIndex);
          }
          updateNavState(swiperRef.current, nextHasMore);
        }, 0);

        return;
      } else {
        setHasMore(false);
        moreFlag = false;
      }
    } catch (error) {
      console.error("Failed to load more packages", error);
    }

    const swiper = swiperRef.current;
    if (!swiper) return;
    const lastIndex = (swiper.slides?.length || 1) - 1;
    if (swiper.activeIndex < lastIndex) {
      swiper.slideNext();
    }
    updateNavState(swiper, moreFlag);
  };

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
          <button
            className={`arrow-btn left-arrow ${hasPrev ? "" : "disabled"}`}
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none">
              <path
                d="M10.5 1.5L1.5 10.5L10.5 19.5"
                stroke={hasPrev ? "#775DA6" : "rgba(119, 93, 166, 0.50)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Swiper Slider */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavState(swiper, hasMore);
            }}
            slidesPerView={4}
            spaceBetween={30}
            loop={false}
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
                      pkg.listingPageImage|| Package1        // fallback
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
  <Link 
    to={`/expert-booking?packageId=${pkg._id}`} 
    className='text-decoration-none w-100'
  >
    <button type='button' className='home-package-btn'>

      {/* Left Vector */}
      <span className='home-package-btn-vector-left'>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="26" viewBox="0 0 8 26" fill="none">
          <g filter="url(#filter0_f_183_4872)">
            <path d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z" fill="white" fillOpacity="0.3"/>
            <path d="M1.90309 2.67793C2.0754 1.37465 4.58723 1.51028 5.67704 1.63183C5.85385 1.65155 5.9077 1.88205 5.76583 1.98939C5.21435 2.40661 4.27493 3.21706 4.03927 4.04882C2.88235 8.1323 3.12542 15.0394 3.32497 18.3004C3.39767 19.4885 3.20478 20.6794 2.72472 21.7686L1.90309 23.633C1.90309 23.633 1.12632 8.55317 1.90309 2.67793Z" fill="url(#paint0_linear_183_4872)"/>
          </g>
          <defs>
            <filter id="filter0_f_183_4872" x="0" y="0" width="7.4047" height="25.191" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="0.778941" result="effect1_foregroundBlur_183_4872"/>
            </filter>
            <linearGradient id="paint0_linear_183_4872" x1="1.55786" y1="2.14539" x2="3.51447" y2="3.89157" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </span>

      {/* Top Vector */}
      <span className='home-package-btn-vector-top'>
        <svg xmlns="http://www.w3.org/2000/svg" width="92" height="4" viewBox="0 0 92 4" fill="none">
          <g filter="url(#filter0_f_183_4873)">
            <path d="M1.65527 1.65527H89.6043" stroke="white" strokeWidth="0.194735" strokeLinecap="round"/>
          </g>
          <defs>
            <filter id="filter0_f_183_4873" x="0" y="0" width="91.2596" height="3.31059" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="0.778941" result="effect1_foregroundBlur_183_4873"/>
            </filter>
          </defs>
        </svg>
      </span>

      {/* Button Label */}
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
          <button
            className={`arrow-btn right-arrow ${hasNext ? "" : "disabled"}`}
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none">
              <path
                d="M1.5 1.5L10.5 10.5L1.5 19.5"
                stroke={hasNext ? "#775DA6" : "rgba(119, 93, 166, 0.50)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
};