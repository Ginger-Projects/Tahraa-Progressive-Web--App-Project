import "./header.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import NotificationPopup from "./NotificationPopup";
import Profile from "../../assets/images/placeholder.jpg";

export default function TraineeHeader({ title = "Dashboard" }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.trainee);

  const displayName =
    user?.name || user?.fullName || user?.username || user?.email || "User";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileImage =
    user?.profileImage || user?.imageUrl || user?.photo
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-group">
          <Link to="/" className="logo-link">
            <img src={Logo} alt="Tahraa" className="logo-image" />
          </Link>
          <span className="logo-divider" />
          <span className="logo-title">{title}</span>
        </div>

      <div className="actions">
  <button onClick={()=>navigate('/chat')} className="circle-btn chat-btn">
    <span className="icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_205_1645)">
    <path d="M15.5758 7.51054C19.8537 7.44519 23.3453 10.8122 23.4281 15.0898C23.4403 15.7178 23.3775 16.3291 23.2482 16.9154C23.0292 17.9083 22.899 18.9186 22.899 19.9353V21.9005C22.899 22.2016 22.6549 22.4457 22.3538 22.4457H20.3886C19.3719 22.4457 18.3616 22.5759 17.3687 22.7949C16.7824 22.9242 16.1711 22.987 15.5431 22.9748C11.2656 22.8921 7.89857 19.4006 7.96382 15.1227C8.02747 10.9473 11.4004 7.57432 15.5758 7.51054Z" fill="url(#paint0_linear_205_1645)"/>
    <path d="M15.5758 7.51054C19.8537 7.44519 23.3453 10.8122 23.4281 15.0898C23.4403 15.7178 23.3775 16.3291 23.2482 16.9154C23.0292 17.9083 22.899 18.9186 22.899 19.9353V21.9005C22.899 22.2016 22.6549 22.4457 22.3538 22.4457H20.3886C19.3719 22.4457 18.3616 22.5759 17.3687 22.7949C16.7824 22.9242 16.1711 22.987 15.5431 22.9748C11.2656 22.8921 7.89857 19.4006 7.96382 15.1227C8.02747 10.9473 11.4004 7.57432 15.5758 7.51054Z" fill="url(#paint1_linear_205_1645)"/>
    <path d="M9.5681 0.453425C4.35644 0.373805 0.102745 4.47567 0.00180104 9.68696C-0.0129791 10.452 0.063484 11.1968 0.221077 11.9111C0.487851 13.1206 0.646452 14.3515 0.646452 15.5901V17.9843C0.646452 18.3511 0.943792 18.6485 1.31064 18.6485H3.70483C4.94344 18.6485 6.1743 18.8071 7.38385 19.0739C8.09814 19.2314 8.84291 19.3079 9.60795 19.2931C14.8192 19.1922 18.921 14.9387 18.8416 9.7271C18.764 4.64022 14.6549 0.531078 9.5681 0.453425Z" fill="url(#paint2_linear_205_1645)"/>
    <path d="M6.04852 9.36862C5.78238 9.08583 5.4057 8.90824 4.98664 8.90824C4.18069 8.90824 3.52734 9.56158 3.52734 10.3675C3.52734 10.7865 3.70489 11.1632 3.98772 11.4294L7.13566 14.5773C7.40184 14.8601 7.77852 15.0377 8.19754 15.0377C9.00349 15.0377 9.65683 14.3844 9.65683 13.5784C9.65683 13.1594 9.47924 12.7827 9.19645 12.5166L6.04852 9.36862Z" fill="url(#paint3_linear_205_1645)"/>
    <path d="M4.98664 11.8266C5.79259 11.8266 6.44593 11.1733 6.44593 10.3673C6.44593 9.5614 5.79259 8.90805 4.98664 8.90805C4.18069 8.90805 3.52734 9.5614 3.52734 10.3673C3.52734 11.1733 4.18069 11.8266 4.98664 11.8266Z" fill="white"/>
    <path d="M10.1755 9.36862C9.90934 9.08583 9.53265 8.90824 9.11359 8.90824C8.30764 8.90824 7.6543 9.56158 7.6543 10.3675C7.6543 10.7865 7.83184 11.1632 8.11468 11.4294L11.2626 14.5773C11.5288 14.8601 11.9055 15.0377 12.3245 15.0377C13.1304 15.0377 13.7838 14.3844 13.7838 13.5784C13.7838 13.1594 13.6062 12.7827 13.3234 12.5166L10.1755 9.36862Z" fill="url(#paint4_linear_205_1645)"/>
    <path d="M9.11359 11.8266C9.91954 11.8266 10.5729 11.1733 10.5729 10.3673C10.5729 9.5614 9.91954 8.90805 9.11359 8.90805C8.30765 8.90805 7.6543 9.5614 7.6543 10.3673C7.6543 11.1733 8.30765 11.8266 9.11359 11.8266Z" fill="white"/>
    <path d="M14.3024 9.36862C14.0363 9.08583 13.6596 8.90824 13.2405 8.90824C12.4346 8.90824 11.7812 9.56158 11.7812 10.3675C11.7812 10.7865 11.9588 11.1632 12.2416 11.4294L15.3896 14.5773C15.6557 14.8601 16.0324 15.0377 16.4514 15.0377C17.2574 15.0377 17.9107 14.3844 17.9107 13.5784C17.9107 13.1594 17.7331 12.7827 17.4504 12.5166L14.3024 9.36862Z" fill="url(#paint5_linear_205_1645)"/>
    <path d="M13.2405 11.8266C14.0465 11.8266 14.6998 11.1733 14.6998 10.3673C14.6998 9.5614 14.0465 8.90805 13.2405 8.90805C12.4346 8.90805 11.7812 9.5614 11.7812 10.3673C11.7812 11.1733 12.4346 11.8266 13.2405 11.8266Z" fill="white"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_205_1645" x1="14.1352" y1="13.6824" x2="25.489" y2="25.0362" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BFA0F5"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint1_linear_205_1645" x1="17.8518" y1="17.3988" x2="13.0293" y2="12.5768" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint2_linear_205_1645" x1="5.97928" y1="8.35048" x2="17.9666" y2="20.3378" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BFA0F5"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint3_linear_205_1645" x1="8.23286" y1="13.614" x2="1.92135" y2="7.30272" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint4_linear_205_1645" x1="12.3595" y1="13.6139" x2="6.0482" y2="7.30256" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint5_linear_205_1645" x1="16.4865" y1="13.614" x2="10.1751" y2="7.30263" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <clipPath id="clip0_205_1645">
      <rect width="23.4286" height="23.4286" fill="white"/>
    </clipPath>
  </defs>
