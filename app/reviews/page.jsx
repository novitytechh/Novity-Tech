"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  const [ratingFilter, setRatingFilter] = useState("all");
  const [reviewsData, setReviewsData] = useState({
    loading: true,
    configured: false,
    rating: null,
    totalReviews: 0,
    googleMapsUri: null,
    writeReviewUri: null,
    reviews: [],
  });

  useEffect(() => {
    let active = true;
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setReviewsData({
          loading: false,
          configured: Boolean(data.configured),
          rating: data.rating ?? null,
          totalReviews: data.totalReviews ?? 0,
          googleMapsUri: data.googleMapsUri ?? null,
          writeReviewUri: data.writeReviewUri ?? null,
          reviews: Array.isArray(data.reviews) ? data.reviews : [],
        });
      })
      .catch(() => {
        if (!active) return;
        setReviewsData((prev) => ({ ...prev, loading: false }));
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredReviews = reviewsData.reviews.filter((r) => {
    if (ratingFilter === "5") return r.rating === 5;
    if (ratingFilter === "4") return r.rating >= 4;
    return true;
  });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", padding: "50px 20px 90px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <div className="d-flex align-items-center gap-2" style={{ fontSize: "0.88rem" }}>
            <Link href="/" style={{ color: "var(--text2)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>Client Reviews</span>
          </div>
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
                {reviewsData.rating ? `${reviewsData.rating.toFixed(1)} ★` : "—"}
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                Google Rating
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Verified Google Business rating
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
                {reviewsData.totalReviews}
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginTop: "4px" }}>
                Google Reviews
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "4px" }}>
                Synced from Google Maps
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

        {/* Rating Filters & Google Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Google Reviews" },
              { id: "5", label: "5 Stars" },
              { id: "4", label: "4+ Stars" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setRatingFilter(cat.id)}
                className={`tab-btn ftab ${ratingFilter === cat.id ? "active" : ""}`}
                style={{ padding: "10px 20px", fontSize: "0.88rem" }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {(reviewsData.writeReviewUri || reviewsData.googleMapsUri) && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {reviewsData.writeReviewUri && (
                <a
                  href={reviewsData.writeReviewUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-p"
                  style={{ padding: "10px 20px", fontSize: "0.88rem" }}
                >
                  <i className="fas fa-star me-2" /> Leave a Google Review
                </a>
              )}
              {reviewsData.googleMapsUri && (
                <a
                  href={reviewsData.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-o"
                  style={{ padding: "10px 18px", fontSize: "0.88rem" }}
                >
                  View on Google <i className="fas fa-arrow-up-right-from-square ms-2" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {reviewsData.loading ? (
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "56px 28px",
              textAlign: "center",
              marginBottom: "72px",
              boxShadow: "var(--sh1)",
            }}
          >
            <div style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "12px" }}>
              <i className="fas fa-spinner fa-spin" />
            </div>
            <p style={{ color: "var(--text2)", fontSize: "0.95rem", margin: 0 }}>
              Loading verified Google Reviews...
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "56px 28px",
              textAlign: "center",
              marginBottom: "72px",
              boxShadow: "var(--sh1)",
            }}
          >
            <div style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "12px" }}>
              <i className="fas fa-comments" />
            </div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
              {reviewsData.configured ? "No Google Reviews Found Yet" : "Connect Google Business Profile"}
            </h3>
            <p style={{ color: "var(--text2)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto" }}>
              {reviewsData.configured
                ? "Verified Google Reviews for Novity Tech will appear here automatically."
                : "Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in your environment variables to display live Google Reviews."}
            </p>
          </div>
        ) : (
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
                {/* Header: Stars & Relative Time */}
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
                    {rev.relativeTime}
                  </span>
                </div>

                {/* Source Tag */}
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text3)", marginBottom: "12px" }}>
                  Verified Google Review
                </div>

                {/* Quote */}
                <p style={{ color: "var(--text)", fontSize: "0.96rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "24px" }}>
                  {rev.quote ? <>&ldquo;{rev.quote}&rdquo;</> : "Rated 5 stars on Google."}
                </p>
              </div>

              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid var(--border)", paddingTop: "18px" }}>
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background: "rgba(var(--primary-rgb), 0.18)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {rev.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text3)" }}>
                    Google Maps Reviewer
                  </div>
                </div>
                <span title="Verified Google Review" style={{ color: "#22c55e", fontSize: "1.1rem" }}>
                  <i className="fas fa-check-circle" />
                </span>
              </div>
            </div>
          ))}
        </div>
        )}

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
            background: "var(--card-bg, #121118)",
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
              href="mailto:novitytechh@gmail.com"
              className="btn-hs"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", padding: "14px 28px" }}
            >
              <i className="fas fa-envelope me-2" /> novitytechh@gmail.com
            </a>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
