"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TeamPage() {
  const team = [
    {
      name: "Michael Chen",
      role: "Lead Solutions Architect & Founder",
      image: "/img/team/1.jpg",
      bio: "Michael leads system architecture and enterprise strategy at Novity Tech. With 3+ years of specialized engineering leadership, he designs distributed cloud architectures and scalable Next.js systems.",
      skills: ["Cloud Architecture", "Next.js", "Kubernetes", "API Microservices"],
    },
    {
      name: "Sarah Jenkins",
      role: "Director of Product & Growth",
      image: "/img/team/2.jpg",
      bio: "Sarah bridges business vision and technical execution. Holding an MBA and 3+ years in product design and analytics, she ensures every digital platform drives measurable revenue impact.",
      skills: ["Product Strategy", "Agile Sprints", "Market Analytics", "Conversion Optimization"],
    },
    {
      name: "David Kim",
      role: "Principal UI/UX Systems Designer",
      image: "/img/team/3.jpg",
      bio: "David crafts bespoke digital design systems and interactive interfaces. With 3+ years of specialized interface craftsmanship, his designs elevate brand authority and user engagement.",
      skills: ["Design Systems", "Figma Tokens", "Interactive UX", "Micro-animations"],
    },
    {
      name: "Lisa Patel",
      role: "Staff DevOps & AI Systems Engineer",
      image: "/img/team/4.jpg",
      bio: "Lisa oversees automated CI/CD pipelines, autonomous AI copilots, and cloud infrastructure reliability. With 3+ years of cloud engineering experience, she guarantees 99.99% uptime.",
      skills: ["Autonomous AI", "Docker & CI/CD", "AWS & GCP", "Security Hardening"],
    },
  ];

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
              maxWidth: "860px",
              margin: "0 auto 20px",
            }}
          >
            Engineering Leadership With <span className="hl">Uncompromising Standards</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              maxWidth: "680px",
              margin: "0 auto 36px",
            }}
          >
            Our core team brings 3+ years of specialized excellence across cloud infrastructure, modern full-stack web platforms, and intelligent AI architectures.
          </p>
        </div>

        {/* Team Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="row g-4">
            {team.map((member, idx) => (
              <div key={idx} className="col-lg-6">
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
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "20px",
                      objectFit: "cover",
                      border: "2px solid var(--border)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <div style={{ color: "var(--primary)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {member.role}
                    </div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text)", marginTop: "4px", marginBottom: "12px" }}>
                      {member.name}
                    </h3>
                    <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "16px" }}>
                      {member.bio}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {member.skills.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "3px 10px",
                            borderRadius: "6px",
                            background: "rgba(223, 193, 93, 0.1)",
                            color: "var(--primary)",
                            fontSize: "0.74rem",
                            fontWeight: 600,
                            border: "1px solid rgba(223, 193, 93, 0.25)",
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
              { title: "Full Code Ownership", desc: "Clean Git repositories, automated CI/CD scripts, and comprehensive architectural documentation delivered to your organization." },
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
              Ready to work with senior engineers?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Schedule a 30-minute discovery session with our tech leads to discuss requirements, architecture, and timeline.
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