</svg>
    {/* <HiOutlineChat className="icon" /> */}
    {/* <span className="notification-badge">6</span> */}
    </span>
  </button>

  <button
    className="circle-btn bell-btn"
    onClick={() => setIsNotificationOpen(true)}
  >
    <span className="icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
  <path d="M9.33083 3.86918C10.4164 3.86918 11.2964 3.00303 11.2964 1.93459C11.2964 0.866145 10.4164 0 9.33083 0C8.24526 0 7.36523 0.866145 7.36523 1.93459C7.36523 3.00303 8.24526 3.86918 9.33083 3.86918Z" fill="url(#paint0_linear_205_1618)"/>
  <path d="M7.36523 1.93459C7.36523 3.00304 8.24525 3.86918 9.33083 3.86918C10.4164 3.86918 11.2964 3.00304 11.2964 1.93459C11.2964 1.70318 11.255 1.48133 11.1793 1.27568H7.48238C7.40665 1.48133 7.36523 1.70318 7.36523 1.93459Z" fill="url(#paint1_linear_205_1618)"/>
  <path d="M7.93943 3.30254C8.70702 4.05803 9.9516 4.05807 10.7192 3.30254C11.4868 2.54706 11.4868 1.32212 10.7192 0.566633C10.553 0.403026 10.3643 0.27498 10.163 0.18224L7.54883 2.75514C7.6431 2.95324 7.77315 3.13894 7.93943 3.30254Z" fill="url(#paint2_linear_205_1618)"/>
  <path d="M16.1781 10.9329C16.2824 10.4684 16.3392 9.98633 16.3431 9.49184C16.3735 5.69285 13.2394 2.55962 9.37955 2.53289C5.48248 2.5059 2.31472 5.60702 2.31472 9.43637C2.31472 9.96714 2.37559 10.484 2.49082 10.9804C2.9601 13.0018 2.31567 15.0957 0.894725 16.6266C0.702241 16.834 0.599609 17.0519 0.599609 17.2768C0.599609 18.6646 4.50789 19.7897 9.32899 19.7897C14.1501 19.7897 18.0584 18.6646 18.0584 17.2768C18.0584 17.0409 17.9454 16.8126 17.7343 16.5961C16.2711 15.0961 15.7221 12.9633 16.1781 10.9329Z" fill="url(#paint3_linear_205_1618)"/>
  <path d="M16.1784 10.933C16.2828 10.4685 16.3395 9.98638 16.3435 9.49189C16.3739 5.6929 13.2398 2.55968 9.37991 2.53294C8.60828 2.52761 7.86543 2.64534 7.16992 2.86664V19.7122C7.86057 19.7628 8.58402 19.7897 9.32939 19.7897C14.1505 19.7897 18.0588 18.6647 18.0588 17.2769C18.0588 17.0409 17.9458 16.8126 17.7347 16.5962C16.2714 15.0962 15.7224 12.9634 16.1784 10.933Z" fill="url(#paint4_linear_205_1618)"/>
  <path d="M2.31472 9.4364C2.31472 9.96722 2.37559 10.484 2.49082 10.9804C2.9601 13.0019 2.31567 15.0958 0.894725 16.6266C0.702241 16.834 0.599609 17.052 0.599609 17.2768C0.599609 18.6647 4.50789 19.7897 9.32899 19.7897C14.1501 19.7897 18.0584 18.6647 18.0584 17.2768C18.0584 17.0409 17.9454 16.8126 17.7343 16.5961C16.271 15.0962 15.722 12.9634 16.178 10.933C16.2823 10.4684 16.3391 9.98636 16.343 9.49188C16.3477 8.90657 16.2771 8.3372 16.1404 7.79244H2.51539C2.3846 8.31938 2.31472 8.86981 2.31472 9.4364Z" fill="url(#paint5_linear_205_1618)"/>
  <path d="M9.3297 21.8314C14.4824 21.8314 18.6594 19.8318 18.6594 17.3652C18.6594 14.8987 14.4824 12.8991 9.3297 12.8991C4.17705 12.8991 0 14.8987 0 17.3652C0 19.8318 4.17705 21.8314 9.3297 21.8314Z" fill="url(#paint6_linear_205_1618)"/>
  <path d="M0 17.3652C0 16.4767 0.542055 15.6489 1.47636 14.9532H17.183C18.1173 15.6489 18.6594 16.4767 18.6594 17.3652C18.6594 19.8318 14.4823 21.8314 9.3297 21.8314C4.17706 21.8314 0 19.8318 0 17.3652Z" fill="url(#paint7_linear_205_1618)"/>
  <path d="M9.32878 21.0222C13.5479 21.0222 16.9681 19.5337 16.9681 17.6975C16.9681 15.8613 13.5479 14.3728 9.32878 14.3728C5.1097 14.3728 1.68945 15.8613 1.68945 17.6975C1.68945 19.5337 5.1097 21.0222 9.32878 21.0222Z" fill="url(#paint8_linear_205_1618)"/>
  <path d="M9.32878 21.0222C13.5479 21.0222 16.9681 19.5337 16.9681 17.6975C16.9681 15.8613 13.5479 14.3728 9.32878 14.3728C5.1097 14.3728 1.68945 15.8613 1.68945 17.6975C1.68945 19.5337 5.1097 21.0222 9.32878 21.0222Z" fill="url(#paint9_linear_205_1618)"/>
  <path d="M9.86523 12.9068C14.7683 13.0399 18.6588 14.9851 18.6588 17.3655C18.6588 19.7459 14.7683 21.6911 9.86523 21.8241V12.9068Z" fill="url(#paint10_linear_205_1618)"/>
  <path d="M10.0663 21.0067L7.16992 18.156V14.5077C7.85477 14.42 8.57934 14.3728 9.32939 14.3728C13.5485 14.3728 16.9687 15.8613 16.9687 17.6975C16.9687 19.4254 13.9396 20.8453 10.0663 21.0067Z" fill="url(#paint11_linear_205_1618)"/>
  <path d="M6.22461 15.9617C6.22461 15.4721 6.34227 15.0098 6.55027 14.5996C6.55027 14.5996 7.41278 14.3234 9.32869 14.3234C11.2446 14.3234 12.1071 14.5996 12.1071 14.5996C12.3151 15.0098 12.4328 15.4721 12.4328 15.9617C12.4328 17.649 11.043 19.0168 9.32869 19.0168C7.61436 19.0168 6.22461 17.649 6.22461 15.9617Z" fill="url(#paint12_linear_205_1618)"/>
  <path d="M6.22461 15.9617C6.22461 15.4721 6.34227 15.0098 6.55027 14.5996C6.55027 14.5996 7.41278 14.3234 9.32869 14.3234C11.2446 14.3234 12.1071 14.5996 12.1071 14.5996C12.3151 15.0098 12.4328 15.4721 12.4328 15.9617C12.4328 17.649 11.043 19.0168 9.32869 19.0168C7.61436 19.0168 6.22461 17.649 6.22461 15.9617Z" fill="url(#paint13_linear_205_1618)"/>
  <path d="M9.33059 14.3234C11.2465 14.3234 12.109 14.5996 12.109 14.5996C12.317 15.0098 12.4347 15.4721 12.4347 15.9617C12.4347 17.649 11.0449 19.0168 9.33059 19.0168C9.08568 19.0168 8.84771 18.988 8.61914 18.9352V14.337C8.83801 14.3284 9.07459 14.3234 9.33059 14.3234Z" fill="url(#paint14_linear_205_1618)"/>
  <path d="M6.22461 15.9617C6.22461 15.9362 6.22626 15.911 6.22691 15.8856H12.4305C12.4311 15.911 12.4328 15.9362 12.4328 15.9617C12.4328 17.649 11.043 19.0168 9.32869 19.0168C7.61436 19.0168 6.22461 17.649 6.22461 15.9617Z" fill="url(#paint15_linear_205_1618)"/>
  <defs>
    <linearGradient id="paint0_linear_205_1618" x1="8.30816" y1="0.928045" x2="10.0257" y2="2.67308" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BFA0F5"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint1_linear_205_1618" x1="9.33084" y1="1.61884" x2="9.33084" y2="2.75066" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint2_linear_205_1618" x1="9.20172" y1="1.82628" x2="10.8905" y2="3.30638" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint3_linear_205_1618" x1="4.56989" y1="11.1612" x2="11.9457" y2="11.1612" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BFA0F5"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint4_linear_205_1618" x1="9.87821" y1="11.2921" x2="15.842" y2="12.0301" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint5_linear_205_1618" x1="9.32903" y1="11.0298" x2="9.32903" y2="15.1337" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint6_linear_205_1618" x1="9.3297" y1="13.3542" x2="9.3297" y2="21.6613" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BFA0F5"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint7_linear_205_1618" x1="9.3297" y1="18.4363" x2="9.3297" y2="22.1544" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint8_linear_205_1618" x1="7.55467" y1="9.82885" x2="10.2942" y2="22.3721" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint9_linear_205_1618" x1="9.32878" y1="19.0696" x2="9.32878" y2="14.3229" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint10_linear_205_1618" x1="13.2376" y1="18.1811" x2="17.0548" y2="21.0361" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint11_linear_205_1618" x1="13.8165" y1="19.2729" x2="10.7192" y2="16.2332" gradientUnits="userSpaceOnUse">
      <stop stop-color="#775DA6" stop-opacity="0"/>
      <stop offset="1" stop-color="#775DA6"/>
    </linearGradient>
    <linearGradient id="paint12_linear_205_1618" x1="8.0005" y1="15.3584" x2="11.0629" y2="17.3908" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F5FBFF"/>
      <stop offset="1" stop-color="#DBD5EF"/>
    </linearGradient>
    <linearGradient id="paint13_linear_205_1618" x1="9.14379" y1="17.1943" x2="9.59422" y2="14.0962" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DBD5EF" stop-opacity="0"/>
      <stop offset="0.2853" stop-color="#D9D2EE" stop-opacity="0.285"/>
      <stop offset="0.4739" stop-color="#D4C9E9" stop-opacity="0.474"/>
      <stop offset="0.6346" stop-color="#CBBAE2" stop-opacity="0.635"/>
      <stop offset="0.7795" stop-color="#BFA5D7" stop-opacity="0.78"/>
      <stop offset="0.9126" stop-color="#AF8ACA" stop-opacity="0.913"/>
      <stop offset="1" stop-color="#A274BF"/>
    </linearGradient>
    <linearGradient id="paint14_linear_205_1618" x1="9.5128" y1="16.6701" x2="12.5155" y2="16.6701" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DBD5EF" stop-opacity="0"/>
      <stop offset="0.2853" stop-color="#D9D2EE" stop-opacity="0.285"/>
      <stop offset="0.4739" stop-color="#D4C9E9" stop-opacity="0.474"/>
      <stop offset="0.6346" stop-color="#CBBAE2" stop-opacity="0.635"/>
      <stop offset="0.7795" stop-color="#BFA5D7" stop-opacity="0.78"/>
      <stop offset="0.9126" stop-color="#AF8ACA" stop-opacity="0.913"/>
      <stop offset="1" stop-color="#A274BF"/>
    </linearGradient>
    <linearGradient id="paint15_linear_205_1618" x1="8.84928" y1="15.9143" x2="11.1644" y2="18.73" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DBD5EF" stop-opacity="0"/>
      <stop offset="0.2853" stop-color="#D9D2EE" stop-opacity="0.285"/>
      <stop offset="0.4739" stop-color="#D4C9E9" stop-opacity="0.474"/>
      <stop offset="0.6346" stop-color="#CBBAE2" stop-opacity="0.635"/>
      <stop offset="0.7795" stop-color="#BFA5D7" stop-opacity="0.78"/>
      <stop offset="0.9126" stop-color="#AF8ACA" stop-opacity="0.913"/>
      <stop offset="1" stop-color="#A274BF"/>
    </linearGradient>
  </defs>
</svg>
    {/* <HiOutlineBell className="icon" /> */}
    {/* <span className="notification-badge">6</span> */}
    </span>
  </button>

  <div className="separator"></div>

  <div
    className="user-chip"
    onClick={() => setIsProfileOpen(true)}
  >
    <img
      src={profileImage||Profile}
      alt={displayName}
      className="user-chip-avatar"
    />
  </div>


</div>

<ProfilePopup open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
<NotificationPopup
  open={isNotificationOpen}
  onClose={() => setIsNotificationOpen(false)}
/>


      </div>
    </header>
  );
}
