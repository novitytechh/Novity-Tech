"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TEAM_MEMBERS, TEAM_SECTIONS } from "@/lib/teamData";

const CLIENT_QUERIES = [
  {
    icon: "fa-user-shield",
    query: "Who actually builds and architects my software?",
    answer:
      "You work directly with our founding architects and senior engineers with zero junior delegation, sub-contracting, or non-technical account intermediaries. Your technical lead personally writes your code, architects your database, and leads every sprint demo.",
  },
  {
    icon: "fa-microchip",
    query: "What technologies and capabilities do you specialize in?",
    answer:
      "We engineer production-grade full-stack web applications using Next.js, React, Node.js, TypeScript, and modern PostgreSQL/Neon databases, alongside autonomous AI copilot workflows (Gemini, OpenAI RAG), cloud DevOps (AWS, Docker, Kubernetes), and bespoke luxury design systems.",
  },
  {
    icon: "fa-file-signature",
    query: "Who owns the intellectual property and code repository?",
    answer:
      "You retain 100% complete intellectual property ownership from day one. All clean Git repositories, automated CI/CD deployment scripts, database schemas, and documentation are handed over fully to your organization with zero vendor lock-in.",
  },
  {
    icon: "fa-calendar-check",
    query: "How do project timelines and sprint delivery work?",
    answer:
      "We operate on disciplined 2-to-4 week milestones and rapid 4-to-6 week MVP launches. Clients receive weekly interactive video demos, live staging environment deployments, and continuous real-time communication via dedicated Slack or Discord channels.",
  },
  {
    icon: "fa-scale-balanced",
    query: "How are pricing, contracts, and NDAs managed?",
    answer:
      "We execute a bilateral NDA before discussing proprietary requirements. All proposals feature transparent, milestone-based fixed pricing backed by strict service-level agreements (SLAs)—meaning zero surprise fees, zero hourly runaway, and guaranteed outcomes.",
  },
  {
    icon: "fa-globe",
    query: "Where is Novity Tech located and how do we begin?",
    answer:
      "Novity Tech is proudly headquartered in Gujranwala, Pakistan, collaborating with founders, venture-backed startups, and enterprise brands globally. You can schedule a complimentary architecture discovery call, call us at +92 329 1013649, or email novitytechh@gmail.com.",
  },
];

