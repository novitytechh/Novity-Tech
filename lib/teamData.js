/**
 * Team & Company Data Source
 * 
 * Centralized leadership and engineering team configuration for Novity Tech.
 * Executive leadership photos are located in public/img/team/.
 */

export const COMPANY_DESCRIPTION = {
  short:
    "A digital-first creative engineering agency based in Gujranwala, Pakistan, transforming bold enterprise ideas into scalable architectures, custom AI copilots, and high-growth digital platforms.",
  full:
    "Novity Tech is a premier digital-first engineering and design agency founded in Gujranwala, Pakistan. We partner with ambitious startups and global enterprises to architect scalable full-stack web applications, custom AI copilot workflows, cloud-native infrastructures, and bespoke design systems. By bridging strategic design with rigorous technical precision, Novity Tech builds resilient digital ecosystems engineered for high velocity, zero technical debt, and measurable commercial growth.",
};

export const TEAM_MEMBERS = [
  // 1. FOUNDER & CEO
  {
    id: "founder-ceo",
    name: "Ali Haider",
    role: "Founder & Chief Executive Officer (CEO)",
    category: "chief",
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
    category: "chief",
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
    category: "chief",
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

  // 4. CHIEF AI OFFICER (CAIO)
  {
    id: "chief-ai",
    name: "Arham Ali",
    role: "Chief AI Officer (CAIO) & Machine Learning Lead",
    category: "chief",
    isChief: true,
    badge: "Chief AI Officer",
    icon: "fa-brain",
    initials: "AA",
    bio: "Spearheads custom LLM workflows, autonomous agent orchestration, RAG pipelines, and intelligent automation systems directly into production web applications.",
    responsibilities: [
      "Gemini & OpenAI autonomous agent workflows",
      "Vector database embeddings & semantic search",
      "AI security, privacy compliance, & latency tuning",
    ],
    skills: ["Autonomous AI Agents", "RAG Pipelines", "Vector Databases", "Prompt Engineering"],
    image: "/img/team/caio.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },

  // 5. LEAD FULL-STACK / FRONT-END ENGINEER
  {
    id: "senior-fullstack",
    name: "Muhammad Faseeh Altaf",
    role: "Lead Frontend & Full-Stack Web Engineer (FE)",
    category: "engineering",
    isChief: false,
    badge: "Lead Frontend / FE",
    icon: "fa-code",
    initials: "MFA",
    bio: "Builds high-performance web applications, responsive user experiences, and client-state architectures using Next.js, TypeScript, and modern frontend ecosystems.",
    responsibilities: [
      "Modern server components & client state orchestration",
      "Pixel-perfect responsive luxury UI engineering",
      "Sub-second page loads & Core Web Vitals optimization",
    ],
    skills: ["Next.js", "TypeScript", "React", "Frontend Architecture"],
    image: "/img/team/fe.jpg",
    linkedin: "https://linkedin.com",
    email: "novitytechh@gmail.com",
  },
];
