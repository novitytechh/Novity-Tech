/**
 * Team & Company Data Source
 * 
 * Centralized leadership and engineering team configuration for Novity Tech.
 * Stock photos have been removed. Add real photos to public/img/team/ or leave image as null to use sleek luxury monograms.
 */

export const COMPANY_DESCRIPTION = {
  short:
    "A digital-first creative engineering agency based in Gujranwala, Pakistan, transforming bold enterprise ideas into scalable architectures, custom AI copilots, and high-growth digital platforms.",
  full:
    "Novity Tech is a premier digital-first engineering and design agency founded in Gujranwala, Pakistan. We partner with ambitious startups and global enterprises to architect scalable full-stack web applications, custom AI copilot workflows, cloud-native infrastructures, and bespoke design systems. By bridging strategic design with rigorous technical precision, Novity Tech builds resilient digital ecosystems engineered for high velocity, zero technical debt, and measurable commercial growth.",
};

export const TEAM_MEMBERS = [
  // 1. FOUNDER
  {
    id: "founder-1",
    name: "Muhammad Faseeh Altaf",
    role: "Founder & Chief Executive Officer (CEO)",
    category: "founder",
    badge: "Founder",
    icon: "fa-user-tie",
    initials: "MFA",
    bio: "Leads organizational vision, executive strategy, and high-level enterprise architecture at Novity Tech. Dedicated to crafting resilient software that translates complex business objectives into measurable commercial success.",
    skills: ["Enterprise Architecture", "Product Vision", "Strategic Growth", "Full-Stack Strategy"],
    image: null,
  },

  // 2. CO-FOUNDER 1
  {
    id: "cofounder-1",
    name: "Co-Founder",
    role: "Co-Founder & Chief Technology Officer (CTO)",
    category: "cofounder",
    badge: "Co-Founder",
    icon: "fa-laptop-code",
    initials: "CTO",
    bio: "Directs end-to-end technical strategy, full-stack system architecture, and engineering execution. Specializes in building modern Next.js platforms, distributed APIs, and cloud infrastructure.",
    skills: ["Cloud Architecture", "Next.js & React", "Distributed Systems", "API Engineering"],
    image: null,
  },

  // 3. CO-FOUNDER 2
  {
    id: "cofounder-2",
    name: "Co-Founder",
    role: "Co-Founder & Chief Operating Officer (COO)",
    category: "cofounder",
    badge: "Co-Founder",
    icon: "fa-chart-line",
    initials: "COO",
    bio: "Steers client delivery, sprint velocity, and technical operations. Bridges high-level product design with engineering timelines to ensure on-time, guaranteed fixed-scope delivery.",
    skills: ["Operations & Delivery", "Agile Sprints", "Product Management", "Client Success"],
    image: null,
  },

  // 4. TEAM MEMBER 1
  {
    id: "team-1",
    name: "Senior Full-Stack Engineer",
    role: "Senior Full-Stack Engineer",
    category: "team",
    badge: "Core Team",
    icon: "fa-code",
    initials: "FE",
    bio: "Builds high-performance web applications, serverless backends, and responsive user experiences using Next.js, Node.js, and modern databases.",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    image: null,
  },

  // 5. TEAM MEMBER 2
  {
    id: "team-2",
    name: "Lead UI/UX & Design Systems Architect",
    role: "Lead UI/UX & Design Systems Architect",
    category: "team",
    badge: "Core Team",
    icon: "fa-bezier-curve",
    initials: "UX",
    bio: "Crafts bespoke user interfaces, design systems, and micro-interactions that elevate brand prestige and optimize user conversion.",
    skills: ["UI/UX Architecture", "Figma Tokens", "Design Systems", "Prototyping"],
    image: null,
  },

  // 6. TEAM MEMBER 3
  {
    id: "team-3",
    name: "Cloud DevOps & AI Systems Engineer",
    role: "Cloud DevOps & AI Systems Engineer",
    category: "team",
    badge: "Core Team",
    icon: "fa-server",
    initials: "AI",
    bio: "Specializes in Docker containerization, automated CI/CD deployment pipelines, and custom AI copilot workflow integrations.",
    skills: ["Docker & CI/CD", "AWS & GCP", "Autonomous AI Agents", "Kubernetes"],
    image: null,
  },

  // 7. TEAM MEMBER 4
  {
    id: "team-4",
    name: "Full-Stack Developer & Solutions Engineer",
    role: "Full-Stack Developer & Solutions Engineer",
    category: "team",
    badge: "Core Team",
    icon: "fa-layer-group",
    initials: "SE",
    bio: "Focuses on rapid feature prototyping, third-party API integrations, and robust database management across customer web platforms.",
    skills: ["REST & GraphQL", "React & Next.js", "Database Optimization", "Security Audits"],
    image: null,
  },
];
