import { Link } from "react-router-dom";
import "./NotFound.css";
import Logo from "../assets/images/logo.png";
import NotFoundImage from "../assets/images/notfound.png";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-inner">
        <header className="notfound-header">
          <img src={Logo}  alt="Tahraa" className="notfound-logo " />
        </header>

        <main className="notfound-content">
          <div className="notfound-illustration" aria-hidden="true" >
            <img src={NotFoundImage} alt="" />
            </div>

          <h1 className="notfound-title">Oops! 404 - Page Not Found</h1>
          <p className="notfound-text">
            The page you are looking for doesn&apos;t exist or another error occurred.
          </p>

          <Link to="/" className="notfound-button">
            <span className="notfound-btn-glow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="42" viewBox="0 0 15 42" fill="none">
                <g filter="url(#filter0_f_204_589)">
                  <path d="M3.29909 4.3486C3.68756 2.21798 9.36883 2.44784 11.8036 2.64636C12.1195 2.67213 12.1979 3.10501 11.9205 3.25836C10.6747 3.94683 8.61995 5.2476 8.09857 6.58202C5.65216 12.8434 5.992 23.1796 6.41421 28.8032C6.60651 31.3645 6.06334 33.94 4.72934 36.1348L3.29909 38.4881C3.29909 38.4881 1.55388 13.9204 3.29909 4.3486Z" fill="white" fillOpacity="0.3" />
                  <path d="M3.29909 4.3486C3.68756 2.21798 9.36883 2.44784 11.8036 2.64636C12.1195 2.67213 12.1979 3.10501 11.9205 3.25836C10.6747 3.94683 8.61995 5.2476 8.09857 6.58202C5.65216 12.8434 5.992 23.1796 6.41421 28.8032C6.60651 31.3645 6.06334 33.94 4.72934 36.1348L3.29909 38.4881C3.29909 38.4881 1.55388 13.9204 3.29909 4.3486Z" fill="url(#paint0_linear_204_589)" />
                </g>
                <defs>
                  <filter id="filter0_f_204_589" x="-0.00037241" y="-6.19888e-06" width="14.614" height="41.0119" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_204_589" />
                  </filter>
                  <linearGradient id="paint0_linear_204_589" x1="2.52344" y1="3.48099" x2="5.66384" y2="7.34604" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <span className="notfound-btn-line" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="203" height="6" viewBox="0 0 203 6" fill="none">
                <g filter="url(#filter0_f_204_590)">
                  <path d="M2.67969 2.68152H200.28" stroke="white" strokeWidth="0.315476" strokeLinecap="round" />
                </g>
                <defs>
                  <filter id="filter0_f_204_590" x="-0.00037241" y="-6.19888e-06" width="202.962" height="5.36305" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_204_590" />
                  </filter>
                </defs>
              </svg>
            </span>

            <span>Back To Home</span>
          </Link>
        </main>
      </div>
    </div>
  );
}
