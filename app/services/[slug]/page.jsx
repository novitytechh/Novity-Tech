"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ALL_SERVICES_DATA, getServiceBySlug } from "@/lib/servicesData";
import { ServiceIcon } from "@/components/layout/ServicesDropdown";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="container text-center py-5 my-5">
          <h2 style={{ color: "var(--text)", marginBottom: "16px" }}>Service Not Found</h2>
          <p style={{ color: "var(--text2)", marginBottom: "24px" }}>The requested capability catalog page could not be located.</p>
          <Link href="/services" className="btn-p">Back to Services Catalog</Link>
        </div>
        <Footer />
      </>
    );
  }

  const related = ALL_SERVICES_DATA.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "50px", paddingBottom: "100px" }}>
        {/* Breadcrumb Navigation */}
        <div className="container" style={{ marginBottom: "32px" }}>
          <div className="d-flex align-items-center gap-2" style={{ fontSize: "0.88rem" }}>
            <Link href="/" style={{ color: "var(--text2)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <Link href="/services" style={{ color: "var(--text2)", textDecoration: "none" }}>Services</Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>{service.title}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="container" style={{ marginBottom: "70px" }}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(223, 193, 93, 0.15)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ServiceIcon name={service.icon} style={{ width: "24px", height: "24px" }} />
                </div>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.category}
                </span>
                {service.tag && (
                  <span
                    style={{
                      padding: "2px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      borderRadius: "20px",
                      background: "rgba(223, 193, 93, 0.2)",
                      color: "var(--primary)",
                      border: "1px solid rgba(223, 193, 93, 0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {service.tag}
                  </span>
                )}
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                  lineHeight: 1.18,
                  marginBottom: "20px",
                }}
              >
                {service.title}
              </h1>

              <p
                style={{
                  color: "var(--text2)",
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  marginBottom: "32px",
                }}
              >
                {service.heroTagline || service.shortDesc}
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link href="/contact" className="btn-p">
                  Book Architecture Discovery <i className="fas fa-arrow-right"></i>
                </Link>
                <Link href="/services" className="btn-hs" style={{ color: "var(--text)" }}>
                  All 17 Services
                </Link>
              </div>
            </div>

            {/* Metrics Snapshot */}
            <div className="col-lg-4">
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginBottom: "20px" }}>
                  Capability Impact
                </h4>
                <div className="d-flex flex-column gap-3">
                  {(service.metrics || [
                    { label: "Deployment Velocity", value: "3x Faster" },
                    { label: "System Reliability", value: "99.99%" },
                    { label: "Code Ownership", value: "100%" },
                  ]).map((m, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "16px",
                        background: "rgba(223, 193, 93, 0.06)",
                        borderRadius: "14px",
                        border: "1px solid rgba(223, 193, 93, 0.2)",
                      }}
                    >
                      <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)" }}>{m.value}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "2px" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview & Deliverables */}
        <div className="container" style={{ marginBottom: "80px" }}>
          <div className="row g-5">
            <div className="col-lg-7">
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
                Architectural Overview
              </h3>
              <p style={{ color: "var(--text2)", fontSize: "1.05rem", lineHeight: "1.85", marginBottom: "36px" }}>
                {service.overview}
              </p>

              {/* Process Steps */}
              {service.process && service.process.length > 0 && (
                <>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
                    Execution Workflow
                  </h3>
                  <div className="d-flex flex-column gap-3 mb-5">
                    {service.process.map((p, i) => (
                      <div
                        key={i}
                        style={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "16px",
                          padding: "20px 24px",
                          display: "flex",
                          gap: "18px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--primary)" }}>
                          {p.step || `0${i+1}`}
                        </span>
                        <div>
                          <h5 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>
                            {p.title}
                          </h5>
                          <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: "1.65", margin: 0 }}>
                            {p.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Deliverables & Tech Stack Sidebar */}
            <div className="col-lg-5">
              {/* Deliverables Checklist */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  padding: "32px",
                  marginBottom: "32px",
                }}
              >
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
                  Key Deliverables
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {(service.deliverables || []).map((d, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <i className="fas fa-check-circle" style={{ color: "var(--primary)", marginTop: "4px", fontSize: "0.95rem" }} />
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>{d.title}</div>
                        <div style={{ color: "var(--text2)", fontSize: "0.85rem", lineHeight: "1.6", marginTop: "2px" }}>{d.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              {service.techStack && service.techStack.length > 0 && (
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                  }}
                >
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "18px" }}>
                    Standard Tech Stack
                  </h4>
                  <div className="d-flex flex-wrap gap-2">
                    {service.techStack.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "10px",
                          background: "var(--pill-bg)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="container" style={{ marginBottom: "80px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div className="text-center mb-4">
                <div className="sec-badge">FAQ</div>
                <h3 className="sec-title">Common Questions</h3>
              </div>
              <div className="d-flex flex-column gap-3">
                {service.faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "24px",
                    }}
                  >
                    <h5 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                      {faq.question}
                    </h5>
                    <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.75", margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Services */}
        {related.length > 0 && (
          <div className="container" style={{ marginBottom: "80px" }}>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", marginBottom: "28px", textAlign: "center" }}>
              Complementary Capabilities
            </h3>
            <div className="row g-4 justify-content-center">
              {related.map((rel) => (
                <div key={rel.id} className="col-lg-4 col-md-6">
                  <Link href={`/services/${rel.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                    <div
                      className="svc-card"
                      style={{
                        padding: "28px 24px",
                        borderRadius: "18px",
                        border: "1px solid var(--border)",
                        background: "var(--card)",
                        height: "100%",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(223, 193, 93, 0.12)",
                            color: "var(--primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ServiceIcon name={rel.icon} />
                        </div>
                        <h5 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                          {rel.title}
                        </h5>
                      </div>
                      <p style={{ color: "var(--text2)", fontSize: "0.85rem", lineHeight: "1.6", margin: 0 }}>
                        {rel.shortDesc}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

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
              Ready to implement {service.title}?
            </h3>
            <p style={{ color: "var(--text2)", maxWidth: "600px", margin: "0 auto 28px", fontSize: "1.05rem" }}>
              Speak directly with an engineering lead to receive an architecture estimate, delivery timeline, and sprint roadmap.
            </p>
            <Link href="/contact" className="btn-p">
              Request Project Proposal <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
