import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './BookingConfirm.css';

import Alert from '../../assets/images/exclamation.png';
import bannerBg from '../../assets/images/cta-bg.png';
import CalendarIconImg from '../../assets/images/7294ad6b4133f244b20bf10ecc93834b64323081.svg';
import EmployeeIconImg from '../../assets/images/e0663d042494bdd8f08913fc46b97ee79d191d53.svg';
import CheckIconImg from '../../assets/images/orangeVerified.png';
import ActivityIcon1 from '../../assets/images/f5521a80c629d845a167912a51e39629680d5d71.svg';
import { getPackageAndBookingDetailsForSessionSchedule, getPackageSessions } from '../../services/trainee/trainee';
import { generateLocalSessions } from '../../utils/helper';

// Background SVG components
const PurpleBgSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="168" height="132" viewBox="0 0 168 132" fill="none" className="stat-bg-svg">
    <g opacity="0.7" filter="url(#filter0_f_153_1987)">
      <circle cx="121.439" cy="42.2269" r="61.1345" fill="#EFE6FF"/>
    </g>
    <defs>
      <filter id="filter0_f_153_1987" x="-4.95911e-05" y="-79.2123" width="242.879" height="242.878" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="30.1524" result="effect1_foregroundBlur_153_1987"/>
      </filter>
    </defs>
  </svg>
);

const GreenBgSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="168" height="132" viewBox="0 0 168 132" fill="none" className="stat-bg-svg">
    <g opacity="0.7" filter="url(#filter0_f_153_2041)">
      <circle cx="121.439" cy="42.2269" r="61.1345" fill="#DAFFE8"/>
    </g>
    <defs>
      <filter id="filter0_f_153_2041" x="-4.95911e-05" y="-79.2123" width="242.879" height="242.878" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="30.1524" result="effect1_foregroundBlur_153_2041"/>
      </filter>
    </defs>
  </svg>
);

const YellowBgSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="168" height="132" viewBox="0 0 168 132" fill="none" className="stat-bg-svg">
    <g opacity="0.7" filter="url(#filter0_f_153_2056)">
      <circle cx="121.439" cy="42.2269" r="61.1345" fill="#FFEFD4"/>
    </g>
    <defs>
      <filter id="filter0_f_153_2056" x="-4.95911e-05" y="-79.2123" width="242.879" height="242.878" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="30.1524" result="effect1_foregroundBlur_153_2056"/>
      </filter>
    </defs>
  </svg>
);

const LeftVectorSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="22" viewBox="0 0 5 22" fill="none">
    <g filter="url(#filter0_f_153_2145)">
      <path d="M1.48263 2.25245C1.57 1.1584 2.83755 1.26593 3.39768 1.36806C3.51841 1.39007 3.56234 1.53505 3.48489 1.63024C3.21001 1.96806 2.69657 2.67895 2.57157 3.40931C1.93505 7.12855 2.12987 13.6236 2.23086 16.0298C2.25687 16.6494 2.19331 17.2664 2.03377 17.8657L1.48263 19.9359C1.48263 19.9359 1.08666 7.21042 1.48263 2.25245Z" fill="white" fillOpacity="0.3"/>
      <path d="M1.48263 2.25245C1.57 1.1584 2.83755 1.26593 3.39768 1.36806C3.51841 1.39007 3.56234 1.53505 3.48489 1.63024C3.21001 1.96806 2.69657 2.67895 2.57157 3.40931C1.93505 7.12855 2.12987 13.6236 2.23086 16.0298C2.25687 16.6494 2.19331 17.2664 2.03377 17.8657L1.48263 19.9359C1.48263 19.9359 1.08666 7.21042 1.48263 2.25245Z" fill="url(#paint0_linear_153_2145)"/>
    </g>
    <defs>
      <filter id="filter0_f_153_2145" x="-0.000630856" y="-2.0504e-05" width="4.83134" height="21.2431" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2145"/>
      </filter>
      <linearGradient id="paint0_linear_153_2145" x1="1.30664" y1="1.80305" x2="2.69496" y2="2.5515" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const TopVectorSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="118" height="3" viewBox="0 0 118 3" fill="none">
    <g filter="url(#filter0_f_153_2146)">
      <path d="M1.38867 1.38898H116.346" stroke="white" strokeWidth="0.163409" strokeLinecap="round"/>
    </g>
    <defs>
      <filter id="filter0_f_153_2146" x="-0.000630856" y="-2.0504e-05" width="117.736" height="2.778" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2146"/>
      </filter>
    </defs>
  </svg>
);

