import React, { useState } from "react";
import "./Chat.css";
import KateAvatar from "../../../assets/images/kate.png";

const dummyChats = [
  {
    id: 1,
    name: "Tony Stark",
    lastMessage: "I went there yesterday",
    time: "9:16 AM",
    unread: true,
    unreadCount: 3,
  },
  {
    id: 2,
    name: "Natasha Romanoff",
    lastMessage: "I went there yesterday",
    time: "9:16 AM",
    unread: true,
    unreadCount: 1,
  },
  {
    id: 3,
    name: "Bruce Banner",
    lastMessage: "Thank you for confirming...",
    time: "9:15 AM",
    active: true,
    unread: false,
    unreadCount: 0,
  },
];
export function getChatById(id) {
  return dummyChats.find((c) => c.id === id) || null;
}

export default function ChatSidebar({
  activeFilter = "all",
  onChangeFilter,
  selectedChatId,
  onSelectChat,
}) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  let chatsToShow =
    activeFilter === "unread"
      ? dummyChats.filter((c) => c.unread)
      : dummyChats;

  if (normalizedSearch) {
    chatsToShow = chatsToShow.filter((chat) => {
      const haystack = `${chat.name} ${chat.lastMessage}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }
  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <div className="chat-sidebar-user">
          <img src={KateAvatar} alt="Kate" className="chat-avatar-large" />
          <div>
            <div className="chat-sidebar-title">Kate Bishop</div>
            <div className="chat-sidebar-subtitle">
              Good Morning <span className="chat-sun-icon">🌤</span>
            </div>
          </div>
        </div>
        <div className="chat-search-wrapper">
          <div className="chat-search-field">
            <span className="chat-search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.0625 3.125C5.78331 3.125 3.125 5.78331 3.125 9.0625C3.125 12.3417 5.78331 15 9.0625 15C12.3417 15 15 12.3417 15 9.0625C15 5.78331 12.3417 3.125 9.0625 3.125ZM1.875 9.0625C1.875 5.09295 5.09295 1.875 9.0625 1.875C13.032 1.875 16.25 5.09295 16.25 9.0625C16.25 13.032 13.032 16.25 9.0625 16.25C5.09295 16.25 1.875 13.032 1.875 9.0625Z" fill="#898989" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2612 13.2612C13.5053 13.0171 13.901 13.0171 14.1451 13.2612L17.9419 17.0581C18.186 17.3021 18.186 17.6979 17.9419 17.9419C17.6979 18.186 17.3021 18.186 17.0581 17.9419L13.2612 14.1451C13.0171 13.901 13.0171 13.5053 13.2612 13.2612Z" fill="#898989" />
              </svg>
            </span>
            <input
              className="chat-search-input"
              placeholder="People, messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="chat-filter-tabs">
          <button
            className={
              "chat-filter-tab " +
              (activeFilter === "all" ? "chat-filter-tab-active" : "")
            }
            type="button"
            onClick={() => onChangeFilter && onChangeFilter("all")}
          >
            All
          </button>
          <button
            className={
              "chat-filter-tab " +
              (activeFilter === "unread" ? "chat-filter-tab-active" : "")
            }
            type="button"
            onClick={() => onChangeFilter && onChangeFilter("unread")}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="chat-list-label">CHATS</div>
      <div className="chat-list">
        {chatsToShow.map((chat) => (
          <button
            key={chat.id}
            className={
              "chat-list-item" +
              (chat.id === selectedChatId ? " chat-list-item-active" : "")
            }
            type="button"
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            <img src={KateAvatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-list-text">
              <div className="chat-list-row">
                <span className="chat-list-name">{chat.name}</span>
                <span className="chat-list-time">{chat.time}</span>
              </div>
              <div className="chat-list-preview">{chat.lastMessage}</div>
              {chat.unread && chat.unreadCount > 0 && (
                <span className="chat-unread-badge">{chat.unreadCount}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
