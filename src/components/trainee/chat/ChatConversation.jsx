import React, { useEffect, useRef } from "react";
import "./Chat.css";

export default function ChatConversation({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderedMessages = [];
  const todayKey = new Date().toISOString().slice(0, 10);
  let lastDateKey = null;

  messages.forEach((msg) => {
    const isTrainee = msg.author === "trainee";
    const time = msg.time || "";

    const created = msg.createdAt ? new Date(msg.createdAt) : null;
    const dateKey = created ? created.toISOString().slice(0, 10) : null;

    let dateLabel = null;
    if (dateKey && dateKey !== lastDateKey) {
      lastDateKey = dateKey;
      dateLabel =
        dateKey === todayKey
          ? "Today"
          : created.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
    }

    if (dateLabel) {
      renderedMessages.push(
        <div key={`date-${dateKey}`} className="chat-date-separator">
          <span>{dateLabel}</span>
        </div>
      );
    }

    renderedMessages.push(
      <div
        key={msg.id}
        className={
          "chat-bubble-row " +
          (isTrainee ? "chat-bubble-row-right" : "chat-bubble-row-left")
        }
      >
        <div className="chat-bubble-block">
          {time && (
            <div className="chat-msg-meta">
              <span className="chat-msg-time">{time}</span>
            </div>
          )}
          <div
            className={
              "chat-bubble " +
              (isTrainee ? "chat-bubble-trainee" : "chat-bubble-expert")
            }
          >
            {msg.lines.map((line, idx) => (
              <p key={idx} className="chat-bubble-text">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="chat-conversation">
      <div className="chat-conversation-inner">
        {renderedMessages}
        <div ref={endRef} />
      </div>
    </div>
  );
}
