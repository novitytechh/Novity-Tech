import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Novity Tech | Data Governance & Protection",
  description: "Enterprise privacy policy, GDPR compliance, and data governance standards of Novity Tech.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--primary)",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Novity Tech Home
          </Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="sec-badge" style={{ marginBottom: "14px" }}>
            Data Governance
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", color: "var(--text)" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto" }}>
            Novity Tech is dedicated to protecting client confidentiality and personal data with stringent enterprise-grade governance.
          </p>
          <div style={{ marginTop: "16px", fontSize: "0.82rem", color: "var(--text3)", fontFamily: "monospace" }}>
            Last Updated: October 2026 • GDPR, ePrivacy &amp; CCPA Compliant
          </div>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "var(--sh2)",
            color: "var(--text2)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            1. Information We Collect
          </h3>
          <p style={{ marginBottom: "16px" }}>
            We collect information strictly necessary to provide engineering services, respond to enterprise inquiries, and ensure platform performance:
          </p>
          <ul style={{ paddingLeft: "24px", marginBottom: "28px" }}>
            <li><strong>Inquiry Data:</strong> Name, work email address, company name, project brief, budget requirements, and timeline.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized IP addresses, browser user agent, device screen dimensions, and latency diagnostics.</li>
            <li><strong>Client Portal Credentials:</strong> Encrypted access credentials, authenticated project access tokens, and NDA verification states.</li>
          </ul>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            2. How We Use Data
          </h3>
          <p style={{ marginBottom: "16px" }}>
            Novity Tech processes collected data exclusively for lawful purposes:
          </p>
          <ul style={{ paddingLeft: "24px", marginBottom: "28px" }}>
            <li>Delivering custom software engineering and digital marketing services.</li>
            <li>Responding to customer support tickets and proposal requests within 24 hours.</li>
            <li>Maintaining zero-trust application security and preventing unauthorized access.</li>
          </ul>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            3. Data Retention &amp; Security
          </h3>
          <p style={{ marginBottom: "28px" }}>
            All confidential customer codebases, API credentials, and correspondence are guarded under strict non-disclosure agreements (NDAs) with AES-256 encryption at rest and TLS 1.3 in transit.
          </p>

          <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
            4. Your Rights
          </h3>
          <p style={{ margin: 0 }}>
            Under GDPR and CCPA, you have the right to access, rectify, or erase your personal data. To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@novitytech.com" style={{ color: "var(--primary)", fontWeight: 600 }}>
              privacy@novitytech.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
