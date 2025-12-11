import React, { useState } from "react";
import Button from "../Button";
import Veryfied from "../../assets/images/verified.png";
import { Link, useNavigate } from "react-router-dom";
import { createExpertConversation } from "../../services/expertService";
import { toast } from "react-toastify";
import Expert2 from "../../assets/images/whitebg.jpg";

const ExpertCard = ({ data, view }) => {
  const [enquiring, setEnquiring] = useState(false);
  const navigate = useNavigate();

  const category = data.experienceAndQualifications?.teachingCategory?.name || "Not specified";
  const experience = data.experienceAndQualifications?.yearsOfExperience
    ? `${data.experienceAndQualifications.yearsOfExperience} Years Experience`
    : "Experience not provided";

  const fee = data.experienceAndQualifications?.feeRange || "Not provided";

  const speaks =
    data.languages?.length > 0 ? data.languages.join(", ") : "Not specified";

  const traineeCount = data.traineeCount || 0;
  console.log("data", data);

  const handleEnquire = async () => {
    const expertId = data?._id;
    if (!expertId || enquiring) return;

    try {
      setEnquiring(true);
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
      setEnquiring(false);
    }
  };

  return (
    <article className={`exp-card expert-card ${view === "list" ? "list-view" : ""}`}>
      <div className="exp-card-img-wrap">
        <img src={data.profileImage||Expert2} alt={data.name} />
      </div>

      <div className="exp-card-content">
        <div className="exp-card-body">

          {/* Name + Verified Badge */}
          <div className="exp-card-header">
            <h3 className="exp-card-name">{data.name}</h3>
            <img src={Veryfied} className="img-fluid" alt="verified" />
          </div>

          {/* Role & Experience */}
          <p className="exp-card-role">
            {category} <span className="dot">|</span> {experience}
          </p>

          {/* Languages */}
          <p className="exp-card-speaks">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M1.59375 3.7063H11.1423" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.36914 2.11743V3.70572" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.02148 14.8247L12.2043 7.41272L15.3872 14.8247" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.99805 12.7059H14.4076" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.32832 3.7063C9.32832 3.7063 8.52267 6.81669 6.5997 9.16603C4.67673 11.5154 2.6543 12.7066 2.6543 12.7066" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.49184 11.1181C8.49184 11.1181 7.33143 10.2247 6.10471 8.63644C4.87798 7.04816 4.24805 5.82385 4.24805 5.82385" stroke="#252525" strokeWidth="1.06484" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Speaks: <span> {speaks}</span>
          </p>

          {/* Fee + Active Students */}
          <p className="exp-card-fee d-flex align-items-center justify-content-between">
            <span>
              Fee range: <span>{fee}</span>
            </span>
            <span>{traineeCount} Active Students</span>
          </p>
        </div>

        <div className="exp-card-footer">
          <Link to={`/expert-profile?expertId=${data._id}`} className="w-100">
            <Button label="View Packages" bg="#775DA6" />
          </Link>
          <button
            type="button"
            className="w-100 border-0 bg-transparent p-0"
            onClick={handleEnquire}
            disabled={enquiring}
          >
            <Button
              label={enquiring ? "Enquiring..." : "Enquire"}
              bg="#02B346"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ExpertCard;
