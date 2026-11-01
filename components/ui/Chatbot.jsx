"use client";

import React from "react";
import dynamic from "next/dynamic";
import "@hasaan_6/rag-chatbot-widget/dist/chatbot.css";

const ChatbotWidget = dynamic(
  () => import("@hasaan_6/rag-chatbot-widget").then((m) => m.ChatbotWidget),
  { ssr: false }
);

export default function Chatbot() {
  return (
    <ChatbotWidget
      chatEndpoint="/api/chat"
      botName="Novity Tech AI"
      botEyebrow="AI Assistant"
      toggleLabel="Chat with us"
      welcomeMsg="Hello! I am your Novity Tech AI assistant. How can I help you today with our custom web software, AI copilot systems, or starting a new project?"
      theme="dark"
      persistence="session"
      quickActions={[
        "Our Core Services",
        "Start a Project",
        "Contact & Location",
        "Leadership Team",
      ]}
    />
  );
}
