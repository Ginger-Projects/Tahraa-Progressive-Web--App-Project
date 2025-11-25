import React from "react";
import Button from "../Button";
import Veryfied from "../../assets/images/verified.png";

const ExpertCard = ({ data, view }) => {
  return (
    <article className={`exp-card expert-card ${view === "list" ? "list-view" : ""}`}>
      <div className="exp-card-img-wrap">
        <img src={data.image} alt={data.name} />
      </div>

      <div className="exp-card-body">
        <div className="exp-card-header">
          <h3 className="exp-card-name">{data.name}</h3>
          <img src={Veryfied} className="img-fluid" alt="" />
        </div>

        <p className="exp-card-role">
          {data.role} <span className="dot">|</span> {data.experience}
        </p>

        <p className="exp-card-speaks">
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none">
            <path stroke="#252525" strokeWidth="0.5" d="M0.8 1.86h4.8M3.2 1.06v.8" />
          </svg>{" "}
          Speaks: <span>{data.speaks}</span>
        </p>

        <p className="exp-card-fee d-flex align-items-center justify-content-between">
          <span>Fee range: <span>{data.fee}</span></span>
          <span>140 Active Student</span>
        </p>
      </div>

      <div className="exp-card-footer">
        <Button label="Book Session" bg="#775DA6" />
        <Button label="Enquire" bg="#02B346" />
      </div>
    </article>
  );
};

export default ExpertCard;
