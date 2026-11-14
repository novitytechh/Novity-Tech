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
      {/* ================= CARD 1: STOREFRONT HERO (FRONT) ================= */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveSide("front");
        }}
        style={{
          position: "absolute",
          width: "275px",
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
        }}
      >
        <img
          src={frontSrc}
          alt={frontTitle}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
      </div>

      {/* ================= CARD 2: PRODUCT DETAIL (BACK) ================= */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveSide("back");
        }}
        style={{
          position: "absolute",
          width: "275px",
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
        }}
      >
        <img
          src={backSrc}
          alt={backTitle}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
      </div>
    </div>
  );
}
