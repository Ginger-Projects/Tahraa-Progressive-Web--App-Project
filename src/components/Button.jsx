import React from "react";
import "./Button.css";   
import LineSrc from '../assets/images/bigline.png';

const Button = ({ label, bg   }) => {
  return (
    <button className="BTNmain" style={{ "--btn-bg": bg }}>
      <div className="rectangle-2" />

      <img className="vector-2" src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' alt="" />
       <img className="line" src={LineSrc} alt="" />

      <div className="label">{label}</div>
    </button>
  );
};

export default Button;
