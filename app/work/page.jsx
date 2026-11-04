"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECTS_DATA } from "@/lib/projectsData";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = PROJECTS_DATA || [];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "60px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>Featured Case Studies</div>
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
            Digital Systems Engineered for <span className="hl">Measurable Growth</span>
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
            Discover how Novity Tech partners with ambitious companies to build scalable web applications, e-commerce engines, and resilient digital architectures.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs justify-content-center">
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Projects {projects.length > 0 ? `(${projects.length})` : ""}
            </button>
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "ecommerce" ? "active" : ""}`}
              onClick={() => setActiveFilter("ecommerce")}
            >
              E-Commerce
            </button>
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "web" ? "active" : ""}`}
              onClick={() => setActiveFilter("web")}
            >
              Web Platforms
            </button>
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "cloud" ? "active" : ""}`}
              onClick={() => setActiveFilter("cloud")}
            >
              Cloud & FinTech
            </button>
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "design" ? "active" : ""}`}
              onClick={() => setActiveFilter("design")}
            >
              Design Systems
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="row g-4">
            {filtered.length > 0 ? (
              filtered.map((proj) => (
                <div key={proj.id} className="col-lg-6">
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                      <img
                        src={proj.image || proj.img}
                        alt={proj.title || proj.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      {proj.metric && (
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: "rgba(11, 10, 14, 0.85)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(223, 193, 93, 0.35)",
                            color: "var(--primary)",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: 800,
                          }}
                        >
                          {proj.metric}
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "28px 26px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                          {proj.categoryLabel || proj.catLabel || proj.category} {proj.client ? `• ${proj.client}` : ""}
                        </div>
                        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", marginBottom: "12px" }}>
                          {proj.title || proj.name}
                        </h3>
                        <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.7", marginBottom: "18px" }}>
                          {proj.desc || proj.overview}
                        </p>
                      </div>

                      <div>
                        {proj.tech && proj.tech.length > 0 && (
                          <div className="d-flex flex-wrap gap-2 mb-4">
                            {proj.tech.map((t, idx) => (
                              <span
                                key={idx}
                                style={{
                                  padding: "4px 10px",
                                  borderRadius: "8px",
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid var(--border)",
                                  color: "var(--text3)",
                                  fontSize: "0.76rem",
                                  fontWeight: 600,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link href="/contact" className="btn-p" style={{ width: "100%", textAlign: "center", display: "block", textDecoration: "none" }}>
                          Inquire About Similar Project <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center" style={{ padding: "60px 20px" }}>
                <div
                  style={{
                    maxWidth: "560px",
                    margin: "0 auto",
                    padding: "48px 32px",
                    borderRadius: "24px",
                    background: "var(--card)",
                    border: "1px dashed rgba(223, 193, 93, 0.35)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(223, 193, 93, 0.12)",
                      color: "var(--primary)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.8rem",
                      marginBottom: "20px",
                    }}
                  >
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text)", marginBottom: "12px" }}>
                    No Projects Added Yet
                  </h3>
                  <p style={{ color: "var(--text2)", fontSize: "0.98rem", lineHeight: "1.7", marginBottom: "28px" }}>
                    All demo projects have been cleared. You can now add your own projects by adding entries to <code>lib/projectsData.js</code>.
                  </p>
                  <Link href="/contact" className="btn-p" style={{ textDecoration: "none", display: "inline-block" }}>
                    Start a Project With Us <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="container">
          <div
            className="shaded-banner-block"
            style={{
              background: "linear-gradient(135deg, rgba(223, 193, 93, 0.15) 0%, rgba(11, 10, 14, 0.95) 100%)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              borderRadius: "28px",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "16px" }}>
              Have an ambitious vision for your next product?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Let&apos;s build an exceptional web application or custom software system tailored specifically to your business goals.
            </p>
            <Link href="/contact" className="btn-p">
              Schedule Project Discussion <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
