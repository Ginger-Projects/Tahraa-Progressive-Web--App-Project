import React, { useState } from "react";
import "./Chat.css";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        className="chat-input-field"
        placeholder="Write messages"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="chat-input-send">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5.08231 12L3.14956 17.0088C2.4384 18.8518 4.3939 20.605 6.26112 19.7985L19.6391 14.0202C21.4536 13.2365 21.4536 10.7635 19.6391 9.97976L6.26113 4.20154C4.3939 3.39505 2.4384 5.14823 3.14956 6.99121L5.08231 12ZM5.08231 12H12.7759"
            stroke="#775DA6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
