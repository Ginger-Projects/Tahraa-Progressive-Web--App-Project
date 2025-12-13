import { useEffect, useState } from "react";
import "./Packages.css";
import { useNavigate } from "react-router-dom";
import { getTraineeMyPackages } from "../../services/trainee/trainee";

export default function Packages({ onLoadingChange = () => {} }) {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const initialLimit = width <= 768 ? 2 : 3;
    setPageSize(initialLimit);
    loadPage(1, initialLimit);
  }, []);
  const loadPage = async (page, limitOverride) => {
    const limit = limitOverride ?? pageSize;
    try {
      setLoading(true);
      onLoadingChange(true);
      const data = await getTraineeMyPackages(page, limit);
      console.log("data",data.data.packages);
      
      const list =
        data?.data?.packages ||
        [];
      
      if (list.length === 0 && page > 1) {
        // no more pages; keep current page and stop next
        setHasNext(false);
        return;
      }

      setPackages(list);
      setCurrentPage(page);
      setHasPrev(page > 1);
      setHasNext(list.length === limit);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  };

  const handlePrev = () => {
    if (!hasPrev || loading) return;
    loadPage(currentPage - 1);
  };

  const handleNext = () => {
    if (!hasNext || loading) return;
    loadPage(currentPage + 1);
  };

  return (
    <div className="saved-experts-card">
      <div className="saved-experts-header">
        <h3 className="saved-experts-title">Packages</h3>
        <div className="packages-nav">
          <button
            type="button"
            className="packages-nav-btn"
            onClick={handlePrev}
            disabled={!hasPrev || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18" cy="18" r="18" transform="matrix(1 0 0 -1 0.5 36.5)" fill="white" stroke="#F5F5F5"/>
              <path d="M20.75 22.75L16.25 18.25L20.75 13.75" stroke="#775DA6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            className="packages-nav-btn"
            onClick={handleNext}
            disabled={!hasNext || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18" cy="18" r="18" transform="matrix(-1 0 0 1 36.5 0.5)" fill="white" stroke="#F5F5F5"/>
              <path d="M16.25 14.25L20.75 18.75L16.25 23.25" stroke="#775DA6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {packages.length > 0 ? (
        <div className="saved-experts-grid">
          {packages.map((pkg, idx) => (
            <div key={pkg._id || idx} className="expert-item">
              <div className="expert-avatar saved">
                {(() => {
                  const rawImage = pkg.packageDetails?.listingPageImage;
                  const isValid =
                    typeof rawImage === "string" &&
                    (rawImage.startsWith("http://") ||
                      rawImage.startsWith("https://"));
                  return isValid ? (
                    <img
                      src={rawImage}
                      alt={pkg.packageDetails?.name || pkg.name || "Package"}
                    />
                  ) : null;
                })()}
              </div>
              <p className="expert-name">{pkg.packageDetails?.name || pkg.name}</p>
              {pkg.status === "confirmed" && (
                <button
                  type="button"
                  className="package-schedule-btn"
                  onClick={() => {
                    const bookingId = pkg._id;
                    if (!bookingId) return;

                    const qp = new URLSearchParams();
                    qp.set("bookingId", bookingId);

                    // If this package/booking has an invite field, include it
                    if (pkg.invite) {
                      qp.set("invite", pkg.invite);
                    }

                    navigate(`/confirm-booking?${qp.toString()}`);
                  }}
                >
                  Schedule
                </button>
              )}
              <p className="expert-role">{pkg.expertName || ""}</p>
            </div>
          ))}
        </div>
      ):(<div className="no-packages">
    No packages available
  </div>)}
    </div>
  );
}
