"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ALL_SERVICES_DATA, SERVICE_COLUMNS } from "@/lib/servicesData";
import { ServiceIcon } from "@/components/layout/ServicesDropdown";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices =
    activeTab === "all"
      ? ALL_SERVICES_DATA
      : ALL_SERVICES_DATA.filter((s) => s.category === activeTab);

  const pillars = [
    {
      title: "Talent & Core Engineering",
      subtitle: "Scale engineering & core foundation",
      desc: "Elite full-stack talent, MVP fast-tracking, high-throughput database engineering, and comprehensive security audits.",
      count: "6 Services",
    },
    {
      title: "Cloud, DevOps & AI",
      subtitle: "Intelligent systems & cloud resilience",
      desc: "High-converting UI/UX design, automated CI/CD pipelines, monolith modernization, cloud uptime, and autonomous AI agents.",
      count: "6 Services",
    },
    {
      title: "Custom Apps & Software",
      subtitle: "Tailored multi-platform products",
      desc: "Bespoke ERP software, reactive Next.js web applications, native desktop applications, and cross-platform mobile apps.",
      count: "5 Services",
    },
  ];

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "70px" }}>
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
            17 Tailored Capabilities
          </div>
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
            Engineering Digital Mastery Across <span className="hl">Every Modern Stack</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              maxWidth: "720px",
              margin: "0 auto 36px",
            }}
          >
            From custom AI copilots and high-throughput cloud infrastructure to bespoke enterprise platforms — explore our comprehensive suite of engineering disciplines.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-p">
              Request Project Consultation <i className="fas fa-arrow-right"></i>
            </Link>
            <a href="#catalog" className="btn-hs" style={{ color: "var(--text)" }}>
              Browse Catalog
            </a>
          </div>
        </div>

        {/* 3 Core Pillars Highlights */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="row g-4">
            {pillars.map((p, idx) => (
              <div key={idx} className="col-lg-4">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r)",
                    padding: "36px 30px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "var(--primary)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Pillar 0{idx + 1} &bull; {p.count}
                    </span>
                    <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text)", marginTop: "10px", marginBottom: "8px" }}>
                      {p.title}
                    </h3>
                    <div style={{ color: "var(--primary-champagne, #fdf6d8)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "14px" }}>
                      {p.subtitle}
                    </div>
                    <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.7", margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab(p.title);
                      const el = document.getElementById("catalog");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      marginTop: "24px",
                      color: "var(--primary)",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    View Pillar Capabilities <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filterable Services Catalog */}
        <div id="catalog" className="container" style={{ marginBottom: "90px" }}>
          <div className="text-center" style={{ marginBottom: "36px" }}>
            <h2 className="sec-title">Full Services <span>Catalog</span></h2>
            <div className="filter-tabs justify-content-center mt-3">
              <button
                type="button" className={`tab-btn ftab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All 17 Capabilities
              </button>
              <button
                type="button" className={`tab-btn ftab ${activeTab === "Talent & Core Engineering" ? "active" : ""}`}
                onClick={() => setActiveTab("Talent & Core Engineering")}
              >
                Talent & Core
              </button>
              <button
                type="button" className={`tab-btn ftab ${activeTab === "Cloud, DevOps & AI" ? "active" : ""}`}
                onClick={() => setActiveTab("Cloud, DevOps & AI")}
              >
                Cloud, DevOps & AI
              </button>
              <button
                type="button" className={`tab-btn ftab ${activeTab === "Custom Apps & Software" ? "active" : ""}`}
                onClick={() => setActiveTab("Custom Apps & Software")}
              >
                Custom Apps & Software
              </button>
            </div>
          </div>

          <div className="row g-4">
            {filteredServices.map((svc) => (
              <div key={svc.id} className="col-lg-4 col-md-6">
                <Link
                  href={`/services/${svc.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  <div
                    className="svc-card"
                    style={{
                      padding: "32px 28px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "var(--r)",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      position: "relative",
                    }}
                  >
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            background: "rgba(223, 193, 93, 0.12)",
                            color: "var(--primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ServiceIcon name={svc.icon} style={{ width: "22px", height: "22px" }} />
                        </div>
                        {svc.tag && (
                          <span
                            style={{
                              padding: "3px 10px",
                              fontSize: "0.7rem",
                              fontWeight: 800,
                              borderRadius: "20px",
                              background: "rgba(223, 193, 93, 0.2)",
                              color: "var(--primary)",
                              border: "1px solid rgba(223, 193, 93, 0.4)",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {svc.tag}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                        {svc.category}
                      </div>

                      <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", marginBottom: "12px", lineHeight: "1.35" }}>
                        {svc.title}
                      </h4>

                      <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.7", marginBottom: "20px" }}>
                        {svc.shortDesc}
                      </p>
                    </div>

                    <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>
                        Explore Deliverables &rarr;
                      </span>
                      <i className="fas fa-arrow-right" style={{ color: "var(--primary)", fontSize: "0.85rem" }}></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 50px" }}>
            <div className="sec-badge">Execution Protocol</div>
            <h2 className="sec-title">How We <span>Deliver Results</span></h2>
            <p className="sec-desc">A structured engineering methodology guaranteeing predictable sprint delivery and zero technical debt.</p>
          </div>

          <div className="row g-4">
            {[
              { step: "01", title: "Discovery & Blueprint", desc: "Domain research, user journeys, technical scope, and architectural milestones." },
              { step: "02", title: "System Architecture", desc: "Database schemas, API microservices, cloud topologies, and UX design systems." },
              { step: "03", title: "Agile Sprint Cycles", desc: "Rapid 2-week sprints with continuous deployment and direct developer access." },
              { step: "04", title: "Automated QA & Security", desc: "End-to-end regression testing, vulnerability scanning, and load stress benchmarks." },
            ].map((st, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r)",
                    padding: "32px 24px",
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)", marginBottom: "12px" }}>{st.step}</div>
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text)", marginBottom: "10px" }}>{st.title}</h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: "1.7", margin: 0 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="container">
          <div
            className="brand-banner-block"
            style={{
              borderRadius: "28px",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "16px" }}>
              Need a bespoke architecture or dedicated team?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Our engineering architects are ready to review your requirements and provide a detailed blueprint and timeline.
            </p>
            <Link href="/contact" className="btn-p">
              Schedule Architecture Review <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
