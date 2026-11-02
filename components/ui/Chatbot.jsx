"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";

const WELCOME_MESSAGE = {
  id: "welcome-msg",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hello! I am your Novity Tech AI assistant. How can I help you today with our custom web software, AI copilot systems, or starting a new project?",
    },
  ],
};

const QUICK_ACTIONS = [
  "Our Core Services",
  "Start a Project",
  "Contact & Location",
  "Leadership Team",
];

function getMessageText(message) {
  if (!message) return "";
  if (typeof message.content === "string" && message.content) {
    return message.content;
  }
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("");
  }
  return "";
}

function formatTextWithMarkdown(text) {
  if (!text) return null;

  // Split lines to format paragraphs and bullets nicely
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} style={{ height: "6px" }} />;
    }

    // Bold formatting parser
    const renderInline = (str) => {
      const parts = str.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} style={{ color: "#dfc15d", fontWeight: 700 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    // Bullet points
    if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const content = trimmed.replace(/^[•\-*]\s*/, "");
      return (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            marginTop: "3px",
            marginBottom: "3px",
          }}
        >
          <span style={{ color: "#dfc15d", fontSize: "14px", lineHeight: "1.4" }}>•</span>
          <span style={{ flex: 1 }}>{renderInline(content)}</span>
        </div>
      );
    }

    // Numbered list
    const numberedMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
    if (numberedMatch) {
      return (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
            marginTop: "3px",
            marginBottom: "3px",
          }}
        >
          <span style={{ color: "#dfc15d", fontWeight: 700 }}>
            {numberedMatch[1]}.
          </span>
          <span style={{ flex: 1 }}>{renderInline(numberedMatch[2])}</span>
        </div>
      );
    }

    return (
      <p key={idx} style={{ margin: "0 0 6px 0", lineHeight: "1.5" }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    clearError,
    setMessages,
  } = useChat({
    messages: [WELCOME_MESSAGE],
  });

  const isStreaming = status === "streaming" || status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, status]);

  const handleSendMessage = (textToSend) => {
    const trimmed = (textToSend || input).trim();
    if (!trimmed || isStreaming) return;
    if (error) clearError();

    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    if (error) clearError();
  };

  return (
    <div className="novity-chatbot-root" style={{ zIndex: 99999 }}>
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-toggle"
          aria-label="Open Novity Tech AI chat"
          style={{
            position: "fixed",
            bottom: "26px",
            right: "26px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 22px",
            border: "1px solid rgba(223, 193, 93, 0.45)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 99999,
          }}
        >
          {/* Sparkle / Bot Icon */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#0b0a0e",
              color: "#dfc15d",
              fontSize: "14px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#0b0a0e" }}>
            Chat with us
          </span>
          <span
            className="chatbot-toggle-dot"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            }}
          />
        </button>
      )}

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div
          className="chatbot-window"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "calc(100vw - 32px)",
            maxWidth: "400px",
            height: "600px",
            maxHeight: "calc(100vh - 48px)",
            backgroundColor: "#100f15",
            color: "#f5f3ef",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 99999,
            animation: "novitySlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              backgroundColor: "#181720",
              borderBottom: "1px solid rgba(223, 193, 93, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #fdf6d8 0%, #dfc15d 50%, #b8922c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0b0a0e",
                  fontWeight: 900,
                  fontSize: "18px",
                  boxShadow: "0 0 15px rgba(223, 193, 93, 0.3)",
                }}
              >
                N
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    border: "2px solid #181720",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    color: "#f5f3ef",
                    lineHeight: "1.2",
                  }}
                >
                  Novity Tech AI
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#dfc15d",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                  }}
                >
                  AI Assistant • Online
                </div>
              </div>
            </div>

            {/* Actions: Refresh & Close */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={handleResetChat}
                title="Clear conversation"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#b8b3a8",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#dfc15d";
                  e.currentTarget.style.background = "rgba(223, 193, 93, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#b8b3a8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#b8b3a8",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f5f3ef";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#b8b3a8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              const textContent = getMessageText(msg);

              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: isAssistant ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "12px 16px",
                      borderRadius: isAssistant
                        ? "18px 18px 18px 4px"
                        : "18px 18px 4px 18px",
                      backgroundColor: isAssistant ? "#181720" : "#dfc15d",
                      color: isAssistant ? "#f5f3ef" : "#0b0a0e",
                      fontSize: "13.5px",
                      lineHeight: "1.55",
                      border: isAssistant
                        ? "1px solid rgba(223, 193, 93, 0.2)"
                        : "none",
                      boxShadow: isAssistant
                        ? "0 4px 14px rgba(0,0,0,0.3)"
                        : "0 4px 18px rgba(223, 193, 93, 0.35)",
                      wordBreak: "break-word",
                    }}
                  >
                    {isAssistant ? (
                      formatTextWithMarkdown(textContent)
                    ) : (
                      <span style={{ fontWeight: 600 }}>{textContent}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Typing / Streaming Indicator */}
            {isStreaming && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "18px 18px 18px 4px",
                    backgroundColor: "#181720",
                    border: "1px solid rgba(223, 193, 93, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    className="novity-pulse-dot"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#dfc15d",
                      animation: "novityDotPulse 1.2s infinite ease-in-out",
                    }}
                  />
                  <span
                    className="novity-pulse-dot"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#dfc15d",
                      animation: "novityDotPulse 1.2s infinite ease-in-out 0.2s",
                    }}
                  />
                  <span
                    className="novity-pulse-dot"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#dfc15d",
                      animation: "novityDotPulse 1.2s infinite ease-in-out 0.4s",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#b8b3a8",
                      marginLeft: "6px",
                    }}
                  >
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  color: "#fca5a5",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Connection hiccup. Please try again.</span>
                <button
                  onClick={clearError}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fca5a5",
                    fontSize: "11px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Quick Action Suggestion Chips (Visible if 1 or 2 messages) */}
            {messages.length <= 2 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                  marginTop: "6px",
                }}
              >
                {QUICK_ACTIONS.map((action, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleSendMessage(action)}
                    disabled={isStreaming}
                    style={{
                      background: "rgba(223, 193, 93, 0.08)",
                      border: "1px solid rgba(223, 193, 93, 0.3)",
                      color: "#dfc15d",
                      borderRadius: "14px",
                      padding: "6px 12px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: isStreaming ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (!isStreaming) {
                        e.currentTarget.style.background = "#dfc15d";
                        e.currentTarget.style.color = "#0b0a0e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isStreaming) {
                        e.currentTarget.style.background =
                          "rgba(223, 193, 93, 0.08)";
                        e.currentTarget.style.color = "#dfc15d";
                      }
                    }}
                  >
                    + {action}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Footer Controls */}
          <div
            style={{
              padding: "12px 16px 14px",
              backgroundColor: "#181720",
              borderTop: "1px solid rgba(223, 193, 93, 0.2)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Novity Tech AI..."
                disabled={isStreaming}
                style={{
                  flex: 1,
                  backgroundColor: "#100f15",
                  border: "1px solid rgba(223, 193, 93, 0.3)",
                  borderRadius: "14px",
                  padding: "11px 14px",
                  color: "#f5f3ef",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#dfc15d";
                  e.target.style.boxShadow = "0 0 10px rgba(223, 193, 93, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(223, 193, 93, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={stop}
                  title="Stop generating"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#fca5a5",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect width="16" height="16" x="4" y="4" rx="2" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  title="Send message"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, #fdf6d8 0%, #dfc15d 50%, #b8922c 100%)"
                      : "rgba(223, 193, 93, 0.2)",
                    color: input.trim() ? "#0b0a0e" : "rgba(255,255,255,0.3)",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() ? "pointer" : "default",
                    boxShadow: input.trim()
                      ? "0 4px 15px rgba(223, 193, 93, 0.4)"
                      : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              )}
            </form>

            <div
              style={{
                marginTop: "8px",
                textAlign: "center",
                fontSize: "10.5px",
                color: "#b8b3a8",
                letterSpacing: "0.02em",
              }}
            >
              Powered by <span style={{ color: "#dfc15d", fontWeight: 600 }}>Novity Tech AI</span> &amp; Vercel AI SDK
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
