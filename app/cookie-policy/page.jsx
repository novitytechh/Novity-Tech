"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import React from "react";
import Link from "next/link";

export default function CookiePolicyPage() {
  const triggerCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  const COOKIE_TABLE = [
    {
      name: "novity_cookie_consent",
      category: "Strictly Necessary",
      duration: "1 Year",
      purpose: "Stores user's cookie consent preference and category choices across sessions.",
      provider: "First-Party (novitytech.com)",
    },
    {
      name: "novity_theme_preference",
      category: "Strictly Necessary",
      duration: "Persistent",
      purpose: "Stores dark or light mode preference to prevent screen flickering (anti-FOUC).",
      provider: "First-Party (novitytech.com)",
    },
    {
      name: "novity_language",
      category: "Functional",
      duration: "6 Months",
      purpose: "Remembers the preferred internationalization language for localized content.",
      provider: "First-Party (novitytech.com)",
    },
    {
      name: "_novity_analytics_session",
      category: "Performance & Analytics",
      duration: "Session / 24h",
      purpose: "Anonymized diagnostic telemetry to analyze server latency and page load speeds.",
      provider: "First-Party (novitytech.com)",
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", padding: "50px 20px 90px" }}>
      {/* Container */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--primary)",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Novity Tech Home
          </Link>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="sec-badge" style={{ marginBottom: "14px" }}>
            Transparency &amp; Privacy
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", color: "var(--text)" }}>
            Cookie Policy
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto" }}>
            This Cookie Policy explains how Novity Tech (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies when you browse our website and digital platforms.
          </p>
          <div style={{ marginTop: "16px", fontSize: "0.82rem", color: "var(--text3)", fontFamily: "monospace" }}>
            Last Updated: October 2026 • GDPR &amp; ePrivacy Compliant
          </div>
        </div>

        {/* Content Body */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "var(--sh2)",
            color: "var(--text2)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            1. What Are Cookies?
          </h3>
          <p style={{ marginBottom: "24px" }}>
            Cookies are small data files stored on your browser or device when you visit websites. They help websites remember your preferences, keep you logged into secure portals, and understand how users navigate through pages so that performance can be improved.
          </p>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            2. Types of Cookies We Use
          </h3>
          <p style={{ marginBottom: "16px" }}>
            Novity Tech utilizes minimal, privacy-first cookies strictly categorized as follows:
          </p>

          <div style={{ overflowX: "auto", marginBottom: "28px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--bg2)", color: "var(--text)", borderBottom: "2px solid var(--border)" }}>
                  <th style={{ padding: "12px 14px" }}>Cookie Name</th>
                  <th style={{ padding: "12px 14px" }}>Category</th>
                  <th style={{ padding: "12px 14px" }}>Duration</th>
                  <th style={{ padding: "12px 14px" }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_TABLE.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 14px", fontFamily: "monospace", color: "var(--primary)", fontWeight: 600 }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{row.category}</td>
                    <td style={{ padding: "12px 14px" }}>{row.duration}</td>
                    <td style={{ padding: "12px 14px" }}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            3. Managing Your Preferences
          </h3>
          <p style={{ marginBottom: "20px" }}>
            You have full control over your cookie choices. You can modify your preferences at any time by clicking the button below:
          </p>

          <div style={{ marginBottom: "28px" }}>
            <button
              type="button"
              onClick={triggerCookieSettings}
              className="btn-p"
              style={{ padding: "12px 24px", cursor: "pointer" }}
            >
              <i className="fas fa-sliders-h me-2"></i> Manage Cookie Preferences
            </button>
          </div>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            4. Contacting Us
          </h3>
          <p style={{ margin: 0 }}>
            If you have questions regarding our cookie practices, reach out to our data privacy team at{" "}
            <a href="mailto:novitytechh@gmail.com" style={{ color: "var(--primary)", fontWeight: 600 }}>
              novitytechh@gmail.com
            </a>.
          </p>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
