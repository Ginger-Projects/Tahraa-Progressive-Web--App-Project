import React, { useState } from "react";
import "./ChangePassword.css";
import Girl from "../assets/images/girl.png";
import Smile from "../assets/images/cry.png";
import Logo from "../assets/images/logo.png";
import BigLine from "../assets/images/bigline.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword.trim()) {
      toast.error("Old password is required");
      return;
    }

    if (!newPassword) {
      toast.error("New password is required");
      return;
    }

    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must be same");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    if (/\s/.test(newPassword)) {
      toast.error("Password must not contain spaces");
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post("/api/trainee/profile/update-password", {
        oldPassword,
        newPassword,
      });

      const message = response?.data?.message || "Password updated successfully";
      toast.success(message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update password. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

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
            Change your <br /> password
          </h1>
          <p className='fp-subtitle mt-2'>Keep your account secure by updating your password.</p>

          <form className='fp-form mt-4' onSubmit={handleSubmit}>
            <label className='fp-label'>Old password</label>
            <div className='fp-password-input mt-3'>
              <input
                type={showOldPassword ? 'text' : 'password'}
                className='fp-input'
                placeholder='Enter your old password*'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type='button'
                className='fp-eye-btn'
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className='fp-label mt-4'>New password</label>
            <div className='fp-password-input mt-3'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                className='fp-input'
                placeholder='Enter your new password*'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type='button'
                className='fp-eye-btn'
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className='fp-label mt-4'>Confirm new password</label>
            <div className='fp-password-input mt-3'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className='fp-input'
                placeholder='Re-enter your new password*'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type='button'
                className='fp-eye-btn'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className='BTN-2 mt-3' type='submit' disabled={submitting}>
              <div className='rectangle-2' />

              <img className='vector-2' alt='Vector' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' />

              <img className='line' alt='Line' src={BigLine} />

              <div className='label'>{submitting ? "Changing..." : "Change password"}</div>
            </button>
          </form>
{/* 
          <p className='fp-help m-0'>
            Want to help? <button className='fp-link'>Contact us on WhatsApp</button>
          </p> */}

          {/* <p className='fp-footer-note'>
            Protected by reCAPTCHA and subject to the Tahraa <a href='#'>Privacy Policy</a> and <a href='#'>Terms of Service</a>.
          </p> */}
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
              Back to Home
            </Link>
          </button>

          <div className='fp-image-box'>
            <img src={Girl} alt='Reset Password Illustration' className='fp-img img-fluid' />
          </div>

          {/* <p className='fp-bottom-text'>Please check your inbox to reset your password.</p> */}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
