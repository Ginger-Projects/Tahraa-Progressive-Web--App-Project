import { useState, useEffect } from 'react';

import './EditTraineeProfilePicture.css';
import TraineeHeader from '../../components/trainee/header';
import { FiUpload, FiX } from 'react-icons/fi';

import ProfileKeta from "../../assets/images/ProfileKeta.jpg"
import avatar1 from "../../assets/images/avatar1.png"
const avatarOptions = [
  { id: 1, src: avatar1, alt: 'Avatar 1' },
  { id: 2, src: avatar1, alt: 'Avatar 2' },
  { id: 3, src: avatar1, alt: 'Avatar 3' },
  { id: 4, src: avatar1, alt: 'Avatar 4' },
  { id: 5, src: avatar1, alt: 'Avatar 5' },
];

export default function EditTraineeProfilePicture() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState(ProfileKeta);
  const [headerTitle, setHeaderTitle] = useState('Edit Profile Picture');

  useEffect(() => {
    const updateTitle = () => {
      if (window.innerWidth <= 768) {
        setHeaderTitle('Edit');
      } else {
        setHeaderTitle('Edit Profile Picture');
      }
    };

    updateTitle();
    window.addEventListener('resize', updateTitle);
    return () => window.removeEventListener('resize', updateTitle);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setSelectedAvatar(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.id);
    setPreviewImage(avatar.src);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile picture:', previewImage);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelled');
    // Navigate back or close the modal
  };

  return (
    <div className="edit-profile-container">
      <TraineeHeader title={headerTitle} />
      <div className="violet-container">
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile Preview" 
                className="profile-image"
              />
            ) : (
              <div className="default-avatar">
                <img src={ProfileKeta} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="white-container">
        <div className="profile-card">
          <div className="upload-section">
            <div className="upload-content">
              <p className="upload-text">Select a photo from your device</p>
              <label className="upload-button">
                <input 
                  type="file" 
                  className="file-input" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {/* Top highlight line SVG */}
                <svg
                  className="upload-top-glow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="5"
                  viewBox="0 0 192 5"
                  fill="none"
                >
                  <g filter="url(#filter0_f_204_430)">
                    <path
                      d="M2.2627 2.26309H189.565"
                      stroke="white"
                      strokeWidth="0.266247"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_f_204_430"
                      x="-9.29832e-05"
                      y="-1.43051e-06"
                      width="191.828"
                      height="4.52619"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="1.06499"
                        result="effect1_foregroundBlur_204_430"
                      />
                    </filter>
                  </defs>
                </svg>

                {/* Left highlight strip SVG */}
                <svg
                  className="upload-strip"
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="35"
                  viewBox="0 0 8 35"
                  fill="none"
                >
                  <g filter="url(#filter0_f_204_429)">
                    <path
                      d="M2.41662 3.67001C2.55899 1.88744 4.62423 2.06265 5.53687 2.22905C5.73358 2.26492 5.80517 2.50113 5.67897 2.65623C5.2311 3.20665 4.39454 4.36493 4.19088 5.55492C3.15376 11.6148 3.47119 22.1973 3.63574 26.1178C3.67811 27.1273 3.57456 28.1327 3.31462 29.1091L2.41662 32.4821C2.41662 32.4821 1.77146 11.7482 2.41662 3.67001Z"
                      fill="white"
                      fillOpacity="0.3"
                    />
                    <path
                      d="M2.41662 3.67001C2.55899 1.88744 4.62423 2.06265 5.53687 2.22905C5.73358 2.26492 5.80517 2.50113 5.67897 2.65623C5.2311 3.20665 4.39454 4.36493 4.19088 5.55492C3.15376 11.6148 3.47119 22.1973 3.63574 26.1178C3.67811 27.1273 3.57456 28.1327 3.31462 29.1091L2.41662 32.4821C2.41662 32.4821 1.77146 11.7482 2.41662 3.67001Z"
                      fill="url(#paint0_linear_204_429)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_f_204_429"
                      x="-9.29832e-05"
                      y="-1.43051e-06"
                      width="7.87226"
                      height="34.6121"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="1.06499"
                        result="effect1_foregroundBlur_204_429"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_204_429"
                      x1="2.12988"
                      y1="2.93779"
                      x2="4.39191"
                      y2="4.15727"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Main upload icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_204_433)">
                    <g filter="url(#filter0_d_204_433)">
                      <path
                        d="M15.9953 8.72443C15.8025 8.72443 15.6175 8.80102 15.4812 8.93737C15.3449 9.07372 15.2683 9.25864 15.2683 9.45146V12.6068C15.2677 13.1195 15.0637 13.6111 14.7012 13.9736C14.3386 14.3362 13.8471 14.5401 13.3343 14.5407H4.11553C3.6028 14.5401 3.11123 14.3362 2.74868 13.9736C2.38613 13.6111 2.18219 13.1195 2.18161 12.6068V9.45146C2.18161 9.25864 2.10501 9.07372 1.96867 8.93737C1.83232 8.80102 1.6474 8.72443 1.45458 8.72443C1.26175 8.72443 1.07683 8.80102 0.940483 8.93737C0.804137 9.07372 0.727539 9.25864 0.727539 9.45146V12.6068C0.728693 13.505 1.08601 14.3661 1.72113 15.0012C2.35625 15.6363 3.21733 15.9936 4.11553 15.9948H13.3343C14.2325 15.9936 15.0936 15.6363 15.7287 15.0012C16.3639 14.3661 16.7212 13.505 16.7223 12.6068V9.45146C16.7223 9.25864 16.6457 9.07372 16.5094 8.93737C16.373 8.80102 16.1881 8.72443 15.9953 8.72443Z"
                        fill="white"
                      />
                    </g>
                    <g filter="url(#filter1_d_204_433)">
                      <path
                        d="M4.87567 7.0573L7.99684 3.93614V11.6325C7.99684 11.8254 8.07344 12.0103 8.20978 12.1466C8.34613 12.283 8.53105 12.3596 8.72387 12.3596C8.9167 12.3596 9.10162 12.283 9.23797 12.1466C9.37431 12.0103 9.45091 11.8254 9.45091 11.6325V3.93614L12.5721 7.0573C12.7092 7.18974 12.8928 7.26302 13.0835 7.26136C13.2741 7.25971 13.4564 7.18325 13.5912 7.04845C13.726 6.91365 13.8025 6.7313 13.8042 6.54067C13.8058 6.35005 13.7325 6.1664 13.6001 6.02928L9.23789 1.66706C9.10155 1.53076 8.91666 1.45419 8.72387 1.45419C8.53109 1.45419 8.3462 1.53076 8.20986 1.66706L3.84764 6.02928C3.71521 6.1664 3.64193 6.35005 3.64358 6.54067C3.64524 6.7313 3.7217 6.91365 3.8565 7.04845C3.9913 7.18325 4.17365 7.25971 4.36427 7.26136C4.5549 7.26302 4.73855 7.18974 4.87567 7.0573Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_204_433"
                      x="0.727539"
                      y="8.72443"
                      width="15.9951"
                      height="8.1428"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.872443" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_204_433"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_204_433"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_204_433"
                      x="3.64355"
                      y="1.45419"
                      width="10.1602"
                      height="11.7778"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="0.872443" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_204_433"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_204_433"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_204_433">
                      <rect width="17.4489" height="17.4489" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Upload Photo</span>
              </label>

            </div>
          </div>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or</span>
            <span className="divider-line"></span>
          </div>

          <div className="avatar-section">
            <h3 className="section-title">Choose your avatar</h3>
            <div className="avatar-grid">
              {avatarOptions.map((avatar) => (
                <div 
                  key={avatar.id}
                  className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <img 
                    src={avatar.src} 
                    alt={avatar.alt} 
                    className="avatar-image"
                  />
                </div>
              ))}
            </div>
          </div>
