"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * ProjectImageSlideshow
 *
 * Cycles images in strict serial order (01 -> 02 -> 03 -> 04 -> 01)
 * with a customizable timelapse (minimum 2s enforced) and smooth 1.8s transitions.
 */
export default function ProjectImageSlideshow({
  images = [],
  interval = 2500, // 2.5s timelapse (guaranteed >= 2s minimum)
  transitionDuration = 1800, // 1.8s smooth transition
  height = "100%",
  showControls = false,
  showIndicators = true,
  showBadge = true,
  badgePosition = "top-left",
  pauseOnHover = true,
  activeSlideIndex,
  onSlideChange,
  className = "",
  style = {},
  objectFit = "cover",
  objectPosition = "top center",
}) {
  const normalizedImages = (images || []).map((img, idx) => {
    if (typeof img === "string") {
      return {
        src: img,
        title: `Screen 0${idx + 1}`,
        step: `0${idx + 1}`,
        caption: "",
      };
    }
    return {
      src: img.src || img.image || "",
      title: img.title || `Screen 0${idx + 1}`,
      step: img.step || `0${idx + 1}`,
      caption: img.caption || "",
      tag: img.tag || "",
    };
  });

  const total = normalizedImages.length;
  const enforcedInterval = Math.max(interval || 2500, 2000); // Enforce >= 2s minimum timelapse

  const [internalIndex, setInternalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Controlled or uncontrolled index
  const currentIndex =
    typeof activeSlideIndex === "number" && activeSlideIndex >= 0 && activeSlideIndex < total
      ? activeSlideIndex
      : internalIndex;

  const timerRef = useRef(null);

  // Auto-play serial slideshow with >=2s timelapse
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setInternalIndex((prev) => {
        const next = (prev + 1) % total;
        if (onSlideChange) onSlideChange(next);
        return next;
      });
    }, enforcedInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, enforcedInterval, isPaused, onSlideChange]);

  const goToSlide = (idx, e) => {
    if (e) e.stopPropagation();
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setInternalIndex(clamped);
    if (onSlideChange) onSlideChange(clamped);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const prev = (currentIndex - 1 + total) % total;
    goToSlide(prev, e);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const next = (currentIndex + 1) % total;
    goToSlide(next, e);
  };

  if (total === 0) {
    return (
      <div
        style={{
          height,
          background: "#0c0b10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text3)",
          ...style,
        }}
      >
        <span>No previews available</span>
      </div>
    );
  }

  const currentImage = normalizedImages[currentIndex] || normalizedImages[0];

  return (
    <div
      className={`project-slideshow-container ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        background: "#0a090e",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Serial Image Layers with 1.8s Smooth Crossfade Transition */}
      {normalizedImages.map((img, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.05)",
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={img.src}
              alt={img.title || `Screen ${idx + 1}`}
              loading={idx === 0 ? "eager" : "lazy"}
              style={{
                width: "100%",
                height: "100%",
                objectFit,
                objectPosition,
                display: "block",
              }}
            />
          </div>
        );
      })}

      {/* Serial Step Badge */}
      {showBadge && total > 1 && (
        <div
          style={{
            position: "absolute",
            top: badgePosition.includes("top") ? "14px" : "auto",
            bottom: badgePosition.includes("bottom") ? "14px" : "auto",
            left: badgePosition.includes("left") ? "14px" : "auto",
            right: badgePosition.includes("right") ? "14px" : "auto",
            zIndex: 4,
            background: "rgba(10, 9, 14, 0.88)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(223, 193, 93, 0.4)",
            color: "var(--primary, #dfc15d)",
            borderRadius: "30px",
            padding: "5px 12px",
            fontSize: "0.74rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.45)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#dfc15d",
              boxShadow: "0 0 8px #dfc15d",
              display: "inline-block",
            }}
          ></span>
          <span>
            {currentImage.step || `0${currentIndex + 1}`} / 0{total} • {currentImage.title}
          </span>
        </div>
      )}

      {/* Prev / Next Controls (if enabled) */}
      {showControls && total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screenshot"
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              zIndex: 4,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(12, 11, 16, 0.75)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary, #dfc15d)";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#dfc15d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(12, 11, 16, 0.75)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.35)";
            }}
          >
            <i className="fas fa-chevron-left" style={{ fontSize: "0.85rem" }}></i>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screenshot"
            style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              transform: "translateY(-50%)",
              zIndex: 4,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(12, 11, 16, 0.75)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary, #dfc15d)";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#dfc15d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(12, 11, 16, 0.75)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.35)";
            }}
          >
            <i className="fas fa-chevron-right" style={{ fontSize: "0.85rem" }}></i>
          </button>
        </>
      )}

      {/* Serial Indicators (Dots) */}
      {showIndicators && total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(10, 9, 14, 0.75)",
            backdropFilter: "blur(6px)",
            padding: "5px 10px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {normalizedImages.map((_, dotIdx) => {
            const isDotActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => goToSlide(dotIdx, e)}
                aria-label={`Jump to screenshot ${dotIdx + 1}`}
                style={{
                  width: isDotActive ? "22px" : "7px",
                  height: "7px",
                  borderRadius: "6px",
                  background: isDotActive
                    ? "var(--primary, #dfc15d)"
                    : "rgba(255, 255, 255, 0.25)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isDotActive ? "0 0 8px rgba(223, 193, 93, 0.6)" : "none",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
