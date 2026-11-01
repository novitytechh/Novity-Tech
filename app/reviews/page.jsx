"use client";

import React, { useState } from "react";
import Link from "next/link";

const REVIEWS_DATA = [
  {
    id: "r1",
    author: "Alexander Thompson",
    role: "CEO & Co-Founder",
    company: "TechFlow Inc.",
    avatar: "/img/testimonial/1.jpg",
    rating: 5,
    metric: "+320% Traffic",
    category: "web",
    categoryLabel: "Web Platforms",
    project: "Next.js Enterprise SaaS Platform",
    date: "October 2026",
    quote:
      "Novity Tech transformed our entire digital infrastructure. Their architecture is clean, their sprint velocity is unmatched, and our web application now loads in sub-seconds across the globe.",
  },
  {
    id: "r2",
    author: "Priya Sharma",
    role: "Founder & Creative Director",
    company: "Blooma Wellness",
    avatar: "/img/testimonial/2.jpg",
    rating: 5,
    metric: "2.4x Revenue",
    category: "design",
    categoryLabel: "Design Systems & UX",
    project: "Headless E-Commerce & Brand System",
    date: "September 2026",
    quote:
      "Working directly with the founders of Novity Tech was the best engineering decision we made. They designed a bespoke digital ecosystem that doubled our customer retention within 90 days.",
  },
  {
    id: "r3",
    author: "Marcus Williams",
    role: "VP of Engineering",
    company: "SportEdge Cloud",
    avatar: "/img/testimonial/3.jpg",
    rating: 5,
    metric: "99.99% Uptime",
    category: "cloud",
    categoryLabel: "Cloud & Architecture",
    project: "Kubernetes & Cloud Infrastructure",
    date: "August 2026",
    quote:
      "Exceptional technical mastery. From automated CI/CD pipelines to zero-downtime database migrations, Novity Tech engineered a cloud foundation that handles millions of active requests with ease.",
  },
  {
    id: "r4",
    author: "Rachel Kim",
    role: "Managing Director",
    company: "NovaBuild Analytics",
    avatar: "/img/testimonial/4.jpg",
    rating: 5,
    metric: "-45% Server Costs",
    category: "ai",
    categoryLabel: "AI Agents & Automation",
    project: "Autonomous AI Workflow Pipelines",
    date: "October 2026",
    quote:
      "The custom AI agent pipelines built by Novity Tech cut our customer support resolution time in half while slashing cloud server overhead. Truly an elite engineering team.",
  },
  {
    id: "r5",
    author: "David Sterling",
    role: "Chief Product Officer",
    company: "Meridian Fintech",
    avatar: "/img/testimonial/1.jpg",
    rating: 5,
    metric: "40% Higher Conversion",
    category: "web",
    categoryLabel: "Web Platforms",
    project: "Fintech Dashboard & Real-time Web App",
    date: "July 2026",
    quote:
      "Transparent bi-weekly sprint demos, full source code ownership with zero vendor lock-in, and flawless execution. Novity Tech sets the benchmark for modern software development agencies.",
  },
  {
    id: "r6",
    author: "Elena Rostova",
    role: "Head of Marketing",
    company: "Luxe Retail Global",
    avatar: "/img/testimonial/2.jpg",
    rating: 5,
    metric: "Top 3 Search Rank",
    category: "design",
    categoryLabel: "Design Systems & UX",
    project: "International Brand Redesign & SEO",
    date: "June 2026",
    quote:
      "From technical SEO to responsive interactive UI design, every single milestone exceeded expectations. Our organic leads tripled within six months of launch.",
  },
];

