import React, { useEffect, useRef } from "react";
import "./Chat.css";
import KateAvatar from "../../../assets/images/kate.png";

export default function ChatConversation({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-conversation">
      <div className="chat-conversation-inner">
        {messages.map((msg) => {
          const isTrainee = msg.author === "trainee";
          const name = msg.name || (isTrainee ? "You" : "Expert");
          const time = msg.time || "";

          return (
            <div
              key={msg.id}
              className={
                "chat-bubble-row " +
                (isTrainee ? "chat-bubble-row-right" : "chat-bubble-row-left")
              }
            >
              {!isTrainee && (
                <img
                  src={KateAvatar}
                  alt={name}
                  className="chat-msg-avatar"
                />
              )}

              <div className="chat-bubble-block">
                <div className="chat-msg-meta">
                  <span className="chat-msg-name">{name}</span>
                  {time && <span className="chat-msg-time">{time}</span>}
                </div>
                <div
                  className={
                    "chat-bubble " +
                    (isTrainee
                      ? "chat-bubble-trainee"
                      : "chat-bubble-expert")
                  }
                >
                  {msg.lines.map((line, idx) => (
                    <p key={idx} className="chat-bubble-text">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {isTrainee && (
                <img
                  src={KateAvatar}
                  alt={name}
                  className="chat-msg-avatar"
                />
              )}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </div>
  );
}
