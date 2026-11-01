"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ALL_SERVICES_DATA } from "@/lib/servicesData";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "web-application-development",
    budget: "$25K - $50K",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "100px" }}>
        {/* Hero Section */}
        <div className="container text-center" style={{ marginBottom: "60px" }}>
          <div className="sec-badge" style={{ marginBottom: "16px" }}>Direct Engineering Access</div>
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
            Let&apos;s Build Something <span className="hl">Extraordinary Together</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Have a project in mind, need dedicated engineers, or seeking cloud modernization? Connect directly with our solutions architects.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="container" style={{ marginBottom: "90px" }}>
          <div className="row g-5">
            {/* Form Column */}
            <div className="col-lg-7">
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "28px",
                  padding: "40px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
              >
                <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", marginBottom: "8px" }}>
                  Request Technical Consultation
                </h3>
                <p style={{ color: "var(--text2)", fontSize: "0.92rem", marginBottom: "32px" }}>
                  Fill out the details below. We review all submissions and respond within 24 business hours.
                </p>

                {submitted ? (
                  <div
                    style={{
                      padding: "40px 20px",
                      textAlign: "center",
                      borderRadius: "16px",
                      background: "rgba(223, 193, 93, 0.12)",
                      border: "1px solid rgba(223, 193, 93, 0.35)",
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ fontSize: "3rem", color: "var(--primary)", marginBottom: "16px" }} />
                    <h4 style={{ color: "var(--text)", fontWeight: 800, fontSize: "1.4rem", marginBottom: "8px" }}>
                      Inquiry Received Successfully!
                    </h4>
                    <p style={{ color: "var(--text2)", maxWidth: "480px", margin: "0 auto 20px" }}>
                      Thank you for reaching out to Novity Tech. One of our lead architects will review your scope and follow up promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-p"
                      style={{ padding: "8px 20px", fontSize: "0.85rem" }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Alexander Wright"
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1px solid var(--border)",
                            background: "var(--bg)",
                            color: "var(--text)",
                            fontSize: "0.92rem",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="alexander@company.com"
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1px solid var(--border)",
                            background: "var(--bg)",
                            color: "var(--text)",
                            fontSize: "0.92rem",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          placeholder="Company Inc."
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1px solid var(--border)",
                            background: "var(--bg)",
                            color: "var(--text)",
                            fontSize: "0.92rem",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                          Primary Capability Needed
                        </label>
                        <select
                          value={formState.service}
                          onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1px solid var(--border)",
                            background: "var(--bg)",
                            color: "var(--text)",
                            fontSize: "0.92rem",
                            outline: "none",
                          }}
                        >
                          {ALL_SERVICES_DATA.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                        Estimated Budget
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {["< $15K", "$15K - $30K", "$30K - $60K", "$60K - $120K", "$120K+"].map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormState({ ...formState, budget: b })}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "10px",
                              border: formState.budget === b ? "1px solid var(--primary)" : "1px solid var(--border)",
                              background: formState.budget === b ? "rgba(223, 193, 93, 0.15)" : "var(--bg)",
                              color: formState.budget === b ? "var(--primary)" : "var(--text2)",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", display: "block" }}>
                        Project Details & Objectives *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about your project, timeline, tech stack preferences, and goals..."
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: "12px",
                          border: "1px solid var(--border)",
                          background: "var(--bg)",
                          color: "var(--text)",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-p" style={{ width: "100%", padding: "14px", fontSize: "1rem" }}>
                      Submit Inquiry & Request NDA <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Info Column */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                  }}
                >
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
                    Direct Contact Channels
                  </h4>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="fas fa-envelope" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase" }}>General Inquiries</div>
                        <a href="mailto:novitytechh@gmail.com" style={{ color: "var(--text)", fontWeight: 700, textDecoration: "none" }}>
                          novitytechh@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="fas fa-phone" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase" }}>Phone Direct</div>
                        <a href="tel:+923291013649" style={{ color: "var(--text)", fontWeight: 700, textDecoration: "none" }}>
                          +92 329 1013649
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="fas fa-clock" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase" }}>Response Time</div>
                        <div style={{ color: "var(--primary)", fontWeight: 700 }}>
                          Under 24 Hours Guaranteed
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase" }}>Location</div>
                        <div style={{ color: "var(--text)", fontWeight: 700 }}>
                          Gujranwala, Pakistan
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="fas fa-business-time" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase" }}>Business Hours</div>
                        <div style={{ color: "var(--text)", fontWeight: 700, fontSize: "0.88rem", lineHeight: "1.5" }}>
                          Mon-Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 2:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                  }}
                >
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "12px" }}>
                    Client Assurance & Confidentiality
                  </h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "16px" }}>
                    We treat all technical specifications and product ideas with complete discretion. Mutual non-disclosure agreements (NDAs) are provided and executed prior to in-depth technical architectural sharing.
                  </p>
                  <div className="d-flex align-items-center gap-2" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                    <i className="fas fa-shield-alt" /> Enterprise Security Standards Compliant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
