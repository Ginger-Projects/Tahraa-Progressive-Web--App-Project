import React from "react";
import "./SectionFour.css";

import BgImage from "../../assets/images/cta-bg.png"; 
import LeftImg from "../../assets/images/cta-left.png";
import RightImg from "../../assets/images/cta-right.png";
import Divider from "../../assets/images/cta-divider.png";

export const SectionFour = () => {
  return (
    <section
      className="section-four"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="section-four-wrapper">

        {/* LEFT SIDE (Image Left / Text Right) */}
        <div className="four-block">
          <img src={LeftImg} alt="" className="four-img" />

          <div className="four-content">
            <h2 className="four-title">
              Your simple start <br /> to mastery
            </h2>

           <button className='BTNFOUR'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

            <div className='label'>Find Yourself Here</div>
          </button>
          </div>
        </div>

        {/* DIVIDER */}
        <img src={Divider} alt="" className="four-divider" />

        {/* RIGHT SIDE (Image Right / Text Left) */}
        <div className="four-block reverse">
          <img src={RightImg} alt="" className="four-img" />
          <div className="four-content">
            <h2 className="four-title">
              Unlock your assistant <br /> to grow your business
            </h2>

            <button className='BTNFOUR'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

            <div className='label'>Register as an Expert</div>
          </button>
          </div>

          
        </div>

      </div>
    </section>
  );
};
