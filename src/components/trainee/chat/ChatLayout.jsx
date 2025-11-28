import React, { useState } from "react";
import ChatSidebar, { getChatById } from "./ChatSidebar";
import ChatConversation from "./ChatConversation";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import "./Chat.css";

// Seed messages per chat so each person has their own conversation
const initialMessagesByChat = {
  1: [
    {
      id: 1,
      author: "expert",
      name: "Tony Stark",
      time: "9:02 AM",
      lines: ["Morning, Kate. Ready for today's session?"],
    },
  ],
  2: [
    {
      id: 1,
      author: "expert",
      name: "Natasha Romanoff",
      time: "9:10 AM",
      lines: ["Hi Kate, how did yesterday go?"],
    },
  ],
  3: [
    {
      id: 1,
      author: "expert",
      name: "Bruce Banner",
      time: "9:05 AM",
      lines: [
        "Good Morning. How are you feeling today?",
        "Please let me know if you need any support.",
      ],
    },
  ],
};

export default function ChatLayout() {
  const [messagesByChat, setMessagesByChat] = useState(initialMessagesByChat);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedChatId, setSelectedChatId] = useState(3); // default Bruce Banner

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessagesByChat((prev) => {
      const current = prev[selectedChatId] || [];
      const nextMessage = {
        id: Date.now(),
        author: "trainee",
        name: "Kate Bishop",
        time: "Now",
        lines: [text.trim()],
      };

      return {
        ...prev,
        [selectedChatId]: [...current, nextMessage],
      };
    });
  };

  const selectedChat = getChatById(selectedChatId);
  const activeMessages = messagesByChat[selectedChatId] || [];

  return (
    <div className="chat-page">
      <div className="chat-shell">
        <ChatSidebar
          activeFilter={activeFilter}
          onChangeFilter={setActiveFilter}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
        <div className="chat-main">
          <ChatHeader activeChat={selectedChat} />
          <ChatConversation messages={activeMessages} />
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
