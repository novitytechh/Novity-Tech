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

  // 2. CAPTUREPROOF
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
