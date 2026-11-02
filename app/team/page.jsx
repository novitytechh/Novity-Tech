"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "50px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>
            Client Guide &amp; Engineering Standards
          </div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.8vw, 4rem)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.15,
              maxWidth: "920px",
              margin: "0 auto 20px",
            }}
          >
            Direct Senior Engineering With <span className="hl">Zero Middlemen</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "0 auto 10px",
            }}
          >
            Everything ambitious founders and enterprise leaders need to know before partnering with Novity Tech.
          </p>
        </div>

        {/* Dedicated Master Paragraph Section */}
        <div className="container" style={{ marginBottom: "70px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(223, 193, 93, 0.1) 0%, rgba(19, 18, 25, 0.98) 100%)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              borderRadius: "28px",
              padding: "48px 40px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(223, 193, 93, 0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Eyebrow Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(223, 193, 93, 0.12)",
                border: "1px solid rgba(223, 193, 93, 0.3)",
                color: "var(--primary)",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <i className="fas fa-certificate" /> The Novity Tech Client Commitment
            </div>

            {/* The Dedicated Master Paragraph */}
            <p
              style={{
                color: "var(--text)",
                fontSize: "1.22rem",
                lineHeight: "2",
                fontWeight: 500,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              At Novity Tech, we have intentionally eliminated the conventional agency model of sales intermediaries, account managers, and junior outsourcing. When you partner with us, you work directly with our founding architects and principal engineers who personally design your architecture, write your production code, and deploy your infrastructure. Whether you are building an enterprise Next.js full-stack platform, an autonomous AI copilot workflow, or high-availability cloud infrastructure across AWS and Kubernetes, we guarantee sub-second performance, airtight security, and 100% intellectual property ownership from day one. Every engagement begins with a complimentary architectural discovery session under a strict bilateral NDA, followed by transparent 4-to-6 week sprint milestones with fixed-price SLA agreements, weekly interactive demo videos, and shared GitHub repositories. Proudly based in Gujranwala, Pakistan, and collaborating globally, we build software with zero technical debt, predictable fixed costs, and immediate commercial impact for your business.
            </p>

            {/* Highlight Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(223, 193, 93, 0.2)",
              }}
            >
              {[
                "100% Direct Architect Access",
                "Full IP & Repository Handover",
                "Bilateral NDA Guaranteed",
                "Fixed-Scope Milestones & SLAs",
                "Sub-Second Performance",
                "Weekly Interactive Demos",
              ].map((badge, idx) => (
                <span
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(223, 193, 93, 0.2)",
                    color: "var(--primary)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  <i className="fas fa-check" style={{ fontSize: "0.75rem" }} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clear All Client Queries Section */}
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

        {/* CTA Section */}
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(223, 193, 93, 0.16) 0%, rgba(11, 10, 14, 0.96) 100%)",
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
                className="btn-p"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(223, 193, 93, 0.4)",
                  color: "var(--primary)",
                }}
              >
                Call +92 329 1013649
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
