"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/projectsData";
import { TEAM_MEMBERS, COMPANY_DESCRIPTION } from "@/lib/teamData";
import ProjectImageSlideshow from "@/components/ui/ProjectImageSlideshow";
import DualFrontBackMockup from "@/components/ui/DualFrontBackMockup";

export default function Home() {
  // Theme state
  const [theme, setTheme] = useState("dark");
  // Navbar & scroll state
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [navOpen, setNavOpen] = useState(false);
  // Portfolio filter
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  // FAQ accordion
  const [activeFaq, setActiveFaq] = useState(0);
  // Active modal
  const [activeModal, setActiveModal] = useState(null);
  const [activeModalSlideIndex, setActiveModalSlideIndex] = useState(0);
  // Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent

  // Custom cursor refs (avoid React re-renders on mousemove/rAF)
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const setIsHovered = (hovered) => {
    if (ringRef.current) {
      ringRef.current.classList.toggle("big", hovered);
    }
  };

  // Counter numbers
  const [counters, setCounters] = useState({
    projects: 0,
    satisfaction: 0,
    experience: 0,
  });
  const [googleReviews, setGoogleReviews] = useState({
    rating: null,
    totalReviews: 0,
    writeReviewUri: null,
    reviews: [],
  });

  useEffect(() => {
    let active = true;
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setGoogleReviews({
          rating: data.rating ?? null,
          totalReviews: data.totalReviews ?? 0,
          writeReviewUri: data.writeReviewUri ?? null,
          reviews: Array.isArray(data.reviews) ? data.reviews : [],
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Handle Initial Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("nxTheme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Theme switch handler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("nxTheme", nextTheme);
  };

  // Animated counters trigger
  useEffect(() => {
    const duration = 1200;
    const steps = 45;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const factor = 1 - (1 - progress) * (1 - progress);

      setCounters({
        projects: Math.floor(20 * factor),
        satisfaction: Math.floor(98 * factor),
        experience: Math.floor(3 * factor),
      });

      if (progress >= 1) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Cursor tracking via direct DOM transforms & on-demand rAF
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches || window.innerWidth <= 1024) {
      return;
    }

    let animId = null;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const animLoop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(mx - rx) > 0.25 || Math.abs(my - ry) > 0.25) {
        animId = requestAnimationFrame(animLoop);
      } else {
        animId = null;
      }
    };

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (!animId) {
        animId = requestAnimationFrame(animLoop);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Throttled scroll listener for sticky navbar, active nav links, and scroll-to-top
  useEffect(() => {
    let ticking = false;
    const sections = ["hero", "about", "services", "portfolio", "team", "pricing", "news", "contact"];

    const updateScroll = () => {
      const st = window.scrollY;
      const nextScrolled = st > 50;
      const nextScrollTop = st > 300;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setShowScrollTop((prev) => (prev === nextScrollTop ? prev : nextScrollTop));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && st >= el.offsetTop - 140) {
          const nextNav = sections[i];
          setActiveNav((prev) => (prev === nextNav ? prev : nextNav));
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeModal]);

  // Handle Contact Form Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      }, 4000);
    }, 1500);
  };

  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Portfolio items data
  const portfolioItems = PROJECTS_DATA || [];

  const filteredPortfolio = portfolioFilter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => (item.cat || item.category) === portfolioFilter);

  const activePortfolioModalItem = portfolioItems.find((item) => item.id === activeModal);
  const activeTeamMember = TEAM_MEMBERS.find((item) => item.id === activeModal);

  // FAQ items data
  const faqs = [
    {
      q: "How long does it take to see results from digital marketing?",
      a: "SEO typically shows meaningful results in 3�6 months, while PPC and social media campaigns can drive traffic and leads within days. We set realistic timelines based on your industry, competition, and goals from day one.",
    },
    {
      q: "What makes Novity Tech different from other digital agencies?",
      a: "We combine deep strategic thinking with creative excellence and technical expertise under one roof. Every campaign is backed by data, crafted with care, and optimized relentlessly. We don't just execute � we become a true extension of your team.",
    },
    {
      q: "Do you work with small businesses or only enterprises?",
      a: "We work with businesses of all sizes � from ambitious startups to Fortune 500 companies. Our tiered pricing and flexible packages are designed to grow alongside your business, ensuring maximum value at every stage.",
    },
    {
      q: "How do you measure and report on campaign performance?",
      a: "We provide transparent reporting through custom dashboards and regular reports (weekly or monthly based on your plan). We track KPIs that matter � traffic, leads, conversions, ROAS, and revenue impact � giving you a clear picture of ROI.",
    },
    {
      q: "Can we start with just one service and expand later?",
      a: "Absolutely. Many clients start with a single service � often SEO or social media � and expand as they see results. We design each engagement to be modular, so scaling up is seamless and strategic.",
    },
    {
      q: "What is your contract length and cancellation policy?",
      a: "We offer both month-to-month and annual contracts (with discounts for annual commitment). We believe in earning your business every month, so there are no long-term lock-ins for standard plans.",
    },
  ];

  return (
    <>
      {/* CURSOR */}
      <div
        ref={dotRef}
        className="c-dot"
        id="cDot"
        style={{ left: 0, top: 0, transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)", willChange: "transform" }}
      ></div>
      <div
        ref={ringRef}
        className="c-ring"
        id="cRing"
        style={{ left: 0, top: 0, transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)", willChange: "transform" }}
      ></div>

      {/* SCROLL TOP BUTTON */}
      <button
        id="scrtop"
        className={showScrollTop ? "show" : ""}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <i className="fas fa-arrow-up"></i>
      </button>



      {/* ==================== NAVBAR ==================== */}
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section id="hero">
        <div className="hero-pbg" id="heroPBG"></div>
        <div className="hero-ov"></div>
        <div className="hero-grain"></div>
        <div className="hero-glow" style={{ top: "-120px", right: "-80px" }}></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-7">

              <h1 className="hero-title">
                We <span className="hl">Transform</span>
                <br />
                Bold Ideas Into
                <br />
                Digital <span className="hl">Growth</span>
              </h1>
              <p className="hero-desc">
                By immersing ourselves in your brand, we challenge the ordinary and turn bold ideas into strategic digital experiences that drive real, measurable growth.
              </p>
              <div className="hero-btns">
                <a
                  href="#services"
                  className="btn-hp"
                  onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Explore Services <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="hero-stats">
                <div className="hstat">
                  <div className="hstat-num">
                    <span>{counters.projects}</span>
                    <span>+</span>
                  </div>
                  <div className="hstat-lbl">Projects Done</div>
                </div>
                <div className="hstat-div"></div>
                <div className="hstat">
                  <div className="hstat-num">
                    <span>{counters.satisfaction}</span>
                    <span>%</span>
                  </div>
                  <div className="hstat-lbl">Client Satisfaction</div>
                </div>
                <div className="hstat-div"></div>
                <div className="hstat">
                  <div className="hstat-num">
                    <span>{counters.experience}</span>
                    <span>+</span>
                  </div>
                  <div className="hstat-lbl">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Prominent Majestic Golden Wings Emblem Showcase */}
            <div className="col-lg-5 d-none d-lg-block text-center align-self-lg-start mt-5 mt-lg-0">
              <div className="hero-emblem-showcase" style={{ position: "relative", display: "inline-block", marginTop: "6px" }}>
                <div
                  className="hero-emblem-card"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "36px 32px",
                    borderRadius: "28px",
                    background: "#15141c",
                    border: "1px solid rgba(223, 193, 93, 0.38)",
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(223, 193, 93, 0.2)",
                    backdropFilter: "blur(14px)",
                    textAlign: "center",
                  }}
                >
                  <img
                    className="hero-emblem-img"
                    src="/img/novity-emblem.png"
                    alt="Novity Tech Majestic Golden Wings Emblem"
                    style={{
                      width: "210px",
                      height: "210px",
                      objectFit: "contain",
                    }}
                  />
                  <div style={{ marginTop: "18px" }}>
                    <div
                      style={{
                        fontFamily: "'Phudu', cursive",
                        fontSize: "1.55rem",
                        fontWeight: 900,
                        letterSpacing: "0.14em",
                        color: "#f8f6f0",
                      }}
                    >
                      NOVITY <span style={{ color: "var(--primary)" }}>TECH</span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--primary-champagne, #fdf6d8)",
                        opacity: 0.9,
                        marginTop: "6px",
                        fontWeight: 600,
                      }}
                    >
                      Engineering Digital Eminence
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-ind" onClick={() => scrollTo("features")} style={{ cursor: "pointer" }}>
          <div className="scroll-mouse"></div>
          <div className="scroll-txt">Scroll Down</div>
        </div>
      </section>

      {/* ==================== TICKER ==================== */}
      <div className="ticker">
        <div className="ticker-track">
          <div className="tick-item"><span className="tick-dot"></span>Digital Marketing</div>
          <div className="tick-item"><span className="tick-dot"></span>Brand Strategy</div>
          <div className="tick-item"><span className="tick-dot"></span>SEO Optimization</div>
          <div className="tick-item"><span className="tick-dot"></span>Social Media</div>
          <div className="tick-item"><span className="tick-dot"></span>Web Design</div>
          <div className="tick-item"><span className="tick-dot"></span>Content Creation</div>
          <div className="tick-item"><span className="tick-dot"></span>Performance Marketing</div>
          <div className="tick-item"><span className="tick-dot"></span>UI/UX Design</div>
          <div className="tick-item"><span className="tick-dot"></span>Digital Marketing</div>
          <div className="tick-item"><span className="tick-dot"></span>Brand Strategy</div>
          <div className="tick-item"><span className="tick-dot"></span>SEO Optimization</div>
          <div className="tick-item"><span className="tick-dot"></span>Social Media</div>
          <div className="tick-item"><span className="tick-dot"></span>Web Design</div>
          <div className="tick-item"><span className="tick-dot"></span>Content Creation</div>
          <div className="tick-item"><span className="tick-dot"></span>Performance Marketing</div>
          <div className="tick-item"><span className="tick-dot"></span>UI/UX Design</div>
        </div>
      </div>

      {/* ==================== FEATURES ==================== */}
      <section id="features">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="feat-card">
                <div className="feat-ico"><i className="fas fa-bullseye"></i></div>
                <h4 className="feat-title">Strategy-First</h4>
                <p className="feat-desc">Every campaign begins with deep research and a clear strategic blueprint tailored to your goals.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feat-card">
                <div className="feat-ico"><i className="fas fa-chart-line"></i></div>
                <h4 className="feat-title">Data-Driven</h4>
                <p className="feat-desc">We leverage analytics and insights to make informed decisions that consistently outperform benchmarks.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feat-card">
                <div className="feat-ico"><i className="fas fa-palette"></i></div>
                <h4 className="feat-title">Creative Excellence</h4>
                <p className="feat-desc">Our designers craft visually stunning experiences that capture attention and inspire meaningful action.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feat-card">
                <div className="feat-ico"><i className="fas fa-rocket"></i></div>
                <h4 className="feat-title">Rapid Growth</h4>
                <p className="feat-desc">From launch to scale, we implement proven growth frameworks that accelerate business momentum.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="about-img-wrap">
                <img className="about-img" src="/img/about-img.jpg" alt="About Novity Tech" loading="lazy" decoding="async" />
                <div className="about-exp">
                  <div className="about-exp-n">3+</div>
                  <div className="about-exp-l">Years of Excellence</div>
                </div>
                <div className="about-clients">
                  <div className="cl-avs">
                    <img className="cl-av" src="/img/ab1.jpg" alt="Client 1" loading="lazy" decoding="async" />
                    <img className="cl-av" src="/img/ab2.jpg" alt="Client 2" loading="lazy" decoding="async" />
                    <img className="cl-av" src="/img/ab3.jpg" alt="Client 3" loading="lazy" decoding="async" />
                  </div>
                  <div className="cl-cnt">20+ Happy Clients</div>
                  <div className="cl-lbl">98% satisfaction rate</div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-cnt">
                <div className="sec-badge">About Our Agency</div>
                <h2 className="sec-title">We&apos;re a Digital-First <span>Engineering Agency</span></h2>
                <p className="about-desc">
                  {COMPANY_DESCRIPTION.full}
                </p>
                <a
                  href="#contact"
                  className="btn-p"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Work With Us <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-lg-6">
              <div className="sec-badge">Our Services</div>
              <h2 className="sec-title">Services Designed to <span>Drive Growth</span></h2>
            </div>
            <div className="col-lg-6 d-flex align-items-end">
              <p className="sec-desc ms-auto">
                A comprehensive suite of digital marketing services, each crafted to deliver measurable impact for your business.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {/* Service 1 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM1")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">01</div>
                <div className="svc-ico"><i className="fas fa-chart-pie"></i></div>
                <h3 className="svc-title">Digital Marketing Strategy</h3>
                <p className="svc-desc">Data-driven marketing plans that align with your business objectives and accelerate sustainable growth.</p>
                <div className="svc-tags">
                  <span className="svc-tag">Strategy</span>
                  <span className="svc-tag">Analytics</span>
                  <span className="svc-tag">Growth</span>
                </div>
              </div>
            </div>
            {/* Service 2 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM2")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">02</div>
                <div className="svc-ico"><i className="fas fa-fingerprint"></i></div>
                <h3 className="svc-title">Brand Strategy &amp; Positioning</h3>
                <p className="svc-desc">Crafting compelling brand identities and positioning that resonate deeply with your target audience.</p>
                <div className="svc-tags">
                  <span className="svc-tag">Branding</span>
                  <span className="svc-tag">Identity</span>
                  <span className="svc-tag">Positioning</span>
                </div>
              </div>
            </div>
            {/* Service 3 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM3")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">03</div>
                <div className="svc-ico"><i className="fas fa-search"></i></div>
                <h3 className="svc-title">SEO &amp; Performance Marketing</h3>
                <p className="svc-desc">Dominate search rankings and drive high-quality traffic with our proven SEO and performance marketing methods.</p>
                <div className="svc-tags">
                  <span className="svc-tag">SEO</span>
                  <span className="svc-tag">PPC</span>
                  <span className="svc-tag">ROAS</span>
                </div>
              </div>
            </div>
            {/* Service 4 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM4")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">04</div>
                <div className="svc-ico"><i className="fas fa-share-alt"></i></div>
                <h3 className="svc-title">Social Media Marketing</h3>
                <p className="svc-desc">Building thriving communities and engaging social campaigns that turn followers into loyal brand advocates.</p>
                <div className="svc-tags">
                  <span className="svc-tag">Social</span>
                  <span className="svc-tag">Community</span>
                  <span className="svc-tag">Ads</span>
                </div>
              </div>
            </div>
            {/* Service 5 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM5")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">05</div>
                <div className="svc-ico"><i className="fas fa-code"></i></div>
                <h3 className="svc-title">Web Design &amp; Development</h3>
                <p className="svc-desc">High-performance websites and digital platforms built for conversion, speed, and outstanding user experience.</p>
                <div className="svc-tags">
                  <span className="svc-tag">Web Design</span>
                  <span className="svc-tag">UX/UI</span>
                  <span className="svc-tag">Dev</span>
                </div>
              </div>
            </div>
            {/* Service 6 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="svc-card"
                onClick={() => setActiveModal("svcM6")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-arr"><i className="fas fa-arrow-right"></i></div>
                <div className="svc-num">06</div>
                <div className="svc-ico"><i className="fas fa-pen-nib"></i></div>
                <h3 className="svc-title">Content Creation</h3>
                <p className="svc-desc">Compelling content that tells your brand story, educates your audience, and drives meaningful engagement.</p>
                <div className="svc-tags">
                  <span className="svc-tag">Content</span>
                  <span className="svc-tag">Copywriting</span>
                  <span className="svc-tag">Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ==================== PORTFOLIO ==================== */}
      <section id="portfolio">
        <div className="container">
          <div className="row sec-hd align-items-end">
            <div className="col-lg-6">
              <div className="sec-badge">Our Work</div>
              <h2 className="sec-title">Recent <span>Projects</span></h2>
            </div>
            <div className="col-lg-6">
              <div className="filter-tabs justify-content-lg-end">
                {[
                  { id: "all", label: "All Work" },
                  { id: "app", label: "Mobile Apps" },
                  { id: "web", label: "Web Platforms" },
                  { id: "cloud", label: "Cloud & AI" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ftab ${portfolioFilter === tab.id ? "active" : ""}`}
                    onClick={() => setPortfolioFilter(tab.id)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center" id="pfGrid">
            {filteredPortfolio.length > 0 ? (
              <>
                {filteredPortfolio.slice(0, 2).map((item) => (
                <div key={item.id} className={`${item.colClass || "col-12"} pf-cat`} style={{ maxWidth: "1040px" }}>
                  {item.screens && item.screens.length > 0 ? (
                    <div
                      style={{
                        background: "linear-gradient(165deg, #13121b 0%, #0c0b10 100%)",
                        border: "1px solid rgba(223, 193, 93, 0.35)",
                        borderRadius: "22px",
                        overflow: "hidden",
                        boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
                        transition: "transform 0.3s ease, border-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.55)";
                        setIsHovered(true);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(223, 193, 93, 0.35)";
                        setIsHovered(false);
                      }}
                    >
                      <div className="row g-0 align-items-center">
                        {/* LEFT SIDE: ONLY THE PICS (FRONT/BACK DUAL OR PHONE FRAME) */}
                        <div
                          className="col-lg-4 col-md-5 col-12"
                          style={{
                            background: "radial-gradient(circle at center, #181722 0%, #09080d 100%)",
                            borderRight: "1px solid rgba(223, 193, 93, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "22px 16px",
                            minHeight: "440px",
                          }}
                        >
                          {item.deviceType === "desktop-dual" ? (
                            <DualFrontBackMockup
                              frontSrc={item.frontImage || item.screens?.[0]?.src}
                              backSrc={item.backImage || item.screens?.[1]?.src}
                              frontTitle={item.screens?.[0]?.title || "Storefront (Front)"}
                              backTitle={item.screens?.[1]?.title || "Product Detail (Back)"}
                              interval={2500}
                              transitionDuration={1800}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                maxWidth: "215px",
                                height: "440px",
                                borderRadius: "26px",
                                overflow: "hidden",
                                border: "2px solid rgba(223, 193, 93, 0.45)",
                                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(223, 193, 93, 0.12)",
                                position: "relative",
                                background: "#050508",
                              }}
                            >
                              <ProjectImageSlideshow
                                images={item.screens}
                                interval={2500}
                                transitionDuration={1800}
                                height="100%"
                                showIndicators={true}
                                showControls={true}
                                pauseOnHover={true}
                                objectFit="cover"
                                objectPosition="top center"
                              />
                            </div>
                          )}
                        </div>

                        {/* RIGHT SIDE: CONCISE, SLEEK & IMPRESSIVE DESCRIPTION */}
                        <div
                          className="col-lg-8 col-md-7 col-12"
                          style={{
                            padding: "26px 32px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Badges */}
                          <div className="d-flex align-items-center mb-2">
                            <span
                              style={{
                                color: "var(--primary)",
                                fontSize: "0.74rem",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {item.catLabel || item.categoryLabel} • {item.client || "EdTech"}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            style={{
                              fontSize: "1.38rem",
                              fontWeight: 800,
                              color: "var(--text)",
                              lineHeight: 1.25,
                              marginBottom: "8px",
                            }}
                          >
                            {item.name || item.title}
                          </h3>

                          {/* Concise Description */}
                          <p
                            style={{
                              color: "var(--text2)",
                              fontSize: "0.88rem",
                              lineHeight: "1.6",
                              marginBottom: "12px",
                            }}
                          >
                            {item.desc || item.overview}
                          </p>

                          {/* 3 Crisp Capabilities */}
                          {item.keyFeatures && (
                            <div style={{ marginBottom: "12px" }}>
                              <ul style={{ paddingLeft: "0", listStyle: "none", margin: 0, display: "grid", gap: "5px" }}>
                                {item.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                                  <li
                                    key={fIdx}
                                    style={{
                                      color: "var(--text2)",
                                      fontSize: "0.82rem",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "7px",
                                    }}
                                  >
                                    <i className="fas fa-check-circle" style={{ color: "var(--primary)", fontSize: "0.78rem", flexShrink: 0 }}></i>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Compact Serial Screen Flow */}
                          {item.screens && (
                            <div style={{ marginBottom: "14px" }}>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: `repeat(${Math.min(item.screens.length, 4)}, 1fr)`,
                                  gap: "6px",
                                }}
                              >
                                {item.screens.map((scr, sIdx) => (
                                  <div
                                    key={sIdx}
                                    style={{
                                      padding: "5px 6px",
                                      background: "rgba(255, 255, 255, 0.03)",
                                      border: "1px solid rgba(223, 193, 93, 0.2)",
                                      borderRadius: "8px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <div style={{ color: "var(--primary)", fontSize: "0.68rem", fontWeight: 800 }}>
                                      {scr.step}
                                    </div>
                                    <div
                                      style={{
                                        color: "var(--text)",
                                        fontSize: "0.72rem",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {scr.title}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech Chips + Buttons */}
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-1">
                            {item.tech && item.tech.length > 0 && (
                              <div className="d-flex flex-wrap gap-1">
                                {item.tech.slice(0, 5).map((t, idx) => (
                                  <span
                                    key={idx}
                                    style={{
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      background: "rgba(255, 255, 255, 0.04)",
                                      border: "1px solid var(--border)",
                                      color: "var(--text3)",
                                      fontSize: "0.72rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn-p"
                                style={{
                                  fontSize: "0.8rem",
                                  padding: "7px 16px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                                onClick={() => {
                                  setActiveModal(item.id);
                                  setActiveModalSlideIndex(0);
                                }}
                              >
                                Interactive Demo <i className="fas fa-expand-alt" style={{ fontSize: "0.72rem" }}></i>
                              </button>
                              <Link
                                href="/contact"
                                className="btn-s"
                                style={{
                                  textDecoration: "none",
                                  padding: "7px 14px",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Inquire
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="pf-item"
                      style={{ height: item.height || "380px", cursor: "pointer", position: "relative" }}
                      onClick={() => {
                        setActiveModal(item.id);
                        setActiveModalSlideIndex(0);
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img className="pf-img" src={item.img || item.image} alt={item.name || item.title} loading="lazy" decoding="async" />
                      <div className="pf-ov">
                        <div>
                          <div className="pf-cat">{item.catLabel || item.categoryLabel}</div>
                          <h3 className="pf-name">{item.name || item.title}</h3>
                        </div>
                      </div>
                      <div className="pf-plus"><i className="fas fa-plus"></i></div>
                    </div>
                  )}
                </div>
              ))}

              {/* See More Projects Button pushing to /work page */}
              <div className="col-12 text-center" style={{ marginTop: "28px" }}>
                <Link
                  href="/work"
                  className="btn-p"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "13px 32px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(223, 193, 93, 0.22)",
                    textDecoration: "none",
                  }}
                >
                  <span>See More Projects</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: "0.85rem" }}></i>
                </Link>
              </div>
            </>
          ) : (
              <div className="col-12 text-center" style={{ padding: "60px 20px" }}>
                <div
                  style={{
                    maxWidth: "540px",
                    margin: "0 auto",
                    padding: "44px 28px",
                    borderRadius: "24px",
                    background: "var(--card)",
                    border: "1px dashed rgba(223, 193, 93, 0.35)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(223, 193, 93, 0.12)",
                      color: "var(--primary)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      marginBottom: "16px",
                    }}
                  >
                    <i className="fas fa-folder-open"></i>
                  </div>
                  <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                    No Projects Added Yet
                  </h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.92rem", lineHeight: "1.6", marginBottom: "20px" }}>
                    Existing demo projects have been removed. Add your custom projects to <code>lib/projectsData.js</code> to feature them here.
                  </p>
                  <Link href="/contact" className="btn-p" style={{ display: "inline-block", fontSize: "0.85rem", padding: "10px 24px" }}>
                    Discuss a Project <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== TEAM & CLIENT ADVISORY ==================== */}
      <section id="team">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-lg-7">
              <div className="sec-badge">Client Advisory &amp; Engineering Standards</div>
              <h2 className="sec-title">Direct Senior Engineering With <span>Zero Middlemen</span></h2>
            </div>
            <div className="col-lg-5 d-flex align-items-end">
              <p className="sec-desc ms-auto">
                No account managers or junior outsourcing. You collaborate directly with principal architects who write and deploy your code.
              </p>
            </div>
          </div>

          {/* Core Leadership & Engineering Boxes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {TEAM_MEMBERS.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="tm-card"
                onClick={() => setActiveModal(member.id)}
                style={{
                  background: "var(--card)",
                  border: member.isChief
                    ? "1px solid rgba(223, 193, 93, 0.45)"
                    : "1px solid var(--border)",
                  borderRadius: "22px",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Photo Header */}
                <div
                  style={{
                    height: "240px",
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(223, 193, 93, 0.05)",
                  }}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s ease",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        color: "var(--primary)",
                      }}
                    >
                      <i className={`fas ${member.icon}`} />
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(16, 15, 21, 0.9) 0%, rgba(16, 15, 21, 0.1) 60%, rgba(0,0,0,0.3) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Body */}
                <div
                  style={{
                    padding: "20px 18px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "1.08rem",
                        fontWeight: 800,
                        color: "var(--text)",
                        marginBottom: member.role ? "4px" : "12px",
                      }}
                    >
                      {member.name}
                    </h4>
                    {member.role ? (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "var(--primary)",
                          marginBottom: "10px",
                          lineHeight: 1.4,
                        }}
                      >
                        {member.role}
                      </div>
                    ) : null}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--border)",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--primary)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      View Profile <i className="fas fa-arrow-right" style={{ fontSize: "0.7rem" }} />
                    </span>
                    <i className={`fas ${member.icon}`} style={{ color: "var(--text3)", fontSize: "0.85rem" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Master Dedicated Paragraph */}
          <div
            className="shaded-banner-block"
            style={{
              background: "var(--card-bg, #121118)",
              border: "1px solid rgba(223, 193, 93, 0.35)",
              borderRadius: "26px",
              padding: "44px 36px",
              marginBottom: "40px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(223, 193, 93, 0.12)",
                border: "1px solid rgba(223, 193, 93, 0.3)",
                color: "var(--primary)",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <i className="fas fa-certificate" /> The Novity Tech Client Commitment
            </div>

            <p
              style={{
                color: "var(--text)",
                fontSize: "1.2rem",
                lineHeight: "2",
                fontWeight: 500,
                margin: 0,
              }}
            >
              At Novity Tech, we have intentionally eliminated the conventional agency model of sales intermediaries, account managers, and junior outsourcing. When you partner with us, you work directly with our founding architects and principal engineers who personally design your architecture, write your production code, and deploy your infrastructure. Whether you are building an enterprise Next.js full-stack platform, an autonomous AI copilot workflow, or high-availability cloud infrastructure across AWS and Kubernetes, we guarantee sub-second performance, airtight security, and 100% intellectual property ownership from day one. Every engagement begins with a complimentary architectural discovery session under a strict bilateral NDA, followed by transparent 4-to-6 week sprint milestones with fixed-price SLA agreements, weekly interactive demo videos, and shared GitHub repositories. Proudly based in Gujranwala, Pakistan, and collaborating globally, we build software with zero technical debt, predictable fixed costs, and immediate commercial impact for your business.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(223, 193, 93, 0.2)",
              }}
            >
              {[
                "100% Direct Architect Access",
                "Full IP & Repository Handover",
                "Bilateral NDA Guaranteed",
                "Fixed-Scope Milestones & SLAs",
                "Sub-Second Performance",
                "Weekly Interactive Demos",
              ].map((badge, idx) => (
                <span
                  key={idx}
                  className="shaded-badge"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(223, 193, 93, 0.2)",
                    color: "var(--primary)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  <i className="fas fa-check" style={{ fontSize: "0.75rem" }} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Client Query Resolvers Grid */}
          <div className="row g-4">
            {[
              {
                icon: "fa-user-shield",
                title: "Direct Senior Engineering",
                desc: "Zero junior developers or non-technical intermediaries. You collaborate directly with founding architects from discovery to production deployment.",
              },
              {
                icon: "fa-file-signature",
                title: "100% IP & Code Ownership",
                desc: "Complete legal and technical ownership of all Git repositories, infrastructure configurations, and Figma tokens upon milestone sign-off.",
              },
              {
                icon: "fa-calendar-check",
                title: "Fixed SLAs & Transparent Sprints",
                desc: "Disciplined 2-to-4 week milestones and 4-to-6 week MVP launches with weekly recorded video demos, live staging URLs, and bilateral NDAs.",
              },
            ].map((q, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    padding: "28px 24px",
                    height: "100%",
                  }}
                >
                  <div style={{ color: "var(--primary)", fontSize: "1.4rem", marginBottom: "14px" }}>
                    <i className={`fas ${q.icon}`} />
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", marginBottom: "10px" }}>
                    {q.title}
                  </h4>
                  <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
                    {q.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/team" className="btn-p">
              Meet Our Principal Engineering Leads <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials">
        <div className="tst-bg"></div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row sec-hd">
            <div className="col-lg-6">
              <div className="sec-badge">Testimonials</div>
              <h2 className="sec-title" style={{ color: "#fff" }}>What Our <span>Clients Say</span></h2>
            </div>
            <div className="col-lg-6 d-flex align-items-end">
              <p className="sec-desc ms-auto" style={{ color: "rgba(255,255,255,.55)" }}>
                Verified client reviews and feedback will appear here as projects are published.
              </p>
            </div>
          </div>

          {googleReviews.reviews.length > 0 ? (
            <>
              <div className="row g-4 mb-4">
                {googleReviews.reviews.slice(0, 3).map((rev) => (
                  <div className="col-lg-4 col-md-6" key={rev.id}>
                    <div
                      className="tst-card h-100 d-flex flex-column justify-content-between"
                      style={{ padding: "28px" }}
                    >
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div style={{ color: "#f59e0b", display: "flex", gap: "4px", fontSize: "0.9rem" }}>
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            ))}
                          </div>
                          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                            {rev.relativeTime}
                          </span>
                        </div>
                        <p className="tst-txt" style={{ marginBottom: "20px" }}>
                          {rev.quote ? <>&ldquo;{rev.quote}&rdquo;</> : "Rated 5 stars on Google."}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        {rev.avatar ? (
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            referrerPolicy="no-referrer"
                            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              background: "rgba(223,193,93,0.18)",
                              color: "#dfc15d",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                            }}
                          >
                            {rev.author.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                            {rev.author}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
                            Verified Google Review
                          </div>
                        </div>
                        <i className="fas fa-check-circle" style={{ color: "#22c55e" }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center d-flex justify-content-center gap-3 flex-wrap">
                <Link href="/reviews" className="btn-o">
                  View All Google Reviews <i className="fas fa-arrow-right"></i>
                </Link>
                {googleReviews.writeReviewUri && (
                  <a
                    href={googleReviews.writeReviewUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-p"
                  >
                    <i className="fas fa-star"></i> Leave a Review
                  </a>
                )}
              </div>
            </>
          ) : (
            <div
              className="tst-card"
              style={{
                textAlign: "center",
                padding: "48px 28px",
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              <div style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "12px" }}>
                <i className="fas fa-comments"></i>
              </div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "8px" }}>No Client Reviews Yet</h4>
              <p className="tst-txt" style={{ marginBottom: "22px" }}>
                We are setting up verified Google Reviews. Visit our reviews page or reach out directly to speak with our engineering team.
              </p>
              <Link href="/reviews" className="btn-o">
                View Reviews Page <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-lg-5">
              <div className="sec-badge">FAQ</div>
              <h2 className="sec-title">Frequently Asked <span>Questions</span></h2>
              <p className="sec-desc">Everything you need to know about working with Novity Tech Digital Agency.</p>
              <a
                href="#contact"
                className="btn-p mt-4"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Still have questions? <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <div className="col-lg-7">
              <div className="accordion faq-acc" id="faqAcc">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${activeFaq === i ? "" : "collapsed"}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === i ? "show" : ""}`}>
                      <div className="accordion-body">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LATEST NEWS ==================== */}
      <section id="news">
        <div className="container">
          <div className="row sec-hd align-items-end">
            <div className="col-lg-6">
              <div className="sec-badge">Blog &amp; Resources</div>
              <h2 className="sec-title">Latest <span>Insights</span></h2>
            </div>
            <div className="col-lg-6 text-lg-end">
              <Link href="/blog" className="btn-o">
                View All Posts <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div
            className="news-card"
            style={{
              textAlign: "center",
              padding: "48px 28px",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "1.8rem", color: "var(--primary)", marginBottom: "12px" }}>
              <i className="fas fa-pen-nib"></i>
            </div>
            <h4 className="news-title" style={{ marginBottom: "8px" }}>No Blog Posts Yet</h4>
            <p className="news-ex" style={{ marginBottom: "22px" }}>
              New engineering articles and insights will be published here soon.
            </p>
            <Link href="/blog" className="btn-o">
              Visit Blog <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-12 text-center">
              <div className="sec-badge">Get in Touch</div>
              <h2 className="sec-title">Let&apos;s Start a <span>Conversation</span></h2>
              <p className="sec-desc mx-auto">Ready to grow? Tell us about your project and we&apos;ll respond within 24 hours.</p>
            </div>
          </div>
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <a
                href="https://maps.google.com/?q=Gujranwala,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="ci-item"
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer", display: "flex" }}
              >
                <div className="ci-ico"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <div className="ci-lbl">Our Office</div>
                  <div className="ci-val">
                    Gujranwala, Pakistan <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: "0.75rem", color: "var(--primary)", marginLeft: "4px" }}></i>
                  </div>
                </div>
              </a>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-phone"></i></div>
                <div>
                  <div className="ci-lbl">Call Us</div>
                  <div className="ci-val"><a href="tel:+923291013649">+92 329 1013649</a></div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="ci-lbl">Email Us</div>
                  <div className="ci-val"><a href="mailto:novitytechh@gmail.com">novitytechh@gmail.com</a></div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-clock"></i></div>
                <div>
                  <div className="ci-lbl">Business Hours</div>
                  <div className="ci-val">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 2:00 PM</div>
                </div>
              </div>
              <div className="ft-soc" style={{ marginTop: "16px" }}>
                <a href="https://x.com/NovityTech" target="_blank" rel="noreferrer" aria-label="Twitter" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-twitter"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-linkedin-in"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61596480181591" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-facebook-f"></i></a>
                <a href="https://github.com/novitytechh" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-github"></i></a>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="cf-wrap">
                <form onSubmit={handleContactSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Your last name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 329 1013649"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Service of Interest</label>
                      <select
                        className="form-select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        <option>Digital Marketing Strategy</option>
                        <option>Brand Strategy &amp; Positioning</option>
                        <option>SEO &amp; Performance Marketing</option>
                        <option>Social Media Marketing</option>
                        <option>Web Design &amp; Development</option>
                        <option>Content Creation</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Project Budget</label>
                      <select
                        className="form-select"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Select budget range</option>
                        <option>Under $1,000/month</option>
                        <option>$1,000 � $3,000/month</option>
                        <option>$3,000 � $10,000/month</option>
                        <option>$10,000+/month</option>
                        <option>Let&apos;s discuss</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Tell Us About Your Project *</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your goals, challenges, and what you're looking to achieve..."
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn-p w-100 justify-content-center"
                        id="cfSubmit"
                        disabled={formStatus === "sending"}
                        style={formStatus === "sent" ? { background: "#22c55e", borderColor: "#22c55e" } : {}}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {formStatus === "idle" && (
                          <>Send Message <i className="fas fa-paper-plane ms-2"></i></>
                        )}
                        {formStatus === "sending" && (
                          <><i className="fas fa-spinner fa-spin me-2"></i> Sending...</>
                        )}
                        {formStatus === "sent" && (
                          <><i className="fas fa-check me-2"></i> Message Sent! We&apos;ll be in touch.</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA BOTTOM ==================== */}
      <section id="cta-bottom">
        <div className="cta-pat"></div>
        <div className="container cta-cnt">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="sec-badge" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>
                Ready to Grow?
              </div>
              <h2 className="cta-title">
                Let&apos;s Work Together &amp;
                <br />
                Build Something <span style={{ textDecoration: "underline", textDecorationColor: "rgba(255,255,255,.35)" }}>Great</span>
              </h2>
              <p className="cta-desc">
                Join 20+ forward-thinking businesses that trust Novity Tech to drive their digital growth. Start your free consultation today.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end mt-4 mt-lg-0">
              <div className="d-flex gap-3 justify-content-lg-end flex-wrap">
                <a
                  href="#contact"
                  className="btn-w"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Free Consultation <i className="fas fa-arrow-right"></i>
                </a>
                <a
                  href="tel:+923291013649"
                  className="btn-hs"
                  style={{ borderColor: "rgba(255,255,255,.25)" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <i className="fas fa-phone"></i> Call Us: +92 329 1013649
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <Footer />

      {/* ==================== MODALS ==================== */}

      {/* VIDEO MODAL */}
      {activeModal === "videoModal" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ background: "#000", border: "none", position: "relative" }}>
              <div className="modal-header" style={{ border: "none", position: "absolute", top: 10, right: 10, zIndex: 10 }}>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActiveModal(null)}
                  style={{ background: "#fff", padding: "8px", borderRadius: "50%", opacity: 0.9 }}
                ></button>
              </div>
              <div className="modal-body p-0 d-flex align-items-center justify-content-center" style={{ aspectRatio: "16/9" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/RXv_uIN6e-Y?autoplay=1"
                  title="Agency Showreel Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 1 */}
      {activeModal === "svcM1" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Digital Marketing Strategy</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-chart-pie"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  Our Digital Marketing Strategy service begins with a thorough audit of your current digital landscape, competitive analysis, and customer journey mapping to build a roadmap aligned with your business goals.
                </p>
                <h6 style={{ fontWeight: 700, marginBottom: "16px" }}>What&apos;s Included:</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Digital Audit &amp; Assessment</div>
                      <div className="sub-svc-d">Comprehensive review of your current digital assets, channels, and performance metrics.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Competitive Analysis</div>
                      <div className="sub-svc-d">Deep dive into competitor strategies, positioning, and gap opportunities for your brand.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Customer Journey Mapping</div>
                      <div className="sub-svc-d">Define touchpoints and optimize the path from awareness to conversion and loyalty.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>KPI Framework &amp; Reporting</div>
                      <div className="sub-svc-d">Custom dashboards and reporting structures to track what matters most to your business.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 2 */}
      {activeModal === "svcM2" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Brand Strategy &amp; Positioning</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-fingerprint"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  We craft distinctive brand identities that cut through the noise and create lasting connections. From brand discovery to full guidelines, we build brands people love and remember.
                </p>
                <h6 style={{ fontWeight: 700, marginBottom: "16px" }}>What&apos;s Included:</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Brand Discovery Workshop</div>
                      <div className="sub-svc-d">Collaborative sessions to uncover your brand&apos;s purpose, values, and unique differentiators.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Visual Identity Design</div>
                      <div className="sub-svc-d">Logo, color palette, typography, and visual system that embody your brand personality.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 3 */}
      {activeModal === "svcM3" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">SEO &amp; Performance Marketing</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-search"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  Drive qualified traffic and maximize ROI through our proven SEO strategies and performance campaigns. We make every click count and every marketing dollar work harder for your business.
                </p>
                <h6 style={{ fontWeight: 700, marginBottom: "16px" }}>What&apos;s Included:</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Technical SEO Audit</div>
                      <div className="sub-svc-d">Identify and fix technical issues that prevent your site from ranking and converting.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sub-svc">
                      <div className="sub-svc-n"><i className="fas fa-check" style={{ color: "var(--primary)", marginRight: "8px" }}></i>Google Ads (PPC)</div>
                      <div className="sub-svc-d">High-performance paid campaigns with continuous optimization for maximum ROAS.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 4 */}
      {activeModal === "svcM4" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Social Media Marketing</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-share-alt"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  Build a powerful social media presence that drives real engagement, grows your community, and converts followers into customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 5 */}
      {activeModal === "svcM5" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Web Design &amp; Development</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-code"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  We build fast, beautiful, conversion-focused websites and digital platforms that deliver exceptional user experiences and measurable business results for your brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL 6 */}
      {activeModal === "svcM6" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Content Creation</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mod-svc-ico"><i className="fas fa-pen-nib"></i></div>
                <p style={{ color: "var(--text2)", marginBottom: "22px", lineHeight: "1.82" }}>
                  Content that educates, entertains, and converts. Our team creates content that builds authority and drives sustainable organic growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC PORTFOLIO MODAL */}
      {activePortfolioModalItem && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{activePortfolioModalItem.name || activePortfolioModalItem.title}</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body" style={{ padding: "30px" }}>
                <div className="row g-4 align-items-stretch">
                  {/* LEFT SIDE: ONLY THE PICS */}
                  <div className="col-lg-5 col-12 d-flex flex-column align-items-center justify-content-center" style={{ background: "radial-gradient(circle at center, #15141d 0%, #0a090e 100%)", borderRadius: "20px", padding: "30px 16px", border: "1px solid var(--border)" }}>
                    {activePortfolioModalItem.deviceType === "desktop-dual" ? (
                      <DualFrontBackMockup
                        frontSrc={activePortfolioModalItem.frontImage || activePortfolioModalItem.screens?.[0]?.src}
                        backSrc={activePortfolioModalItem.backImage || activePortfolioModalItem.screens?.[1]?.src}
                        frontTitle={activePortfolioModalItem.screens?.[0]?.title || "Storefront (Front)"}
                        backTitle={activePortfolioModalItem.screens?.[1]?.title || "Product Detail (Back)"}
                        interval={2500}
                        transitionDuration={1800}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "280px",
                          height: "560px",
                          borderRadius: "34px",
                          overflow: "hidden",
                          border: "2px solid rgba(223, 193, 93, 0.45)",
                          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(223, 193, 93, 0.15)",
                          position: "relative",
                          background: "#050508",
                        }}
                      >
                        {activePortfolioModalItem.screens && activePortfolioModalItem.screens.length > 0 ? (
                          <ProjectImageSlideshow
                            images={activePortfolioModalItem.screens}
                            interval={2500}
                            transitionDuration={1800}
                            height="100%"
                            showControls={true}
                            showIndicators={true}
                            pauseOnHover={true}
                            activeSlideIndex={activeModalSlideIndex}
                            onSlideChange={setActiveModalSlideIndex}
                            objectFit="cover"
                            objectPosition="top center"
                          />
                        ) : (
                          (activePortfolioModalItem.img || activePortfolioModalItem.image) && (
                            <img
                              className="pf-mod-img"
                              src={activePortfolioModalItem.img || activePortfolioModalItem.image}
                              alt={activePortfolioModalItem.name || activePortfolioModalItem.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE: THE DESCRIPTION */}
                  <div className="col-lg-7 col-12 d-flex flex-column justify-content-between">
                    <div>
                      <div className="row g-3 mb-4">
                        {activePortfolioModalItem.client && (
                          <div className="col-6 col-md-3">
                            <div className="pf-d-lbl">Client</div>
                            <div className="pf-d-val">{activePortfolioModalItem.client}</div>
                          </div>
                        )}
                        <div className="col-6 col-md-3">
                          <div className="pf-d-lbl">Category</div>
                          <div className="pf-d-val">{activePortfolioModalItem.catLabel || activePortfolioModalItem.categoryLabel || activePortfolioModalItem.category}</div>
                        </div>
                        {activePortfolioModalItem.year && (
                          <div className="col-6 col-md-3">
                            <div className="pf-d-lbl">Year</div>
                            <div className="pf-d-val">{activePortfolioModalItem.year}</div>
                          </div>
                        )}
                        {activePortfolioModalItem.duration && (
                          <div className="col-6 col-md-3">
                            <div className="pf-d-lbl">Duration</div>
                            <div className="pf-d-val">{activePortfolioModalItem.duration}</div>
                          </div>
                        )}
                      </div>

                      {(activePortfolioModalItem.desc || activePortfolioModalItem.overview) && (
                        <>
                          <h6 style={{ fontWeight: 800, marginBottom: "12px", color: "var(--text)" }}>Project Overview</h6>
                          <p style={{ color: "var(--text2)", lineHeight: "1.82", marginBottom: "20px", fontSize: "0.94rem" }}>
                            {activePortfolioModalItem.desc || activePortfolioModalItem.overview}
                          </p>
                        </>
                      )}

                      {activePortfolioModalItem.keyFeatures && (
                        <div style={{ marginBottom: "20px" }}>
                          <h6 style={{ fontWeight: 800, marginBottom: "10px", color: "var(--text)" }}>Key Capabilities</h6>
                          <ul style={{ paddingLeft: "20px", margin: 0, color: "var(--text2)", fontSize: "0.9rem", lineHeight: "1.75" }}>
                            {activePortfolioModalItem.keyFeatures.map((feat, fIdx) => (
                              <li key={fIdx} style={{ marginBottom: "6px" }}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activePortfolioModalItem.tech && activePortfolioModalItem.tech.length > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                          <h6 style={{ fontWeight: 800, marginBottom: "10px", color: "var(--text)" }}>Technology Stack</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {activePortfolioModalItem.tech.map((t, idx) => (
                              <span
                                key={idx}
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "8px",
                                  background: "rgba(223, 193, 93, 0.08)",
                                  border: "1px solid rgba(223, 193, 93, 0.25)",
                                  color: "var(--primary)",
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(activePortfolioModalItem.screens || activePortfolioModalItem.gallery) && (
                        <div style={{ marginBottom: "24px" }}>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 style={{ fontWeight: 800, margin: 0, color: "var(--text)" }}>
                              Serial Application Workflow
                            </h6>
                            <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700 }}>
                              Click screen to switch preview
                            </span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
                            {(activePortfolioModalItem.screens || activePortfolioModalItem.gallery).map((scr, sIdx) => {
                              const src = typeof scr === "string" ? scr : scr.src;
                              const title = typeof scr === "string" ? `Screen 0${sIdx + 1}` : scr.title;
                              const step = typeof scr === "string" ? `0${sIdx + 1}` : scr.step;
                              const tag = typeof scr === "string" ? "" : scr.tag;
                              const isCurrent = activeModalSlideIndex === sIdx;

                              return (
                                <div
                                  key={sIdx}
                                  onClick={() => setActiveModalSlideIndex(sIdx)}
                                  style={{
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: isCurrent
                                      ? "2px solid var(--primary, #dfc15d)"
                                      : "1px solid var(--border)",
                                    background: "#0c0b10",
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    boxShadow: isCurrent ? "0 0 16px rgba(223, 193, 93, 0.35)" : "none",
                                    transform: isCurrent ? "scale(1.02)" : "scale(1)",
                                  }}
                                >
                                  <div style={{ height: "130px", overflow: "hidden" }}>
                                    <img
                                      src={src}
                                      alt={title}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "top center",
                                        transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                                      }}
                                    />
                                  </div>
                                  <div style={{ padding: "6px 8px", background: "rgba(18, 17, 24, 0.95)" }}>
                                    <div style={{ fontSize: "0.68rem", color: "var(--primary)", fontWeight: 800 }}>
                                      {step} • {tag || "Step"}
                                    </div>
                                    <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                      {title}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activePortfolioModalItem.result && (
                        <div className="pf-result" style={{ marginTop: "16px" }}>
                          <p><strong>Result:</strong> {activePortfolioModalItem.result}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM MODALS */}
      {activeTeamMember && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{activeTeamMember.name} Profile</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="tm-mod-hd" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  {activeTeamMember.image ? (
                    <img
                      src={activeTeamMember.image}
                      alt={activeTeamMember.name}
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "18px",
                        objectFit: "cover",
                        objectPosition: "top center",
                        border: "2px solid rgba(223, 193, 93, 0.6)",
                        boxShadow: "0 0 20px rgba(223, 193, 93, 0.25)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "18px",
                        background: "rgba(223, 193, 93, 0.15)",
                        border: "1px solid rgba(223, 193, 93, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)",
                        fontSize: "1.6rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fas ${activeTeamMember.icon}`}></i>
                    </div>
                  )}
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: activeTeamMember.role ? "4px" : "0" }}>{activeTeamMember.name}</h4>
                    {activeTeamMember.role ? (
                      <div className="tm-mod-role" style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>
                        {activeTeamMember.role}
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="tm-mod-bio" style={{ color: "var(--text2)", lineHeight: "1.8", marginBottom: "20px" }}>
                  {activeTeamMember.bio}
                </p>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Core Expertise & Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {activeTeamMember.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--border)",
                        fontSize: "0.78rem",
                        color: "var(--text)",
                        fontWeight: 600,
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {activeTeamMember.services && (
                  <div style={{ marginTop: "16px" }}>
                    <h6 style={{ fontWeight: 700, marginBottom: "8px" }}>Primary Services Led</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {activeTeamMember.services.map((svc, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "8px",
                            background: "rgba(223, 193, 93, 0.08)",
                            border: "1px solid rgba(223, 193, 93, 0.25)",
                            fontSize: "0.76rem",
                            color: "var(--primary)",
                            fontWeight: 600,
                          }}
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

