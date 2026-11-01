"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const values = [
    {
      icon: "fa-bullseye",
      title: "Strategy-First Thinking",
      desc: "Every project begins with rigorous architectural discovery, domain analysis, and measurable KPIs tailored to your business objectives.",
    },
    {
      icon: "fa-code",
      title: "Clean Modern Architecture",
      desc: "We build on battle-tested frameworks (Next.js, TypeScript, Tailwind, Docker, Kubernetes) ensuring longevity, security, and sub-second performance.",
    },
    {
      icon: "fa-shield-halved",
      title: "100% Code & Asset Ownership",
      desc: "Zero vendor lock-in. You own every line of code, design file, repository, and deployment configuration from day one.",
    },
    {
      icon: "fa-bolt",
      title: "High Sprint Velocity",
      desc: "Rapid agile iterations with weekly demos, clear milestones, and transparent Slack/Jira communication for maximum momentum.",
    },
  ];

  const milestones = [
    { year: "2023", title: "Novity Tech Founded", desc: "Formed by senior software architects with a mission to bridge the gap between high design and enterprise engineering." },
    { year: "2024", title: "Global Expansion", desc: "Scaled delivery to clients across North America, Europe, and Asia, completing 10+ major platform launches." },
    { year: "2025", title: "AI & Cloud Practice", desc: "Launched dedicated practice groups for Autonomous AI Agents, LLM pipelines, and Kubernetes infrastructure." },
    { year: "2026", title: "Enterprise Excellence", desc: "Delivered 20+ bespoke digital ecosystems with a 98% client satisfaction rate and 99.99% uptime." },
  ];

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="sec-badge" style={{ marginBottom: "16px" }}>About Our Agency</div>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                }}
              >
                We&apos;re a Digital-First <span className="hl">Engineering & Design Agency</span>
              </h1>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: "1.15rem",
                  lineHeight: "1.85",
                  marginBottom: "28px",
                }}
              >
                Founded in 2023, Novity Tech blends bold creative thinking with precision software engineering. We believe great work happens at the intersection of aesthetic distinction and technical resilience — where innovative ideas translate into measurable enterprise growth.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/contact" className="btn-p">
                  Work With Us <i className="fas fa-arrow-right"></i>
                </Link>
                <Link href="/services" className="btn-hs" style={{ color: "var(--text)" }}>
                  Explore Capabilities
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-img-wrap" style={{ position: "relative" }}>
                <img
                  className="about-img"
                  src="/img/about-img.jpg"
                  alt="Novity Tech Team"
                  style={{ width: "100%", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
                />
                <div className="about-exp" style={{ position: "absolute", bottom: "-20px", left: "20px" }}>
                  <div className="about-exp-n">3+</div>
                  <div className="about-exp-l">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "50px 0", marginBottom: "80px" }}>
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-6 col-md-3">
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--primary)" }}>20+</div>
                <div style={{ color: "var(--text2)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Projects Delivered</div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--primary)" }}>98%</div>
                <div style={{ color: "var(--text2)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Client Satisfaction</div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--primary)" }}>3+</div>
                <div style={{ color: "var(--text2)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Years Experience</div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--primary)" }}>100%</div>
                <div style={{ color: "var(--text2)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Code Ownership</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 50px" }}>
            <div className="sec-badge">Our Foundation</div>
            <h2 className="sec-title">What Sets <span className="hl">Novity Tech</span> Apart</h2>
            <p className="sec-desc">We reject cookie-cutter templates. Every architecture is hand-crafted to provide lasting competitive advantage.</p>
          </div>

          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="feat-card" style={{ height: "100%", padding: "32px 24px" }}>
                  <div className="feat-ico" style={{ marginBottom: "20px" }}>
                    <i className={`fas ${v.icon}`}></i>
                  </div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px", color: "var(--text)" }}>{v.title}</h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 50px" }}>
            <div className="sec-badge">Our Journey</div>
            <h2 className="sec-title">The Evolution of <span className="hl">Excellence</span></h2>
          </div>

          <div className="row g-4 justify-content-center">
            {milestones.map((m, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r)",
                    padding: "28px 24px",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div style={{ color: "var(--primary)", fontWeight: 900, fontSize: "1.5rem", marginBottom: "8px" }}>
                    {m.year}
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
                    {m.title}
                  </h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: "1.7", margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
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
              Ready to elevate your digital presence?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Partner with Novity Tech to build high-performance web systems and AI applications engineered for measurable growth.
            </p>
            <Link href="/contact" className="btn-p">
              Schedule Free Consultation <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
