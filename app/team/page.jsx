"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TEAM_MEMBERS, COMPANY_DESCRIPTION } from "@/lib/teamData";

export default function TeamPage() {
  const team = TEAM_MEMBERS;

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "60px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>The Minds Behind Novity Tech</div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.15,
              maxWidth: "880px",
              margin: "0 auto 20px",
            }}
          >
            Engineering Leadership With <span className="hl">Uncompromising Standards</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.15rem",
              lineHeight: "1.85",
              maxWidth: "820px",
              margin: "0 auto 36px",
            }}
          >
            {COMPANY_DESCRIPTION.full}
          </p>
        </div>

        {/* Team Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="row g-4">
            {team.map((member) => (
              <div key={member.id} className="col-lg-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    height: "100%",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                    position: "relative",
                  }}
                >
                  {/* Luxury Monogram Avatar / Badge */}
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "20px",
                      background: "linear-gradient(135deg, rgba(223, 193, 93, 0.18) 0%, rgba(19, 18, 25, 0.95) 100%)",
                      border: "1px solid rgba(223, 193, 93, 0.35)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${member.icon}`} style={{ fontSize: "2rem", marginBottom: "4px" }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em" }}>
                      {member.badge}
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: "100px", background: "rgba(223, 193, 93, 0.1)", border: "1px solid rgba(223, 193, 93, 0.3)", color: "var(--primary)", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                      {member.badge}
                    </div>
                    <div style={{ color: "var(--text3)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {member.role}
                    </div>
                    <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text)", marginTop: "4px", marginBottom: "12px" }}>
                      {member.name}
                    </h3>
                    <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.7", marginBottom: "16px" }}>
                      {member.bio}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {member.skills.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "4px 11px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.04)",
                            color: "var(--text2)",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            border: "1px solid var(--border)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <div className="sec-badge">Engineering Culture</div>
            <h2 className="sec-title">How Our Team <span>Works With You</span></h2>
          </div>

          <div className="row g-4">
            {[
              { title: "Direct Architect Access", desc: "No layers of account managers. You collaborate directly with the engineers and designers building your software." },
              { title: "Full Code Ownership", desc: "Clean Git repositories, automated CI/CD scripts, and comprehensive architectural documentation delivered directly to your organization." },
              { title: "Transparent Sprints", desc: "Weekly demo videos, live deployment staging environments, and daily Slack/Discord alignment." },
            ].map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r)",
                    padding: "32px 26px",
                    height: "100%",
                  }}
                >
                  <div style={{ color: "var(--primary)", fontSize: "1.5rem", marginBottom: "14px" }}>
                    <i className="fas fa-check-circle" />
                  </div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "10px" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(223, 193, 93, 0.15) 0%, rgba(11, 10, 14, 0.95) 100%)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              borderRadius: "28px",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "16px" }}>
              Ready to work with our technical team?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Schedule a discovery session with our engineering leadership in Gujranwala, Pakistan to discuss requirements, architecture, and sprint timelines.
            </p>
            <Link href="/contact" className="btn-p">
              Schedule Architecture Call <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
