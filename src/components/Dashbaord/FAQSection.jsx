import React, { useState } from "react";
import "./FAQSection.css";
import Thumb from "../../assets/images/thumb.png";
import PlayBtn from "../../assets/images/play-btn.png";

const faqItems = [
  {
    id: 1,
    question: "Lorem ipsum is placeholder text commonly used in the?",
    answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing.",
  },
  {
    id: 2,
    question: "Lorem ipsum is placeholder text commonly used in the?",
    answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing.",
  },
  {
    id: 3,
    question: "Lorem ipsum is placeholder text commonly used in the?",
    answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing.",
  },
  {
    id: 4,
    question: "Lorem ipsum is placeholder text commonly?",
    answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing.",
  },
  {
    id: 5,
    question: "Lorem ipsum is placeholder text commonly used in the?",
    answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing.",
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <>
      <h2 className='exp-faq-title'>
        Frequently
        <br />
        Asked Questions
      </h2>
      <section className='exp-faq-section'>
        <div className='exp-faq-left'>
          <div className='exp-accordion'>
            {faqItems.map((item) => {
              const open = item.id === openId;
              return (
                <div key={item.id} className={"exp-accordion-item" + (open ? " open" : "")}>
                  <button className='exp-accordion-header' onClick={() => setOpenId(open ? null : item.id)}>
                    <span>{item.question}</span>
                    <span className='exp-accordion-icon'>{open ? "−" : "+"}</span>
                  </button>
                  {open && <div className='exp-accordion-content'>{item.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className='exp-faq-right'>
          <div className='exp-video-card'>
            <div className='exp-video-thumb'>
              <img src={Thumb} alt='How Tahraa works' />

              <button className='exp-video-play-btn' type='button' aria-label='Play video'>
                <img src={PlayBtn} alt='Play video' className='exp-video-play-icon' />
              </button>

              <div className='exp-video-progress'>
                <div className='exp-video-progress-track'>
                  <div className='exp-video-progress-filled'>
                    <span className='exp-video-progress-dot' />
                  </div>
                </div>
                <div className='exp-video-progress-meta'>
                  <span className='exp-video-time-current'>17:49</span>
                  <span className='exp-video-time-total'>34:00</span>
                </div>
              </div>
            </div>

            <div className='exp-video-body'>
              <h3>How Yanmu works</h3>
              <p>Lorem ipsum is placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
