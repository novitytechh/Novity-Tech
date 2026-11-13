/**
 * Team & Company Data Source
 * 
 * Centralized leadership and engineering team configuration for Novity Tech.
 * Stock photos have been removed. Real leadership photos are in public/img/team/.
 * Specialized engineers use luxury monogram icons.
 */

export const COMPANY_DESCRIPTION = {
  short:
    "A digital-first creative engineering agency based in Gujranwala, Pakistan, transforming bold enterprise ideas into scalable architectures, custom AI copilots, and high-growth digital platforms.",
  full:
    "Novity Tech is a premier digital-first engineering and design agency founded in Gujranwala, Pakistan. We partner with ambitious startups and global enterprises to architect scalable full-stack web applications, custom AI copilot workflows, cloud-native infrastructures, and bespoke design systems. By bridging strategic design with rigorous technical precision, Novity Tech builds resilient digital ecosystems engineered for high velocity, zero technical debt, and measurable commercial growth.",
};

export const TEAM_SECTIONS = [
  {
    id: "leadership",
    badge: "Executive Leadership",
    title: "Executive Directorate",
    subtitle: "Founding leadership governing enterprise strategy, engineering standards, client SLAs, and organizational vision.",
    icon: "fa-user-tie",
  },
  {
    id: "caio",
    badge: "CAIO & AI / Cloud Systems",
    title: "AI Systems & Cloud DevOps (CAIO Section)",
    subtitle: "Directed by Arham Ali (Chief AI Officer) with Cloud DevOps & Infrastructure (DE) ensuring reliable autonomous agent workflows and high-availability deployment.",
    icon: "fa-brain",
    leadId: "chief-ai",
  },
  {
    id: "fe",
    badge: "Frontend & Product Engineering",
    title: "Frontend Engineering & Design Systems (FE Section)",
    subtitle: "Directed by Muhammad Faseeh Altaf (Lead Frontend Engineer) alongside Design Systems (UX) and Solutions Engineering (SE) for sub-second, pixel-perfect user experiences.",
    icon: "fa-code",
    leadId: "senior-fullstack",
  },
];

