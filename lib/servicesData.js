
export const ALL_SERVICES_DATA = [
  // 1. IT Staff Augmentation / Dedicated Developers
  {
    slug: "it-staff-augmentation",
    id: "staff-aug",
    title: "IT Staff Augmentation / Dedicated Developers",
    shortDesc: "Scale your engineering team with elite vetted developers and tech leads.",
    category: "Talent & Core Engineering",
    icon: "users",
    tag: "Popular",
    heroTagline: "Inject elite senior software engineers, architects, and technical leads directly into your product squads.",
    overview:
      "Avoid lengthy hiring pipelines and skill mismatches. We embed pre-vetted senior software engineers directly into your engineering workflows. Whether you need full-stack engineers, cloud architects, or specialized AI developers, our talent matches your time zone, culture, and high coding standards from day one.",
    deliverables: [
      {
        title: "Dedicated Full-Time Squads",
        description: "Autonomous engineers working exclusively on your product under your direct or managed supervision.",
      },
      {
        title: "Rigorous Technical Vetting",
        description: "Top 2% global talent assessed across algorithms, system architecture, and production communication.",
      },
      {
        title: "Immediate Time-to-Productivity",
        description: "Engineers onboarded with established Git workflows, Docker environments, and CI/CD habits.",
      },
      {
        title: "Flexible Engagement Scaling",
        description: "Scale from a single specialist to multi-disciplinary squads as development sprints demand.",
      },
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "Kubernetes", "AWS"],
    process: [
      { step: "01", title: "Skill Discovery", description: "Define your technical stack, seniority requirements, and culture fit." },
      { step: "02", title: "Handpicked Matching", description: "Review candidate profiles and conduct technical interviews in 48 hours." },
      { step: "03", title: "Seamless Integration", description: "Rapid setup with your Slack, Jira, GitHub, and codebase architecture." },
      { step: "04", title: "Continuous Delivery", description: "Sprint delivery with weekly progress reporting and SLA guarantees." },
    ],
    metrics: [
      { label: "Onboarding Time", value: "< 7 Days" },
      { label: "Senior Engineer Ratio", value: "92%" },
      { label: "Client Retention", value: "98.4%" },
    ],
    faqs: [
      {
        question: "How fast can dedicated developers start on our project?",
        answer: "We typically match and onboard vetted senior engineers within 3 to 7 business days.",
      },
      {
        question: "Do your developers work in our time zone?",
        answer: "Yes, our team provides 4 to 6 hours of guaranteed real-time overlap across US and European working hours.",
      },
    ],
  },

  // 2. MVP Development for Startups
  {
    slug: "mvp-development",
    id: "mvp-dev",
    title: "MVP Development for Startups",
    shortDesc: "Rapid high-fidelity prototyping to launch your market-ready product in weeks.",
    category: "Talent & Core Engineering",
    icon: "rocket",
    tag: "Speed",
    heroTagline: "Turn high-conviction concepts into production-grade market-ready MVPs in under 6 weeks.",
    overview:
      "Startups cannot afford months of bloated development cycles. We architect lean, scalable, and beautifully designed Minimum Viable Products built to win early users and impress venture investors without technical debt.",
    deliverables: [
      {
        title: "Full-Cycle Product Architecture",
        description: "Complete database modeling, authenticated APIs, and high-converting responsive interfaces.",
      },
      {
        title: "Interactive Prototypes to Code",
        description: "Pixel-perfect Figma designs translated directly into production-ready Next.js web apps.",
      },
      {
        title: "Payment & Analytics Setup",
        description: "Integrated Stripe billing, PostHog product analytics, and automated onboarding workflows.",
      },
      {
        title: "Investor-Ready Documentation",
        description: "Comprehensive technical specifications, API docs, and architectural diagrams.",
      },
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Vercel"],
    process: [
      { step: "01", title: "Scope Pruning", description: "Prioritize core value propositions to build only what validates demand." },
      { step: "02", title: "Interactive Wireframes", description: "Rapid UX validation and clickable UI prototypes within week one." },
      { step: "03", title: "Rapid Development", description: "Bi-weekly sprint demos deploying usable features every 72 hours." },
      { step: "04", title: "Launch & Analytics", description: "Production release with monitoring, telemetry, and feedback capture." },
    ],
    metrics: [
      { label: "Average Time-to-Market", value: "4-6 Weeks" },
      { label: "Seed/Series A Funding Raised", value: "$42M+" },
      { label: "Code Reusability", value: "100%" },
    ],
    faqs: [
      {
        question: "Is the MVP code modular enough to scale after funding?",
        answer: "Yes, we build using clean modular Next.js and TypeScript standards that scale directly into full enterprise architectures.",
      },
    ],
  },

  // 3. Database & Data Engineering
  {
    slug: "database-data-engineering",
    id: "data-eng",
    title: "Database & Data Engineering",
    shortDesc: "Robust SQL/NoSQL architectures, ETL pipelines, and high-throughput data layers.",
    category: "Talent & Core Engineering",
    icon: "database",
    heroTagline: "High-performance data models, resilient ETL pipelines, and ultra-low latency queries.",
    overview:
      "Data is the foundation of high-growth applications. We design, optimize, and migrate relational and document databases, build automated data ingestion pipelines, and implement caching layers capable of handling millions of requests per second.",
    deliverables: [
      {
        title: "Relational & NoSQL Schema Design",
        description: "Optimized indexing, foreign key integrity, and partition strategies for PostgreSQL, MongoDB, and Redis.",
      },
      {
        title: "ETL & Streaming Pipelines",
        description: "Event-driven pipelines using Apache Kafka, RabbitMQ, and cloud pub/sub mechanisms.",
      },
      {
        title: "Query Optimization & Caching",
        description: "Query profiling, index tuning, and Redis caching layers driving sub-10ms response times.",
      },
      {
        title: "Zero-Downtime Data Migrations",
        description: "Seamless migration of multi-terabyte legacy data into modern managed cloud warehouses.",
      },
    ],
    techStack: ["PostgreSQL", "Redis", "MongoDB", "Apache Kafka", "Prisma", "ClickHouse", "AWS RDS"],
    process: [
      { step: "01", title: "Data Profiling", description: "Audit current schema, slow queries, and table locking bottlenecks." },
      { step: "02", title: "Architecture Blueprint", description: "Design normalized/denormalized schemas, caching strategies, and indexing." },
      { step: "03", title: "Pipeline Implementation", description: "Build streaming pipelines and automated data migration scripts." },
      { step: "04", title: "Stress Benchmarking", description: "Simulate high concurrency loads to guarantee uptime and SLAs." },
    ],
    metrics: [
      { label: "Average Query Latency Drop", value: "-68%" },
      { label: "Pipeline Reliability", value: "99.99%" },
      { label: "Data Integrity Rate", value: "100%" },
    ],
    faqs: [
      {
        question: "Can you help optimize slow existing SQL queries?",
        answer: "Yes, we analyze EXPLAIN ANALYZE traces, re-index schemas, and implement caching layers to dramatically reduce database load.",
      },
    ],
  },

  // 4. Cybersecurity & Compliance Audits
  {
    slug: "cybersecurity-compliance",
    id: "cybersecurity",
    title: "Cybersecurity & Compliance Audits",
    shortDesc: "Penetration testing, threat vector analysis, GDPR, and ISO-readiness reviews.",
    category: "Talent & Core Engineering",
    icon: "shield",
    heroTagline: "Ironclad defense for modern web systems, automated vulnerability scanning, and compliance readiness.",
    overview:
      "Enterprise clients demand verifiable security. We conduct rigorous threat modeling, black-box and white-box penetration testing, and code audits to safeguard proprietary data and maintain regulatory compliance.",
    deliverables: [
      {
        title: "Penetration Testing & Red Teaming",
        description: "Full-scope vulnerability audits targeting OWASP Top 10 vulnerabilities, API weaknesses, and auth bypasses.",
      },
      {
        title: "GDPR, SOC 2 & ISO 27001 Readiness",
        description: "Comprehensive policies, automated data encryption at rest/transit, and audit trails.",
      },
      {
        title: "Dependency & Supply Chain Audits",
        description: "Static and dynamic analysis catching zero-day vulnerabilities in package ecosystems.",
      },
      {
        title: "Zero-Trust Access Architecture",
        description: "Role-based access control (RBAC), multi-factor authentication (MFA), and session management.",
      },
    ],
    techStack: ["OWASP ZAP", "Snyk", "SonarQube", "HashiCorp Vault", "Cloudflare WAF", "AWS KMS"],
    process: [
      { step: "01", title: "Threat Surface Assessment", description: "Map out APIs, database endpoints, and external integration vectors." },
      { step: "02", title: "Simulated Exploits", description: "Execute automated and manual pen-tests to discover critical vulnerabilities." },
      { step: "03", title: "Remediation Engineering", description: "Deploy patches, harden server configs, and enforce cryptographic protocols." },
      { step: "04", title: "Compliance Verification", description: "Produce verifiable security audit documentation for enterprise stakeholders." },
    ],
    metrics: [
      { label: "Audit Success Rate", value: "100%" },
      { label: "Vulnerability Resolution", value: "< 24h" },
      { label: "Enterprise Compliance", value: "SOC 2 Ready" },
    ],
    faqs: [
      {
        question: "Do you supply official security audit reports?",
        answer: "Yes, we deliver executive summaries and deep technical remediation blueprints signed off by senior security engineers.",
      },
    ],
  },

  // 5. API Development & System Integration
  {
    slug: "api-development-integration",
    id: "api-integrations",
    title: "API Development & System Integration",
    shortDesc: "Seamless RESTful & GraphQL microservices connecting enterprise software.",
    category: "Talent & Core Engineering",
    icon: "plug",
    heroTagline: "High-concurrency microservices, GraphQL gateways, and unified third-party integrations.",
    overview:
      "Modern businesses rely on connected software ecosystems. We build resilient, type-safe REST and GraphQL APIs with comprehensive documentation, automated rate limiting, and webhooks that synchronize mission-critical business systems.",
    deliverables: [
      {
        title: "REST & GraphQL Gateways",
        description: "Contract-first API development using OpenAPI/Swagger specifications with rigorous schema validation.",
      },
      {
        title: "Third-Party Platform Connectors",
        description: "Direct bi-directional sync with Stripe, Salesforce, HubSpot, SAP, and custom internal tools.",
      },
      {
        title: "Resilient Webhook Infrastructure",
        description: "Queue-backed webhooks with automatic retries, idempotency keys, and dead-letter queues.",
      },
      {
        title: "Authentication & Token Governance",
        description: "OAuth2, JWT, and API key management with rate-limiting and DDoS mitigation.",
      },
    ],
    techStack: ["Node.js", "Express", "GraphQL", "FastAPI", "Postman", "OpenAPI", "Redis"],
    process: [
      { step: "01", title: "Contract Design", description: "Draft OpenAPI contracts and schema definitions with frontend & backend teams." },
      { step: "02", title: "Microservice Build", description: "Implement type-safe endpoints with input sanitization and unit tests." },
      { step: "03", title: "Integration Testing", description: "Automated mock simulations verifying idempotency and edge cases." },
      { step: "04", title: "Documentation & Portal", description: "Publish interactive developer documentation and automated SDKs." },
    ],
    metrics: [
      { label: "API Uptime", value: "99.99%" },
      { label: "Average Response Time", value: "< 45ms" },
      { label: "Daily Transactions Handled", value: "10M+" },
    ],
    faqs: [
      {
        question: "Do you build public-facing developer APIs?",
        answer: "Yes, complete with API key portals, rate-limiting tiers, and interactive Swagger/OpenAPI documentation.",
      },
    ],
  },

  // 6. QA & Automated Testing
  {
    slug: "qa-automated-testing",
    id: "qa-testing",
    title: "QA & Automated Testing",
    shortDesc: "End-to-end testing suites, performance benchmarking, and zero-defect QA.",
    category: "Talent & Core Engineering",
    icon: "check-circle",
    heroTagline: "Continuous test automation, zero-regression guarantees, and flawless release velocity.",
    overview:
      "Manual QA creates release bottlenecks and human oversights. We build automated testing pipelines covering unit, integration, end-to-end (E2E), and performance stress testing directly in your CI/CD workflow.",
    deliverables: [
      {
        title: "End-to-End Test Automation",
        description: "Comprehensive Playwright and Cypress test suites simulating real user behaviors across devices.",
      },
      {
        title: "API & Performance Stress Testing",
        description: "Load testing using k6 and Artillery to benchmark server stability under 50,000+ simultaneous connections.",
      },
      {
        title: "CI/CD Test Gateways",
        description: "Automated test runs preventing regressions from ever merging into main or production branches.",
      },
      {
        title: "Accessibility & Cross-Browser QA",
        description: "WCAG 2.1 AA accessibility validation and multi-browser compatibility verification.",
      },
    ],
    techStack: ["Playwright", "Cypress", "Jest", "Vitest", "k6", "GitHub Actions", "Lighthouse"],
    process: [
      { step: "01", title: "Test Plan Definition", description: "Map critical user journeys, revenue paths, and edge scenarios." },
      { step: "02", title: "Framework Setup", description: "Deploy headless browser runners inside your CI/CD deployment pipelines." },
      { step: "03", title: "Scenario Scripting", description: "Write resilient E2E scripts with visual regression checks." },
      { step: "04", title: "Continuous Monitoring", description: "Generate automated coverage reports on every pull request." },
    ],
    metrics: [
      { label: "Regression Defect Drop", value: "-95%" },
      { label: "Test Coverage Target", value: "> 85%" },
      { label: "Release Velocity Boost", value: "3.5x" },
    ],
    faqs: [
      {
        question: "Can you automate tests for an existing production app?",
        answer: "Yes, we integrate non-intrusive Playwright and API suites that test against your staging and production environments.",
      },
    ],
  },

  // 7. UI/UX Design & Product Discovery
  {
    slug: "ui-ux-design",
    id: "ui-ux",
    title: "UI/UX Design & Product Discovery",
    shortDesc: "User research, intuitive design systems, wireframing, and interactive prototypes.",
    category: "Cloud, DevOps & AI",
    icon: "palette",
    heroTagline: "Data-driven product discovery, intuitive design systems, and award-winning user interfaces.",
    overview:
      "World-class software starts with empathetic, precise design. We conduct user discovery, build comprehensive Figma design systems with interactive tokens, and design digital interfaces that make complex enterprise workflows intuitive.",
    deliverables: [
      {
        title: "Product Discovery & User Journey Mapping",
        description: "User interviews, competitive auditing, and information architecture blueprints.",
      },
      {
        title: "Scalable Figma Design Systems",
        description: "Reusable component libraries with typography scales, color schemes, and interactive states.",
      },
      {
        title: "High-Fidelity Interactive Prototypes",
        description: "Clickable prototypes simulating real product micro-interactions before engineering begins.",
      },
      {
        title: "Developer Hand-off Documentation",
        description: "Tailwind CSS token mappings and detailed responsive guidelines for swift frontend implementation.",
      },
    ],
    techStack: ["Figma", "FigJam", "Tailwind CSS", "Framer", "Storybook", "Principle"],
    process: [
      { step: "01", title: "Discovery & Empathy", description: "Analyze user pain points, business goals, and competitive benchmarks." },
      { step: "02", title: "Wireframing & UX Flow", description: "Build low-fidelity user flow wireframes to validate usability early." },
      { step: "03", title: "Visual Design System", description: "Create modern aesthetics, harmonious palettes, and component libraries." },
      { step: "04", title: "Prototyping & Validation", description: "Test clickable prototypes with target stakeholders and iterate rapidly." },
    ],
    metrics: [
      { label: "Conversion Lift", value: "+48%" },
      { label: "Design System Tokens", value: "200+" },
      { label: "Usability Rating", value: "98/100" },
    ],
    faqs: [
      {
        question: "Will the designs include both light and dark modes?",
        answer: "Yes, all design systems are built with dual-mode color tokens optimized for accessibility and brand harmony.",
      },
    ],
  },

  // 8. DevOps & CI/CD Engineering
  {
    slug: "devops-ci-cd",
    id: "devops",
    title: "DevOps & CI/CD Engineering",
    shortDesc: "Automated deployment pipelines, Docker, Kubernetes, and GitOps workflows.",
    category: "Cloud, DevOps & AI",
    icon: "cpu",
    heroTagline: "Zero-touch automated deployment pipelines, infrastructure as code, and cloud resilience.",
    overview:
      "Eliminate deployment anxiety and manual server updates. We engineer enterprise CI/CD pipelines, containerize applications with Docker and Kubernetes, and implement GitOps workflows that let your team ship code confidently several times a day.",
    deliverables: [
      {
        title: "Automated CI/CD Pipelines",
        description: "GitHub Actions and GitLab CI workflows with automated linting, test runners, and staged rollouts.",
      },
      {
        title: "Containerization & Orchestration",
        description: "Docker multi-stage builds and Kubernetes (EKS/GKE) helm charts for scalable cluster deployments.",
      },
      {
        title: "Infrastructure as Code (IaC)",
        description: "Reproducible cloud provisioning using Terraform and AWS CloudFormation.",
      },
      {
        title: "Zero-Downtime Blue-Green Deployments",
        description: "Canary and blue-green releases ensuring zero dropped requests during new software versions.",
      },
    ],
    techStack: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS", "ArgoCD", "Helm"],
    process: [
      { step: "01", title: "Pipeline Audit", description: "Assess existing deployment bottlenecks, environment drift, and build times." },
      { step: "02", title: "Containerization", description: "Standardize microservices into lightweight, hardened Docker images." },
      { step: "03", title: "IaC Setup", description: "Define cloud infrastructure in Terraform with state locking and secrets control." },
      { step: "04", title: "Automated Rollouts", description: "Deploy blue-green pipelines with automatic health rollback triggers." },
    ],
    metrics: [
      { label: "Deployment Frequency", value: "10x Faster" },
      { label: "Rollback Uptime", value: "100%" },
      { label: "Build Time Reduction", value: "-70%" },
    ],
    faqs: [
      {
        question: "Can you help migrate our manual deploys to GitHub Actions?",
        answer: "Yes, we create complete automated pipelines with staging, production, and preview environments.",
      },
    ],
  },

  // 9. Legacy Software Maintenance & Modernization
  {
    slug: "legacy-software-modernization",
    id: "legacy-modernization",
    title: "Legacy Software Maintenance & Modernization",
    shortDesc: "Migrating monolithic codebases to modern, cloud-native microservices.",
    category: "Cloud, DevOps & AI",
    icon: "refresh",
    heroTagline: "Transform brittle legacy monoliths into lightning-fast, maintainable modern web architectures.",
    overview:
      "Old technology stacks slow down feature development and pose critical security risks. We incrementally modernize legacy web apps (PHP, .NET, Java, older React) into modern Next.js and TypeScript ecosystems without interrupting your live business operations.",
    deliverables: [
      {
        title: "Strangler-Fig Migration Strategy",
        description: "Gradually replace monolithic services feature by feature without requiring risky big-bang rewrites.",
      },
      {
        title: "Next.js App Router Re-platforming",
        description: "Rebuild legacy frontend templates into high-performance, server-rendered React applications.",
      },
      {
        title: "Codebase Refactoring & Cleanup",
        description: "De-tangle technical debt, introduce strict TypeScript types, and automate linting rules.",
      },
      {
        title: "Database Decoupling",
        description: "Isolate legacy shared databases into clean microservice API boundaries.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Docker", "PostgreSQL"],
    process: [
      { step: "01", title: "Architecture Audit", description: "Analyze dependency graphs, database bottlenecks, and security vulnerabilities." },
      { step: "02", title: "Migration Roadmap", description: "Establish non-disruptive proxy routing for incremental feature conversion." },
      { step: "03", title: "Modular Rebuild", description: "Migrate user-facing views to modern Next.js with unified design tokens." },
      { step: "04", title: "Sunset & Decommission", description: "Retire legacy servers safely after validating all production benchmarks." },
    ],
    metrics: [
      { label: "Page Load Speed Boost", value: "4x Faster" },
      { label: "Server Cost Reduction", value: "-45%" },
      { label: "Zero Disruption Record", value: "100%" },
    ],
    faqs: [
      {
        question: "Will our customers experience downtime during the migration?",
        answer: "No. We use strangler-pattern reverse proxies so changes are routed imperceptibly with zero downtime.",
      },
    ],
  },

  // 10. Server & Cloud Infrastructure Management
  {
    slug: "server-cloud-infrastructure",
    id: "cloud-mgmt",
    title: "Server & Cloud Infrastructure Management",
    shortDesc: "AWS, GCP, and Azure high-availability cluster architecture and 24/7 reliability.",
    category: "Cloud, DevOps & AI",
    icon: "cloud",
    heroTagline: "Cloud architecture, 24/7 uptime monitoring, auto-scaling clusters, and cost optimization.",
    overview:
      "Don't let unexpected traffic spikes crash your business. We architect, monitor, and manage cloud environments across AWS, GCP, and Azure. With automated auto-scaling and proactive observability, we ensure your infrastructure remains resilient and cost-efficient.",
    deliverables: [
      {
        title: "High-Availability Multi-Region Architecture",
        description: "Resilient VPCs, load balancers, and multi-zone auto-scaling groups with 99.99% SLA targets.",
      },
      {
        title: "24/7 Observability & Telemetry",
        description: "Comprehensive Grafana, Prometheus, and Datadog dashboards with instant PagerDuty alerts.",
      },
      {
        title: "Cloud Cost Optimization (FinOps)",
        description: "Downsize over-provisioned instances, introduce spot workloads, and reduce AWS/GCP bills by 30-50%.",
      },
      {
        title: "Disaster Recovery & Backup Policies",
        description: "Automated snapshotting, cross-region replication, and failover runbooks.",
      },
    ],
    techStack: ["AWS", "Google Cloud", "Microsoft Azure", "Datadog", "Prometheus", "Grafana", "Terraform"],
    process: [
      { step: "01", title: "Cloud Assessment", description: "Audit cloud utilization, network topology, and security perimeters." },
      { step: "02", title: "Cluster Hardening", description: "Implement auto-scaling policies, CDN edge caching, and firewall rules." },
      { step: "03", title: "Observability Setup", description: "Configure custom metrics, error tracking, and automated alerting channels." },
      { step: "04", title: "Continuous Optimization", description: "Monthly FinOps reviews ensuring high capacity at lowest possible spend." },
    ],
    metrics: [
      { label: "Uptime SLA Guarantee", value: "99.99%" },
      { label: "Average Cloud Bill Savings", value: "35%" },
      { label: "Incident Resolution Time", value: "< 15 Mins" },
    ],
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer: "We support AWS, Google Cloud Platform (GCP), Microsoft Azure, Vercel Enterprise, and hybrid setups.",
      },
    ],
  },

  // 11. Custom AI Agents & Copilots
  {
    slug: "custom-ai-agents",
    id: "ai-agents",
    title: "Custom AI Agents & Copilots",
    shortDesc: "Intelligent autonomous agents, LLM orchestration, and smart assistants.",
    category: "Cloud, DevOps & AI",
    icon: "sparkles",
    tag: "AI",
    heroTagline: "Autonomous AI agents, domain-specific copilots, and multi-modal LLM applications.",
    overview:
      "Transform static software into proactive, intelligent teammates. We build autonomous AI agents powered by OpenAI, Claude, and open-source models with Retrieval-Augmented Generation (RAG), vector databases, and custom tool calling capabilities.",
    deliverables: [
      {
        title: "Domain-Specific AI Copilots",
        description: "Context-aware conversational assistants trained on your proprietary data with strict guardrails.",
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Semantic search and document indexing using Pinecone and pgvector with zero hallucination protocols.",
      },
      {
        title: "Multi-Agent Orchestration",
        description: "Autonomous agents collaborating via LangChain and LangGraph to complete multi-step business objectives.",
      },
      {
        title: "LLM Fine-Tuning & Evaluation",
        description: "Fine-tuned models tailored to specialized vocabularies with continuous automated evaluation.",
      },
    ],
    techStack: ["OpenAI", "Anthropic Claude", "LangChain", "Pinecone", "pgvector", "Python", "Next.js"],
    process: [
      { step: "01", title: "Use Case Discovery", description: "Identify high-value business interactions suitable for generative intelligence." },
      { step: "02", title: "Vector Knowledge Base", description: "Ingest and index company knowledge into secure, private vector databases." },
      { step: "03", title: "Agent Logic & Tools", description: "Implement prompt engineering, reasoning loops, and external API connectors." },
      { step: "04", title: "Safety Guardrails", description: "Deploy automated safety filters, audit logging, and human-in-the-loop triggers." },
    ],
    metrics: [
      { label: "Query Accuracy Rate", value: "99.2%" },
      { label: "Response Latency", value: "< 1.2s" },
      { label: "Labor Time Saved", value: "60%+" },
    ],
    faqs: [
      {
        question: "Is our proprietary data kept private when using AI models?",
        answer: "Yes, we use enterprise zero-retention API endpoints and private VPC vector stores ensuring your data is never used for training.",
      },
    ],
  },

  // 12. AI Workflow Automation
  {
    slug: "ai-workflow-automation",
    id: "ai-automation",
    title: "AI Workflow Automation",
    shortDesc: "Streamline repetitive company workflows with generative AI and robotic automation.",
    category: "Cloud, DevOps & AI",
    icon: "zap",
    tag: "Hot",
    heroTagline: "Automate repetitive business processes, document processing, and customer routing with AI.",
    overview:
      "Free your team from tedious administrative tasks. We connect your enterprise tools (CRMs, ERPs, email, databases) with intelligent AI automation pipelines that extract data, synthesize reports, and execute actions autonomously.",
    deliverables: [
      {
        title: "Intelligent Document Processing (IDP)",
        description: "Extract structured data from invoices, contracts, and PDFs with 99%+ OCR accuracy.",
      },
      {
        title: "Multi-Platform Automation Workflows",
        description: "Custom n8n and Zapier Enterprise orchestrations connecting Slack, Salesforce, and internal databases.",
      },
      {
        title: "Automated Customer Support Triage",
        description: "AI classification routing tickets to appropriate departments with drafted responses ready for approval.",
      },
      {
        title: "Automated Reporting & Synthesizing",
        description: "Daily automated summaries generated from complex analytics and delivered to executive inboxes.",
      },
    ],
    techStack: ["n8n", "Python", "OpenAI", "Zapier Enterprise", "PostgreSQL", "Docker"],
    process: [
      { step: "01", title: "Process Mapping", description: "Identify manual administrative bottlenecks and measure baseline labor hours." },
      { step: "02", title: "Pipeline Architecture", description: "Design resilient event triggers, error-handling fallbacks, and data transformations." },
      { step: "03", title: "Integration Testing", description: "Run automated workflows in sandbox mode to verify accuracy and data integrity." },
      { step: "04", title: "Production Deployment", description: "Roll out live automation with real-time alerting and audit dashboards." },
    ],
    metrics: [
      { label: "Manual Hours Saved / Wk", value: "120+ Hrs" },
      { label: "Document Processing Speed", value: "10x Faster" },
      { label: "Error Reduction", value: "99%" },
    ],
    faqs: [
      {
        question: "Can automation workflows handle exceptions gracefully?",
        answer: "Yes, every pipeline includes human-in-the-loop review queues whenever confidence scores fall below defined thresholds.",
      },
    ],
  },

  // 13. ERP Systems & Solutions
  {
    slug: "erp-systems-solutions",
    id: "erp",
    title: "ERP Systems & Solutions",
    shortDesc: "Tailored enterprise resource planning solutions unifying finances and operations.",
    category: "Custom Apps & Software",
    icon: "layers",
    heroTagline: "Unified operations, inventory, finances, and human resources in a single enterprise platform.",
    overview:
      "Off-the-shelf ERP platforms are often clunky and prohibitively expensive. We architect bespoke, modular ERP systems engineered around your exact supply chains, accounting rules, and departmental workflows.",
    deliverables: [
      {
        title: "Custom Operational Dashboards",
        description: "Real-time visibility into inventory, sales pipelines, orders, and financial projections.",
      },
      {
        title: "Accounting & Multi-Currency Billing",
        description: "Automated tax calculation, invoice generation, multi-currency ledger support, and banking reconciliations.",
      },
      {
        title: "Role-Based Access & Audit Logs",
        description: "Granular permissions for executives, managers, and warehouse staff with tamper-evident audit logs.",
      },
      {
        title: "Legacy ERP Migration",
        description: "Extract and modernize legacy SAP, Oracle, or Microsoft Dynamics data into modern web interfaces.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "AWS"],
    process: [
      { step: "01", title: "Operational Blueprint", description: "Document internal processes across supply chain, accounting, and sales." },
      { step: "02", title: "Data Architecture", description: "Design normalized entity schemas linking inventory, users, and transactions." },
      { step: "03", title: "Modular Development", description: "Build modules incrementally, starting with core billing and inventory." },
      { step: "04", title: "User Training & Rollout", description: "Conduct staff onboarding workshops and phased departmental migrations." },
    ],
    metrics: [
      { label: "Operational Speed Boost", value: "+65%" },
      { label: "Software Licensing Savings", value: "Up to 60%" },
      { label: "Data Synchronization", value: "Real-time" },
    ],
    faqs: [
      {
        question: "Can our custom ERP integrate with our existing accounting software?",
        answer: "Yes, we provide bi-directional sync with QuickBooks, Xero, Stripe, and internal banking gateways.",
      },
    ],
  },

  // 14. Custom Software Development
  {
    slug: "custom-software-development",
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc: "Bespoke full-stack web and internal software crafted for your unique workflows.",
    category: "Custom Apps & Software",
    icon: "code",
    heroTagline: "Tailored full-stack enterprise software engineered for security, high throughput, and durability.",
    overview:
      "When off-the-shelf software limits your growth, custom software is your competitive moat. We engineer bespoke web platforms, portals, and internal tools tailored specifically to solve your hardest operational challenges.",
    deliverables: [
      {
        title: "Full-Stack Web Architecture",
        description: "Modern Next.js frontends powered by high-performance Node.js/Go backends and cloud databases.",
      },
      {
        title: "Internal Tooling & Operations Portals",
        description: "Custom admin consoles, customer support tools, and data visualizations that supercharge your staff.",
      },
      {
        title: "Enterprise Security & SSO Integration",
        description: "SAML, Okta, Azure AD, and Google Workspace Single Sign-On with encrypted databases.",
      },
      {
        title: "Full Intellectual Property Ownership",
        description: "100% of code, documentation, and design assets belong to your organization without vendor lock-in.",
      },
    ],
    techStack: ["TypeScript", "Next.js", "Node.js", "Go", "PostgreSQL", "Docker", "Tailwind CSS"],
    process: [
      { step: "01", title: "Technical Scoping", description: "Turn business requirements into actionable architectural specifications." },
      { step: "02", title: "Sprint Cycles", description: "Agile 2-week sprints with testable deliverables and code review transparency." },
      { step: "03", title: "Enterprise Hardening", description: "Perform load tests, security penetration audits, and cross-device testing." },
      { step: "04", title: "Deployment & Training", description: "Roll out to production with developer hand-off documentation and SLA support." },
    ],
    metrics: [
      { label: "On-Time Delivery Rate", value: "97.8%" },
      { label: "Client Code Ownership", value: "100%" },
      { label: "Architecture Scalability", value: "1M+ Users" },
    ],
    faqs: [
      {
        question: "Who owns the code once the project is finished?",
        answer: "You retain 100% full intellectual property ownership and copyright of all code, assets, and documentation.",
      },
    ],
  },

  // 15. Windows / Desktop App Development
  {
    slug: "desktop-app-development",
    id: "desktop-app",
    title: "Windows / Desktop App Development",
    shortDesc: "High-performance cross-platform desktop applications built with modern tools.",
    category: "Custom Apps & Software",
    icon: "monitor",
    heroTagline: "Native-grade performance, offline-first reliability, and modern cross-platform desktop software.",
    overview:
      "Need deep hardware access, offline capabilities, or intensive local processing? We build robust desktop applications for Windows, macOS, and Linux using modern frameworks like Electron and Tauri that combine web agility with native performance.",
    deliverables: [
      {
        title: "Cross-Platform Desktop Apps",
        description: "Universal binaries running seamlessly across Windows 10/11, macOS, and Linux from a single codebase.",
      },
      {
        title: "Offline-First & Local Storage",
        description: "Embedded SQLite databases and sync engines allowing uninterrupted productivity without internet.",
      },
      {
        title: "Hardware & Native API Integration",
        description: "Deep OS access including file system hooks, USB/peripheral communication, and native notifications.",
      },
      {
        title: "Automated Auto-Updates & Code Signing",
        description: "Signed executables (.msi, .exe, .dmg) with background delta updates that require no manual downloads.",
      },
    ],
    techStack: ["Tauri", "Electron", "Rust", "React", "TypeScript", "SQLite"],
    process: [
      { step: "01", title: "Native Scoping", description: "Define memory constraints, hardware hooks, and target OS distribution channels." },
      { step: "02", title: "Core Architecture", description: "Build lightweight Rust/C++ native bridge with React/Next.js frontend." },
      { step: "03", title: "Code Signing", description: "Acquire and configure EV code signing certificates preventing antivirus alerts." },
      { step: "04", title: "Installer Generation", description: "Generate signed MSI and EXE installers with automated updater servers." },
    ],
    metrics: [
      { label: "App Startup Time", value: "< 500ms" },
      { label: "Memory Footprint", value: "< 60MB" },
      { label: "Cross-Platform Parity", value: "100%" },
    ],
    faqs: [
      {
        question: "Do you provide official code signing for Windows and Mac?",
        answer: "Yes, we sign all installers with trusted digital certificates so users experience zero security warnings.",
      },
    ],
  },

  // 16. Mobile App Development
  {
    slug: "mobile-app-development",
    id: "mobile-app",
    title: "Mobile App Development",
    shortDesc: "Native and hybrid iOS/Android apps delivering smooth 60fps UX experiences.",
    category: "Custom Apps & Software",
    icon: "smartphone",
    heroTagline: "Buttery-smooth 60fps iOS and Android applications engineered for high engagement and retention.",
    overview:
      "Engage your users where they spend their time. We design and build high-performance mobile applications using React Native and Flutter, delivering native iOS and Android experiences with unified codebases and rapid App Store deployment.",
    deliverables: [
      {
        title: "Cross-Platform iOS & Android Apps",
        description: "Unified React Native codebases achieving native 60fps animations and seamless gestures on both platforms.",
      },
      {
        title: "Push Notifications & Deep Linking",
        description: "Configured Apple Push Notification service (APNs) and Firebase Cloud Messaging with dynamic deep links.",
      },
      {
        title: "In-App Purchases & Subscriptions",
        description: "RevenueCat and native Apple/Google Pay integrations for seamless digital subscription billing.",
      },
      {
        title: "App Store & Google Play Submissions",
        description: "Full management of App Store review guidelines, screenshots, metadata, and compliant release management.",
      },
    ],
    techStack: ["React Native", "Expo", "Flutter", "TypeScript", "Firebase", "RevenueCat", "Fastlane"],
    process: [
      { step: "01", title: "Mobile UX/UI Design", description: "Design mobile-first interfaces following Apple HIG and Material Design standards." },
      { step: "02", title: "Cross-Platform Build", description: "Develop mobile components with offline caching and state persistence." },
      { step: "03", title: "TestFlight & Beta", description: "Distribute automated internal builds via TestFlight and Google Play Beta." },
      { step: "04", title: "Store Submission", description: "Complete store listing optimization and pass initial review guidelines smoothly." },
    ],
    metrics: [
      { label: "App Store Approval Rate", value: "99%" },
      { label: "Frame Rate Performance", value: "60 FPS" },
      { label: "Code Sharing Ratio", value: "> 90%" },
    ],
    faqs: [
      {
        question: "Can a single codebase run on both iPhone and Android?",
        answer: "Yes! Using React Native or Flutter, over 90% of code is shared across both platforms while looking completely native.",
      },
    ],
  },

  // 17. Web Application Development
  {
    slug: "web-application-development",
    id: "web-app",
    title: "Web Application Development",
    shortDesc: "Scalable, secure, and fast React/Next.js web applications engineered for growth.",
    category: "Custom Apps & Software",
    icon: "globe",
    heroTagline: "Enterprise-grade Next.js web platforms, SaaS applications, and interactive digital ecosystems.",
    overview:
      "Your web application is your flagship product. We architect high-performance, responsive, and SEO-optimized web applications with modern Next.js App Router, Tailwind CSS, and edge computing for instant page transitions and high conversion rates.",
    deliverables: [
      {
        title: "Full-Stack Next.js Applications",
        description: "Server-side rendering (SSR), static site generation (SSG), and edge middleware for ultra-fast performance.",
      },
      {
        title: "Responsive Multi-Screen Layouts",
        description: "Fluid design engineered for every device from 4K desktop displays down to mobile screens.",
      },
      {
        title: "SEO Optimization & Core Web Vitals",
        description: "Perfect 95+ Google Lighthouse scores, semantic HTML5, dynamic OpenGraph cards, and schema metadata.",
      },
      {
        title: "Secure Authentication & Payments",
        description: "NextAuth, Clerk, or Supabase Auth coupled with automated Stripe subscriptions and customer billing portals.",
      },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
    process: [
      { step: "01", title: "Architecture & Wireframes", description: "Plan component hierarchies, server vs client boundaries, and state flow." },
      { step: "02", title: "Iterative Frontend Build", description: "Build pixel-perfect responsive components with accessible HTML5 standards." },
      { step: "03", title: "API & Database Hookup", description: "Integrate database models, authentication, and payment workflows." },
      { step: "04", title: "Edge Deployment & Audit", description: "Deploy to global CDN edge servers with 95+ Core Web Vitals verification." },
    ],
    metrics: [
      { label: "Lighthouse Performance Score", value: "98/100" },
      { label: "Average First Contentful Paint", value: "< 0.6s" },
      { label: "Conversion Lift Reported", value: "+42%" },
    ],
    faqs: [
      {
        question: "Why choose Next.js for web application development?",
        answer: "Next.js offers the best hybrid of speed, SEO indexing, developer velocity, and edge scalability in the modern JavaScript ecosystem.",
      },
    ],
  },
];

export function getServiceBySlug(slug) {
  return ALL_SERVICES_DATA.find((service) => service.slug === slug);
}

export const DETAILED_SERVICES = ALL_SERVICES_DATA.map(s => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  shortDesc: s.shortDesc,
  category: s.category,
  icon: s.icon,
  tag: s.tag,
}));

export const SERVICE_COLUMNS = [
  {
    title: "Talent & Core Engineering",
    subtitle: "Scale engineering & core foundation",
    services: ALL_SERVICES_DATA.filter(s => s.category === "Talent & Core Engineering"),
  },
  {
    title: "Cloud, DevOps & AI",
    subtitle: "Intelligent systems & cloud resilience",
    services: ALL_SERVICES_DATA.filter(s => s.category === "Cloud, DevOps & AI"),
  },
  {
    title: "Custom Apps & Software",
    subtitle: "Tailored multi-platform products",
    services: ALL_SERVICES_DATA.filter(s => s.category === "Custom Apps & Software"),
  },
];

