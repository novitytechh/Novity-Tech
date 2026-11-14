"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECTS_DATA } from "@/lib/projectsData";
import ProjectImageSlideshow from "@/components/ui/ProjectImageSlideshow";

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
              className={`tab-btn ftab ${activeFilter === "app" ? "active" : ""}`}
              onClick={() => setActiveFilter("app")}
            >
              Mobile &amp; AI Apps
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
              Cloud &amp; FinTech
            </button>
            <button
              type="button"
              className={`tab-btn ftab ${activeFilter === "ecommerce" ? "active" : ""}`}
              onClick={() => setActiveFilter("ecommerce")}
            >
              E-Commerce
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="row g-4">
            {filtered.length > 0 ? (
              filtered.map((proj) => (
                <div key={proj.id} className="col-12">
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "28px",
                      overflow: "hidden",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                      transition: "transform 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <div className="row g-0 align-items-stretch">
                      {/* LEFT SIDE: ONLY THE PICS (PORTRAIT SMARTPHONE SLIDESHOW) */}
                      <div
                        className="col-lg-5 col-md-5 col-12"
                        style={{
                          background: "radial-gradient(circle at center, #15141d 0%, #0a090e 100%)",
                          borderRight: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "40px 24px",
                          position: "relative",
                        }}
                      >
                        {/* Smartphone Device Frame */}
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "290px",
                            height: "590px",
                            borderRadius: "36px",
                            overflow: "hidden",
                            border: "2px solid rgba(223, 193, 93, 0.45)",
                            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(223, 193, 93, 0.15)",
                            position: "relative",
                            background: "#050508",
                          }}
                        >
                          {proj.screens && proj.screens.length > 0 ? (
                            <ProjectImageSlideshow
                              images={proj.screens}
                              interval={2500}
                              transitionDuration={1800}
                              height="100%"
                              showControls={true}
                              showIndicators={true}
                              showBadge={true}
                              badgePosition="top-left"
                              pauseOnHover={true}
                              objectFit="cover"
                              objectPosition="top center"
                            />
                          ) : (
                            <img
                              src={proj.image || proj.img}
                              alt={proj.title || proj.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "top center",
                                transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s ease",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* RIGHT SIDE: THE DESCRIPTION & DETAILS */}
                      <div
                        className="col-lg-7 col-md-7 col-12"
                        style={{
                          padding: "44px 38px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background: "var(--card)",
                        }}
                      >
                        <div>
                          {/* Top Badges */}
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                            <div
                              style={{
                                color: "var(--primary)",
                                fontSize: "0.82rem",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {proj.categoryLabel || proj.catLabel || proj.category} {proj.client ? `• ${proj.client}` : ""}
                            </div>
                            {proj.metric && (
                              <div
                                style={{
                                  background: "rgba(223, 193, 93, 0.12)",
                                  border: "1px solid rgba(223, 193, 93, 0.4)",
                                  color: "var(--primary)",
                                  padding: "4px 14px",
                                  borderRadius: "20px",
                                  fontSize: "0.78rem",
                                  fontWeight: 800,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                <i className="fas fa-sparkles me-1"></i> {proj.metric}
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h2
                            style={{
                              fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                              fontWeight: 900,
                              color: "var(--text)",
                              lineHeight: 1.25,
                              marginBottom: "16px",
                            }}
                          >
                            {proj.title || proj.name}
                          </h2>

                          {/* Description */}
                          <p style={{ color: "var(--text2)", fontSize: "0.96rem", lineHeight: "1.75", marginBottom: "22px" }}>
                            {proj.desc || proj.overview}
                          </p>

                          {/* Core Highlights */}
                          {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                            <div style={{ marginBottom: "22px" }}>
                              <div
                                style={{
                                  fontSize: "0.78rem",
                                  fontWeight: 800,
                                  color: "var(--text)",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  marginBottom: "10px",
                                }}
                              >
                                Core Highlights &amp; Capabilities:
                              </div>
                              <ul style={{ paddingLeft: "0", listStyle: "none", margin: 0 }}>
                                {proj.keyFeatures.slice(0, 4).map((feat, fIdx) => (
                                  <li
                                    key={fIdx}
                                    style={{
                                      marginBottom: "6px",
                                      color: "var(--text2)",
                                      fontSize: "0.88rem",
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                    }}
                                  >
                                    <i className="fas fa-check-circle" style={{ color: "var(--primary)", marginTop: "4px", fontSize: "0.82rem" }}></i>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Serial Workflow Highlights */}
                          {proj.screens && proj.screens.length > 0 && (
                            <div style={{ marginBottom: "24px" }}>
                              <div
                                style={{
                                  fontSize: "0.78rem",
                                  fontWeight: 800,
                                  color: "var(--text)",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                  marginBottom: "10px",
                                }}
                              >
                                Application Workflow (Serial Screen Order):
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                                {proj.screens.map((scr, sIdx) => (
                                  <div
                                    key={sIdx}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      padding: "8px 12px",
                                      background: "rgba(255, 255, 255, 0.03)",
                                      border: "1px solid rgba(223, 193, 93, 0.22)",
                                      borderRadius: "12px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "rgba(223, 193, 93, 0.15)",
                                        color: "var(--primary)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.76rem",
                                        fontWeight: 800,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {scr.step}
                                    </span>
                                    <div style={{ overflow: "hidden" }}>
                                      <div style={{ color: "var(--text)", fontSize: "0.82rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {scr.title}
                                      </div>
                                      <div style={{ color: "var(--text3)", fontSize: "0.72rem" }}>
                                        {scr.tag || "Serial Flow"}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Tech & CTA */}
                        <div>
                          {proj.tech && proj.tech.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mb-4">
                              {proj.tech.map((t, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    padding: "5px 12px",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text3)",
                                    fontSize: "0.78rem",
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
              background: "var(--card-bg, #121118)",
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
