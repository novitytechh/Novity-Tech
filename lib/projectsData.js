/**
 * Projects / Portfolio Data Source
 * 
 * Centralized showcase of production platforms, mobile applications, and custom AI systems
 * engineered by Novity Tech.
 */

export const PROJECTS_DATA = [
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
    metric: "Gemini + Whisper AI",
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
];
