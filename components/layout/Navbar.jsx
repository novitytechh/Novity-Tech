"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial theme setup
    const saved = localStorage.getItem("novity_theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setNavOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("novity_theme", next);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", isServices: true },
    { name: "Work", href: "/work" },
    { name: "Team", href: "/team" },
    { name: "Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav id="navbar" className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
      <div className="container" style={{ position: "relative" }}>
        {/* Brand Logo */}
        <Link
          className="navbar-brand order-1 me-auto me-lg-3"
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "14px", textDecoration: "none" }}
        >
          <img
            src="/img/novity-emblem.png"
            alt="Novity Tech Emblem"
            style={{
              height: "50px",
              width: "50px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 14px rgba(223, 193, 93, 0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
            }}
          />
          <span
            style={{
              fontFamily: "'Phudu', cursive",
              fontWeight: 900,
              fontSize: "1.55rem",
              letterSpacing: "0.08em",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "var(--text, #ffffff)" }}>NOVITY</span>
            <span style={{ color: "var(--primary, #dfc15d)" }}>TECH</span>
          </span>
        </Link>

        {/* Mobile Hamburger Toggler */}
        <button
          className="navbar-toggler order-3 d-lg-none"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <div className="tog-wrap">
            <span className="tog-line"></span>
            <span className="tog-line"></span>
            <span className="tog-line"></span>
          </div>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse justify-content-center order-4 order-lg-2 ${navOpen ? "show" : ""}`} id="navMenu">
          <ul className="navbar-nav gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.isServices) {
                return (
                  <li
                    key={link.name}
                    className="nav-item dropdown"
                    onMouseEnter={() => {
                      if (window.innerWidth >= 992) setServicesOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth >= 992) setServicesOpen(false);
                    }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                      <Link
                        className={`nav-link ${isActive ? "active" : ""}`}
                        href="/services"
                        onClick={(e) => {
                          // On mobile or when clicked, toggle the mega menu
                          if (window.innerWidth < 992) {
                            e.preventDefault();
                            setServicesOpen(!servicesOpen);
                          }
                        }}
                      >
                        Services{" "}
                        <i
                          className={`fas fa-chevron-down ms-1`}
                          style={{
                            fontSize: "0.72rem",
                            transition: "transform 0.25s ease",
                            transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </Link>
                    </div>

                    {/* Services Dropdown */}
                    <ServicesDropdown
                      isOpen={servicesOpen}
                      onClose={() => setServicesOpen(false)}
                    />
                  </li>
                );
              }

              return (
                <li key={link.name} className="nav-item">
                  <Link
                    className={`nav-link ${isActive ? "active" : ""}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions: Dark Mode Toggle & CTA Button */}
        <div className="d-flex align-items-center gap-2 gap-sm-3 order-2 order-lg-3 me-2 me-lg-0 ms-lg-3">
          <button
            className="t-toggle"
            id="themeBtn"
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            style={{
              margin: 0,
              padding: "7px 14px",
              border: "1px solid var(--border)",
              borderRadius: "9999px",
              background: "var(--card)",
            }}
          >
            <div className="t-icon">
              <i className={`fas ${theme === "dark" ? "fa-moon" : "fa-sun"}`} id="thIco"></i>
            </div>
            <span id="thLbl" className="d-none d-sm-inline" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          <Link
            href="/contact"
            className="nav-link nav-cta d-none d-lg-inline-flex"
            style={{ textDecoration: "none" }}
          >
            Get Started <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
