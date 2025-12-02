import React from "react";
import { Link } from "react-router-dom";
import "./SectionFour.css";

import BgImage from "../../assets/images/footer-bg.png";
import LeftImg from "../../assets/images/cta-left.png";
import RightImg from "../../assets/images/cta-right.png";
import Divider from "../../assets/images/cta-divider.png";
import BtnLeftGlow from "../../assets/images/btn-left-glow.svg";
import BtnTopLine from "../../assets/images/btn-top-line.svg";

export const SectionFour = () => {
  return (
    <section
      className="section-four"
    >
      <div className="section-four-wrapper">
        {/* LEFT SIDE (image left, text right) */}
        <div className="four-block">
          <img src={LeftImg} alt="Discover yourself" className="four-img" />

          <div className="four-content">
            <h2 className="four-title">
              Your simple start
              <br />
              to mastery
            </h2>

            <Link to="/signin" className="text-decoration-none">
              <button className="BTNFOUR" type="button">
                <div className="rectangle-2" />
                <img className="vector-2" alt="Glow" src={BtnLeftGlow} />
                <img className="line" alt="Top highlight" src={BtnTopLine} />
                <div className="label">Register as a trainee</div>
              </button>
            </Link>
          </div>
        </div>

        {/* DIVIDER BETWEEN CTAS */}
        <img src={Divider} alt="Divider" className="four-divider" />

        {/* RIGHT SIDE (image right, text left) */}
        <div className="four-block reverse">
          <img src={RightImg} alt="Grow your business" className="four-img" />

          <div className="four-content">
            <h2 className="four-title">
              Unlock your assistant
              <br />
              to grow your business
            </h2>

            <Link to="/registration" className="text-decoration-none">
              <button className="BTNFOUR BTNFOUR-secondary" type="button">
                <div className="rectangle-2" />
                <img className="vector-2" alt="Glow" src={BtnLeftGlow} />
                <img className="line" alt="Top highlight" src={BtnTopLine} />
                <div className="label">Register as an expert</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