const COLLABORATION_PILLARS = [
  {
    icon: "fa-shield-alt",
    title: "100% Verified Deliverables",
    description:
      "Every quote and review represents real production software engineered by Novity Tech with direct founder accountability.",
  },
  {
    icon: "fa-code",
    title: "Direct Founder Access",
    description:
      "No junior delegates or project managers in the middle. You pair and strategize directly with our core engineering leadership.",
  },
  {
    icon: "fa-bolt",
    title: "Predictable Velocity",
    description:
      "Bi-weekly sprint demos, shared GitHub repositories, and automated CI/CD pipelines keep you informed every single day.",
  },
  {
    icon: "fa-lock",
    title: "Full Code & IP Ownership",
    description:
      "Zero lock-in. You retain 100% of all intellectual property, source code, CI/CD scripts, and architecture blueprints.",
  },
];

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", padding: "80px 20px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Navigation Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "44px", flexWrap: "wrap", gap: "16px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <img
              src="/img/novity-emblem.png"
              alt="Novity Tech Emblem"
              style={{
                height: "48px",
                width: "48px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 14px rgba(223, 193, 93, 0.6))",
              }}
            />
            <span
              style={{
                fontFamily: "'Phudu', cursive",
                fontWeight: 900,
                fontSize: "1.45rem",
                letterSpacing: "0.08em",
                color: "#ffffff",
              }}
            >
              NOVITY <span style={{ color: "var(--primary)" }}>TECH</span>
            </span>
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--primary)",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "8px 18px",
              borderRadius: "30px",
              background: "rgba(223, 193, 93, 0.1)",
              border: "1px solid rgba(223, 193, 93, 0.25)",
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--primary)",
                display: "inline-block",
                marginRight: "8px",
              }}
            />
            Verified Client Endorsements
          </div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "20px",
              color: "var(--text)",
              maxWidth: "880px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Real software. Real metrics. Endorsements that speak for themselves.
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              maxWidth: "720px",
              margin: "0 auto 40px",
            }}
          >
            Discover how direct collaboration with Novity Tech accelerates delivery, slashes technical debt, and drives measurable enterprise business growth.
          </p>

          {/* Metric Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--sh1)",
              }}
            >
              <div style={{ fontFamily: "Phudu, cursive", fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>
                4.9 / 5.0
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                Client Satisfaction
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Verified client feedback
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--sh1)",
              }}
            >
              <div style={{ fontFamily: "Phudu, cursive", fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>
                25+
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                Verified Reviews
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Zero fake endorsements
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--sh1)",
              }}
            >
              <div style={{ fontFamily: "Phudu, cursive", fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>
                100%
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                On-Time Sprints
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Fixed-scope SLA guarantee
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--sh1)",
              }}
            >
              <div style={{ fontFamily: "Phudu, cursive", fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>
                100%
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                Code Ownership
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Full repository handover
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {[
            { id: "all", label: "All Reviews" },
            { id: "web", label: "Web Platforms" },
            { id: "cloud", label: "Cloud & Architecture" },
            { id: "ai", label: "AI Agents & Automation" },
            { id: "design", label: "Design Systems & UX" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`ftab ${activeCategory === cat.id ? "active" : ""}`}
              style={{ padding: "10px 20px", fontSize: "0.88rem" }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "28px",
            marginBottom: "72px",
          }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "var(--sh2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div>
                {/* Header: Stars & Metric Pill */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ color: "#f59e0b", display: "flex", gap: "4px", fontSize: "0.9rem" }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                  <span
                    style={{
                      background: "rgba(var(--primary-rgb), 0.12)",
                      color: "var(--primary)",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {rev.metric}
                  </span>
                </div>

                {/* Project Tag */}
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text3)", marginBottom: "12px" }}>
                  {rev.project}
                </div>

                {/* Quote */}
                <p style={{ color: "var(--text)", fontSize: "0.96rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid var(--border)", paddingTop: "18px" }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text3)" }}>
                    {rev.role} • <strong style={{ color: "var(--text2)" }}>{rev.company}</strong>
                  </div>
                </div>
                <span title="Verified Client" style={{ color: "#22c55e", fontSize: "1.1rem" }}>
                  <i className="fas fa-check-circle" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Pillars */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "48px 36px",
            marginBottom: "72px",
            boxShadow: "var(--sh2)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="sec-badge" style={{ marginBottom: "12px" }}>
              Our Commitment
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)" }}>
              Why Leading Brands Partner With Novity Tech
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px" }}>
            {COLLABORATION_PILLARS.map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(var(--primary-rgb), 0.12)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  <i className={`fas ${p.icon}`} />
                </div>
                <h4 style={{ fontSize: "1.08rem", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                  {p.title}
                </h4>
                <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bottom Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%)",
            color: "#fff",
            borderRadius: "24px",
            padding: "50px 40px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
            Ready to Build Your Next Digital Product?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 32px" }}>
            Book a discovery call with our engineering leadership to architect your vision with guaranteed sprint delivery.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#contact" className="btn-p" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
              Start a Project <i className="fas fa-arrow-right ms-2" />
            </Link>
            <a
              href="mailto:contact@novitytech.com"
              className="btn-hs"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", padding: "14px 28px" }}
            >
              <i className="fas fa-envelope me-2" /> contact@novitytech.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
