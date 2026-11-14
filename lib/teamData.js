/**
 * Team & Company Data Source
 * 
 * Centralized engineering leadership configuration for Novity Tech.
 * Role titles reflect direct domain ownership and engineering architecture.
 */

export const COMPANY_DESCRIPTION = {
  short:
    "A digital-first creative engineering agency based in Gujranwala, Pakistan, transforming bold enterprise ideas into scalable architectures, custom AI copilots, and high-growth digital platforms.",
  full:
    "Novity Tech is a premier digital-first engineering and design agency founded in Gujranwala, Pakistan. We partner with ambitious startups and global enterprises to architect scalable full-stack web applications, custom AI copilot workflows, cloud-native infrastructures, and bespoke design systems. By bridging strategic design with rigorous technical precision, Novity Tech builds resilient digital ecosystems engineered for high velocity, zero technical debt, and measurable commercial growth.",
};

export const TEAM_MEMBERS = [
  // 1. ALI HAIDER
  {
    id: "founder-ceo",
    name: "Ali Haider",
    role: "",
    category: "engineering",
    isChief: true,
    badge: "",
    icon: "fa-compass-drafting",
    initials: "AH",
    bio: "Directs enterprise system architecture, technology stack governance, and product strategy at Novity Tech. Oversees MVP development for startups, custom software discovery, and cybersecurity & compliance standards.",
    responsibilities: [
      "MVP development & rapid startup prototyping",
      "Enterprise system architecture & tech stack governance",
      "Cybersecurity standards, code auditing & technical scoping",
    ],
    skills: ["Enterprise Architecture", "MVP Strategy", "Cybersecurity Audits", "Full-Stack Strategy"],
    services: [
      "MVP Development for Startups",
      "Cybersecurity & Compliance Audits",
      "Custom Software Development",
    ],
    image: "/img/team/founder.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 2. CLOUD DEVOPS & BACKEND INFRASTRUCTURE LEAD
  {
    id: "cofounder-cto",
    name: "Muhammad Hussain",
    role: "Cloud DevOps & Backend Infrastructure Lead",
    category: "engineering",
    isChief: true,
    badge: "Cloud & DevOps Lead",
    icon: "fa-server",
    initials: "MH",
    bio: "Directs distributed backend engineering, cloud DevOps, and high-availability infrastructure. Specializes in scalable API engineering, PostgreSQL data pipelines, Docker CI/CD, and legacy software modernization.",
    responsibilities: [
      "Server & cloud infrastructure (AWS / GCP / Docker)",
      "DevOps CI/CD automation & zero-downtime deployment",
      "Distributed API development & database data engineering",
    ],
    skills: ["Cloud Infrastructure", "DevOps & CI/CD", "Distributed APIs", "Database Engineering"],
    services: [
      "DevOps & CI/CD Engineering",
      "Server & Cloud Infrastructure Management",
      "API Development & System Integration",
      "Database & Data Engineering",
      "Legacy Software Maintenance & Modernization",
    ],
    image: "/img/team/cto.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 3. PRODUCT DELIVERY & QA LEAD
  {
    id: "cofounder-coo",
    name: "Moiz Waseem",
    role: "Product Delivery & Quality Assurance Lead",
    category: "engineering",
    isChief: true,
    badge: "Delivery & QA Lead",
    icon: "fa-tasks",
    initials: "MW",
    bio: "Steers client sprint velocity, automated quality assurance testing, and end-to-end milestone delivery. Oversees ERP solutions, staff augmentation standards, and SLA compliance.",
    responsibilities: [
      "Agile sprint governance & weekly client milestone delivery",
      "Automated testing, QA frameworks & SLA compliance",
      "IT staff augmentation standards & ERP workflow coordination",
    ],
    skills: ["QA & Automated Testing", "Agile Sprints", "Delivery Governance", "ERP Solutions"],
    services: [
      "QA & Automated Testing",
      "IT Staff Augmentation / Dedicated Developers",
      "ERP Systems & Solutions",
    ],
    image: "/img/team/coo.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 4. AI & MACHINE LEARNING SYSTEMS LEAD
  {
    id: "chief-ai",
    name: "Arham Ali",
    role: "AI & Machine Learning Systems Lead",
    category: "engineering",
    isChief: true,
    badge: "AI & ML Systems Lead",
    icon: "fa-brain",
    initials: "AA",
    bio: "Spearheads custom AI agents, autonomous workflow automations, RAG vector pipelines, and LLM integrations directly into production web and mobile software.",
    responsibilities: [
      "Custom autonomous AI agents, copilot workflows & prompt engineering",
      "Vector database embeddings, semantic search & RAG pipelines",
      "AI workflow automation (Google Gemini & OpenAI integration)",
    ],
    skills: ["Autonomous AI Agents", "RAG Pipelines", "Vector Databases", "Workflow Automation"],
    services: [
      "Custom AI Agents & Copilots",
      "AI Workflow Automation",
    ],
    image: "/img/team/caio.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 5. LEAD FRONTEND & MULTI-PLATFORM APPLICATIONS ENGINEER
  {
    id: "senior-fullstack",
    name: "Muhammad Faseeh Altaf",
    role: "Lead Frontend & Multi-Platform Applications Engineer",
    category: "engineering",
    isChief: true,
    badge: "Lead Frontend & Mobile",
    icon: "fa-code",
    initials: "MFA",
    bio: "Architects responsive web applications, mobile platforms, and high-performance client experiences. Specializes in Next.js, React, Android/React Native mobile engineering, and bespoke UI/UX design systems.",
    responsibilities: [
      "Reactive Next.js web application architecture & performance",
      "Cross-platform mobile application engineering (Android & iOS)",
      "UI/UX design systems, component tokens & micro-interactions",
    ],
    skills: ["Next.js & React", "Mobile App Development", "UI/UX Architecture", "TypeScript"],
    services: [
      "Web Application Development",
      "Mobile App Development",
      "UI/UX Design & Product Discovery",
      "Windows / Desktop App Development",
    ],
    image: "/img/team/fe.jpg",
    linkedin: "https://www.linkedin.com/in/muhammad-faseeh-altaf-19613224a/",
    email: "novitytechh@gmail.com",
  },
];
