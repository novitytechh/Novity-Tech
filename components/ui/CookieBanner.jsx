"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "novity_cookie_consent";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}

    const handleReopen = () => {
      setIsOpen(true);
      setShowPreferences(true);
    };

    window.addEventListener("open-cookie-settings", handleReopen);
    return () => window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  const saveConsent = (choice) => {
    try {
      const value = {
        choice,
        preferences:
          choice === "all"
            ? { necessary: true, analytics: true, marketing: true }
            : choice === "essential"
            ? { necessary: true, analytics: false, marketing: false }
            : preferences,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch {}
    setIsOpen(false);
    setShowPreferences(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 9999,
        maxWidth: "460px",
        width: "calc(100% - 3rem)",
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <div
        style={{
          background: "var(--card)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "20px 24px",
          boxShadow: "var(--sh3)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(var(--primary-rgb), 0.12)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "1.2rem",
            }}
          >
            <i className="fas fa-cookie-bite"></i>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 6px 0", color: "var(--text)" }}>
              Privacy &amp; Cookies
            </h4>
            <p style={{ fontSize: "0.82rem", color: "var(--text2)", margin: 0, lineHeight: 1.6 }}>
              Novity Tech uses minimal cookies to optimize site performance, remember theme preferences, and analyze anonymized platform traffic. Read our{" "}
              <Link
                href="/cookie-policy"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 600 }}
              >
                Cookie Policy
              </Link>.
            </p>
          </div>
        </div>

        {/* Preferences Toggle View */}
        {showPreferences && (
          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "0.82rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ display: "block" }}>Essential Cookies</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Required for site navigation and security</span>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}>Always Active</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ display: "block" }}>Analytics Cookies</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Anonymized performance measurements</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                style={{ accentColor: "var(--primary)", cursor: "pointer", width: "16px", height: "16px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ display: "block" }}>Marketing Cookies</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Tailored relevant product announcements</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                style={{ accentColor: "var(--primary)", cursor: "pointer", width: "16px", height: "16px" }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => saveConsent("all")}
            className="btn-p"
            style={{ padding: "8px 16px", fontSize: "0.82rem", flex: 1, justifyContent: "center" }}
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => saveConsent("essential")}
            style={{
              padding: "8px 14px",
              fontSize: "0.82rem",
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => {
              if (showPreferences) {
                saveConsent("custom");
              } else {
                setShowPreferences(true);
              }
            }}
            style={{
              padding: "8px 12px",
              fontSize: "0.82rem",
              background: "transparent",
              color: "var(--text3)",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {showPreferences ? "Save Choices" : "Customize"}
          </button>
        </div>
      </div>
    </div>
  );
}
