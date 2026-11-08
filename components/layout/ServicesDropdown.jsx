"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICE_COLUMNS } from "@/lib/servicesData";

export function ServiceIcon({ name, style }) {
  const iconStyle = { width: "16px", height: "16px", display: "inline-block", ...style };

  switch (name) {
    case "users":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "rocket":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-4.8a14.94 14.94 0 012.58-5.84M8.41 9.63A14.98 14.98 0 002.25 15.79a14.98 14.98 0 0012.12 6.16v-4.8" />
        </svg>
      );
    case "database":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3m18 7c0 1.66-4 3-9 3s-9-1.34-9-3" />
        </svg>
      );
    case "shield":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "plug":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "check-circle":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "palette":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4 4 4 0 014-4c2 0 2-2 4-2s2 2 4 2a4 4 0 014 4 4 4 0 01-4 4H7z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "cpu":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.8} />
          <rect x="9" y="9" width="6" height="6" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "refresh":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case "cloud":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "zap":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "layers":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "code":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "monitor":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21h8m-4-4v4" />
        </svg>
      );
    case "smartphone":
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth={1.8} />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "globe":
    default:
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
  }
}

export default function ServicesDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="menu"
      aria-label="Services Catalog"
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: "12px",
        width: "min(1080px, calc(100vw - 24px))",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          background: "#121118",
          color: "#ffffff",
          border: "1px solid rgba(223, 193, 93, 0.35)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.92), 0 0 35px rgba(223, 193, 93, 0.16)",
          padding: "24px 28px 0 28px",
          overflow: "hidden",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >

        {/* Top Header */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            marginBottom: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--primary)",
                boxShadow: "0 0 10px var(--primary)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#f8f6f0",
              }}
            >
              Complete Services & Solutions Catalog
            </span>
          </div>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--primary)",
              background: "rgba(223, 193, 93, 0.12)",
              padding: "4px 12px",
              borderRadius: "50px",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              letterSpacing: "0.04em",
            }}
          >
            17 Tailored Capabilities
          </span>
        </div>

        {/* 3 Columns Grid */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            paddingBottom: "24px",
          }}
        >
          {SERVICE_COLUMNS.map((column, colIdx) => (
            <div
              key={column.title}
              style={{
                borderLeft: colIdx > 0 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                paddingLeft: colIdx > 0 ? "20px" : "0",
              }}
            >
              {/* Column Title */}
              <div style={{ marginBottom: "16px" }}>
                <h4
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--primary)",
                    margin: 0,
                  }}
                >
                  {column.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: 500,
                    marginTop: "3px",
                    marginBottom: 0,
                  }}
                >
                  {column.subtitle}
                </p>
              </div>

              {/* Service Items */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {column.services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="svc-dropdown-item"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "8px 10px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className="svc-ico-wrap"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          background: "rgba(223, 193, 93, 0.12)",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ServiceIcon name={service.icon} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span
                            className="svc-item-title"
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              lineHeight: "1.3",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {service.title}
                          </span>
                          {service.tag && (
                            <span
                              style={{
                                padding: "1px 6px",
                                fontSize: "0.62rem",
                                fontWeight: 800,
                                borderRadius: "4px",
                                background: "rgba(223, 193, 93, 0.22)",
                                color: "var(--primary)",
                                border: "1px solid rgba(223, 193, 93, 0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {service.tag}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "rgba(255, 255, 255, 0.55)",
                            margin: "3px 0 0 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            lineHeight: "1.2",
                          }}
                        >
                          {service.shortDesc}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar Call-to-Action */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            background: "rgba(5, 5, 8, 0.75)",
            margin: "0 -28px",
            padding: "14px 28px",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}>
            Need a specialized tech stack or dedicated architects?
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/services"
              onClick={onClose}
              style={{
                fontSize: "0.82rem",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              View all Services
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>|</span>
            <Link
              href="/contact"
              onClick={onClose}
              style={{
                fontSize: "0.82rem",
                color: "var(--primary)",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Start a project &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
