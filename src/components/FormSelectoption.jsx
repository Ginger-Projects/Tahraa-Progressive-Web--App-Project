import React, { useState } from "react";
import "./FormSelectoption.css";

export const FormSelectoption = ({
  className,
  icChevron = "https://c.animaapp.com/RRnEyncc/img/ic-chevron.svg",
  divClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("EN");

  const handleSelect = (newValue) => {
    setValue(newValue);
    setOpen(false);
  };

  return (
    <div className={`form-selectoption ${className}`}>
      <button
        type="button"
        className="form-selectoption-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`text-wrapper ${divClassName}`}>{value}</span>
        <img className="ic-chevron" alt="Ic chevron" src={icChevron} />
      </button>

      {open && (
        <div className="form-selectoption-menu">
          <button
            type="button"
            className="form-selectoption-option"
            onClick={() => handleSelect("EN")}
          >
            EN
          </button>
          <button
            type="button"
            className="form-selectoption-option"
            onClick={() => handleSelect("AR")}
          >
            AR
          </button>
        </div>
      )}
    </div>
  );
};
