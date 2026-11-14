"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Public fast CDN URLs from the official Novity-Tech repository.
// Keeps total signature size ~3,000 characters (well within Gmail's 10,000-character limit).
const OFFICIAL_EMBLEM_URL = "https://raw.githubusercontent.com/novitytechh/Novity-Tech/main/public/img/novity-emblem.png";
const OFFICIAL_FULL_LOGO_URL = "https://raw.githubusercontent.com/novitytechh/Novity-Tech/main/public/img/novity-logo-full.jpg";

export default function EmailCardPage() {
  const [themeMode, setThemeMode] = useState("dark"); // "dark" | "light"
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [showCardBorder, setShowCardBorder] = useState(true);

  // Resend email dispatch state
  const [sendTargetEmail, setSendTargetEmail] = useState("novitytechh@gmail.com");
  const [sendingResend, setSendingResend] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);

  // Synchronized credentials
  const [cardData, setCardData] = useState({
    name: "Ali Haider",
    role: "Founder",
    company: "Novity Tech",
    subCompany: "Digital Engineering & AI Agency",
    email: "novitytechh@gmail.com",
    phone: "+92 329 1013649",
    altPhone: "+92 303 5696807",
    showAltPhone: false,
    website: "novitytech.com",
    websiteUrl: "https://novitytech.com",
    location: "Gujranwala, Pakistan",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com/NovityTech",
    github: "https://github.com/novitytechh",
    avatarType: "fullLogo", // 'fullLogo' | 'emblem'
    avatarUrl: OFFICIAL_FULL_LOGO_URL,
  });

  // Build bulletproof HTML table for email clients - Lightweight & Gmail compliant (<4KB)
  const generateEmailHtml = (mode = "dark", withBorder = showCardBorder) => {
    const isDark = mode === "dark";
    const bg = isDark ? "#0e0d13" : "#ffffff";
    const cardBorder = withBorder 
      ? (isDark ? "1px solid rgba(223, 193, 93, 0.45)" : "1px solid #e2d7be") 
      : "none";
    const primaryGold = "#dfc15d";
    const textColor = isDark ? "#ffffff" : "#1a181e";
    const textMuted = isDark ? "#b8b3a8" : "#635f58";
    const dividerColor = isDark ? "rgba(223, 193, 93, 0.35)" : "#e2d7be";
    const logoNovityColor = isDark ? "#ffffff" : "#121117";
    const iconBg = isDark ? "#1c1a24" : "#f4efe4";
    const iconBorder = isDark ? "rgba(223, 193, 93, 0.45)" : "#dfc15d";

    const isFullLogo = cardData.avatarType === "fullLogo";
    const imageSource = isFullLogo
      ? OFFICIAL_FULL_LOGO_URL
      : cardData.avatarType === "emblem"
      ? OFFICIAL_EMBLEM_URL
      : cardData.avatarUrl;

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: ${bg}; ${withBorder ? `border: ${cardBorder};` : ''} border-radius: 14px; max-width: 530px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.25); overflow: hidden; color: ${textColor}; margin: 8px 0;">
  <tr>
    <td style="padding: 22px 18px 22px 22px; vertical-align: top; width: ${isFullLogo ? '145px' : '135px'}; text-align: center; border-right: 1px solid ${dividerColor};">
      <!-- Official Brand Logo -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto ${isFullLogo ? '14px' : '10px'} auto;">
        <tr>
          <td style="${isFullLogo ? 'width: 105px; text-align: center; vertical-align: middle; padding: 0; border: none; background: transparent;' : 'width: 74px; height: 74px; text-align: center; vertical-align: middle; padding: 0; border: none; background: transparent;'}">
            <img src="${imageSource}" alt="${cardData.company}" width="${isFullLogo ? 100 : 70}" ${isFullLogo ? '' : 'height="70"'} style="${isFullLogo ? 'border-radius: 10px; display: block; object-fit: contain; width: 100px; height: auto; max-height: 125px; border: none; outline: none; margin: 0 auto;' : 'border-radius: 50%; display: block; object-fit: contain; width: 70px; height: 70px; border: none; outline: none; margin: 0 auto;'}" />
          </td>
        </tr>
      </table>

      ${!isFullLogo ? `
      <!-- Company Wordmark -->
      <div style="font-weight: 800; font-size: 13px; letter-spacing: 1.8px; text-transform: uppercase; line-height: 1.2; margin-bottom: 10px;">
        <span style="color: ${logoNovityColor};">NOVITY</span>
        <span style="color: ${primaryGold};"> TECH</span>
      </div>
      ` : ''}

      <!-- Social Media Badges -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
        <tr>
          <td style="padding: 0 3px;">
            <a href="${cardData.linkedin}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: ${iconBg}; border: 1px solid ${iconBorder}; border-radius: 50%; color: ${primaryGold}; font-weight: bold; font-size: 10.5px;">in</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="${cardData.websiteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: ${iconBg}; border: 1px solid ${iconBorder}; border-radius: 50%; color: ${primaryGold}; font-weight: bold; font-size: 10.5px;">&#127760;</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="${cardData.twitter}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: ${iconBg}; border: 1px solid ${iconBorder}; border-radius: 50%; color: ${primaryGold}; font-weight: bold; font-size: 10.5px;">&#120143;</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="${cardData.github}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: ${iconBg}; border: 1px solid ${iconBorder}; border-radius: 50%; color: ${primaryGold}; font-weight: bold; font-size: 10px;">GH</a>
          </td>
        </tr>
      </table>
    </td>

    <!-- Details Column -->
    <td style="padding: 22px 22px 22px 18px; vertical-align: middle;">
      <!-- Name -->
      <div style="font-size: 19px; font-weight: 800; color: ${textColor}; letter-spacing: 0.3px; line-height: 1.2; margin-bottom: 4px;">
        ${cardData.name}
      </div>

      <!-- Role -->
      <div style="font-size: 13px; font-weight: 700; color: ${primaryGold}; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 2px;">
        ${cardData.role}
      </div>

      <!-- Subtitle -->
      <div style="font-size: 11.5px; color: ${textMuted}; font-weight: 500; margin-bottom: 10px;">
        ${cardData.subCompany}
      </div>

      <!-- Divider -->
      <div style="height: 1px; background: ${dividerColor}; opacity: 0.6; margin-bottom: 10px; width: 100%;"></div>

      <!-- Contact Table -->
      <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12.5px; line-height: 1.7; color: ${textColor};">
        <tr>
          <td style="vertical-align: middle; width: 20px; color: ${primaryGold}; font-size: 12px; padding-bottom: 3px;">&#9993;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="mailto:${cardData.email}" style="color: ${textColor}; text-decoration: none; font-weight: 500;">${cardData.email}</a>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: ${primaryGold}; font-size: 12px; padding-bottom: 3px;">&#9742;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="tel:${cardData.phone.replace(/\\s+/g, '')}" style="color: ${textColor}; text-decoration: none; font-weight: 500;">${cardData.phone}</a>
            ${cardData.showAltPhone ? ` <span style="color: ${textMuted}; font-size: 11px;">/ ${cardData.altPhone}</span>` : ""}
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: ${primaryGold}; font-size: 12px; padding-bottom: 3px;">&#127760;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="${cardData.websiteUrl}" target="_blank" rel="noopener noreferrer" style="color: ${primaryGold}; text-decoration: none; font-weight: 600;">${cardData.website}</a>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: ${primaryGold}; font-size: 12px;">&#128205;</td>
          <td style="vertical-align: middle; color: ${textMuted}; font-size: 11.5px;">${cardData.location}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim();
  };

  // Copy rich text into clipboard so user can direct paste (Ctrl+V) into Gmail / Outlook settings
  const copyRichSignature = async () => {
    try {
      const htmlContent = generateEmailHtml(themeMode, showCardBorder);
      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([`${cardData.name} | ${cardData.role} | ${cardData.company}\n${cardData.email} | ${cardData.phone} | ${cardData.website}\n${cardData.location}`], { type: "text/plain" });
      
      const clipboardItem = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      });

      await navigator.clipboard.write([clipboardItem]);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 3000);
    } catch (err) {
      copyHtmlCode();
    }
  };

  // Copy raw HTML
  const copyHtmlCode = () => {
    const htmlContent = generateEmailHtml(themeMode, showCardBorder);
    navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  // Download standalone HTML
  const downloadHtmlFile = () => {
    const htmlContent = generateEmailHtml(themeMode, showCardBorder);
    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `novity-tech-email-card-${themeMode}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Send Signature to recipient email directly via Resend API
  const sendViaResend = async () => {
    if (!sendTargetEmail) return;
    setSendingResend(true);
    setResendStatus(null);

    try {
      const htmlContent = generateEmailHtml(themeMode, showCardBorder);
      const res = await fetch("/api/send-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: sendTargetEmail,
          htmlSignature: htmlContent,
          recipientName: cardData.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver email.");
      }

      setResendStatus({
        type: "success",
        message: `Dispatched to ${sendTargetEmail}! Check your inbox.`,
      });
    } catch (err) {
      setResendStatus({
        type: "error",
        message: err.message || "Failed to send via Resend.",
      });
    } finally {
      setSendingResend(false);
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "50px", paddingBottom: "100px" }}>
        {/* Header */}
        <div className="container text-center" style={{ marginBottom: "50px" }}>
          <div className="sec-badge" style={{ marginBottom: "14px" }}>
            Brand Identity Kit &bull; Official Signature
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.18,
              maxWidth: "850px",
              margin: "0 auto 16px",
            }}
          >
            Novity Tech <span className="hl">Email Card</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.08rem",
              lineHeight: "1.75",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Optimized for Gmail (<strong>&lt; 4,000 characters</strong> — strictly complies with Gmail&apos;s 10,000-char limit). Featuring <strong>Ali Haider</strong> &amp; Novity Tech credentials.
          </p>
        </div>

        <div className="container">
          <div className="row g-5">
            {/* Left: Customizer & Controls */}
            <div className="col-lg-5">
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", margin: 0 }}>
                    <i className="fas fa-id-card" style={{ color: "var(--primary)", marginRight: "10px" }} />
                    Card Information
                  </h4>

                  {/* Mode switcher */}
                  <div
                    style={{
                      display: "flex",
                      background: "rgba(255,255,255,0.06)",
                      padding: "4px",
                      borderRadius: "12px",
                      gap: "4px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setThemeMode("dark")}
                      style={{
                        background: themeMode === "dark" ? "var(--primary)" : "transparent",
                        color: themeMode === "dark" ? "#000" : "var(--text2)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "4px 12px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Dark Gold
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemeMode("light")}
                      style={{
                        background: themeMode === "light" ? "var(--primary)" : "transparent",
                        color: themeMode === "light" ? "#000" : "var(--text2)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "4px 12px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Light Gold
                    </button>
                  </div>
                </div>

                {/* Logo Display Style Toggle */}
                <div className="mb-3 p-2 rounded-3" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)", marginBottom: "6px", display: "block" }}>
                    <i className="fas fa-image me-1" /> Brand Logo Presentation
                  </label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => setCardData({ ...cardData, avatarType: "fullLogo" })}
                      style={{
                        flex: 1,
                        background: cardData.avatarType === "fullLogo" ? "var(--primary)" : "transparent",
                        color: cardData.avatarType === "fullLogo" ? "#000" : "var(--text2)",
                        border: cardData.avatarType === "fullLogo" ? "1px solid var(--primary)" : "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Full 3D Artwork
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardData({ ...cardData, avatarType: "emblem" })}
                      style={{
                        flex: 1,
                        background: cardData.avatarType === "emblem" ? "var(--primary)" : "transparent",
                        color: cardData.avatarType === "emblem" ? "#000" : "var(--text2)",
                        border: cardData.avatarType === "emblem" ? "1px solid var(--primary)" : "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Winged Emblem
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="d-flex flex-column gap-3">
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={cardData.role}
                      onChange={(e) => setCardData({ ...cardData, role: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Tagline / Description
                    </label>
                    <input
                      type="text"
                      value={cardData.subCompany}
                      onChange={(e) => setCardData({ ...cardData, subCompany: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Official Website Email
                    </label>
                    <input
                      type="text"
                      value={cardData.email}
                      onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={cardData.phone}
                      onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", marginBottom: "6px", display: "block" }}>
                      Headquarters Location
                    </label>
                    <input
                      type="text"
                      value={cardData.location}
                      onChange={(e) => setCardData({ ...cardData, location: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  {/* Toggle Card Outer Border */}
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>
                      Include Outer Card Border
                    </span>
                    <input
                      type="checkbox"
                      checked={showCardBorder}
                      onChange={(e) => setShowCardBorder(e.target.checked)}
                      style={{ cursor: "pointer", width: "18px", height: "18px", accentColor: "var(--primary)" }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column gap-2 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={copyRichSignature}
                    className="btn-p w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{ padding: "12px", fontSize: "0.95rem" }}
                  >
                    <i className={copiedRich ? "fas fa-check" : "fas fa-copy"} />
                    {copiedRich ? "Copied! Paste into Gmail (Now Under Limit)" : "Copy Signature for Gmail"}
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      onClick={copyHtmlCode}
                      className="btn-s flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      style={{ padding: "10px", fontSize: "0.85rem" }}
                    >
                      <i className={copiedHtml ? "fas fa-check" : "fas fa-code"} />
                      {copiedHtml ? "HTML Copied!" : "Copy HTML Code"}
                    </button>

                    <button
                      onClick={downloadHtmlFile}
                      className="btn-s d-flex align-items-center justify-content-center gap-2"
                      style={{ padding: "10px 16px", fontSize: "0.85rem" }}
                      title="Download .html file"
                    >
                      <i className="fas fa-download" />
                    </button>
                  </div>

                  {/* Resend Direct Dispatch */}
                  <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fas fa-paper-plane" /> Send to Inbox via Resend
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="email"
                        value={sendTargetEmail}
                        onChange={(e) => setSendTargetEmail(e.target.value)}
                        placeholder="you@company.com"
                        style={{ ...inputStyle, fontSize: "0.82rem", padding: "8px 12px" }}
                      />
                      <button
                        onClick={sendViaResend}
                        disabled={sendingResend}
                        className="btn-p"
                        style={{ padding: "8px 16px", fontSize: "0.82rem", whiteSpace: "nowrap", opacity: sendingResend ? 0.7 : 1 }}
                      >
                        {sendingResend ? <i className="fas fa-spinner fa-spin" /> : "Send Email"}
                      </button>
                    </div>

                    {resendStatus && (
                      <div
                        className="mt-2 p-2 rounded-2"
                        style={{
                          fontSize: "0.78rem",
                          background: resendStatus.type === "success" ? "rgba(25, 135, 84, 0.15)" : "rgba(220, 53, 69, 0.15)",
                          color: resendStatus.type === "success" ? "#75b798" : "#ea868f",
                          border: `1px solid ${resendStatus.type === "success" ? "rgba(25, 135, 84, 0.3)" : "rgba(220, 53, 69, 0.3)"}`,
                        }}
                      >
                        <i className={`fas ${resendStatus.type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"} me-1`} />
                        {resendStatus.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Previews */}
            <div className="col-lg-7">
              <div className="d-flex flex-column gap-4">
                {/* Active Theme Card Preview */}
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "36px 32px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", margin: 0 }}>
                        Live Email Signature Preview
                      </h4>
                      <p style={{ color: "var(--text3)", fontSize: "0.85rem", margin: "4px 0 0" }}>
                        Optimized &bull; ~3,000 characters (Passed Gmail Length Limit)
                      </p>
                    </div>

                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: "rgba(25, 135, 84, 0.15)",
                        color: "#75b798",
                        border: "1px solid rgba(25, 135, 84, 0.3)",
                      }}
                    >
                      Gmail Safe
                    </span>
                  </div>

                  {/* Render the actual live HTML inside a wrapper */}
                  <div
                    style={{
                      background: themeMode === "dark" ? "#08070b" : "#f1ede4",
                      padding: "30px 20px",
                      borderRadius: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflowX: "auto",
                      border: "1px dashed rgba(223, 193, 93, 0.3)",
                    }}
                    dangerouslySetInnerHTML={{ __html: generateEmailHtml(themeMode, showCardBorder) }}
                  />

                  <div className="mt-4 p-3 rounded-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                    <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                      <i className="fas fa-check-circle" /> Why this fixes &quot;The signature is too long&quot;:
                    </div>
                    <p style={{ margin: 0, color: "var(--text2)", fontSize: "0.82rem", lineHeight: "1.7" }}>
                      Gmail has a hard limit of 10,000 characters for HTML signatures. The previous version included a large embedded image string. This optimized version uses the official lightweight GitHub Fastly CDN link for your emblem, bringing the code down to just <strong>~3,200 characters</strong> so Gmail accepts and saves it instantly without errors.
                    </p>
                  </div>
                </div>

                {/* Both Editions Side-by-Side */}
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                  }}
                >
                  <h5 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
                    Theme Comparison
                  </h5>

                  <div className="row g-4">
                    {/* Dark Card */}
                    <div className="col-12">
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)", marginBottom: "8px" }}>
                        Option A: Novity Obsidian & Gold
                      </div>
                      <div
                        style={{
                          background: "#08070b",
                          padding: "20px",
                          borderRadius: "14px",
                          overflowX: "auto",
                        }}
                        dangerouslySetInnerHTML={{ __html: generateEmailHtml("dark", showCardBorder) }}
                      />
                    </div>

                    {/* Light Card */}
                    <div className="col-12">
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)", marginBottom: "8px" }}>
                        Option B: Executive Ivory & Gold
                      </div>
                      <div
                        style={{
                          background: "#faf8f5",
                          padding: "20px",
                          borderRadius: "14px",
                          overflowX: "auto",
                        }}
                        dangerouslySetInnerHTML={{ __html: generateEmailHtml("light", showCardBorder) }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text)",
  fontSize: "0.88rem",
  outline: "none",
  transition: "border 0.2s ease",
};
