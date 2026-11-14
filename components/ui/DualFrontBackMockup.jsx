"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * DualFrontBackMockup
 *
 * Displays two desktop browser windows in a layered 3D arrangement:
 * One on the FRONT (in focus) and the other on the BACK (offset behind).
 * Features automatic smooth 1.8s transition swapping on a 2.5s timelapse,
 * plus interactive click-to-swap and hover depth elevation.
 */
export default function DualFrontBackMockup({
  frontSrc,
  backSrc,
  frontTitle = "Storefront (Front)",
  backTitle = "Product Detail (Back)",
  interval = 2500, // 2.5s timelapse (>= 2s)
  transitionDuration = 1800, // 1.8s smooth transition
  className = "",
  style = {},
}) {
  // 'front' means frontSrc is in foreground; 'back' means backSrc is in foreground
  const [activeSide, setActiveSide] = useState("front");
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveSide((prev) => (prev === "front" ? "back" : "front"));
    }, Math.max(interval, 2000));

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interval, isPaused]);

  const isFrontForeground = activeSide === "front";

  return (
    <div
      className={`dual-front-back-mockup ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "320px",
        height: "440px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        userSelect: "none",
        ...style,
      }}
    >
      {/* ================= CARD 1: STOREFRONT HERO ================= */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveSide("front");
        }}
        style={{
          position: "absolute",
          width: "270px",
          height: "360px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#0d0c12",
          border: isFrontForeground
            ? "2px solid rgba(223, 193, 93, 0.55)"
            : "1px solid rgba(223, 193, 93, 0.25)",
          boxShadow: isFrontForeground
            ? "0 22px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(223, 193, 93, 0.2)"
            : "0 12px 30px rgba(0, 0, 0, 0.65)",
          transform: isFrontForeground
            ? "translate(-12px, 12px) scale(1) rotate(0deg)"
            : "translate(16px, -16px) scale(0.92) rotate(1deg)",
          zIndex: isFrontForeground ? 3 : 1,
          opacity: isFrontForeground ? 1 : 0.82,
          transition: `all ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser Top Window Bar */}
        <div
          style={{
            height: "26px",
            background: "rgba(18, 17, 24, 0.95)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff5f56" }}></span>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ffbd2e" }}></span>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#27c93f" }}></span>
          </div>
          <span
            style={{
              fontSize: "0.64rem",
              fontWeight: 800,
              color: isFrontForeground ? "var(--primary, #dfc15d)" : "var(--text3, #888)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {frontTitle}
          </span>
          <div style={{ width: "24px" }}></div>
        </div>

        {/* Screenshot View */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#050508" }}>
          <img
            src={frontSrc}
            alt={frontTitle}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* ================= CARD 2: PRODUCT DETAIL ================= */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveSide("back");
        }}
        style={{
          position: "absolute",
          width: "270px",
          height: "360px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#0d0c12",
          border: !isFrontForeground
            ? "2px solid rgba(223, 193, 93, 0.55)"
            : "1px solid rgba(223, 193, 93, 0.25)",
          boxShadow: !isFrontForeground
            ? "0 22px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(223, 193, 93, 0.2)"
            : "0 12px 30px rgba(0, 0, 0, 0.65)",
          transform: !isFrontForeground
            ? "translate(-12px, 12px) scale(1) rotate(0deg)"
            : "translate(16px, -16px) scale(0.92) rotate(1deg)",
          zIndex: !isFrontForeground ? 3 : 1,
          opacity: !isFrontForeground ? 1 : 0.82,
          transition: `all ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser Top Window Bar */}
        <div
          style={{
            height: "26px",
            background: "rgba(18, 17, 24, 0.95)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff5f56" }}></span>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ffbd2e" }}></span>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#27c93f" }}></span>
          </div>
          <span
            style={{
              fontSize: "0.64rem",
              fontWeight: 800,
              color: !isFrontForeground ? "var(--primary, #dfc15d)" : "var(--text3, #888)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {backTitle}
          </span>
          <div style={{ width: "24px" }}></div>
        </div>

        {/* Screenshot View */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#050508" }}>
          <img
            src={backSrc}
            alt={backTitle}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* Layer Toggle Pills Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "6px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(10, 9, 14, 0.85)",
          backdropFilter: "blur(6px)",
          padding: "3px 8px",
          borderRadius: "16px",
          border: "1px solid rgba(223, 193, 93, 0.25)",
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveSide("front");
          }}
          style={{
            background: isFrontForeground ? "var(--primary, #dfc15d)" : "transparent",
            color: isFrontForeground ? "#000" : "var(--text2)",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.66rem",
            fontWeight: 800,
            padding: "2px 8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Front
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveSide("back");
          }}
          style={{
            background: !isFrontForeground ? "var(--primary, #dfc15d)" : "transparent",
            color: !isFrontForeground ? "#000" : "var(--text2)",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.66rem",
            fontWeight: 800,
            padding: "2px 8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
