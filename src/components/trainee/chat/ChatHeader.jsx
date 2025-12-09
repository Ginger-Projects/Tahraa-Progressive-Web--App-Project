import React, { act } from "react";
import "./Chat.css";
import KateAvatar from "../../../assets/images/kate.png";

export default function ChatHeader({ activeChat, onOpenReport }) {
  const name = activeChat?.name || "";
  const avatar =
    activeChat?.profileImage || activeChat?.profilePicture 
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <img src={avatar} alt={name} className="chat-header-avatar" />
        <div className="chat-header-text">
          <div className="chat-header-name">{name}</div>
        </div>
      </div>
      <button
        className="chat-header-report"
        type="button"
        onClick={onOpenReport}
      >
        {/* <span>Report an issue</span> */}
        {/* <span className="chat-header-report-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clipPath="url(#clip0_134_1834)">
              <path d="M9.99935 18.3334C14.6017 18.3334 18.3327 14.6025 18.3327 10.0001C18.3327 5.39771 14.6017 1.66675 9.99935 1.66675C5.39698 1.66675 1.66602 5.39771 1.66602 10.0001C1.66602 14.6025 5.39698 18.3334 9.99935 18.3334Z" stroke="#FDB73E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 6.66667V10" stroke="#FDB73E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 13.3333H10.0088" stroke="#FDB73E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_134_1834">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span> */}
      </button>
    </div>
  );
}
