import React from "react";
import { Link } from "react-router-dom";
import "./VideSection.css";

// replace with your real image paths
import HowImg1 from "../../assets/images/how-works-1.png";
import HowImg2 from "../../assets/images/how-works-2.png";

export const VideSection = () => {
  return (
    <section className='how-section container-fluid py-5'>
      <div className='how-wrap'>
        {/* Heading */}
        <div className='text-center'>
          <h2 className='how-title'>How This Works</h2>
          <p className='how-subtitle'>Our platform empowers experts and learners to find each other.</p>
        </div>

        {/* Two cards */}
        <div className='how-grid'>
          {/* Card 1 */}
          <div className='how-item'>
            <div className='how-card'>
              <img src={HowImg1} alt='How it works step 1' className='how-image' />
            </div>

            <h2 className='heading-text'>For Learners</h2>

            <p className='how-text'>
              Follow these steps to find your ideal coach, book your first session and begin your journey.
            </p>

            <Link to="/how-it-works-learners" className='text-decoration-none'>
              <button className='BTN' type='button'>
                <div className='rectangle-2' />

                <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                <div className='label'>Explore More</div>
              </button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className='how-item'>
            <div className='how-card'>
              <img src={HowImg2} alt='How it works step 2' className='how-image' />
            </div>
            <h2 className='heading-text'>For Experts</h2>
            <p className='how-text'>Learn how Tahraa manages your schedule, find clients for you, and secures more earnings.</p>

            <Link to="/how-it-works-experts" className='text-decoration-none'>
              <button className='BTN' type='button'>
                <div className='rectangle-2' />

                <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

                <img className='line' alt='Line' src='https://c.animaapp.com/RRnEyncc/img/line-1.svg' />

                <div className='label'>Explore More</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
