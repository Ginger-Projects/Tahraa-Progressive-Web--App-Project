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
          <p className="d-flex align-items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4952 0H8.44101C8.81128 0 9.16241 0.164462 9.39944 0.448905L12.1868 3.79375C12.3737 4.01796 12.476 4.30058 12.476 4.59244V11.2284C12.476 12.6064 11.3588 13.7236 9.98078 13.7236H2.4952C1.11714 13.7236 0 12.6064 0 11.2284V2.4952C0 1.11714 1.11714 0 2.4952 0ZM11.2294 11.2284V4.99041H9.35804C8.66901 4.99041 8.11044 4.43184 8.11044 3.74282V1.24762H2.49625C1.80722 1.24762 1.24866 1.80619 1.24866 2.49522V11.2284C1.24866 11.9174 1.80722 12.476 2.49625 12.476H9.98184C10.6709 12.476 11.2294 11.9174 11.2294 11.2284ZM10.5217 3.74286L9.35829 2.34683V3.74286H10.5217ZM3.74407 8.10935C3.39955 8.10935 3.12027 7.83007 3.12027 7.48555C3.12027 7.14104 3.39955 6.86176 3.74407 6.86176H8.73446C9.07897 6.86176 9.35826 7.14104 9.35826 7.48555C9.35826 7.83007 9.07897 8.10935 8.73446 8.10935H3.74407ZM3.74407 10.6046C3.39955 10.6046 3.12027 10.3253 3.12027 9.98079C3.12027 9.63628 3.39955 9.35699 3.74407 9.35699H7.48686C7.83137 9.35699 8.11066 9.63628 8.11066 9.98079C8.11066 10.3253 7.83137 10.6046 7.48686 10.6046H3.74407ZM3.74407 5.61424C3.39955 5.61424 3.12027 5.33495 3.12027 4.99044C3.12027 4.64592 3.39955 4.36664 3.74407 4.36664H5.61546C5.95998 4.36664 6.23926 4.64592 6.23926 4.99044C6.23926 5.33495 5.95998 5.61424 5.61546 5.61424H3.74407Z" fill="#775DA6"/>
</svg>
            {data.sessions} Session
          </p>

          <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M6.8623 0C10.6517 0.000219351 13.7235 3.07187 13.7236 6.86133C13.7236 10.6508 10.6518 13.7234 6.8623 13.7236C3.0727 13.7236 1.64958e-05 10.6509 0 6.86133C8.37871e-05 3.07178 3.07275 5.96947e-05 6.8623 0ZM6.86328 1.24707C3.76276 1.24713 1.24912 3.76081 1.24902 6.86133C1.24904 9.96191 3.76271 12.4755 6.86328 12.4756C9.96372 12.4754 12.4775 9.96181 12.4775 6.86133C12.4774 3.76091 9.96367 1.24728 6.86328 1.24707ZM6.86035 2.49512C7.20474 2.49527 7.4834 2.77472 7.4834 3.11914V6.55664L10.0498 8.55273C10.3217 8.76425 10.3707 9.15579 10.1592 9.42773C9.94764 9.69955 9.55607 9.74858 9.28418 9.53711L6.47754 7.35352C6.32559 7.23533 6.23633 7.05383 6.23633 6.86133V3.11914C6.23633 2.77463 6.51584 2.49512 6.86035 2.49512Z" fill="#775DA6"/>
</svg> {data.duration} Min / Session</span>
        </div>

        <div className="package-btn-bar">
          <button className="package-btn">
            <span className="package-btn-vector-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="26" viewBox="0 0 8 26" fill="none">
                <g filter="url(#filter0_f_183_4428)">
                  <path d="M1.90382 2.67793C2.07613 1.37465 4.58796 1.51028 5.67777 1.63183C5.85458 1.65155 5.90843 1.88205 5.76656 1.98939C5.21509 2.40661 4.27566 3.21706 4.04001 4.04882C2.88309 8.1323 3.12616 15.0394 3.3257 18.3004C3.3984 19.4885 3.20551 20.6794 2.72546 21.7686L1.90382 23.633C1.90382 23.633 1.12706 8.55317 1.90382 2.67793Z" fill="white" fillOpacity="0.3" />
                  <path d="M1.90382 2.67793C2.07613 1.37465 4.58796 1.51028 5.67777 1.63183C5.85458 1.65155 5.90843 1.88205 5.76656 1.98939C5.21509 2.40661 4.27566 3.21706 4.04001 4.04882C2.88309 8.1323 3.12616 15.0394 3.3257 18.3004C3.3984 19.4885 3.20551 20.6794 2.72546 21.7686L1.90382 23.633C1.90382 23.633 1.12706 8.55317 1.90382 2.67793Z" fill="url(#paint0_linear_183_4428)" />
                </g>
                <defs>
                  <filter id="filter0_f_183_4428" x="0.000712156" y="-2.02656e-05" width="7.40483" height="25.1908" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="0.778941" result="effect1_foregroundBlur_183_4428" />
                  </filter>
                  <linearGradient id="paint0_linear_183_4428" x1="1.55859" y1="2.14539" x2="3.51521" y2="3.89157" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <span className="package-btn-vector-top">
              <svg xmlns="http://www.w3.org/2000/svg" width="92" height="4" viewBox="0 0 92 4" fill="none">
                <g filter="url(#filter0_f_183_4429)">
                  <path d="M1.6543 1.65527H89.6034" stroke="white" strokeWidth="0.194735" strokeLinecap="round" />
                </g>
                <defs>
                  <filter id="filter0_f_183_4429" x="-0.00124097" y="-2.02656e-05" width="91.2603" height="3.31059" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="0.778941" result="effect1_foregroundBlur_183_4429" />
                  </filter>
                </defs>
              </svg>
            </span>

            <span className="package-btn-label">Learn More</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;
