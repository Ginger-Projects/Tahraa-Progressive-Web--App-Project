import React from "react";
import Button from "../Button";
import Veryfied from "../../assets/images/verified.png";
import { Link } from "react-router-dom";

const ExpertCard = ({ data, view }) => {
  return (
    <article className={`exp-card expert-card ${view === "list" ? "list-view" : ""}`}>
      <div className="exp-card-img-wrap">
        <img src={data.image} alt={data.name} />
      </div>

      <div className="exp-card-content">
        <div className="exp-card-body">
          <div className="exp-card-header">
            <h3 className="exp-card-name">{data.name}</h3>
            <img src={Veryfied} className="img-fluid" alt="" />
          </div>

          <p className="exp-card-role">
            {data.role} <span className="dot">|</span> {data.experience}
          </p>

          <p className="exp-card-speaks">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path d="M1.59375 3.7063H11.1423" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.36914 2.11743V3.70572" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.02148 14.8247L12.2043 7.41272L15.3872 14.8247" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.99805 12.7059H14.4076" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.32832 3.7063C9.32832 3.7063 8.52267 6.81669 6.5997 9.16603C4.67673 11.5154 2.6543 12.7066 2.6543 12.7066" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.49184 11.1181C8.49184 11.1181 7.33143 10.2247 6.10471 8.63644C4.87798 7.04816 4.24805 5.82385 4.24805 5.82385" stroke="#252525" stroke-width="1.06484" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            Speaks: <span> {data.speaks}</span>
          </p>

          <p className="exp-card-fee d-flex align-items-center justify-content-between">
            <span>Fee range: <span>{data.fee}</span></span>
            <span>140 Active Student</span>
          </p>
        </div>

        <div className="exp-card-footer">
          <Link to="/expert-booking" className="w-100"><Button label="Book Session" bg="#775DA6" /></Link>
          <Link to="/expert-profile" className="w-100"><Button label="Enquire" bg="#02B346" /></Link>
        </div>
      </div>
    </article>
  );
};

export default ExpertCard;
