"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const openCookieSettings = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  return (
    <footer id="footer" style={{ borderTop: "1px solid var(--border)", background: "var(--dark)" }}>
      <div className="container" style={{ padding: "80px 15px 40px" }}>
        <div className="row g-5">
          {/* Brand info */}
          <div className="col-lg-4 col-md-6">
            <Link
              className="ft-brand"
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "18px", textDecoration: "none" }}
            >
              <img
                src="/img/novity-emblem.png"
                alt="Novity Tech Emblem"
                style={{
                  height: "54px",
                  width: "54px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 16px rgba(223, 193, 93, 0.55))",
                }}
              />
              <span
                style={{
                  fontFamily: "'Phudu', cursive",
                  fontWeight: 900,
                  fontSize: "1.6rem",
                  letterSpacing: "0.08em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "#ffffff" }}>NOVITY</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #fdf6d8 0%, #dfc15d 50%, #b8922c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TECH
                </span>
              </span>
            </Link>
            <p className="ft-desc" style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.8", maxWidth: "340px" }}>
              A digital-first creative engineering agency that transforms bold ideas into scalable enterprise architectures and high-growth digital platforms.
            </p>
            <div className="ft-soc d-flex gap-2 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://github.com/novitytechh" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
            </div>
          </div>

          {/* Core Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="ft-col-title" style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "22px" }}>
              Core Capabilities
            </h5>
            <ul className="ft-links" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/services/web-application-development" style={{ color: "var(--text2)", textDecoration: "none" }}>Web Application Development</Link></li>
              <li><Link href="/services/custom-ai-agents" style={{ color: "var(--text2)", textDecoration: "none" }}>Custom AI Agents & Copilots</Link></li>
              <li><Link href="/services/cloud-infrastructure" style={{ color: "var(--text2)", textDecoration: "none" }}>Cloud & DevOps Resilience</Link></li>
              <li><Link href="/services/mvp-development" style={{ color: "var(--text2)", textDecoration: "none" }}>MVP Development for Startups</Link></li>
              <li><Link href="/services/ui-ux-design" style={{ color: "var(--text2)", textDecoration: "none" }}>UI/UX Design Systems</Link></li>
              <li><Link href="/services" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>Explore All 17 Services &rarr;</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="ft-col-title" style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "22px" }}>
              Company
            </h5>
            <ul className="ft-links" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/" style={{ color: "var(--text2)", textDecoration: "none" }}>Home</Link></li>
              <li><Link href="/about" style={{ color: "var(--text2)", textDecoration: "none" }}>About Novity Tech</Link></li>
              <li><Link href="/work" style={{ color: "var(--text2)", textDecoration: "none" }}>Featured Work</Link></li>
              <li><Link href="/team" style={{ color: "var(--text2)", textDecoration: "none" }}>Leadership Team</Link></li>
              <li><Link href="/reviews" style={{ color: "var(--text2)", textDecoration: "none" }}>Client Reviews</Link></li>
              <li><Link href="/blog" style={{ color: "var(--text2)", textDecoration: "none" }}>Insights & Blog</Link></li>
              <li><Link href="/contact" style={{ color: "var(--text2)", textDecoration: "none" }}>Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div className="col-lg-3 col-md-6">
            <h5 className="ft-col-title" style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "22px" }}>
              Start a Conversation
            </h5>
            <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: "1.7" }}>
              Ready to engineer your next digital platform? Reach out directly to our engineering leads.
            </p>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="mailto:info@novitytech.com" style={{ color: "var(--primary)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-envelope"></i> info@novitytech.com
              </a>
              <a href="tel:+15551234567" style={{ color: "var(--text2)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-phone"></i> +1 (555) 123-4567
              </a>
            </div>
            <Link href="/contact" className="btn-p mt-3" style={{ padding: "9px 20px", fontSize: "0.85rem", display: "inline-block", textDecoration: "none" }}>
              Request Consultation
            </Link>
          </div>
        </div>

        {/* Bottom Legal / Policy row */}
        <div className="ft-bot" style={{ marginTop: "60px", paddingTop: "28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div className="copy" style={{ color: "var(--text3)", fontSize: "0.82rem" }}>
            &copy; 2026 <strong>Novity Tech</strong>. All rights reserved.
          </div>
          <div className="ft-bot-links d-flex gap-3 align-items-center flex-wrap" style={{ fontSize: "0.82rem" }}>
            <Link href="/privacy-policy" style={{ color: "var(--text3)", textDecoration: "none" }}>Privacy Policy</Link>
            <span style={{ color: "var(--border)" }}>&bull;</span>
            <Link href="/cookie-policy" style={{ color: "var(--text3)", textDecoration: "none" }}>Cookie Policy</Link>
            <span style={{ color: "var(--border)" }}>&bull;</span>
            <button
              onClick={openCookieSettings}
              style={{ background: "none", border: "none", padding: 0, color: "var(--text3)", cursor: "pointer", fontSize: "0.82rem" }}
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
