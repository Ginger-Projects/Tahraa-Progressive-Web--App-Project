import React from "react";
import "./FormSelectoption.css";

export const FormSelectoption = ({
  className,
  icChevron = "https://c.animaapp.com/RRnEyncc/img/ic-chevron.svg",
  divClassName,
}) => {
  return (
    <div className={`form-selectoption ${className}`}>
      <img className="ic-chevron" alt="Ic chevron" src={icChevron} />

      <div className={`text-wrapper ${divClassName}`}>EN</div>
    </div>
  );
};
