import React from "react";

const PackageCard = ({ data, view }) => {
  return (
    <article className={`expert-cardss ${view === "list" ? "list-view" : ""}`}>
      <img src={data.image} className="expert-img" alt={data.title} />

      <div className="expert-content">
        <h4 className="expert-name">{data.title}</h4>

        <p className="expert-role">
          {data.by} • <span>{data.category}</span>
        </p>

        <div className="d-flex align-items-center justify-content-between expert-price">
          <p>
            {data.sessions} Session
          </p>

          <span>{data.duration} Min / Session</span>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;
