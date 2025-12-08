import { useEffect, useState } from "react";
import "./MyExperts.css";
import { getTraineeMyExperts, getTraineeSavedExperts } from "../../services/trainee/trainee";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MyExperts() {
  const [myExperts, setMyExperts] = useState([]);
  const [savedExperts, setSavedExperts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myExpertsResult, savedExpertsResult] = await Promise.allSettled([
          getTraineeMyExperts(),
          getTraineeSavedExperts()
        ]);

        if (myExpertsResult.status === 'fulfilled') {
          const res = myExpertsResult.value;
          setMyExperts(res.data?.myExperts || []);
        }

        if (savedExpertsResult.status === 'fulfilled') {
          const res = savedExpertsResult.value;
          setSavedExperts(res.data?.savedExperts || []);
        }
      } catch (error) {
        console.error("Unexpected error in fetchData", error);
      }
    };

    fetchData();
  }, []);

  const renderSection = (title, data) => (
    <div>
      <div className="my-experts-header">
        <h3 className="my-experts-title">{title}</h3>
        <button className="more-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="21" viewBox="0 0 4 21" fill="none">
            <circle cx="2" cy="2.5" r="2" fill="#252525"/>
            <circle cx="2" cy="10.5" r="2" fill="#252525"/>
            <circle cx="2" cy="18.5" r="2" fill="#252525"/>
          </svg>
        </button>
      </div>

      {data.length > 0 && (
        <div className="my-experts-slider-container">
          <Swiper
            modules={[Navigation]}
            spaceBetween={14}
            slidesPerView={3}
            navigation
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 12 },
              1024: { slidesPerView: 3, spaceBetween: 14 },
            }}
            className="my-experts-swiper"
          >
            {data.map((expert, idx) => (
              <SwiperSlide key={idx}>
                <div className="expert-item">
                  <div className="expert-avatar">
                   {(() => {
                      const rawImage = expert.profileImage || expert.profilePicture;
                      const isValid = typeof rawImage === "string" && rawImage.startsWith("http");
                      return isValid ? (
                        <img src={rawImage} alt={expert.name || "Expert"} />
                      ) : null;
                    })()}
                  </div>
                  <p className="expert-name">{expert.name}</p>
                  <p className="expert-role">{expert.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );

  return (
    <div className="my-experts-card">
      {renderSection("My Experts", myExperts)}
      {renderSection("Saved Experts", savedExperts)}
    </div>
  );
}
