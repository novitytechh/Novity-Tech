/**
 * Projects / Portfolio Data Source
 * 
 * Centralized showcase of production platforms, mobile applications, and custom AI systems
 * engineered by Novity Tech.
 */

export const PROJECTS_DATA = [
  {
    id: "interview-ai-app",
    title: "InterviewAI - AI-Based Mock Interview Preparation System",
    name: "InterviewAI Mobile & Web Platform",
    client: "EdTech & Career Intelligence",
    category: "app",
    cat: "app",
    categoryLabel: "Android & AI Application",
    catLabel: "Android & AI App",
    image: "/img/portfolio/interview-ai-1-dashboard.jpg",
    img: "/img/portfolio/interview-ai-1-dashboard.jpg",
    metric: "Google Gemini + Whisper AI",
    year: "2026",
    duration: "Production Capstone",
    colClass: "col-12",
    height: "580px",
    desc: "An intelligent Android application and cloud backend engineered to accelerate job readiness through dynamic, AI-powered mock interviews. Powered by Google Gemini and OpenAI Whisper speech-to-text, the platform delivers adaptive role-based and resume-tailored questioning, real-time verbal and confidence coaching, automated speech scoring, and personalized career preparation roadmaps.",
    overview:
      "InterviewAI bridges academic learning and real-world employment by offering job seekers and university graduates an accessible, high-fidelity interview training environment. Users can configure customized technical, HR, behavioral, or mixed interview sessions with tailored difficulty levels and time bounds. By integrating Whisper speech recognition and Gemini LLM intelligence, the application analyzes spoken cadence, grammar, and technical depth, delivering instant constructive feedback and targeted learning modules.",
    keyFeatures: [
      "AI-Powered Mock Interviews with dynamic role-based and resume-tailored prompts",
      "Interactive AI Interview Coach for real-time communication, posture, and confidence guidance",
      "Whisper Speech-to-Text integration for automatic transcription of verbal responses",
      "Multi-dimensional Performance Evaluation covering grammar, confidence, and role mastery",
      "Intelligent Resume PDF Analysis with custom-tailored interview preparation prompts",
      "Learning Center with curated video masterclasses, body language guides, and progress trackers",
      "Secure Firebase Authentication (Email/Password & Google Sign-In) with PostgreSQL analytics",
    ],
    tech: [
      "Kotlin / Android",
      "Java / XML",
      "Python FastAPI",
      "Google Gemini API",
      "OpenAI Whisper STT",
      "PostgreSQL",
      "Firebase Auth",
    ],
    result:
      "End-to-end automated interview simulation pipeline delivering sub-second AI coaching responses, multi-role technical evaluation, and personalized career feedback.",
    screens: [
      {
        serial: 1,
        step: "01",
        title: "Executive Dashboard",
        tag: "Analytics & Launch",
        caption: "Real-time readiness analytics, practice score metrics (86%), and quick mock interview launches.",
        src: "/img/portfolio/interview-ai-1-dashboard.jpg",
      },
      {
        serial: 2,
        step: "02",
        title: "Interview Setup",
        tag: "Session Configuration",
        caption: "Role selection, custom difficulty, timer settings, and resume-based prompt ingestion.",
        src: "/img/portfolio/interview-ai-2-setup.jpg",
      },
      {
        serial: 3,
        step: "03",
        title: "Interactive AI Coach",
        tag: "Real-Time Feedback",
        caption: "Real-time communication guidance, speech coaching, and instant answer evaluations.",
        src: "/img/portfolio/interview-ai-3-coach.jpg",
      },
      {
        serial: 4,
        step: "04",
        title: "User Profile & Progress",
        tag: "Career Milestones",
        caption: "Comprehensive performance history, score breakdown, streak stats, and account settings.",
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
