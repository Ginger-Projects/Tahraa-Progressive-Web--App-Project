import { useEffect, useState } from "react";
import "./MyExperts.css";
import { getTraineeMyExperts, getTraineeSavedExperts } from "../../services/trainee/trainee";
import { useNavigate } from "react-router-dom";

export default function MyExperts({ onLoadingChange = () => {} }) {
  const navigate = useNavigate();
  const [myExperts, setMyExperts] = useState([]);
  const [savedExperts, setSavedExperts] = useState([]);

  const [myPage, setMyPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);

  const [myHasNext, setMyHasNext] = useState(false);
  const [myHasPrev, setMyHasPrev] = useState(false);
  const [savedHasNext, setSavedHasNext] = useState(false);
  const [savedHasPrev, setSavedHasPrev] = useState(false);

  const [loadingMy, setLoadingMy] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [pageSize, setPageSize] = useState(3);

  const loadMyExperts = async (page, limitOverride) => {
    const limit = limitOverride ?? pageSize;
    try {
      setLoadingMy(true);
      onLoadingChange(true);
      const res = await getTraineeMyExperts(page, limit);
      const list = res?.data?.myExperts || [];
      console.log("llist",list);
      if (list.length === 0 && page > 1) {
        setMyHasNext(false);
        return;
      }

      setMyExperts(list);
      setMyPage(page);
      setMyHasPrev(page > 1);
      setMyHasNext(list.length === limit);
    } catch (error) {
      console.error("Failed to load my experts", error);
    } finally {
      setLoadingMy(false);
      onLoadingChange(false);
    }
  };

  const loadSavedExperts = async (page, limitOverride) => {
    const limit = limitOverride ?? pageSize;
    try {
      setLoadingSaved(true);
      onLoadingChange(true);
      const res = await getTraineeSavedExperts(page, limit);
      const list = res?.data?.savedExperts || [];
      console.log("saved",list);
      
      if (list.length === 0 && page > 1) {
        setSavedHasNext(false);
        return;
      }

      setSavedExperts(list);
      setSavedPage(page);
      setSavedHasPrev(page > 1);
      setSavedHasNext(list.length === limit);
    } catch (error) {
      console.error("Failed to load saved experts", error);
    } finally {
      setLoadingSaved(false);
      onLoadingChange(false);
    }
  };

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const initialLimit = width <= 768 ? 2 : 3;
    setPageSize(initialLimit);
    loadMyExperts(1, initialLimit);
    loadSavedExperts(1, initialLimit);
  }, []);

  const handleMyPrev = () => {
    if (!myHasPrev || loadingMy) return;
    loadMyExperts(myPage - 1);
  };

  const handleMyNext = () => {
    if (!myHasNext || loadingMy) return;
    loadMyExperts(myPage + 1);
  };

  const handleSavedPrev = () => {
    if (!savedHasPrev || loadingSaved) return;
    loadSavedExperts(savedPage - 1);
  };

  const handleSavedNext = () => {
    if (!savedHasNext || loadingSaved) return;
    loadSavedExperts(savedPage + 1);
  };

  const getExpertId = (expert) => {
    if (!expert) return null;
    return expert.expertId || expert._id || expert.id || expert.expert?._id || null;
  };

  const handleExpertClick = (expert) => {
    const id = getExpertId(expert);
    if (!id) return;
    navigate(`/expert-profile?expertId=${id}`);
  };

  const renderSection = (title, data, onPrev, onNext, hasPrev, hasNext, loading) => (
    <div className="my-experts-section">
      <div className="my-experts-header">
        <h3 className="my-experts-title">{title}</h3>
        <div className="my-experts-nav">
          <button
            type="button"
            className="my-experts-nav-btn"
            onClick={onPrev}
            disabled={!hasPrev || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18" cy="18" r="18" transform="matrix(1 0 0 -1 0.5 36.5)" fill="white" stroke="#F5F5F5"/>
              <path d="M20.75 22.75L16.25 18.25L20.75 13.75" stroke="#775DA6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            className="my-experts-nav-btn"
            onClick={onNext}
            disabled={!hasNext || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18" cy="18" r="18" transform="matrix(-1 0 0 1 36.5 0.5)" fill="white" stroke="#F5F5F5"/>
              <path d="M16.25 14.25L20.75 18.75L16.25 23.25" stroke="#775DA6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="my-experts-grid">
          {data.map((expert, idx) => (
            <div
              key={idx}
              className="expert-item"
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
              onClick={() => handleExpertClick(expert)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleExpertClick(expert);
                }
              }}
            >
              <div className="expert-avatar">
                {(() => {
                  const rawImage = expert.profileImage || expert.profilePicture;
                  const isValid =
                    typeof rawImage === "string" &&
                    (rawImage.startsWith("http://") || rawImage.startsWith("https://"));
                  return isValid ? (
                    <img src={rawImage} alt={expert.name || "Expert"} />
                  ) : null;
                })()}
              </div>
              <p className="expert-name">{expert.expertName||expert.name}</p>
              <p className="expert-role">{expert?.teachingCategory||expert?.experienceAndQualifications?.teachingCategory?.name||"Not specified"}</p>
            </div>
          ))}
        </div>
      ):(<div className="no-experts">
    There are no experts available
  </div>)}
    </div>
  );

  return (
    <div className="my-experts-card">
      {renderSection(
        "My Experts",
        myExperts,
        handleMyPrev,
        handleMyNext,
        myHasPrev,
        myHasNext,
        loadingMy
      )}
      {renderSection(
        "Saved Experts",
        savedExperts,
        handleSavedPrev,
        handleSavedNext,
        savedHasPrev,
        savedHasNext,
        loadingSaved
      )}
    </div>
  );
}
