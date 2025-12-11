import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatConversation from "./ChatConversation";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ReportIssueModal from "./ReportIssueModal";
import "./Chat.css";
import api from "../../../api/axios";
import { useParams } from "react-router-dom";

// Seed messages per chat so each person has their own conversation
const initialMessagesByChat = {};

export default function ChatLayout() {
  const [messagesByChat, setMessagesByChat] = useState(initialMessagesByChat);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [traineeInfo, setTraineeInfo] = useState(null);
  const { conversationId: routeConversationId } = useParams();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        // On desktop always show both
        setShowListOnMobile(false);
      } else {
        // On mobile default to list view
        setShowListOnMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/api/trainee/chat/get-conversations");
        const convs = res?.data?.data?.conversations || [];
        console.log("conv", convs);

        const mapped = convs.map((conv) => {
          const expert = conv?.participants?.expert || {};

          return {
            id: conv._id,
            name: expert.name || "",
            lastMessage: "",
            time: "",
            unread: false,
            unreadCount: 0,
            profileImage:
              expert.profileImage || expert.profilePicture || null,
            raw: conv,
          };
        });

        setConversations(mapped);

        if (convs.length > 0) {
          const firstConv = convs[0];
          const trainee = firstConv?.participants?.trainee;

          if (trainee) {
            setTraineeInfo({
              name: trainee.name || "",
              profileImage:
                trainee.profilePicture || trainee.profileImage || null,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load conversations", error);
      }
    };

    fetchConversations();
  }, []);

  // When opened via /chat/:conversationId, auto-load that conversation's messages
  useEffect(() => {
    if (!routeConversationId) return;
    if (!Array.isArray(conversations) || conversations.length === 0) return;

    const conversationId = routeConversationId;
    const chat =
      conversations.find((c) => c.id === conversationId) || null;

    const loadFromRoute = async () => {
      try {
        const msgsRes = await api.get(
          `/api/trainee/chat/get-messages?conversationId=${conversationId}`
        );
        const rawMessages = msgsRes?.data?.data?.messages || [];

        rawMessages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        const mappedMessages = rawMessages.map((m) => {
          const isExpert = m?.sender?.userType === "expert";
          const author = isExpert ? "expert" : "trainee";
          const name = isExpert
            ? chat?.name || "Expert"
            : traineeInfo?.name || "You";
          const time = m.createdAt
            ? new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return {
            id: m._id,
            author,
            name,
            time,
            createdAt: m.createdAt || null,
            lines: [m.text || ""],
          };
        });

        setMessagesByChat((prev) => ({
          ...prev,
          [conversationId]: mappedMessages,
        }));

        setSelectedChatId(conversationId);
        if (isMobile) {
          setShowListOnMobile(false);
        }
      } catch (error) {
        console.error(
          "Failed to load messages for conversation from route param",
          error
        );
      }
    };

    loadFromRoute();
  }, [routeConversationId, conversations, traineeInfo, isMobile]);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || !selectedChatId) return;

    const conversationId = selectedChatId;

    const now = new Date();

    // Optimistic UI update: show trainee message on the right immediately
    const optimisticMsg = {
      id: now.getTime(),
      author: "trainee",
      name: traineeInfo?.name || "You",
      time: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      createdAt: now.toISOString(),
      lines: [trimmed],
    };

    setMessagesByChat((prev) => {
      const current = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: [...current, optimisticMsg],
      };
    });

    try {
      await api.post("/api/trainee/chat/send-message", {
        conversationId,
        content: trimmed,
      });
      // We ignore the response for UI; server will include this message
      // next time messages are fetched for this conversation.
    } catch (error) {
      console.error("Failed to send message", error);
      // Optionally: add retry/failed-state handling here.
    }
  };

  const selectedChat =
    conversations.find((c) => c.id === selectedChatId) || null;
  const activeMessages = messagesByChat[selectedChatId] || [];

  const handleSelectChat = async (id) => {
    const chat = conversations.find((c) => c.id === id);
    const expertId = chat?.raw?.participants?.expert?._id;

    try {
      let conversationId = chat?.raw?._id || id;

      if (expertId) {
        const res = await api.post("/api/trainee/chat/create-conversation", {
          expertId,
        });

        const convFromPost = res?.data?.data?.conversation;
        if (convFromPost?._id) {
          conversationId = convFromPost._id;
        }
      }

      if (conversationId) {
        const msgsRes = await api.get(
          `/api/trainee/chat/get-messages?conversationId=${conversationId}`
        );
        const rawMessages = msgsRes?.data?.data?.messages || [];

        // sort by createdAt ascending so oldest appears first
        rawMessages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        const mappedMessages = rawMessages.map((m) => {
          const isExpert = m?.sender?.userType === "expert";
          const author = isExpert ? "expert" : "trainee";
          const name = isExpert
            ? chat?.name || "Expert"
            : traineeInfo?.name || "You";
          const time = m.createdAt
            ? new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return {
            id: m._id,
            author,
            name,
            time,
            createdAt: m.createdAt || null,
            lines: [m.text || ""],
          };
        });

        setMessagesByChat((prev) => ({
          ...prev,
          [conversationId]: mappedMessages,
        }));

        setSelectedChatId(conversationId);
        if (isMobile) {
          setShowListOnMobile(false);
        }
      }
    } catch (error) {
      console.error("Failed to create conversation or load messages", error);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-shell">
        {(!isMobile || showListOnMobile) && (
          <ChatSidebar
            activeFilter={activeFilter}
            onChangeFilter={setActiveFilter}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            chats={conversations}
            trainee={traineeInfo}
          />
        )}
        {(!isMobile || !showListOnMobile) && (
          <div className="chat-main">
            {isMobile && (
              <button
                type="button"
                className="chat-main-back"
                onClick={() => setShowListOnMobile(true)}
              >
                {"< Back"}
              </button>
            )}
            {selectedChatId && (
              <>
                <ChatHeader
                  activeChat={selectedChat}
                  onOpenReport={() => setIsReportOpen(true)}
                />
                <ChatConversation messages={activeMessages} />
                <ChatInput onSend={handleSend} />
                <ReportIssueModal
                  open={isReportOpen}
                  onClose={() => setIsReportOpen(false)}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
