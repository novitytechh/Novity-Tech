"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  // Loading state
  const [loading, setLoading] = useState(true);
  // Theme state
  const [theme, setTheme] = useState("light");
  // Navbar & scroll state
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [navOpen, setNavOpen] = useState(false);
  // Pricing toggle (monthly vs yearly)
  const [yearly, setYearly] = useState(false);
  // Portfolio filter
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  // FAQ accordion
  const [activeFaq, setActiveFaq] = useState(0);
  // Active modal
  const [activeModal, setActiveModal] = useState(null);
  // Testimonial slider index
  const [activeSlide, setActiveSlide] = useState(0);
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

  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // Counter numbers
  const [counters, setCounters] = useState({
    projects: 0,
    satisfaction: 0,
    experience: 0,
    awards: 0,
  });

  // Handle Initial Load & Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("nxTheme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
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
    if (loading) return;
    const duration = 1800;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const factor = 1 - (1 - progress) * (1 - progress);

      setCounters({
        projects: Math.floor(250 * factor),
        satisfaction: Math.floor(98 * factor),
        experience: Math.floor(12 * factor),
        awards: Math.floor(40 * factor),
      });

      if (progress >= 1) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [loading]);

  // Cursor tracking
  useEffect(() => {
    let animId;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setCursorPos({ x: mx, y: my });
    };

    const animLoop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      setRingPos({ x: rx, y: ry });
      animId = requestAnimationFrame(animLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(animLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Scroll listener for sticky navbar, active nav links, and scroll-to-top
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      setScrolled(st > 50);
      setShowScrollTop(st > 300);

      const sections = ["hero", "about", "services", "portfolio", "team", "pricing", "news", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && st >= el.offsetTop - 140) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonials Auto-Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
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
  const portfolioItems = [
    {
      id: "pfM1",
      cat: "branding",
      catLabel: "Branding",
      name: "Brand Identity & Positioning",
      img: "/img/portfolio/p1.jpg",
      height: "380px",
      colClass: "col-lg-8",
    },
    {
      id: "pfM2",
      cat: "social",
      catLabel: "Social Media",
      name: "Social Growth Campaign",
      img: "/img/portfolio/p2.jpg",
      height: "380px",
      colClass: "col-lg-4",
    },
    {
      id: "pfM4",
      cat: "digital",
      catLabel: "SEO / Digital",
      name: "SEO Performance Campaign",
      img: "/img/portfolio/p3.jpg",
      height: "300px",
      colClass: "col-lg-4",
    },
    {
      id: "pfM5",
      cat: "web",
      catLabel: "Web Design",
      name: "SaaS Platform Redesign",
      img: "/img/portfolio/p4.jpg",
      height: "300px",
      colClass: "col-lg-4",
    },
    {
      id: "pfM3",
      cat: "branding",
      catLabel: "Branding",
      name: "Brand Refresh & Rebranding",
      img: "/img/portfolio/p5.jpg",
      height: "300px",
      colClass: "col-lg-4",
    },
  ];

  const filteredPortfolio = portfolioFilter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.cat === portfolioFilter);

  // Testimonials data
  const testimonials = [
    {
      quote: "Novity Tech completely transformed our digital presence. Their data-driven SEO approach helped us achieve a 3x increase in organic traffic within just six months. Incredibly talented and deeply invested in our success.",
      name: "Alex Thompson",
      role: "CEO, TechFlow Inc.",
      img: "/img/testimonial/1.jpg",
      rating: 5,
    },
    {
      quote: "Working with Novity Tech on our brand relaunch was a game-changer. They truly understood our values and crafted a brand identity that resonates perfectly with our audience. Revenue doubled in the first year.",
      name: "Priya Sharma",
      role: "Founder, Blooma Wellness",
      img: "/img/testimonial/2.jpg",
      rating: 5,
    },
    {
      quote: "The social media strategy Novity Tech developed is exceptional. We grew from 10K to 250K followers in 8 months, and more importantly, our engagement and conversions have never been higher. Highly recommend.",
      name: "Marcus Williams",
      role: "CMO, SportEdge",
      img: "/img/testimonial/3.jpg",
      rating: 5,
    },
    {
      quote: "From PPC campaigns to our new website, every deliverable from Novity Tech exceeded expectations. Their attention to detail and strategic thinking set them apart from every agency we've worked with before.",
      name: "Rachel Kim",
      role: "Director, NovaBuild",
      img: "/img/testimonial/4.jpg",
      rating: 4.5,
    },
  ];

  // FAQ items data
  const faqs = [
    {
      q: "How long does it take to see results from digital marketing?",
      a: "SEO typically shows meaningful results in 3–6 months, while PPC and social media campaigns can drive traffic and leads within days. We set realistic timelines based on your industry, competition, and goals from day one.",
    },
    {
      q: "What makes Novity Tech different from other digital agencies?",
      a: "We combine deep strategic thinking with creative excellence and technical expertise under one roof. Every campaign is backed by data, crafted with care, and optimized relentlessly. We don't just execute — we become a true extension of your team.",
    },
    {
      q: "Do you work with small businesses or only enterprises?",
      a: "We work with businesses of all sizes — from ambitious startups to Fortune 500 companies. Our tiered pricing and flexible packages are designed to grow alongside your business, ensuring maximum value at every stage.",
    },
    {
      q: "How do you measure and report on campaign performance?",
      a: "We provide transparent reporting through custom dashboards and regular reports (weekly or monthly based on your plan). We track KPIs that matter — traffic, leads, conversions, ROAS, and revenue impact — giving you a clear picture of ROI.",
    },
    {
      q: "Can we start with just one service and expand later?",
      a: "Absolutely. Many clients start with a single service — often SEO or social media — and expand as they see results. We design each engagement to be modular, so scaling up is seamless and strategic.",
    },
    {
      q: "What is your contract length and cancellation policy?",
      a: "We offer both month-to-month and annual contracts (with discounts for annual commitment). We believe in earning your business every month, so there are no long-term lock-ins for standard plans.",
    },
  ];

  return (
    <>
      {/* LOADER */}
      {loading && (
        <div id="loader" className={!loading ? "gone" : ""}>
          <div className="ld-logo">
            Min<span>ton</span>
          </div>
          <div className="ld-bar">
            <div className="ld-fill"></div>
          </div>
        </div>
      )}

      {/* CURSOR */}
      <div
        className="c-dot"
        id="cDot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div
        className={`c-ring ${isHovered ? "big" : ""}`}
        id="cRing"
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
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

      {/* ==================== TOPBAR ==================== */}
      <div id="topbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 tb-l">
              <a href="mailto:info@mintonagency.com">
                <i className="fas fa-envelope"></i> info@mintonagency.com
              </a>
              <a href="tel:+15551234567">
                <i className="fas fa-phone"></i> +1 (555) 123-4567
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
                <i className="fas fa-map-marker-alt"></i> 125 Creative St, New York
              </a>
            </div>
            <div className="col-lg-5">
              <div className="tb-r">
                <div className="tb-soc">
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Dribbble"><i className="fab fa-dribbble"></i></a>
                </div>
                <button
                  className="t-toggle"
                  id="themeBtn"
                  onClick={toggleTheme}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="t-icon">
                    <i className={`fas ${theme === "dark" ? "fa-moon" : "fa-sun"}`} id="thIco"></i>
                  </div>
                  <span id="thLbl">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== NAVBAR ==================== */}
      <nav id="navbar" className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a
            className="navbar-brand"
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
          >
            NOVITY<span> TECH</span>
          </a>
          <button
            className="navbar-toggler"
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
          <div className={`collapse navbar-collapse justify-content-center ${navOpen ? "show" : ""}`} id="navMenu">
            <ul className="navbar-nav gap-1">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "hero" ? "active" : ""}`}
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "about" ? "active" : ""}`}
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollTo("about"); }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "services" ? "active" : ""}`}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "portfolio" ? "active" : ""}`}
                  href="#portfolio"
                  onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}
                >
                  Work
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "team" ? "active" : ""}`}
                  href="#team"
                  onClick={(e) => { e.preventDefault(); scrollTo("team"); }}
                >
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "pricing" ? "active" : ""}`}
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); scrollTo("pricing"); }}
                >
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/reviews"
                >
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "news" ? "active" : ""}`}
                  href="#news"
                  onClick={(e) => { e.preventDefault(); scrollTo("news"); }}
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNav === "contact" ? "active" : ""}`}
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <a
            href="#contact"
            className="nav-link nav-cta ms-3 d-none d-lg-inline-flex"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get Started <i className="fas fa-arrow-right ms-1"></i>
          </a>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section id="hero">
        <div className="hero-pbg" id="heroPBG"></div>
        <div className="hero-ov"></div>
        <div className="hero-grain"></div>
        <div className="hero-glow" style={{ top: "-120px", right: "-80px" }}></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-tag">
                <span className="hero-dot"></span>Award-Winning Digital Agency
              </div>
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
                <button
                  type="button"
                  className="btn-hs border-0 bg-transparent"
                  onClick={() => setActiveModal("videoModal")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="pico">
                    <i className="fas fa-play"></i>
                  </div>
                  <span>Watch Our Story</span>
                </button>
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
                <div className="hstat-div"></div>
                <div className="hstat">
                  <div className="hstat-num">
                    <span>{counters.awards}</span>
                    <span>+</span>
                  </div>
                  <div className="hstat-lbl">Awards Won</div>
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
                <img className="about-img" src="/img/about-img.jpg" alt="About Novity Tech" />
                <div className="about-exp">
                  <div className="about-exp-n">12+</div>
                  <div className="about-exp-l">Years of Excellence</div>
                </div>
                <div className="about-clients">
                  <div className="cl-avs">
                    <img className="cl-av" src="/img/ab1.jpg" alt="Client 1" />
                    <img className="cl-av" src="/img/ab2.jpg" alt="Client 2" />
                    <img className="cl-av" src="/img/ab3.jpg" alt="Client 3" />
                  </div>
                  <div className="cl-cnt">250+ Happy Clients</div>
                  <div className="cl-lbl">98% satisfaction rate</div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-cnt">
                <div className="sec-badge">About Our Agency</div>
                <h2 className="sec-title">We&apos;re a Digital-First <span>Creative Agency</span></h2>
                <p className="about-desc">
                  Founded in 2012, Minton is a full-service digital marketing agency blending creative thinking with data-driven strategy. We believe great work happens at the intersection of art and science — where bold ideas meet measurable results.
                </p>
                <p className="about-desc">
                  Our team of 50+ specialists across marketing, design, and technology work as an extension of your business, obsessed with your growth.
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

      {/* ==================== SHOWREEL ==================== */}
      <section id="showreel">
        <div className="sr-bg"></div>
        <div className="container sr-cnt">
          <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
            <div className="sr-yr">&copy;2026</div>
            <div className="sr-play">
              <button
                type="button"
                className="sr-play border-0 bg-transparent"
                onClick={() => setActiveModal("videoModal")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="pico"><i className="fas fa-play"></i></div>
              </button>
            </div>
            <h2 className="sr-title">SHOWREEL</h2>
            <i className="fas fa-star sr-star"></i>
            <h2 className="sr-title">HIGHLIGHTS</h2>
          </div>
        </div>
        <div className="mq-wrap">
          <div className="mq-track">
            <span className="mq-item">Digital Marketing <span>★</span></span>
            <span className="mq-item">Brand Identity <span>★</span></span>
            <span className="mq-item">Web Design <span>★</span></span>
            <span className="mq-item">SEO Strategy <span>★</span></span>
            <span className="mq-item">Social Media <span>★</span></span>
            <span className="mq-item">Content Creation <span>★</span></span>
            <span className="mq-item">Performance Marketing <span>★</span></span>
            <span className="mq-item">Digital Marketing <span>★</span></span>
            <span className="mq-item">Brand Identity <span>★</span></span>
            <span className="mq-item">Web Design <span>★</span></span>
            <span className="mq-item">SEO Strategy <span>★</span></span>
            <span className="mq-item">Social Media <span>★</span></span>
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
                {["all", "branding", "digital", "web", "social"].map((tab) => (
                  <button
                    key={tab}
                    className={`ftab ${portfolioFilter === tab ? "active" : ""}`}
                    onClick={() => setPortfolioFilter(tab)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row g-4" id="pfGrid">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className={`${item.colClass} pf-cat`}>
                <div
                  className="pf-item"
                  style={{ height: item.height, cursor: "pointer" }}
                  onClick={() => setActiveModal(item.id)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img className="pf-img" src={item.img} alt={item.name} />
                  <div className="pf-ov">
                    <div>
                      <div className="pf-cat">{item.catLabel}</div>
                      <h3 className="pf-name">{item.name}</h3>
                    </div>
                  </div>
                  <div className="pf-plus"><i className="fas fa-plus"></i></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section id="team">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-lg-6">
              <div className="sec-badge">Our People</div>
              <h2 className="sec-title">Meet the Team of <span>Experts</span></h2>
            </div>
            <div className="col-lg-6 d-flex align-items-end">
              <p className="sec-desc ms-auto">
                Strategists, designers, developers, and marketers united by a passion for exceptional work and client results.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {/* Team 1 */}
            <div className="col-lg-3 col-md-4 col-6">
              <div
                className="tm-card"
                onClick={() => setActiveModal("tmM1")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="tm-img-wrap">
                  <img className="tm-img" src="/img/team/1.jpg" alt="Michael Chen" />
                  <div className="tm-img-ov">
                    <div className="tm-view"><i className="fas fa-user"></i></div>
                  </div>
                </div>
                <div className="tm-info">
                  <h5 className="tm-name">Michael Chen</h5>
                  <div className="tm-role">Creative Director</div>
                  <div className="tm-soc">
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team 2 */}
            <div className="col-lg-3 col-md-4 col-6">
              <div
                className="tm-card"
                onClick={() => setActiveModal("tmM2")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="tm-img-wrap">
                  <img className="tm-img" src="/img/team/2.jpg" alt="Sarah Williams" />
                  <div className="tm-img-ov">
                    <div className="tm-view"><i className="fas fa-user"></i></div>
                  </div>
                </div>
                <div className="tm-info">
                  <h5 className="tm-name">Sarah Williams</h5>
                  <div className="tm-role">Head of Strategy</div>
                  <div className="tm-soc">
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team 3 */}
            <div className="col-lg-3 col-md-4 col-6">
              <div
                className="tm-card"
                onClick={() => setActiveModal("tmM3")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="tm-img-wrap">
                  <img className="tm-img" src="/img/team/3.jpg" alt="David Rodriguez" />
                  <div className="tm-img-ov">
                    <div className="tm-view"><i className="fas fa-user"></i></div>
                  </div>
                </div>
                <div className="tm-info">
                  <h5 className="tm-name">David Rodriguez</h5>
                  <div className="tm-role">Lead Designer</div>
                  <div className="tm-soc">
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-dribbble"></i></a>
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team 4 */}
            <div className="col-lg-3 col-md-4 col-6">
              <div
                className="tm-card"
                onClick={() => setActiveModal("tmM4")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="tm-img-wrap">
                  <img className="tm-img" src="/img/team/4.jpg" alt="Lisa Park" />
                  <div className="tm-img-ov">
                    <div className="tm-view"><i className="fas fa-user"></i></div>
                  </div>
                </div>
                <div className="tm-info">
                  <h5 className="tm-name">Lisa Park</h5>
                  <div className="tm-role">SEO Expert</div>
                  <div className="tm-soc">
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" onClick={(e) => e.stopPropagation()}><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-12 text-center">
              <div className="sec-badge">Pricing</div>
              <h2 className="sec-title">Simple, <span>Transparent</span> Pricing</h2>
              <p className="sec-desc mx-auto">Choose the plan that fits your growth stage. All plans include a 14-day free trial.</p>
            </div>
          </div>
          <div className="pr-toggle-wrap">
            <span className={`pr-lbl ${!yearly ? "on" : ""}`} id="prMoLbl">Monthly</span>
            <button
              className={`pr-sw ${yearly ? "on" : ""}`}
              id="prSw"
              onClick={() => setYearly(!yearly)}
              aria-label="Toggle annual pricing"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="pr-knob"></div>
            </button>
            <span className={`pr-lbl ${yearly ? "on" : ""}`} id="prYrLbl">
              Yearly <span className="save-b">Save 20%</span>
            </span>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Starter Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pr-card">
                <div className="pr-tier">Starter</div>
                <div className="pr-price-wrap">
                  <span className="pr-cur">$</span>
                  <span className="pr-amt" id="pr1">{yearly ? "239" : "299"}</span>
                  <span className="pr-per">/month</span>
                </div>
                <p className="pr-desc">Perfect for small businesses ready to establish their digital presence and start growing.</p>
                <div className="pr-hr"></div>
                <ul className="pr-feats">
                  <li><i className="fas fa-check-circle"></i>Digital Marketing Strategy</li>
                  <li><i className="fas fa-check-circle"></i>SEO Audit &amp; Basics</li>
                  <li><i className="fas fa-check-circle"></i>Social Media (2 platforms)</li>
                  <li><i className="fas fa-check-circle"></i>Monthly Analytics Reports</li>
                  <li><i className="fas fa-check-circle"></i>5 Blog Posts / Month</li>
                  <li className="no"><i className="fas fa-times-circle"></i>PPC Campaign Management</li>
                  <li className="no"><i className="fas fa-times-circle"></i>Custom Web Design</li>
                  <li className="no"><i className="fas fa-times-circle"></i>Dedicated Account Manager</li>
                </ul>
                <a
                  href="#contact"
                  className="btn-pr"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
            {/* Professional Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pr-card feat">
                <div className="pr-popular">Most Popular</div>
                <div className="pr-tier">Professional</div>
                <div className="pr-price-wrap">
                  <span className="pr-cur">$</span>
                  <span className="pr-amt" id="pr2">{yearly ? "559" : "699"}</span>
                  <span className="pr-per">/month</span>
                </div>
                <p className="pr-desc">For growing businesses that need a comprehensive digital marketing partner to scale.</p>
                <div className="pr-hr"></div>
                <ul className="pr-feats">
                  <li><i className="fas fa-check-circle"></i>Full Digital Marketing Strategy</li>
                  <li><i className="fas fa-check-circle"></i>Advanced SEO &amp; Content</li>
                  <li><i className="fas fa-check-circle"></i>Social Media (5 platforms)</li>
                  <li><i className="fas fa-check-circle"></i>Weekly Reports &amp; Analytics</li>
                  <li><i className="fas fa-check-circle"></i>PPC Campaign Management</li>
                  <li><i className="fas fa-check-circle"></i>12 Blog Posts / Month</li>
                  <li><i className="fas fa-check-circle"></i>Dedicated Account Manager</li>
                  <li className="no"><i className="fas fa-times-circle"></i>Custom Web Design</li>
                </ul>
                <a
                  href="#contact"
                  className="btn-pr"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pr-card">
                <div className="pr-tier">Enterprise</div>
                <div className="pr-price-wrap">
                  <span className="pr-amt" style={{ fontSize: "2.5rem" }} id="pr3">Custom</span>
                </div>
                <p className="pr-desc">For large organizations needing a fully tailored, end-to-end digital marketing solution.</p>
                <div className="pr-hr"></div>
                <ul className="pr-feats">
                  <li><i className="fas fa-check-circle"></i>Full-Service Digital Marketing</li>
                  <li><i className="fas fa-check-circle"></i>Enterprise SEO &amp; Strategy</li>
                  <li><i className="fas fa-check-circle"></i>All Social Platforms</li>
                  <li><i className="fas fa-check-circle"></i>Real-Time Analytics Dashboard</li>
                  <li><i className="fas fa-check-circle"></i>Custom Web Design &amp; Dev</li>
                  <li><i className="fas fa-check-circle"></i>Unlimited Content Production</li>
                  <li><i className="fas fa-check-circle"></i>Dedicated Team (5+ members)</li>
                  <li><i className="fas fa-check-circle"></i>Priority SLA Support</li>
                </ul>
                <a
                  href="#contact"
                  className="btn-pr"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Contact Sales
                </a>
              </div>
            </div>
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
                Don&apos;t take our word for it — hear from the brands we&apos;ve helped grow significantly.
              </p>
            </div>
          </div>

          {/* Testimonial Interactive Carousel */}
          <div className="tst-slider-container">
            <div
              className="tst-slider-track"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
              }}
            >
              {testimonials.map((t, idx) => (
                <div key={idx} className="tst-slide-item">
                  <div className="tst-card h-100">
                    <span className="tst-q">&ldquo;</span>
                    <div className="tst-stars">
                      {Array.from({ length: Math.floor(t.rating) }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {t.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                    </div>
                    <p className="tst-txt">{t.quote}</p>
                    <div className="tst-auth">
                      <img className="tst-av" src={t.img} alt={t.name} />
                      <div>
                        <div className="tst-name">{t.name}</div>
                        <div className="tst-co">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tst-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`tst-dot ${activeSlide === i ? "active" : ""}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq">
        <div className="container">
          <div className="row sec-hd">
            <div className="col-lg-5">
              <div className="sec-badge">FAQ</div>
              <h2 className="sec-title">Frequently Asked <span>Questions</span></h2>
              <p className="sec-desc">Everything you need to know about working with Minton Digital Agency.</p>
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
              <a
                href="#news"
                className="btn-o"
                onClick={(e) => { e.preventDefault(); setActiveModal("newsM1"); }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                View All Posts <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="row g-4">
            {/* Post 1 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="news-card"
                onClick={() => setActiveModal("newsM1")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="news-img-wrap">
                  <img className="news-img" src="/img/blog/1.jpg" alt="Post 1" />
                </div>
                <div className="news-body">
                  <span className="news-cat">SEO Strategy</span>
                  <h4 className="news-title">10 SEO Trends That Will Define Search Rankings in 2026</h4>
                  <p className="news-ex">AI-driven search, E-E-A-T signals, and Core Web Vitals are reshaping how Google ranks content. Here&apos;s what you need to know.</p>
                  <div className="news-meta">
                    <span><i className="fas fa-calendar"></i> May 14, 2026</span>
                    <span><i className="fas fa-clock"></i> 5 min read</span>
                  </div>
                  <div className="news-rm">Read Article <i className="fas fa-arrow-right"></i></div>
                </div>
              </div>
            </div>
            {/* Post 2 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="news-card"
                onClick={() => setActiveModal("newsM2")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="news-img-wrap">
                  <img className="news-img" src="/img/blog/2.jpg" alt="Post 2" />
                </div>
                <div className="news-body">
                  <span className="news-cat">Brand Strategy</span>
                  <h4 className="news-title">Why Brand Positioning Is the Foundation of Every Marketing Win</h4>
                  <p className="news-ex">Great marketing doesn&apos;t start with tactics — it starts with a clear, compelling position in the market. Learn how to build yours.</p>
                  <div className="news-meta">
                    <span><i className="fas fa-calendar"></i> May 8, 2026</span>
                    <span><i className="fas fa-clock"></i> 7 min read</span>
                  </div>
                  <div className="news-rm">Read Article <i className="fas fa-arrow-right"></i></div>
                </div>
              </div>
            </div>
            {/* Post 3 */}
            <div className="col-lg-4 col-md-6">
              <div
                className="news-card"
                onClick={() => setActiveModal("newsM3")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                <div className="news-img-wrap">
                  <img className="news-img" src="/img/blog/3.jpg" alt="Post 3" />
                </div>
                <div className="news-body">
                  <span className="news-cat">Social Media</span>
                  <h4 className="news-title">The Social Media Algorithm Changes You Need to Know About</h4>
                  <p className="news-ex">Instagram, LinkedIn, and TikTok have all updated their algorithms recently. We break down what changed and how to adapt.</p>
                  <div className="news-meta">
                    <span><i className="fas fa-calendar"></i> Apr 30, 2026</span>
                    <span><i className="fas fa-clock"></i> 6 min read</span>
                  </div>
                  <div className="news-rm">Read Article <i className="fas fa-arrow-right"></i></div>
                </div>
              </div>
            </div>
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
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <div className="ci-lbl">Our Office</div>
                  <div className="ci-val">125 Creative Street, Design City<br />New York, NY 10001</div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-phone"></i></div>
                <div>
                  <div className="ci-lbl">Call Us</div>
                  <div className="ci-val">+1 (555) 123-4567<br />+1 (555) 987-6543</div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="ci-lbl">Email Us</div>
                  <div className="ci-val">
                    <a href="mailto:hello@mintonagency.com">hello@mintonagency.com</a>
                    <br />
                    <a href="mailto:support@mintonagency.com">support@mintonagency.com</a>
                  </div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-ico"><i className="fas fa-clock"></i></div>
                <div>
                  <div className="ci-lbl">Business Hours</div>
                  <div className="ci-val">Mon – Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 2:00 PM</div>
                </div>
              </div>
              <div className="ft-soc" style={{ marginTop: "16px" }}>
                <a href="#" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-twitter"></i></a>
                <a href="#" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-linkedin-in"></i></a>
                <a href="#" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-instagram"></i></a>
                <a href="#" style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)" }}><i className="fab fa-facebook-f"></i></a>
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
                        placeholder="+1 (555) 000-0000"
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
                        <option>$1,000 – $3,000/month</option>
                        <option>$3,000 – $10,000/month</option>
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
                Join 250+ businesses that trust Minton to drive their digital growth. Start your free consultation today.
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
                  href="tel:+15551234567"
                  className="btn-hs"
                  style={{ borderColor: "rgba(255,255,255,.25)" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <i className="fas fa-phone"></i> Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer id="footer">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <a className="ft-brand" href="#" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
                NOVITY<span> TECH</span>
              </a>
              <p className="ft-desc">
                We&apos;re a digital-first agency that transforms bold ideas into measurable growth. Strategy, design, and technology — all under one roof.
              </p>
              <div className="ft-soc">
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Dribbble"><i className="fab fa-dribbble"></i></a>
                <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <h6 className="ft-heading">Services</h6>
              <ul className="ft-links">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Digital Marketing</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Brand Strategy</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>SEO &amp; SEM</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Social Media</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Web Design</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Content Creation</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <h6 className="ft-heading">Company</h6>
              <ul className="ft-links">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About Us</a></li>
                <li><Link href="/reviews">Client Reviews</Link></li>
                <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollTo("team"); }}>Our Team</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}>Portfolio</a></li>
                <li><a href="#news" onClick={(e) => { e.preventDefault(); scrollTo("news"); }}>Blog</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <h6 className="ft-heading">Contact Info</h6>
              <div className="ft-ci">
                <i className="fas fa-map-marker-alt"></i>
                <span>125 Creative Street, Design City<br />New York, NY 10001</span>
              </div>
              <div className="ft-ci">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="ft-ci">
                <i className="fas fa-envelope"></i>
                <span>contact@novitytech.com</span>
              </div>
              <h6 className="ft-heading mt-4">Newsletter</h6>
              <div className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control"
                  style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff" }}
                  placeholder="Your email address"
                />
                <button
                  type="button"
                  className="btn-p"
                  style={{ padding: "10px 16px", flexShrink: 0 }}
                  onClick={() => alert("Thank you for subscribing to our newsletter!")}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ft-div"></div>
        <div className="container">
          <div className="ft-bottom">
            <div className="ft-copy">&copy; 2026 <span>Novity Tech</span>. All rights reserved.</div>
            <div className="ft-blinks">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
                  }
                }}
                style={{ background: "none", border: "none", color: "inherit", padding: 0, font: "inherit", cursor: "pointer", textDecoration: "underline" }}
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

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

      {/* PORTFOLIO MODAL 1 */}
      {activeModal === "pfM1" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Brand Identity &amp; Positioning</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img className="pf-mod-img" src="/img/portfolio/p1.jpg" alt="Brand Identity" />
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Client</div>
                    <div className="pf-d-val">TechFlow Inc.</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Category</div>
                    <div className="pf-d-val">Branding</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Year</div>
                    <div className="pf-d-val">2026</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Duration</div>
                    <div className="pf-d-val">3 Months</div>
                  </div>
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Project Overview</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.82" }}>
                  TechFlow needed a complete brand overhaul to better reflect their position as an enterprise SaaS platform. We conducted extensive market research, developed a new visual identity, and created a comprehensive brand system across all digital and print touchpoints.
                </p>
                <div className="pf-result">
                  <p><strong>Result:</strong> 40% increase in brand recognition, 25% improvement in sales conversion rate post-rebrand, and TechFlow secured 3 major enterprise contracts within the first month of the new brand launch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO MODAL 2 */}
      {activeModal === "pfM2" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Social Media Growth Campaign</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img className="pf-mod-img" src="/img/portfolio/p2.jpg" alt="Social Media Growth" />
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Client</div>
                    <div className="pf-d-val">StyleHub</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Category</div>
                    <div className="pf-d-val">Social Media</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Year</div>
                    <div className="pf-d-val">2026</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Duration</div>
                    <div className="pf-d-val">6 Months</div>
                  </div>
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Project Overview</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.82" }}>
                  A complete social media transformation for StyleHub, a fashion e-commerce brand. We developed platform-specific content strategies, built an influencer partnership program, and managed paid social campaigns across Instagram, TikTok, and Pinterest.
                </p>
                <div className="pf-result">
                  <p><strong>Result:</strong> 250K new followers gained in 6 months, 180% increase in social-attributed revenue, and 3x improvement in engagement rate across all platforms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO MODAL 3 */}
      {activeModal === "pfM3" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Brand Refresh &amp; Rebranding</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img className="pf-mod-img" src="/img/portfolio/p5.jpg" alt="Brand Refresh" />
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Client</div>
                    <div className="pf-d-val">Meridian Retail</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Category</div>
                    <div className="pf-d-val">Rebranding</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Year</div>
                    <div className="pf-d-val">2026</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Duration</div>
                    <div className="pf-d-val">4 Months</div>
                  </div>
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Project Overview</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.82" }}>
                  Meridian was a 20-year-old retail brand that had lost its edge. We revitalized their brand identity while preserving brand equity, modernizing their visual system, tone of voice, and customer experience.
                </p>
                <div className="pf-result">
                  <p><strong>Result:</strong> 35% increase in brand favorability scores, 20% uplift in traffic, and successfully repositioned as the premium choice in their competitive landscape.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO MODAL 4 */}
      {activeModal === "pfM4" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">SEO Performance Campaign</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img className="pf-mod-img" src="/img/portfolio/p3.jpg" alt="SEO Performance" />
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Client</div>
                    <div className="pf-d-val">DataSync SaaS</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Category</div>
                    <div className="pf-d-val">SEO / Digital</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Year</div>
                    <div className="pf-d-val">2026</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Duration</div>
                    <div className="pf-d-val">12 Months</div>
                  </div>
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Project Overview</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.82" }}>
                  A comprehensive SEO and content strategy for DataSync, a B2B SaaS platform. Starting from minimal domain authority, we built a robust organic presence through technical optimization and link acquisition.
                </p>
                <div className="pf-result">
                  <p><strong>Result:</strong> 300% increase in organic traffic, ranked #1 for 45 target keywords, and organic search became the #1 lead generation channel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO MODAL 5 */}
      {activeModal === "pfM5" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">SaaS Platform Redesign</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img className="pf-mod-img" src="/img/portfolio/p4.jpg" alt="SaaS Platform Redesign" />
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Client</div>
                    <div className="pf-d-val">CloudBase</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Category</div>
                    <div className="pf-d-val">Web Design</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Year</div>
                    <div className="pf-d-val">2026</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="pf-d-lbl">Duration</div>
                    <div className="pf-d-val">5 Months</div>
                  </div>
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Project Overview</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.82" }}>
                  CloudBase&apos;s aging website was costing them conversions. We conducted user research, redesigned the entire UX/UI, rebuilt the site for performance, and implemented a conversion optimization strategy.
                </p>
                <div className="pf-result">
                  <p><strong>Result:</strong> 85% faster page load times, 60% improvement in trial sign-up conversion rate, and 40% reduction in bounce rate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM MODALS */}
      {activeModal === "tmM1" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="tm-mod-hd">
                  <img className="tm-mod-av" src="/img/team/1.jpg" alt="Michael Chen" />
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: "4px" }}>Michael Chen</h4>
                    <div className="tm-mod-role">Creative Director</div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-linkedin-in"></i></a>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-twitter"></i></a>
                    </div>
                  </div>
                </div>
                <p className="tm-mod-bio">
                  Michael brings 15 years of creative leadership to Minton. A former design director at global agencies, he&apos;s led award-winning campaigns for Fortune 500 brands. His philosophy: great creative starts with deep strategic thinking.
                </p>
                <h6 style={{ fontWeight: 700, margin: "20px 0 14px" }}>Skills</h6>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Creative Direction</span><span className="tm-sk-pc">98%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "98%" }}></div></div>
                </div>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Brand Strategy</span><span className="tm-sk-pc">92%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "92%" }}></div></div>
                </div>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Visual Design</span><span className="tm-sk-pc">95%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "95%" }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "tmM2" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="tm-mod-hd">
                  <img className="tm-mod-av" src="/img/team/2.jpg" alt="Sarah Williams" />
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: "4px" }}>Sarah Williams</h4>
                    <div className="tm-mod-role">Head of Strategy</div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-linkedin-in"></i></a>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-twitter"></i></a>
                    </div>
                  </div>
                </div>
                <p className="tm-mod-bio">
                  Sarah is Minton&apos;s strategic powerhouse. With an MBA from Wharton and 12 years in digital marketing, she has an uncanny ability to identify growth opportunities.
                </p>
                <h6 style={{ fontWeight: 700, margin: "20px 0 14px" }}>Skills</h6>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Digital Strategy</span><span className="tm-sk-pc">97%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "97%" }}></div></div>
                </div>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Data Analytics</span><span className="tm-sk-pc">90%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "90%" }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "tmM3" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="tm-mod-hd">
                  <img className="tm-mod-av" src="/img/team/3.jpg" alt="David Rodriguez" />
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: "4px" }}>David Rodriguez</h4>
                    <div className="tm-mod-role">Lead Designer</div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-dribbble"></i></a>
                      <a href="#" style={{ color: "var(--text2)", fontSize: ".9rem" }}><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                </div>
                <p className="tm-mod-bio">
                  David&apos;s design work has won 12 industry awards including two Awwwards and a FWA. With expertise spanning UI/UX, brand identity, and motion design.
                </p>
                <h6 style={{ fontWeight: 700, margin: "20px 0 14px" }}>Skills</h6>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>UI/UX Design</span><span className="tm-sk-pc">96%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "96%" }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "tmM4" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <div className="tm-mod-hd">
                  <img className="tm-mod-av" src="/img/team/4.jpg" alt="Lisa Park" />
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: "4px" }}>Lisa Park</h4>
                    <div className="tm-mod-role">SEO Expert</div>
                  </div>
                </div>
                <p className="tm-mod-bio">
                  Lisa is an SEO specialist with 9 years of experience driving organic growth for B2B and B2C brands. Certified by Google and SEMrush.
                </p>
                <h6 style={{ fontWeight: 700, margin: "20px 0 14px" }}>Skills</h6>
                <div className="tm-sk-row">
                  <div className="tm-sk-hd"><span>Technical SEO</span><span className="tm-sk-pc">97%</span></div>
                  <div className="prog-track"><div className="prog-fill" style={{ width: "97%" }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOG MODALS */}
      {activeModal === "newsM1" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">10 SEO Trends That Will Define Search Rankings in 2026</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img src="/img/blog/1.jpg" style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "var(--r)", marginBottom: "22px" }} alt="SEO Trends" />
                <div className="d-flex align-items-center gap-3" style={{ marginBottom: "18px" }}>
                  <span className="news-cat" style={{ position: "static" }}>SEO Strategy</span>
                  <span style={{ fontSize: ".8rem", color: "var(--text3)" }}><i className="fas fa-calendar" style={{ color: "var(--primary)", marginRight: "5px" }}></i>May 14, 2026</span>
                  <span style={{ fontSize: ".8rem", color: "var(--text3)" }}><i className="fas fa-clock" style={{ color: "var(--primary)", marginRight: "5px" }}></i>5 min read</span>
                </div>
                <p style={{ color: "var(--text2)", lineHeight: "1.85", fontSize: ".92rem", marginBottom: "16px" }}>
                  AI-driven search, E-E-A-T signals, and Core Web Vitals are reshaping how Google ranks content in 2026. Staying ahead of these shifts is no longer optional — it&apos;s survival for any brand that relies on organic traffic.
                </p>
                <h6 style={{ fontWeight: 700, marginBottom: "10px" }}>1. AI-Powered Search Generative Experience (SGE)</h6>
                <p style={{ color: "var(--text2)", lineHeight: "1.85", fontSize: ".9rem", marginBottom: "14px" }}>
                  Google&apos;s SGE is fundamentally changing how search results are displayed. AI-generated summaries now appear above traditional links.
                </p>
                <div style={{ background: "rgba(var(--primary-rgb),.07)", borderLeft: "3px solid var(--primary)", borderRadius: "0 var(--rs) var(--rs) 0", padding: "14px 18px", marginTop: "16px" }}>
                  <p style={{ margin: 0, fontSize: ".9rem", color: "var(--text2)" }}>
                    <strong>Key Takeaway:</strong> 2026 SEO is about building genuine authority through quality content, technical excellence, and a seamless user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "newsM2" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Why Brand Positioning Is the Foundation of Every Marketing Win</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img src="/img/blog/2.jpg" style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "var(--r)", marginBottom: "22px" }} alt="Brand Positioning" />
                <p style={{ color: "var(--text2)", lineHeight: "1.85", fontSize: ".92rem", marginBottom: "16px" }}>
                  Most marketing fails not because of poor execution, but because of a weak or undefined brand position. Before you write a single ad, design a logo, or publish a post — you need to know exactly where you stand.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "newsM3" && (
        <div className="modal fade show" tabIndex="-1" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">The Social Media Algorithm Changes You Need to Know About</h5>
                <button type="button" className="btn-close" onClick={() => setActiveModal(null)}></button>
              </div>
              <div className="modal-body">
                <img src="/img/blog/3.jpg" style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "var(--r)", marginBottom: "22px" }} alt="Social Media Algorithm" />
                <p style={{ color: "var(--text2)", lineHeight: "1.85", fontSize: ".92rem", marginBottom: "16px" }}>
                  Instagram, LinkedIn, and TikTok have all rolled out significant algorithm updates in early 2026. If your social media performance has dipped recently, these changes are almost certainly why.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
