import React from "react";
import "./ForgotPassword.css";
import Girl from "../assets/images/girl.png";
import Smile from "../assets/images/cry.png";
import Logo from "../assets/images/logo.png";
import BigLine from "../assets/images/bigline.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className='fp-page'>
      <div className='fp-wrapper'>
        {/* LEFT SECTION */}
        <div className='fp-left'>
          <div className='fp-logo'>
            <Link to='/'><img src={Logo} alt='' /></Link>
          </div>

          <div className='fp-emoji mt-5'>
            <img src={Smile} alt='' />
          </div>

          <h1 className='fp-title'>
            Snap! Forgot your <br /> password?
          </h1>
          <p className='fp-subtitle mt-2'>We’ve got you covered.</p>

          <form className='fp-form mt-4'>
            <label className='fp-label'>Email address</label>
            <input type='email' className='fp-input mt-3' placeholder='Enter your email address*' />

            <button className='BTN-2 mt-3'>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src={BigLine} />

              <div className='label'>Sign in</div>
            </button>
          </form>

          <p className='fp-help m-0'>
            Want to help? <button className='fp-link'>Contact us on WhatsApp</button>
          </p>

          <p className='fp-footer-note'>
            Protected by reCAPTCHA and subject to the Tahraa <a href='#'>Privacy Policy</a> and <a href='#'>Terms of Service</a>.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className='fp-right'>
          <button className='BTN'>
            <div className='rectangle-2' />

            <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

            <img className='line' alt='Line' src={BigLine} />

            <Link className='label' to='/login'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='18' viewBox='0 0 16 18' fill='none'>
                <g filter='url(#filter0_d_62_1576)'>
                  <path
                    d='M3.82843 6.77822H16V8.77822H3.82843L9.1924 14.1421L7.7782 15.5563L0 7.77822L7.7782 0L9.1924 1.41421L3.82843 6.77822Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_d_62_1576'
                    x='0'
                    y='0'
                    width='16'
                    height='17.3463'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1.79' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
                    <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_62_1576' />
                    <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_62_1576' result='shape' />
                  </filter>
                </defs>
              </svg>{" "}
              Back to Login
            </Link>
          </button>

          <div className='fp-image-box'>
            <img src={Girl} alt='Reset Password Illustration' className='fp-img img-fluid' />
          </div>

          <p className='fp-bottom-text'>Please check your inbox to reset your password.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
