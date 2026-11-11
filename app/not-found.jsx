"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname || "/unknown-route");
    }
  }, []);

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <Navbar />
      <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "60px 20px",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: "700px", width: "100%", textAlign: "center", position: "relative", zIndex: 10 }}>
        {/* Status Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "50px",
            border: "1px solid rgba(var(--primary-rgb), 0.35)",
            background: "rgba(var(--primary-rgb), 0.1)",
            color: "var(--primary)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--primary)",
              boxShadow: "0 0 10px var(--primary)",
            }}
          />
          COORDINATES_UNRESOLVED • SYSTEM 404
        </div>

        {/* 404 Big Heading */}
        <div
          style={{
            fontFamily: "Phudu, cursive",
            fontSize: "clamp(6rem, 16vw, 11rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "var(--primary)",
            textShadow: "0 10px 40px rgba(var(--primary-rgb), 0.3)",
            marginBottom: "16px",
          }}
        >
          404
        </div>

        {/* Title & Desc */}
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "14px", color: "var(--text)" }}>
          Lost in Digital Space?
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto 32px" }}>
          The requested coordinate <code style={{ color: "var(--primary)", background: "var(--bg2)", padding: "2px 8px", borderRadius: "6px" }}>{currentPath || "/page"}</code> does not exist or has been relocated to another sector.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} style={{ maxWidth: "480px", margin: "0 auto 36px", position: "relative" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Novity Tech services, work, or team..."
            style={{
              width: "100%",
              padding: "14px 20px 14px 46px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "0.92rem",
              boxShadow: "var(--sh1)",
              outline: "none",
            }}
          />
          <i
            className="fas fa-search"
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text3)",
            }}
          />
        </form>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          <Link href="/" className="btn-p" style={{ padding: "12px 28px" }}>
            <i className="fas fa-home me-2"></i> Return to Homepage
          </Link>
          <button
            type="button"
            onClick={handleGoBack}
            className="btn-hs"
            style={{ padding: "12px 24px", cursor: "pointer", background: "transparent" }}
          >
            <i className="fas fa-arrow-left me-2"></i> Go Back
          </button>
        </div>

        {/* Quick Navigation Links */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text3)", display: "block", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Popular Destinations
          </span>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", fontSize: "0.88rem" }}>
            <Link href="/#services" style={{ color: "var(--text)", fontWeight: 600 }}>
              <i className="fas fa-cubes" style={{ color: "var(--primary)", marginRight: "6px" }}></i> Our Services
            </Link>
            <Link href="/#portfolio" style={{ color: "var(--text)", fontWeight: 600 }}>
              <i className="fas fa-briefcase" style={{ color: "var(--primary)", marginRight: "6px" }}></i> Recent Work
            </Link>
            <Link href="/#contact" style={{ color: "var(--text)", fontWeight: 600 }}>
              <i className="fas fa-envelope" style={{ color: "var(--primary)", marginRight: "6px" }}></i> Contact Us
            </Link>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
