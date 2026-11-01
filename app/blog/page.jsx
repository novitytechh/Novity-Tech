"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const posts = [
    {
      id: "post-1",
      title: "Building Sub-Second Next.js 14 Enterprise Applications",
      excerpt: "How server components, streaming SSR, and edge route handlers transform user retention and search rankings for high-growth tech platforms.",
      category: "Engineering",
      date: "October 24, 2026",
      readTime: "6 min read",
      author: "Novity Tech Team",
      image: "/img/blog/1.jpg",
      tags: ["Next.js", "Performance", "Web Architecture"],
    },
    {
      id: "post-2",
      title: "Why Most Brand Redesigns Fail (And How to Fix Them)",
      excerpt: "Strategic brand positioning must always precede visual identity. Discover our 4-step framework for engineering enduring digital brand authority.",
      category: "Design",
      date: "October 16, 2026",
      readTime: "8 min read",
      author: "Novity Tech Team",
      image: "/img/blog/2.jpg",
      tags: ["Design Systems", "Brand Strategy", "UX"],
    },
    {
      id: "post-3",
      title: "Deploying Autonomous AI Agents in Production Environments",
      excerpt: "From latency optimization and guardrails to vector database pipelines: a practical guide to shipping real-world LLM copilots that scale.",
      category: "AI & Cloud",
      date: "September 29, 2026",
      readTime: "7 min read",
      author: "Novity Tech Team",
      image: "/img/blog/3.jpg",
      tags: ["AI Copilots", "DevOps", "Python"],
    },
    {
      id: "post-4",
      title: "Microservices vs. Modular Monoliths: A 2026 Architectural Guide",
      excerpt: "When should ambitious startups transition from single repositories to distributed microservices? Key latency, cost, and organizational benchmarks.",
      category: "Architecture",
      date: "September 12, 2026",
      readTime: "9 min read",
      author: "Novity Tech Team",
      image: "/img/blog/1.jpg",
      tags: ["Cloud Infrastructure", "Kubernetes", "Microservices"],
    },
    {
      id: "post-5",
      title: "The Return on Investment of Headless E-Commerce Architecture",
      excerpt: "Case study analysis showing how decoupled frontends increased conversion rates by 2.4x and slashed page load times by 70%.",
      category: "Engineering",
      date: "August 28, 2026",
      readTime: "5 min read",
      author: "Novity Tech Team",
      image: "/img/blog/2.jpg",
      tags: ["E-Commerce", "Next.js", "Revenue Growth"],
    },
    {
      id: "post-6",
      title: "Creating Accessible High-End Luxury Design Systems",
      excerpt: "How to balance opulent gold typography, dark mode aesthetics, and WCAG AA accessibility compliance without sacrificing creative excellence.",
      category: "Design",
      date: "August 15, 2026",
      readTime: "6 min read",
      author: "Novity Tech Team",
      image: "/img/blog/3.jpg",
      tags: ["Accessibility", "Luxury UI", "CSS Architecture"],
    },
  ];

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
                className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "All Articles" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
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