const CancelButtonSVG = ({ onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="123" height="28" viewBox="0 0 123 28" fill="none" onClick={onClick} style={{ cursor: 'pointer' }}>
    <g filter="url(#filter0_i_153_2143)">
      <rect width="122.621" height="27.4527" rx="5.22909" fill="#FDB73E"/>
    </g>
    <g filter="url(#filter1_f_153_2143)">
      <path d="M1.54903 3.88654C1.63641 2.79249 2.90395 2.90003 3.46408 3.00215C3.58481 3.02417 3.62875 3.16914 3.5513 3.26433C3.27642 3.60216 2.76298 4.31305 2.63798 5.0434C2.00145 8.76264 2.19628 15.2576 2.29727 17.6639C2.32327 18.2835 2.25972 18.9005 2.10018 19.4997L1.54903 21.57C1.54903 21.57 1.15306 8.84451 1.54903 3.88654Z" fill="white" fillOpacity="0.3"/>
      <path d="M1.54903 3.88654C1.63641 2.79249 2.90395 2.90003 3.46408 3.00215C3.58481 3.02417 3.62875 3.16914 3.5513 3.26433C3.27642 3.60216 2.76298 4.31305 2.63798 5.0434C2.00145 8.76264 2.19628 15.2576 2.29727 17.6639C2.32327 18.2835 2.25972 18.9005 2.10018 19.4997L1.54903 21.57C1.54903 21.57 1.15306 8.84451 1.54903 3.88654Z" fill="url(#paint0_linear_153_2143)"/>
    </g>
    <g filter="url(#filter2_f_153_2143)">
      <path d="M4.2168 3.1922H119.174" stroke="white" strokeWidth="0.163409" strokeLinecap="round"/>
    </g>
    <text x="61.31" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="Poppins, sans-serif">Cancel</text>
    <defs>
      <filter id="filter0_i_153_2143" x="-1.96091" y="-1.96091" width="124.582" height="29.4136" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="-1.96091" dy="-1.96091"/>
        <feGaussianBlur stdDeviation="1.63409"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_153_2143"/>
      </filter>
      <filter id="filter1_f_153_2143" x="0.0657754" y="1.63407" width="4.83134" height="21.2431" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2143"/>
      </filter>
      <filter id="filter2_f_153_2143" x="2.82749" y="1.8032" width="117.736" height="2.778" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2143"/>
      </filter>
      <linearGradient id="paint0_linear_153_2143" x1="1.37305" y1="3.43714" x2="2.76137" y2="4.18559" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ScheduleButtonSVG = ({ onClick, text = "Schedule" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="123" height="28" viewBox="0 0 123 28" fill="none" onClick={onClick} style={{ cursor: 'pointer' }}>
    <g filter="url(#filter0_i_153_2144)">
      <rect width="122.621" height="27.4527" rx="5.22909" fill={text === "Reschedule" ? "#02B346" : "#775DA6"}/>
    </g>
    <g filter="url(#filter1_f_153_2144)">
      <path d="M1.54903 3.88654C1.63641 2.79249 2.90395 2.90003 3.46408 3.00215C3.58481 3.02417 3.62875 3.16914 3.5513 3.26433C3.27642 3.60216 2.76298 4.31305 2.63798 5.0434C2.00145 8.76264 2.19628 15.2576 2.29727 17.6639C2.32327 18.2835 2.25972 18.9005 2.10018 19.4997L1.54903 21.57C1.54903 21.57 1.15306 8.84451 1.54903 3.88654Z" fill="white" fillOpacity="0.3"/>
      <path d="M1.54903 3.88654C1.63641 2.79249 2.90395 2.90003 3.46408 3.00215C3.58481 3.02417 3.62875 3.16914 3.5513 3.26433C3.27642 3.60216 2.76298 4.31305 2.63798 5.0434C2.00145 8.76264 2.19628 15.2576 2.29727 17.6639C2.32327 18.2835 2.25972 18.9005 2.10018 19.4997L1.54903 21.57C1.54903 21.57 1.15306 8.84451 1.54903 3.88654Z" fill="url(#paint0_linear_153_2144)"/>
    </g>
    <g filter="url(#filter2_f_153_2144)">
      <path d="M4.2168 3.1922H119.174" stroke="white" strokeWidth="0.163409" strokeLinecap="round"/>
    </g>
    <g transform="translate(12, 9)">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <g filter="url(#filter0_d_153_2585)">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.58773 0C2.77425 0 2.92546 0.151208 2.92546 0.337729V1.01319C2.92546 1.19971 2.77425 1.35092 2.58773 1.35092C2.40121 1.35092 2.25 1.19971 2.25 1.01319V0.337729C2.25 0.151208 2.40121 0 2.58773 0Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.09359 0C7.28011 0 7.43132 0.151208 7.43132 0.337729V1.01319C7.43132 1.19971 7.28011 1.35092 7.09359 1.35092C6.90707 1.35092 6.75586 1.19971 6.75586 1.01319V0.337729C6.75586 0.151208 6.90707 0 7.09359 0Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 3.26473C0 3.07821 0.151208 2.927 0.337729 2.927H9.34385C9.53036 2.927 9.68158 3.07821 9.68158 3.26473C9.68158 3.45125 9.53036 3.60246 9.34385 3.60246H0.337729C0.151208 3.60246 0 3.45125 0 3.26473Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.91477 0.675415H5.7668C6.59437 0.675406 7.24984 0.675402 7.76282 0.744375C8.29076 0.815352 8.7181 0.964908 9.05511 1.3019C9.39208 1.63889 9.54162 2.06621 9.61264 2.59416C9.68158 3.10715 9.68158 3.76262 9.68158 4.59019V5.5416C9.68158 6.36917 9.68158 7.02464 9.61264 7.53763C9.54162 8.06557 9.39208 8.49291 9.05511 8.82991C8.7181 9.16688 8.29076 9.31643 7.76282 9.38744C7.24984 9.45638 6.59437 9.45638 5.7668 9.45638H3.91478C3.08722 9.45638 2.43174 9.45638 1.91874 9.38744C1.3908 9.31643 0.963479 9.16688 0.626484 8.82991C0.289493 8.49291 0.139937 8.06557 0.06896 7.53763C-1.33329e-05 7.02464 -8.80204e-06 6.36917 2.0408e-07 5.5416V4.59019C-8.80204e-06 3.76262 -1.33329e-05 3.10715 0.06896 2.59416C0.139937 2.06621 0.289493 1.63889 0.626484 1.3019C0.963479 0.964908 1.3908 0.815352 1.91874 0.744375C2.43174 0.675402 3.08722 0.675406 3.91477 0.675415ZM2.00875 1.41381C1.5557 1.47472 1.29468 1.58895 1.10411 1.77952C0.913531 1.97009 0.799302 2.23111 0.738394 2.68416C0.676175 3.14692 0.675459 3.75695 0.675459 4.61559V5.5162C0.675459 6.37485 0.676175 6.98488 0.738394 7.44766C0.799302 7.90066 0.913531 8.16171 1.10411 8.35227C1.29468 8.54284 1.5557 8.65709 2.00875 8.71797C2.47151 8.7802 3.08152 8.78092 3.94018 8.78092H5.7414C6.60004 8.78092 7.21007 8.7802 7.67285 8.71797C8.12586 8.65709 8.3869 8.54284 8.57747 8.35227C8.76804 8.16171 8.88228 7.90066 8.94317 7.44766C9.0054 6.98488 9.00612 6.37485 9.00612 5.5162V4.61559C9.00612 3.75695 9.0054 3.14692 8.94317 2.68416C8.88228 2.23111 8.76804 1.97009 8.57747 1.77952C8.3869 1.58895 8.12586 1.47472 7.67285 1.41381C7.21007 1.35159 6.60004 1.35087 5.7414 1.35087H3.94018C3.08152 1.35087 2.47151 1.35159 2.00875 1.41381Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M6.8667 6.30424C6.68019 6.30424 6.52897 6.45546 6.52897 6.64197C6.52897 6.82849 6.68019 6.9797 6.8667 6.9797C7.05322 6.9797 7.20443 6.82849 7.20443 6.64197C7.20443 6.45546 7.05322 6.30424 6.8667 6.30424ZM5.85352 6.64197C5.85352 6.08242 6.30715 5.62878 6.8667 5.62878C7.42625 5.62878 7.87989 6.08242 7.87989 6.64197C7.87989 7.20152 7.42625 7.65516 6.8667 7.65516C6.30715 7.65516 5.85352 7.20152 5.85352 6.64197Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_d_153_2585" x="0" y="0" width="9.68164" height="9.99423" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="0.537865"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_153_2585"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_153_2585" result="shape"/>
          </filter>
        </defs>
      </svg>
    </g>
    <text x="65" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="Poppins, sans-serif">
        {text}</text>
    <defs>
      <filter id="filter0_i_153_2144" x="-1.96091" y="-1.96091" width="124.582" height="29.4136" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="-1.96091" dy="-1.96091"/>
        <feGaussianBlur stdDeviation="1.63409"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_153_2144"/>
      </filter>
      <filter id="filter1_f_153_2144" x="0.0657754" y="1.63407" width="4.83134" height="21.2431" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2144"/>
      </filter>
      <filter id="filter2_f_153_2144" x="2.82749" y="1.8032" width="117.736" height="2.778" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.653636" result="effect1_foregroundBlur_153_2144"/>
      </filter>
      <linearGradient id="paint0_linear_153_2144" x1="1.37305" y1="3.43714" x2="2.76137" y2="4.18559" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const BookingConfirm = () => {
  const [activeAction, setActiveAction] = useState(null); // 'schedule' | 'reschedule' | 'cancel'
  const [activeSession, setActiveSession] = useState(null);
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [sessions,setSessions] = useState([]);
  useEffect(() => {
    if (!bookingId) return;

    
    fetchDetails();
  }, [bookingId]);

  const fetchDetails = async () => {
      try {
        const res = await getPackageAndBookingDetailsForSessionSchedule(bookingId);
        setBookingDetails(res?.data.bookingDetails);
        const generated = generateLocalSessions(res?.data.bookingDetails);
        let sessionsWithParticipants = generated;

        const traineeId = res?.data?.bookingDetails?.trainee;

        const packageId = res?.data?.bookingDetails?.packageDetails?._id;
        if (packageId) {
          const packageSessionsRes = await getPackageSessions(
            packageId,
            res?.data?.bookingDetails?.startDate,
            res?.data?.bookingDetails?.endDate
          );

          const apiSessions = packageSessionsRes?.data?.sessions || [];

          sessionsWithParticipants = generated.map((session) => {
            const matchingSessions = apiSessions.filter((apiSession) => {
              const apiStart =
                apiSession.startLocalUTC ||
                apiSession.startDate ||
                apiSession.startDateUtc;
              const apiEnd =
                apiSession.endLocalUTC ||
                apiSession.endDate ||
                apiSession.endDateUtc;

              return (
                apiStart === session.startLocalUTC &&
                apiEnd === session.endLocalUTC
              );
            });

            const participantsCount = matchingSessions.length;

            const hasScheduledForTrainee =
              !!traineeId &&
              matchingSessions.some((apiSession) => {
                const apiTraineeId = apiSession.trainee;
                return apiTraineeId  === traineeId;
              });

            return {
              ...session,
              participants: participantsCount,
              hasScheduled: session.hasScheduled || hasScheduledForTrainee,
            };
          });
        }

        setSessions(sessionsWithParticipants);
      } catch (error) {
        console.error('Failed to load package and booking details for session schedule', error);
      }
    };



  const openConfirm = (action, sessionId) => {
    setActiveAction(action);
    setActiveSession(sessionId);
  };

  const closeConfirm = () => {
    setActiveAction(null);
    setActiveSession(null);
  };

  const handleConfirm = () => {
    if (!activeAction || !activeSession) {
      closeConfirm();
      return;
    }

    if (activeAction === 'schedule') {
      console.log('Scheduled session:', activeSession);
    } else if (activeAction === 'reschedule') {
      console.log('Rescheduled session:', activeSession);
    } else if (activeAction === 'cancel') {
      console.log('Cancelled session:', activeSession);
    }

    closeConfirm();
  };

  return (
    <div className="bc-main">
      {/* Main Content */}
      <div className="bc-container">
        {/* Page Title + Package info (title | avatar + pencil + subtitle) */}
        <div className="bc-page-header">
          <h1 className="bc-page-title">Book Your Sessions</h1>

          <span className="bc-page-header-divider" aria-hidden="true" />

          <div className="bc-page-package">
            <div className="bc-page-avatar" aria-hidden="true" />
            <span className="bc-page-subtitle">
              <span className="bc-page-pencil" aria-hidden="true"></span>
              {bookingDetails?.packageDetails?.name}
            </span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bc-info-banner" style={{ backgroundImage: `url(${bannerBg})` }}>
         <img src={Alert} alt="" />
          <p className="bc-info-text">
            Sessions are generated based on the package time slots between Nov 01, 2025 to Dec 30, 2025. Found 5 existing session(s)
          </p>
        </div>

        {/* Stats Cards (Completed / Remaining / Total Sessions per Figma) */}
        <div className="bc-stats-container">
          {/* Completed */}
          <div className="bc-stat-card">
            <div className="bc-stat-bg">
              <GreenBgSVG />
            </div>
            <img src={CheckIconImg} alt="Completed" className="bc-stat-icon-img" />
            <div className="bc-stat-text">
              <p className="bc-stat-label">Completed</p>
              <p className="bc-stat-value">2</p>
            </div>
          </div>

          {/* Remaining */}
          <div className="bc-stat-card">
            <div className="bc-stat-bg">
              <PurpleBgSVG />
            </div>
            <img src={CalendarIconImg} alt="Remaining" className="bc-stat-icon-img" />
            <div className="bc-stat-text">
              <p className="bc-stat-label">Remaining</p>
              <p className="bc-stat-value">3</p>
            </div>
          </div>

          {/* Total Sessions */}
          <div className="bc-stat-card">
            <div className="bc-stat-bg">
              <YellowBgSVG />
            </div>
            <img src={EmployeeIconImg} alt="Total Sessions" className="bc-stat-icon-img" />
            <div className="bc-stat-text">
              <p className="bc-stat-label">Total Sessions</p>
              <p className="bc-stat-value">5</p>
            </div>
          </div>
        </div>

        {/* Available Sessions */}
        <h2 className="bc-sessions-title">Available Sessions</h2>
        <div className="bc-sessions-grid">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={
                "bc-session-card" + (session.isInactive ? " bc-session-card--inactive" : "")
              }
            >
              <div className="bc-session-header">
                <div>
                  <p className="bc-session-date">{session.date}</p>
                  <p className="bc-session-year">{session.year}</p>
                </div>
                {session.slotCount && (
                  <div className="bc-slot-badge">
                    <p className="bc-slot-text">{session.participants}</p>
                    <p className="bc-slot-text">out of</p>
                    
                    <p className="bc-slot-text">{session.slotCount}</p>
                  </div>
                )}
              </div>

              <hr className="bc-divider" />

              <div className="bc-session-details">
                <div className="bc-time-info">
                  <img src={ActivityIcon1} alt="Activity" className="bc-activity-icon-img" />
                  <p className="bc-time-text">{session.time}</p>
                  
                </div>
                
                <p className="bc-time-text">{session.startLocalUTC}</p>
                <p className="bc-time-text">{session.endLocalUTC}</p>
                <p className="bc-day-text">{session.dayOfWeek}</p>
              </div>
           
              {!session.isInactive && (
                <div className="bc-session-actions">
                  {session.hasScheduled ? (
                    <>
                      <CancelButtonSVG onClick={() => openConfirm('cancel', session.id)} />
                      <ScheduleButtonSVG onClick={() => openConfirm('reschedule', session.id)} text="Reschedule" />
                    </>
                  ) : (
                    <ScheduleButtonSVG onClick={() => openConfirm('schedule', session.id)} text="Schedule" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {activeAction && (
          <div
            className="bc-modal-overlay"
            onClick={closeConfirm}
          >
            <div
              className={
                `bc-modal ` +
                (activeAction === 'cancel'
                  ? 'bc-modal-cancel'
                  : activeAction === 'reschedule'
                  ? 'bc-modal-reschedule'
                  : 'bc-modal-schedule')
              }
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="bc-modal-title">
                {activeAction === 'schedule' && 'Confirm Schedule'}
                {activeAction === 'reschedule' && 'Confirm Reschedule'}
                {activeAction === 'cancel' && 'Confirm Cancel'}
              </h3>
              <p className="bc-modal-text">
                {activeAction === 'cancel' && 'Are you sure you want to cancel the session booking?'}
                {activeAction === 'schedule' && 'Are you sure you want to schedule the session?'}
                {activeAction === 'reschedule' && 'Are you sure you want to reschedule this session?'}
              </p>
              <div className="bc-modal-actions">
                <button type="button" className="bc-modal-btn bc-modal-btn-secondary" onClick={closeConfirm}>
                  Close
                </button>
                <button
                  type="button"
                  className={
                    `bc-modal-btn bc-modal-btn-primary ` +
                    (activeAction === 'cancel'
                      ? 'bc-modal-btn-primary-cancel'
                      : activeAction === 'reschedule'
                      ? 'bc-modal-btn-primary-reschedule'
                      : 'bc-modal-btn-primary-schedule')
                  }
                  onClick={handleConfirm}
                >
                  Yes, continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirm;