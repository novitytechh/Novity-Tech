/**
 * Projects / Portfolio Data Source
 * 
 * Centralized showcase of production platforms, mobile applications, and custom AI systems
 * engineered by Novity Tech.
 */

export const PROJECTS_DATA = [
  // 1. INTERVIEWAI
  {
    id: "interview-ai-app",
    title: "InterviewAI - AI Mock Interview System",
    name: "InterviewAI Mobile Platform",
    client: "EdTech & Career Prep",
    category: "app",
    cat: "app",
    categoryLabel: "Android & AI Application",
    catLabel: "Android & AI App",
    image: "/img/portfolio/interview-ai-1-dashboard.jpg",
    img: "/img/portfolio/interview-ai-1-dashboard.jpg",
    deviceType: "mobile",
    year: "2026",
    duration: "Production Capstone",
    colClass: "col-12",
    height: "460px",
    desc: "An intelligent Android application simulating real-world job interviews using Google Gemini and OpenAI Whisper speech analysis. Delivers dynamic role-based questioning, live confidence coaching, and instant feedback.",
    overview:
      "InterviewAI empowers job seekers with personalized mock interview sessions across technical, behavioral, and HR roles. Integrates Whisper speech-to-text and Gemini intelligence to evaluate speech cadence, grammar, and technical depth.",
    keyFeatures: [
      "AI Mock Interviews tailored to roles, difficulty levels & resumes",
      "Interactive AI Coach providing live communication and confidence tips",
      "Whisper STT speech scoring with grammar and technical evaluation",
      "Personalized learning center and career progress analytics",
    ],
    tech: [
      "Android / Kotlin",
      "Python FastAPI",
      "Google Gemini API",
      "Whisper STT",
      "PostgreSQL",
      "Firebase",
    ],
    result:
      "Sub-second AI feedback pipeline with multi-role interview simulation and automated speech evaluation.",
    screens: [
      {
        serial: 1,
        step: "01",
        title: "Dashboard",
        tag: "Analytics",
        caption: "Readiness score, average performance & quick practice start",
        src: "/img/portfolio/interview-ai-1-dashboard.jpg",
      },
      {
        serial: 2,
        step: "02",
        title: "Interview Setup",
        tag: "Config",
        caption: "Role selection, difficulty level, timer & resume ingestion",
        src: "/img/portfolio/interview-ai-2-setup.jpg",
      },
      {
        serial: 3,
        step: "03",
        title: "AI Coach",
        tag: "Live Coaching",
        caption: "Speech tips, posture guidance & real-time feedback chat",
        src: "/img/portfolio/interview-ai-3-coach.jpg",
      },
      {
        serial: 4,
        step: "04",
        title: "Profile & History",
        tag: "Progress",
        caption: "Practice history, score breakdown, streak & milestones",
        src: "/img/portfolio/interview-ai-4-profile.jpg",
      },
    ],
    gallery: [
      "/img/portfolio/interview-ai-1-dashboard.jpg",
      "/img/portfolio/interview-ai-2-setup.jpg",
      "/img/portfolio/interview-ai-3-coach.jpg",
      "/img/portfolio/interview-ai-4-profile.jpg",
    ],
  },

  // 2. LONDON BRIDGE
  {
    id: "london-bridge-app",
    title: "London Bridge – Modern E-Commerce Apparel Platform",
    name: "London Bridge Apparel Storefront",
    client: "Urban Outerwear & Streetwear",
    category: "ecommerce",
    cat: "ecommerce",
    categoryLabel: "E-Commerce & Retail Platform",
    catLabel: "E-Commerce & Retail",
    image: "/img/portfolio/london-bridge-1.png",
    img: "/img/portfolio/london-bridge-1.png",
    frontImage: "/img/portfolio/london-bridge-1.png",
    backImage: "/img/portfolio/london-bridge-2.png",
    deviceType: "desktop-dual",
    year: "2026",
    duration: "Production Storefront",
    colClass: "col-12",
    height: "460px",
    desc: "A modern, high-performance apparel storefront engineered for premium urban outerwear. Features instant client-side cart management, responsive product showcases, and a frictionless mobile-first checkout.",
    overview:
      "London Bridge is an e-commerce platform delivering conversion-driven retail experiences for urban outerwear brands. Combines instant client-side cart management, high-resolution product showcases with sizing selectors, and search-optimized semantic architecture.",
    keyFeatures: [
      "Optimized Product Catalog with interactive sizing selectors & high-res showcases",
      "Mobile-First Experience with fluid touch navigation & frictionless checkout",
      "Real-Time Client Cart with lightweight state persistence & instant updates",
      "Performance & SEO Architecture with minimal bundle size & zero layout shift",
    ],
    tech: [
      "Next.js / React",
      "TypeScript",
      "Tailwind CSS",
      "Client State Cart",
      "Semantic SEO",
      "Responsive UI",
    ],
    result:
      "Sub-second page transitions, instant cart updates, and an optimized mobile shopping experience driving high retail conversion.",
    screens: [
      {
        serial: 1,
        step: "01",
        title: "Storefront Hero (Front)",
        tag: "Front View",
        caption: "Hero showcase featuring urban outerwear collections and featured apparel",
        src: "/img/portfolio/london-bridge-1.png",
      },
      {
        serial: 2,
        step: "02",
        title: "Product Detail (Back)",
        tag: "Back View",
        caption: "High-resolution product showcase with sizing selector and instant cart add",
        src: "/img/portfolio/london-bridge-2.png",
      },
    ],
    gallery: [
      "/img/portfolio/london-bridge-1.png",
      "/img/portfolio/london-bridge-2.png",
    ],
  },

  // 3. CAPTUREPROOF
  {
    id: "captureproof-app",
    title: "CaptureProof - Smart Medical Camera & Telehealth Platform",
    name: "CaptureProof Telehealth Platform",
    client: "HealthTech & Remote Patient Monitoring",
    category: "app",
    cat: "app",
    categoryLabel: "HealthTech & Telehealth Application",
    catLabel: "HealthTech & Telehealth",
    image: "/img/portfolio/captureproof-1.jpg",
    img: "/img/portfolio/captureproof-1.jpg",
    deviceType: "mobile",
    year: "2026",
    duration: "Production Clinical Platform",
    colClass: "col-12",
    height: "460px",
    desc: "A HIPAA-compliant mobile telehealth platform transforming smartphones into smart medical cameras. Enables asynchronous symptom tracking, on-site clinical documentation, and remote patient monitoring anywhere, anytime.",
    overview:
      "CaptureProof solves clinical documentation hurdles by turning mobile devices into medical visual tools. Care teams triage, track, and monitor patient progress seamlessly, reducing administrative data entry while enhancing remote telehealth visibility.",
    keyFeatures: [
      "Smart Medical Camera™: Asynchronous physical exam and symptom visual tracking",
      "Remote Patient Monitoring: Billable digital triage, visual history & progress documentation",
      "Telehealth Companion: Bridges on-site clinical workflows with seamless remote care",
      "HIPAA-Compliant Security: Encrypted visual patient documentation and audit logging",
    ],
    tech: [
      "iOS & Android",
      "HIPAA Compliant Cloud",
      "Python / Node.js",
      "PostgreSQL",
      "WebRTC Telehealth",
      "Medical Media Engine",
    ],
    result:
      "Replaced manual data entry with billable visual triage and continuous remote patient visibility across distributed clinical teams.",
    screens: [
      {
        serial: 1,
        step: "01",
        title: "Medical Camera",
        tag: "Record",
        caption: "Smart physical exam capture and visual symptom documentation",
        src: "/img/portfolio/captureproof-1.jpg",
      },
      {
        serial: 2,
        step: "02",
        title: "Symptom Tracking",
        tag: "Track",
        caption: "Asynchronous timeline and longitudinal recovery tracking",
        src: "/img/portfolio/captureproof-2.jpg",
      },
      {
        serial: 3,
        step: "03",
        title: "Clinical Triage",
        tag: "Monitor",
        caption: "Care team dashboard, triage reviews, and clinical notifications",
        src: "/img/portfolio/captureproof-3.jpg",
      },
      {
        serial: 4,
        step: "04",
        title: "Telehealth Care",
        tag: "Treat",
        caption: "Remote consultation, treatment adherence, and progress reports",
        src: "/img/portfolio/captureproof-4.jpg",
      },
    ],
    gallery: [
      "/img/portfolio/captureproof-1.jpg",
      "/img/portfolio/captureproof-2.jpg",
      "/img/portfolio/captureproof-3.jpg",
      "/img/portfolio/captureproof-4.jpg",
    ],
  },
];
