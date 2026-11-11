"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const posts = [];

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "60px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>Technical Insights & Case Notes</div>
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
            Engineering Insights for <span className="hl">Modern Tech Leaders</span>
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
            Practical insights on scalable web architecture, autonomous AI agents, enterprise cloud topologies, and high-converting design systems.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs justify-content-center">
            {["all", "Engineering", "Architecture", "Design", "AI & Cloud"].map((cat) => (
              <button
                key={cat}
                type="button" className={`tab-btn ftab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "All Articles" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
                padding: "56px 28px",
                textAlign: "center",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "12px" }}>
                <i className="fas fa-pen-nib" />
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                No Blog Articles Yet
              </h3>
              <p style={{ color: "var(--text2)", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto" }}>
                New engineering articles and case notes will be published here soon.
              </p>
            </div>
          ) : (
          <div className="row g-4">
            {filtered.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <article
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
                  <div style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background: "rgba(11, 10, 14, 0.85)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(223, 193, 93, 0.35)",
                        color: "var(--primary)",
                        padding: "3px 10px",
                        borderRadius: "14px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div style={{ padding: "28px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "var(--text3)", fontSize: "0.78rem" }}>
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", lineHeight: "1.4", marginBottom: "12px" }}>
                        {post.title}
                      </h3>
                      <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "18px" }}>
                        {post.excerpt}
                      </p>
                    </div>

                    <div>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "0.72rem",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              background: "rgba(255,255,255,0.06)",
                              color: "var(--text2)",
                            }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-top" style={{ borderColor: "var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.82rem", color: "var(--text3)" }}>By {post.author}</span>
                        <Link href="/contact" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
                          Read More &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* CTA */}
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
              Looking for tailored technical consultation?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Schedule a dedicated session with our systems architect to discuss your technology stack and product goals.
            </p>
            <Link href="/contact" className="btn-p">
              Get in Touch <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