<div className="action-buttons">

  {/* CANCEL BUTTON */}
  <button className="cancel-button" onClick={handleCancel}>

    {/* LEFT GLOW */}
    <span className="button-left-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="40" viewBox="0 0 8 40" fill="none">
        <g filter="url(#filter0_f_204_419_cancel)">
          <path d="M2.65382 4.20661C2.7586 2.17647 4.26968 2.36177 4.95217 2.55131C5.13042 2.60082 5.19868 2.80482 5.11125 2.96785C4.79235 3.56251 4.12544 4.94505 3.96815 6.3671C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.7961L2.65382 37.2312C2.65382 37.2312 2.17589 13.4659 2.65382 4.20661Z" fill="white" fillOpacity="0.3"/>
          <path d="M2.65382 4.20661C2.7586 2.17647 4.26968 2.36177 4.95217 2.55131C5.13042 2.60082 5.19868 2.80482 5.11125 2.96785C4.79235 3.56251 4.12544 4.94505 3.96815 6.3671C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.7961L2.65382 37.2312C2.65382 37.2312 2.17589 13.4659 2.65382 4.20661Z" fill="url(#paint0_linear_204_419_cancel)"/>
        </g>
        <defs>
          <filter id="filter0_f_204_419_cancel" x="1.43051e-05" y="1.43051e-05" width="7.59079" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_204_419"/>
          </filter>
          <linearGradient id="paint0_linear_204_419_cancel" x1="2.44141" y1="3.36733" x2="4.36996" y2="4.03927" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </span>

    {/* TOP GLOW */}
    <span className="button-top-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="6" viewBox="0 0 144 6" fill="none">
        <g filter="url(#filter0_f_204_420_cancel)">
          <path d="M2.59375 2.59399H141.344" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
        </g>
        <defs>
          <filter id="filter0_f_204_420_cancel" x="1.43051e-05" y="1.43051e-05" width="143.937" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_204_420"/>
          </filter>
        </defs>
      </svg>
    </span>

    <span>Cancel</span>
  </button>


  {/* SAVE BUTTON */}
  <button className="save-button" onClick={handleSave}>

    {/* LEFT GLOW */}
    <span className="button-left-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="40" viewBox="0 0 8 40" fill="none">
        <g filter="url(#filter0_f_204_419_save)">
          <path d="M2.65382 4.20661C2.7586 2.17647 4.26968 2.36177 4.95217 2.55131C5.13042 2.60082 5.19868 2.80482 5.11125 2.96785C4.79235 3.56251 4.12544 4.94505 3.96815 6.3671C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.7961L2.65382 37.2312C2.65382 37.2312 2.17589 13.4659 2.65382 4.20661Z" fill="white" fillOpacity="0.3"/>
          <path d="M2.65382 4.20661C2.7586 2.17647 4.26968 2.36177 4.95217 2.55131C5.13042 2.60082 5.19868 2.80482 5.11125 2.96785C4.79235 3.56251 4.12544 4.94505 3.96815 6.3671C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.7961L2.65382 37.2312C2.65382 37.2312 2.17589 13.4659 2.65382 4.20661Z" fill="url(#paint0_linear_204_419_save)"/>
        </g>
        <defs>
          <filter id="filter0_f_204_419_save" x="1.43051e-05" y="1.43051e-05" width="7.59079" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_204_419"/>
          </filter>
          <linearGradient id="paint0_linear_204_419_save" x1="2.44141" y1="3.36733" x2="4.36996" y2="4.03927" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </span>

    {/* TOP GLOW */}
    <span className="button-top-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="6" viewBox="0 0 144 6" fill="none">
        <g filter="url(#filter0_f_204_420_save)">
          <path d="M2.59375 2.59399H141.344" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
        </g>
        <defs>
          <filter id="filter0_f_204_420_save" x="1.43051e-05" y="1.43051e-05" width="143.937" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_204_420"/>
          </filter>
        </defs>
      </svg>
    </span>

    <span>Save</span>
  </button>

</div>

        </div>
      </div>
      <footer className="edit-trainee-profile-footer">
        <p>
          Copyright 2025 Yanmu. All rights reserved. Developed by Ginger Technologies.
        </p>
      </footer>
    </div>
  );
}