export const TEAM_MEMBERS = [
  // 1. FOUNDER & CEO
  {
    id: "founder-ceo",
    name: "Ali Haider",
    role: "Founder & Chief Executive Officer (CEO)",
    section: "leadership",
    category: "leadership",
    isChief: true,
    badge: "Founder & CEO",
    icon: "fa-user-tie",
    initials: "AH",
    bio: "Leads organizational vision, executive strategy, and high-level enterprise architecture at Novity Tech. Dedicated to crafting resilient software that translates complex business objectives into measurable commercial success.",
    responsibilities: [
      "Executive agency governance & client alignment",
      "Enterprise architecture & tech stack decisions",
      "Strategic partnership & delivery guarantee",
    ],
    skills: ["Enterprise Architecture", "Product Vision", "Strategic Growth", "Full-Stack Strategy"],
    image: "/img/team/founder.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 2. CO-FOUNDER & CTO
  {
    id: "cofounder-cto",
    name: "Muhammad Hussain",
    role: "Co-Founder & Chief Technology Officer (CTO)",
    section: "leadership",
    category: "leadership",
    isChief: true,
    badge: "Co-Founder & CTO",
    icon: "fa-laptop-code",
    initials: "MH",
    bio: "Directs end-to-end technical strategy, full-stack system architecture, and engineering execution. Specializes in building modern Next.js platforms, distributed APIs, and cloud infrastructure.",
    responsibilities: [
      "Distributed backend & microservices architecture",
      "Next.js & TypeScript code review & standards",
      "Cloud performance & zero-downtime deployments",
    ],
    skills: ["Cloud Architecture", "Next.js & React", "Distributed Systems", "API Engineering"],
    image: "/img/team/cto.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 3. CO-FOUNDER & COO
  {
    id: "cofounder-coo",
    name: "Moiz Waseem",
    role: "Co-Founder & Chief Operating Officer (COO)",
    section: "leadership",
    category: "leadership",
    isChief: true,
    badge: "Co-Founder & COO",
    icon: "fa-chart-line",
    initials: "MW",
    bio: "Steers client delivery, sprint velocity, and technical operations. Bridges high-level product design with engineering timelines to ensure on-time, guaranteed fixed-scope delivery.",
    responsibilities: [
      "Agile sprint management & milestone governance",
      "Client SLA compliance & weekly demo oversight",
      "Resource allocation & engineering operations",
    ],
    skills: ["Operations & Delivery", "Agile Sprints", "Product Management", "Client Success"],
    image: "/img/team/coo.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 4. CHIEF AI OFFICER (CAIO) & DIVISION
  {
    id: "chief-ai",
    name: "Arham Ali",
    role: "Chief AI Officer (CAIO) & Machine Learning Lead",
    section: "caio",
    category: "caio",
    isChief: true,
    isSectionLead: true,
    badge: "Chief AI Officer / CAIO",
    icon: "fa-brain",
    initials: "CAIO",
    bio: "Spearheads custom LLM workflows, autonomous agent orchestration, RAG pipelines, and intelligent automation systems directly into production web applications, guiding our Cloud DevOps & Infrastructure division.",
    responsibilities: [
      "Gemini & OpenAI autonomous agent workflows",
      "Vector database embeddings & semantic search",
      "AI security, privacy compliance, & latency tuning",
      "Leadership of Cloud DevOps & Infrastructure Engineer (DE)",
    ],
    skills: ["Autonomous AI Agents", "RAG Pipelines", "Vector Databases", "Prompt Engineering"],
    image: "/img/team/caio.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
    divisionName: "AI Systems & Cloud DevOps (CAIO Section)",
    subMemberIds: ["devops-engineer"],
    subMemberSummary: "Oversees Cloud DevOps & Infrastructure Engineer (DE)",
  },

  // 5. CLOUD DEVOPS & INFRASTRUCTURE ENGINEER (DE - IN CAIO SECTION)
  {
    id: "devops-engineer",
    name: "Cloud DevOps & Infrastructure Engineer",
    role: "Lead Cloud Infrastructure Engineer",
    section: "caio",
    category: "caio",
    isChief: false,
    badge: "Cloud & DevOps (DE)",
    icon: "fa-server",
    initials: "DE",
    bio: "Specializes in Docker containerization, automated CI/CD deployment pipelines, and high-availability cloud infrastructure across AWS and Kubernetes in direct synergy with the CAIO Division.",
    responsibilities: [
      "Automated GitHub Actions CI/CD pipelines",
      "Docker container orchestration & cloud hosting",
      "Security scanning, SSL automation, and uptime alerts",
      "Cloud infrastructure orchestration alongside Chief AI Officer (CAIO)",
    ],
    skills: ["Docker & CI/CD", "AWS & GCP", "Linux Systems", "Kubernetes"],
    image: null,
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
    divisionName: "AI Systems & Cloud DevOps (CAIO Section)",
    parentLeadId: "chief-ai",
    parentLeadName: "Arham Ali (CAIO)",
  },

  // 6. LEAD FULL-STACK / FRONT-END ENGINEER (FE) & DIVISION
  {
    id: "senior-fullstack",
    name: "Muhammad Faseeh Altaf",
    role: "Lead Frontend & Full-Stack Web Engineer (FE)",
    section: "fe",
    category: "fe",
    isChief: false,
    isSectionLead: true,
    badge: "Lead Frontend / FE",
    icon: "fa-code",
    initials: "FE",
    bio: "Directs high-performance frontend architecture, responsive user experiences, and client-state orchestration using Next.js and TypeScript, leading our UI/UX and Solutions Engineering guild.",
    responsibilities: [
      "Modern server components & client state orchestration",
      "Pixel-perfect responsive luxury UI engineering",
      "Sub-second page loads & Core Web Vitals optimization",
      "Leadership of Lead UI/UX (UX) & Solutions Engineer (SE)",
    ],
    skills: ["Next.js", "TypeScript", "React", "Frontend Architecture"],
    image: "/img/team/fe.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
    divisionName: "Frontend & Product Engineering (FE Section)",
    subMemberIds: ["lead-uiux", "solutions-engineer"],
    subMemberSummary: "Oversees Lead UI/UX (UX) & Solutions Engineer (SE)",
  },

  // 7. LEAD UI/UX & DESIGN SYSTEMS ARCHITECT (UX - IN FE SECTION)
  {
    id: "lead-uiux",
    name: "Lead UI/UX & Design Systems Architect",
    role: "Principal Product & UI/UX Designer",
    section: "fe",
    category: "fe",
    isChief: false,
    badge: "Design Systems (UX)",
    icon: "fa-bezier-curve",
    initials: "UX",
    bio: "Crafts bespoke user interfaces, design systems, and micro-interactions that elevate brand prestige and optimize user conversion in the FE & Product Engineering division.",
    responsibilities: [
      "Figma design tokens & responsive components",
      "Interactive micro-animations & layout hierarchy",
      "Brand identity systems & conversion rate design",
      "Direct design tokens handoff to Lead Frontend (FE)",
    ],
    skills: ["UI/UX Architecture", "Figma Tokens", "Design Systems", "Prototyping"],
    image: null,
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
    divisionName: "Frontend & Product Engineering (FE Section)",
    parentLeadId: "senior-fullstack",
    parentLeadName: "Muhammad Faseeh Altaf (FE)",
  },

  // 8. FULL-STACK DEVELOPER & SOLUTIONS ENGINEER (SE - IN FE SECTION)
  {
    id: "solutions-engineer",
    name: "Solutions Engineer & API Specialist",
    role: "Full-Stack Developer & Solutions Engineer",
    section: "fe",
    category: "fe",
    isChief: false,
    badge: "Solutions Engineer (SE)",
    icon: "fa-layer-group",
    initials: "SE",
    bio: "Focuses on rapid feature prototyping, third-party API integrations, payment gateways, and robust database management under the FE & Product Engineering division.",
    responsibilities: [
      "Third-party REST & GraphQL API integrations",
      "Stripe / payment gateway & webhook processing",
      "Cross-browser testing & regression hardening",
      "API integrations in direct coordination with Lead Frontend (FE)",
    ],
    skills: ["REST & GraphQL", "React & Next.js", "Database Optimization", "Security Audits"],
    image: null,
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
    divisionName: "Frontend & Product Engineering (FE Section)",
    parentLeadId: "senior-fullstack",
    parentLeadName: "Muhammad Faseeh Altaf (FE)",
  },
];