export default function TeamPage() {
  const [filter, setFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  const sectionsToRender =
    filter === "all"
      ? TEAM_SECTIONS
      : TEAM_SECTIONS.filter((s) => s.id === filter);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "100px" }}>
        {/* ==================== TEAM HERO HEADER ==================== */}
        <div className="container" style={{ marginBottom: "60px" }}>
          <div className="text-center" style={{ maxWidth: "880px", margin: "0 auto 40px" }}>
            <div className="sec-badge" style={{ marginBottom: "16px" }}>
              Executive Chiefs &amp; Specialized Engineering Guild
            </div>
            <h1
              className="sec-title"
              style={{
                fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
                fontWeight: 900,
                color: "var(--text)",
                lineHeight: 1.18,
                marginBottom: "16px",
              }}
            >
              Meet Our Chiefs &amp; <span>Engineering Divisions</span>
            </h1>
            <p style={{ color: "var(--text2)", fontSize: "1.1rem", lineHeight: "1.75", maxWidth: "750px", margin: "0 auto" }}>
              Explore the dedicated profiles of our C-suite leadership and specialized engineering sections: 
              Executive Directorate, AI Systems &amp; Cloud DevOps (CAIO Section), and Frontend &amp; Product Engineering (FE Section).
            </p>

            {/* Filter Tabs */}
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
                background: "var(--card)",
                padding: "6px",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                marginTop: "20px",
              }}
            >
              {[
                { id: "all", label: "All Members & Sections" },
                { id: "leadership", label: "Executive Leadership" },
                { id: "caio", label: "CAIO & Cloud (DE)" },
                { id: "fe", label: "Frontend & Product (FE, UX, SE)" },
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    style={{
                      border: "none",
                      background: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "#000" : "var(--text2)",
                      fontWeight: isActive ? 800 : 600,
                      fontSize: "0.85rem",
                      padding: "8px 20px",
                      borderRadius: "100px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      outline: "none",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== SECTIONS RENDER ==================== */}
          {sectionsToRender.map((sec) => {
            const members = TEAM_MEMBERS.filter((m) => m.section === sec.id);
            const colClass =
              sec.id === "caio"
                ? "col-lg-6 col-md-6 col-12"
                : "col-lg-4 col-md-6 col-12";

            return (
              <div key={sec.id} style={{ marginBottom: "70px" }}>
                {/* Section Header Card Banner */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border)",
                    borderLeft: "4px solid var(--primary)",
                    borderRadius: "18px",
                    padding: "20px 24px",
                    marginBottom: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.76rem",
                        fontWeight: 800,
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "4px",
                      }}
                    >
                      <i className={`fas ${sec.icon}`} /> {sec.badge}
                    </div>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                  <p
                    style={{
                      color: "var(--text2)",
                      fontSize: "0.92rem",
                      margin: 0,
                      maxWidth: "540px",
                      lineHeight: "1.6",
                    }}
                  >
                    {sec.subtitle}
                  </p>
                </div>

                {/* Section Members Grid */}
                <div className="row g-4">
                  {members.map((member) => (
                    <div key={member.id} className={colClass}>
                      <div
                        className="tm-card"
                        style={{
                          background: "var(--card)",
                          border: member.isChief
                            ? "1px solid rgba(223, 193, 93, 0.45)"
                            : "1px solid var(--border)",
                          borderRadius: "22px",
                          overflow: "hidden",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.65)";
                          e.currentTarget.style.boxShadow =
                            "0 18px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(223, 193, 93, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.borderColor = member.isChief
                            ? "rgba(223, 193, 93, 0.45)"
                            : "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Visual Header / Photo or Monogram */}
                        <div
                          style={{
                            height: member.image ? "260px" : "190px",
                            background: member.isChief
                              ? "rgba(223, 193, 93, 0.08)"
                              : "rgba(255, 255, 255, 0.02)",
                            borderBottom: "1px solid var(--border)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {member.image ? (
                            <>
                              <img
                                src={member.image}
                                alt={member.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "top center",
                                  transition: "transform 0.4s ease",
                                }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background:
                                    "linear-gradient(to top, rgba(16, 15, 21, 0.85) 0%, rgba(16, 15, 21, 0.1) 60%, rgba(0,0,0,0.3) 100%)",
                                  pointerEvents: "none",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              {/* Monogram / Icon Avatar */}
                              <div
                                style={{
                                  width: "74px",
                                  height: "74px",
                                  borderRadius: "22px",
                                  background: member.isChief
                                    ? "rgba(223, 193, 93, 0.16)"
                                    : "rgba(223, 193, 93, 0.08)",
                                  border: "1.5px solid rgba(223, 193, 93, 0.45)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "var(--primary)",
                                  fontSize: "1.8rem",
                                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(223, 193, 93, 0.2)",
                                  marginBottom: "6px",
                                }}
                              >
                                <i className={`fas ${member.icon}`} />
                              </div>

                              {/* Monogram Tag */}
                              <div
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: 800,
                                  color: "var(--primary)",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                {member.initials}
                              </div>
                            </>
                          )}

                          {/* Category / Chief Pill Badge */}
                          <span
                            style={{
                              position: "absolute",
                              top: "14px",
                              right: "14px",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              padding: "4px 12px",
                              borderRadius: "100px",
                              background: "rgba(11, 10, 14, 0.85)",
                              backdropFilter: "blur(8px)",
                              color: member.isChief ? "var(--primary)" : "#ffffff",
                              border: "1px solid rgba(223, 193, 93, 0.45)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                              zIndex: 2,
                            }}
                          >
                            {member.badge}
                          </span>
                        </div>

                        {/* Card Info Body */}
                        <div
                          style={{
                            padding: "24px 20px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            {/* Alignment or Lead indicator */}
                            {member.isSectionLead && (
                              <div
                                style={{
                                  fontSize: "0.73rem",
                                  color: "var(--primary)",
                                  fontWeight: 700,
                                  marginBottom: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <i className="fas fa-crown" style={{ fontSize: "0.7rem" }} />
                                {member.subMemberSummary}
                              </div>
                            )}
                            {member.parentLeadName && (
                              <div
                                style={{
                                  fontSize: "0.73rem",
                                  color: "var(--primary)",
                                  fontWeight: 700,
                                  marginBottom: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <i className="fas fa-link" style={{ fontSize: "0.7rem" }} />
                                In {member.section === "caio" ? "CAIO Section" : "FE Section"} • Aligned with {member.parentLeadName}
                              </div>
                            )}

                            <h3
                              style={{
                                fontSize: "1.15rem",
                                fontWeight: 800,
                                color: "var(--text)",
                                marginBottom: "4px",
                                lineHeight: "1.3",
                              }}
                            >
                              {member.name}
                            </h3>

                            <div
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                color: "var(--primary)",
                                marginBottom: "12px",
                                lineHeight: "1.4",
                              }}
                            >
                              {member.role}
                            </div>

                            <p
                              style={{
                                color: "var(--text2)",
                                fontSize: "0.86rem",
                                lineHeight: "1.65",
                                marginBottom: "18px",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {member.bio}
                            </p>
                          </div>

                          <div>
                            {/* Skills tags */}
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "6px",
                                marginBottom: "20px",
                              }}
                            >
                              {member.skills.slice(0, 3).map((sk, sIdx) => (
                                <span
                                  key={sIdx}
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "6px",
                                    padding: "3px 8px",
                                  }}
                                >
                                  {sk}
                                </span>
                              ))}
                            </div>

                            {/* Card Action Row */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingTop: "14px",
                                borderTop: "1px solid var(--border)",
                              }}
                            >
                              <button
                                onClick={() => setSelectedMember(member)}
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  color: "var(--primary)",
                                  fontSize: "0.84rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  padding: 0,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                View Profile <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                              </button>

                              <div style={{ display: "flex", gap: "8px" }}>
                                {member.linkedin && (
                                  <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "8px",
                                      background: "rgba(255, 255, 255, 0.04)",
                                      border: "1px solid var(--border)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "var(--text2)",
                                      fontSize: "0.85rem",
                                      textDecoration: "none",
                                      transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = "var(--primary)";
                                      e.currentTarget.style.borderColor = "var(--primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = "var(--text2)";
                                      e.currentTarget.style.borderColor = "var(--border)";
                                    }}
                                  >
                                    <i className="fab fa-linkedin-in" />
                                  </a>
                                )}
                                <a
                                  href={`mailto:${member.email || "novitytechh@gmail.com"}?subject=Direct Engineering Inquiry for ${encodeURIComponent(
                                    member.name
                                  )}`}
                                  aria-label="Send direct email"
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--text2)",
                                    fontSize: "0.85rem",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--primary)";
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text2)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                  }}
                                >
                                  <i className="fas fa-envelope" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================== CLIENT KNOWLEDGE BASE ==================== */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="text-center" style={{ maxWidth: "750px", margin: "0 auto 46px" }}>
            <div className="sec-badge">Client Knowledge Base</div>
            <h2 className="sec-title">
              Clear Answers To <span>All Your Queries</span>
            </h2>
            <p style={{ color: "var(--text2)", fontSize: "1.05rem", lineHeight: "1.7" }}>
              Straightforward answers to the most common questions clients have before starting their software engagement.
            </p>
          </div>

          <div className="row g-4">
            {CLIENT_QUERIES.map((item, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "22px",
                    padding: "32px 26px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "rgba(223, 193, 93, 0.12)",
                      border: "1px solid rgba(223, 193, 93, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      fontSize: "1.25rem",
                      marginBottom: "18px",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${item.icon}`} />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "var(--text)",
                      lineHeight: "1.4",
                      marginBottom: "12px",
                    }}
                  >
                    {item.query}
                  </h3>

                  <p
                    style={{
                      color: "var(--text2)",
                      fontSize: "0.92rem",
                      lineHeight: "1.75",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== CTA SECTION ==================== */}
        <div className="container">
          <div
            className="shaded-banner-block"
            style={{
              background: "var(--card-bg, #121118)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              borderRadius: "28px",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "16px" }}>
              Ready to Discuss Your Product Architecture?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "620px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Book an architectural discovery session with our engineering leads in Gujranwala, Pakistan. We will evaluate requirements, recommend the ideal tech stack, and deliver a fixed-scope milestone timeline.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-p">
                Schedule Architecture Call <i className="fas fa-arrow-right" />
              </Link>
              <a
                href="tel:+923291013649"
                className="btn-o"
                style={{
                  background: "rgba(223, 193, 93, 0.08)",
                  border: "1.5px solid rgba(223, 193, 93, 0.45)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                <i className="fas fa-phone-alt" /> Call +92 329 1013649
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ==================== TEAM MEMBER DETAIL MODAL ==================== */}
      {selectedMember && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ padding: "10px", background: "var(--card)", border: "1px solid rgba(223, 193, 93, 0.4)", borderRadius: "22px" }}>
              <div className="modal-header" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "var(--primary)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(223, 193, 93, 0.12)",
                      border: "1px solid rgba(223, 193, 93, 0.3)",
                    }}
                  >
                    {selectedMember.badge}
                  </span>
                  {selectedMember.divisionName && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--text2)",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--border)",
                        padding: "4px 10px",
                        borderRadius: "100px",
                      }}
                    >
                      {selectedMember.divisionName}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMember(null)}
                  style={{ filter: "invert(1) grayscale(100%) brightness(200%)" }}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body" style={{ padding: "26px 20px" }}>
                {/* Header profile row */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "24px",
                        objectFit: "cover",
                        objectPosition: "top center",
                        border: "2px solid rgba(223, 193, 93, 0.6)",
                        boxShadow: "0 0 25px rgba(223, 193, 93, 0.3)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "24px",
                        background: "rgba(223, 193, 93, 0.12)",
                        border: "1.5px solid rgba(223, 193, 93, 0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)",
                        fontSize: "2rem",
                        flexShrink: 0,
                        boxShadow: "0 0 25px rgba(223, 193, 93, 0.2)",
                      }}
                    >
                      <i className={`fas ${selectedMember.icon}`} />
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: "1.45rem", color: "var(--text)", marginBottom: "4px" }}>
                      {selectedMember.name}
                    </h3>
                    <div style={{ color: "var(--primary)", fontSize: "0.92rem", fontWeight: 700 }}>
                      {selectedMember.role}
                    </div>
                    <a
                      href="https://maps.google.com/?q=Gujranwala,+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--text3)",
                        fontSize: "0.82rem",
                        marginTop: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                    >
                      <i className="fas fa-map-marker-alt" style={{ color: "var(--primary)" }} /> Headquarters: Gujranwala, Pakistan · Global Delivery
                    </a>
                  </div>
                </div>

                {/* Sub-members or Alignment Box */}
                {selectedMember.subMemberIds && selectedMember.subMemberIds.length > 0 && (
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      background: "rgba(223, 193, 93, 0.08)",
                      border: "1px solid rgba(223, 193, 93, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fas fa-sitemap" /> {selectedMember.section === "caio" ? "CAIO Division Specialized Team" : "FE Division Specialized Team"}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {selectedMember.subMemberIds.map((subId) => {
                        const subM = TEAM_MEMBERS.find((m) => m.id === subId);
                        if (!subM) return null;
                        return (
                          <button
                            key={subId}
                            type="button"
                            onClick={() => setSelectedMember(subM)}
                            style={{
                              background: "rgba(0,0,0,0.45)",
                              border: "1px solid rgba(223, 193, 93, 0.45)",
                              borderRadius: "10px",
                              padding: "6px 14px",
                              color: "var(--text)",
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "var(--primary)";
                              e.currentTarget.style.color = "var(--primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.45)";
                              e.currentTarget.style.color = "var(--text)";
                            }}
                          >
                            <i className={`fas ${subM.icon}`} style={{ color: "var(--primary)", fontSize: "0.75rem" }} />
                            {subM.badge} <i className="fas fa-arrow-right" style={{ fontSize: "0.68rem", opacity: 0.7 }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedMember.parentLeadId && (
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.76rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                        Division Alignment
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)" }}>
                        {selectedMember.divisionName}
                      </div>
                    </div>
                    {(() => {
                      const leadM = TEAM_MEMBERS.find((m) => m.id === selectedMember.parentLeadId);
                      if (!leadM) return null;
                      return (
                        <button
                          type="button"
                          onClick={() => setSelectedMember(leadM)}
                          style={{
                            background: "rgba(223, 193, 93, 0.12)",
                            border: "1px solid rgba(223, 193, 93, 0.4)",
                            borderRadius: "100px",
                            padding: "6px 14px",
                            color: "var(--primary)",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          View Division Lead: {leadM.name} <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }} />
                        </button>
                      );
                    })()}
                  </div>
                )}

                {/* Bio */}
                <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                  Executive &amp; Technical Overview
                </h5>
                <p style={{ color: "var(--text2)", fontSize: "0.94rem", lineHeight: "1.8", marginBottom: "20px" }}>
                  {selectedMember.bio}
                </p>

                {/* Key Responsibilities */}
                {selectedMember.responsibilities && (
                  <div style={{ marginBottom: "20px" }}>
                    <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
                      Key Responsibilities &amp; Client Impact
                    </h5>
                    <ul style={{ paddingLeft: "20px", margin: 0, color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                      {selectedMember.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} style={{ marginBottom: "6px" }}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Core Skills */}
                <div style={{ marginBottom: "26px" }}>
                  <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
                    Core Technical Domains &amp; Competencies
                  </h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedMember.skills.map((sk, skIdx) => (
                      <span
                        key={skIdx}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          background: "rgba(223, 193, 93, 0.08)",
                          border: "1px solid rgba(223, 193, 93, 0.25)",
                          color: "var(--primary)",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "18px",
                    borderTop: "1px solid var(--border)",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href={`/contact?subject=${encodeURIComponent(
                      `Direct Architecture Inquiry: ${selectedMember.name} (${selectedMember.role})`
                    )}`}
                    className="btn-p"
                    style={{ fontSize: "0.88rem", padding: "10px 22px" }}
                    onClick={() => setSelectedMember(null)}
                  >
                    Consult With {selectedMember.name.split(" ")[0]} <i className="fas fa-arrow-right" />
                  </Link>

                  <div style={{ display: "flex", gap: "10px" }}>
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-o"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          fontSize: "0.88rem",
                          padding: "10px 18px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          textDecoration: "none",
                        }}
                      >
                        <i className="fab fa-linkedin-in" style={{ color: "var(--primary)" }} /> LinkedIn
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedMember(null)}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border)",
                        color: "var(--text2)",
                        borderRadius: "100px",
                        padding: "10px 20px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
