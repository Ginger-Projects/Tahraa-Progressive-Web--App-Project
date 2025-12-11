import React, { useEffect, useState, useRef } from "react";
import "./SliderTwo.css";

// Import your images here (replace placeholders)
import Expert1 from "../../assets/images/expert1.png";
import Expert2 from "../../assets/images/whitebg.jpg";
import Expert3 from "../../assets/images/expert3.png";
import Expert4 from "../../assets/images/expert4.png";
import Verified from "../../assets/images/verified.png";
import Speak from "../../assets/images/speak.png";
import Next from "../../assets/images/next.png";
import Prev from "../../assets/images/prev.png";


// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperts } from "../../features/slice/expertSlice";
import { createExpertConversation } from "../../services/expertService";
import { toast } from "react-toastify";

export const SliderTwo = () => {
  const dispatch = useDispatch()
  const {experts} = useSelector((state) => state.experts);
  console.log("experts",experts);
  
  const swiperRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [enquiringExpertId, setEnquiringExpertId] = useState(null);
  const navigate = useNavigate();
  const [limit] = useState(() => {
    if (typeof window === "undefined") return 3;
    const width = window.innerWidth;
    if (width >= 1400) return 4;
    if (width >= 1130) return 3;
    if (width >= 768) return 2;
    return 1;
  });
  
  useEffect(()=>{
    dispatch(fetchExperts({ page: 1, limit }))
  },[dispatch, limit])

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

    const oldLength = experts ? experts.length : 0;
    const nextPage = page + 1;
    let moreFlag = hasMore;

    try {
      const payload = await dispatch(
        fetchExperts({ page: nextPage, limit })
      ).unwrap();

      const newExperts = payload?.data?.experts || [];

      if (newExperts.length > 0) {
        setPage(nextPage);
        const reachedEnd = newExperts.length < limit;
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
      console.error("Failed to load more experts", error);
    }

    const swiper = swiperRef.current;
    if (!swiper) return;
    const lastIndex = (swiper.slides?.length || 1) - 1;
    if (swiper.activeIndex < lastIndex) {
      swiper.slideNext();
    }
    updateNavState(swiper, moreFlag);
  };

  const handleEnquire = async (expertId) => {
    if (!expertId) return;
    try {
      setEnquiringExpertId(expertId);
      const res = await createExpertConversation(expertId);
      navigate(`/chat/${res?.data?.conversation?._id}`);
      toast.success(res?.message || "Enquiry sent successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        (error?.message === "Network Error"
          ? "Network error while sending enquiry"
          : "Failed to send enquiry");
      toast.error(message);
    } finally {
      setEnquiringExpertId(null);
    }
  };
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
            spaceBetween={24}
            loop={false}
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
              return(
            <SwiperSlide>
              <div className='expert-card'>
                <img src={expert.profileImage||Expert2} className='expert-img' alt='expert' />
                <div className='expert-content'>
                  <h4 className='expert-name'>
                    {expert?.name} <img src={Verified} className='img-fluid' alt='' />
                  </h4>
                  <p className='expert-role'>
                    {expert?.experienceAndQualifications?.teachingCategory?.name} | {expert?.experienceAndQualifications?.yearsOfExperience ?(<span>{expert?.experienceAndQualifications?.yearsOfExperience} Years of experience</span>):(<span>Not specified</span>)}
                  </p>
                  {languages ?(<p className='speak'>
                    
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>{languages}
                  </p>):(
                    <><p className='speak'>
                    
                    <img src={Speak} alt='' />
                    <span>Speaks :</span>Not specified
                  </p>
                    </>)}
                  
                  {feeRange ?(<div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR {feeRange}/session
                    </p>
                    <span>{expert?.traineeCount || 0} Active Students</span>
                  </div>):(
                    <div className='d-flex align-items-center justify-content-between expert-price'>
                    <p>
                      <span>Free range: </span>QAR {feeRange}/session
                    </p>
                    <span>{expert?.traineeCount || 0 } Active Student</span>
                  </div>
                  )}
                  
                  <div className='btn-box d-flex gap-3 mt-3'>
                    {/* Primary Button */}
                    <button onClick={()=>navigate(`/expert-profile?expertId=${expert?._id}`)} className='BTNslider2'>
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>Book Session</div>
                    </button>
                    

                    {/* Green Button */}
                    <button
                      className='BTN-2slider'
                      onClick={() => handleEnquire(expert?._id)}
                      disabled={enquiringExpertId === expert?._id}
                    >
                      <div className='rectangle-2' />

                      <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                      <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                      <div className='label'>
                        {enquiringExpertId === expert?._id ? "Enquiring..." : "Enquire"}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
            </SwiperSlide>
            )
            })}
</Swiper>
          {/* Right Arrow */}
          <button
            className={`arrow-btn right-arrow ${hasNext ? "" : "disabled"}`}
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="36" transform="matrix(-1 0 0 1 72 0)" fill="white" />
              <path
                d="M31.5 27.5L40.5 36.5L31.5 45.5"
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
