import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./GroupCourse.css";
import { getTraineeProgressSummary } from "../../services/trainee/trainee";

export default function ViolinClassCard({ onLoadingChange = () => {} }) {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        onLoadingChange(true);
        const data = await getTraineeProgressSummary();
        const list = data?.data?.analytics || [];
        setAnalytics(list);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Failed to load progress summary", error);
      } finally {
        onLoadingChange(false);
      }
    };

    fetchProgress();
  }, []);

  const hasAnalytics = analytics && analytics.length > 0;
  const current = hasAnalytics ? analytics[currentIndex] : null;

  const packageName = current?.packageName || "";
  const shortDescription = current?.shortDescription || "";

  const packageStrengthType = current?.packageStrengthType || "";
  const packageType = current?.packageType || "";

  const formatLabel = (value) =>
    typeof value === "string" && value.length > 0
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : "";

  const totalSessions = current?.totalSessions || 0;
  const completedSessions = current?.completedSessions || 0;
  const remainingSessions =
    typeof current?.toBeCompleted === "number"
      ? current.toBeCompleted
      : Math.max(totalSessions - completedSessions, 0);

  const progressPercent =
    totalSessions > 0
      ? Math.round((completedSessions / totalSessions) * 100)
      : 0;

  const analyticsCount = analytics.length;
  const hasMultipleAnalytics = analyticsCount > 1;
  const canGoPrev = hasMultipleAnalytics && currentIndex > 0;
  const canGoNext = hasMultipleAnalytics && currentIndex < analyticsCount - 1;

  const handlePrev = () => {
    if (!canGoPrev) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">

        {hasAnalytics && (
          <>
            {/* Header */}
            <div className="header-row">
              <div className="badges">
                <span className="badge badge-green">
                  {formatLabel(packageStrengthType)}
                  {packageStrengthType && " course"}
                </span>
                <span className="badge badge-purple">
                  {formatLabel(packageType)}
                </span>
              </div>

              <div className="nav-buttons">
                <button
                  className="nav-btn"
                  type="button"
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="18"
                      transform="matrix(1 0 0 -1 0.5 36.5)"
                      fill="white"
                      stroke="#F5F5F5"
                    />
                    <path
                      d="M20.75 22.75L16.25 18.25L20.75 13.75"
                      stroke="#775DA6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="nav-btn"
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="18"
                      transform="matrix(-1 0 0 1 36.5 0.5)"
                      fill="white"
                      stroke="#F5F5F5"
                    />
                    <path
                      d="M16.25 14.25L20.75 18.75L16.25 23.25"
                      stroke="#775DA6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Title + Description */}
            <h1 className="title">{packageName}</h1>
            <p className="description">{shortDescription}</p>

            {/* Progress Section */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-number">{progressPercent}%</span>
                <span className="progress-text">
                  <span>Total</span>
                  <span>Activity</span>
                </span>
              </div>

              <div className="progress-bar-wrapper">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-box">
              <div className="stats-grid">

            <div className="stat-item">
              <div className="stat-icon green-bg">
                <div className="stat-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                    <circle cx="19.3562" cy="19.3562" r="19.3562" fill="#02B346" />
                  </svg>
                  <svg
                    className="stat-icon-check"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M7.03879 10.985L10.7716 14.7178L18.2364 7.25214M2.63965 10.985L6.37244 14.7178M13.838 7.25214L10.998 10.1181"
                      stroke="white"
                      strokeWidth="1.75966"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="stat-number">{completedSessions}</div>
              <div className="stat-label">Completed</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon purple-bg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <circle cx="19.3562" cy="19.3562" r="19.3562" fill="#775DA6" />
                  <path
                    d="M19.6436 10.1631C17.8635 10.1631 16.1235 10.6909 14.6434 11.6799C13.1634 12.6688 12.0098 14.0744 11.3286 15.7189C10.6475 17.3635 10.4692 19.1731 10.8165 20.9189C11.1638 22.6647 12.0209 24.2684 13.2796 25.527C14.5383 26.7857 16.1419 27.6429 17.8877 27.9902C19.6336 28.3374 21.4432 28.1592 23.0877 27.478C24.7322 26.7968 26.1379 25.6433 27.1268 24.1632C28.1157 22.6832 28.6436 20.9431 28.6436 19.1631C28.6436 16.7761 27.6953 14.487 26.0075 12.7991C24.3197 11.1113 22.0305 10.1631 19.6436 10.1631ZM19.6436 26.5281C18.1869 26.5281 16.763 26.0961 15.5518 25.2869C14.3406 24.4776 13.3966 23.3273 12.8392 21.9815C12.2817 20.6358 12.1359 19.1549 12.4201 17.7262C12.7043 16.2976 13.4057 14.9853 14.4357 13.9552C15.4657 12.9252 16.778 12.2238 18.2067 11.9396C19.6354 11.6554 21.1162 11.8013 22.462 12.3587C23.8078 12.9162 24.9581 13.8601 25.7673 15.0713C26.5766 16.2825 27.0086 17.7064 27.0086 19.1631C27.0086 21.1164 26.2326 22.9897 24.8514 24.3709C23.4702 25.7521 21.5969 26.5281 19.6436 26.5281Z"
                    fill="white"
                  />
                  <path
                    d="M22.0135 22.382L19.2205 19.586C19.1078 19.474 19.0441 19.3218 19.0435 19.163V12.863H20.2435V18.914L22.8625 21.533L22.0135 22.382Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="stat-number">{remainingSessions}</div>
              <div className="stat-label">Remaining</div>
            </div>

            <div className="stat-item">
     <div className="stat-icon black-bg">
  <div className="stat-icon-wrapper">

    {/* Background yellow circle */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
    >
      <circle cx="19.3562" cy="19.3562" r="19.3562" fill="#FDB73E" />
    </svg>

    {/* White icon on top */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="stat-foreground-icon"
    >
      <path
        d="M3.51953 7.03861H17.5968M3.51953 7.03861V14.7813C3.51953 15.7668 3.51953 16.2593 3.71132 16.6357C3.88003 16.9668 4.14902 17.2362 4.48013 17.4049C4.85617 17.5966 5.34869 17.5966 6.33226 17.5966H14.7841C15.7676 17.5966 16.2594 17.5966 16.6355 17.4049C16.9666 17.2362 17.2365 16.9668 17.4052 16.6357C17.5968 16.2596 17.5968 15.7678 17.5968 14.7843V7.03861M3.51953 7.03861V6.33492C3.51953 5.34942 3.51953 4.85631 3.71132 4.47989C3.88003 4.14879 4.14902 3.8798 4.48013 3.71109C4.85654 3.5193 5.34965 3.5193 6.33515 3.5193H7.03884M17.5968 7.03861V6.33203C17.5968 5.34846 17.5968 4.85594 17.4052 4.47989C17.2365 4.14879 16.9666 3.8798 16.6355 3.71109C16.2591 3.5193 15.767 3.5193 14.7815 3.5193H14.0775M7.03884 3.5193H14.0775M7.03884 3.5193V1.75964M14.0775 3.5193V1.75964M12.7577 12.3176H8.35859"
        stroke="white"
        strokeWidth="1.75966"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  </div>
</div>

              <div className="stat-number">{totalSessions}</div>
              <div className="stat-label">Total Sessions</div>
            </div>

          </div>
        </div>
          </>
        )}

        {/* CTA Button */}
        <button
          className="course-button"
          type="button"
          onClick={() => navigate('/confirm-booking')}
        >
  <div className="button-decoration-top">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="37" viewBox="0 0 10 37" fill="none" className="decoration-vertical">
      <g filter="url(#filter0_f_178_1828)">
        <path d="M2.66894 3.85631C2.88375 1.97464 6.01323 2.1691 7.37416 2.34462C7.61498 2.37568 7.69368 2.68186 7.51062 2.8414C6.82613 3.43795 5.63103 4.62169 5.33375 5.8369C3.85301 11.8899 4.21071 22.2372 4.46195 26.7833C4.54431 28.2735 4.33164 29.7616 3.80086 31.1564L2.66894 34.131C2.66894 34.131 1.69995 12.3445 2.66894 3.85631Z" fill="white" fillOpacity="0.3"/>
        <path d="M2.66894 3.85631C2.88375 1.97464 6.01323 2.1691 7.37416 2.34462C7.61498 2.37568 7.69368 2.68186 7.51062 2.8414C6.82613 3.43795 5.63103 4.62169 5.33375 5.8369C3.85301 11.8899 4.21071 22.2372 4.46195 26.7833C4.54431 28.2735 4.33164 29.7616 3.80086 31.1564L2.66894 34.131C2.66894 34.131 1.69995 12.3445 2.66894 3.85631Z" fill="url(#paint0_linear_178_1828)"/>
      </g>
      <defs>
        <filter id="filter0_f_178_1828" x="0.000185966" y="2.86102e-06" width="9.84924" height="36.3691" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="1.11905" result="effect1_foregroundBlur_178_1828"/>
        </filter>
        <linearGradient id="paint0_linear_178_1828" x1="2.23828" y1="3.08692" x2="4.98945" y2="5.20693" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="459" height="5" viewBox="0 0 459 5" fill="none" className="decoration-line">
      <g filter="url(#filter0_f_178_1829)">
        <path d="M2.37793 2.37799H456.214" stroke="white" strokeWidth="0.279762" strokeLinecap="round"/>
      </g>
      <defs>
        <filter id="filter0_f_178_1829" x="0.000185966" y="2.86102e-06" width="458.592" height="4.75598" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="1.11905" result="effect1_foregroundBlur_178_1829"/>
        </filter>
      </defs>
    </svg>
  </div>
  Book My Next Class
</button>

      </div>
    </div>
  );
}
