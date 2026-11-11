/**
 * Novity Tech - Neon Postgres Database Seeding Script for Chatbot
 * 
 * Usage:
 *   node scripts/seed-neon.js "postgresql://user:password@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require"
 * 
 * Or set DATABASE_URL in .env.local and run:
 *   node scripts/seed-neon.js
 */

const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// 1. Resolve DATABASE_URL from command line argument or .env.local
let dbUrl = process.argv[2] || process.env.DATABASE_URL;

if (!dbUrl) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const match = line.match(/^\s*DATABASE_URL\s*=\s*(.*)?\s*$/);
      if (match) {
        dbUrl = (match[1] || '').trim().replace(/^['"]|['"]$/g, '');
        break;
      }
    }
  }
}

if (!dbUrl) {
  console.error('\n[Error] DATABASE_URL is required to seed Neon database.');
  console.log('\nPlease run:');
  console.log('  node scripts/seed-neon.js "<YOUR_NEON_POSTGRES_CONNECTION_STRING>"\n');
  console.log('Or add DATABASE_URL="postgresql://..." to your .env.local file.\n');
  process.exit(1);
}

const sql = neon(dbUrl);

const KNOWLEDGE_ITEMS = [
  {
    category: "overview",
    title: "About Novity Tech",
    content: "Novity Tech is a premier digital engineering and design agency founded in Gujranwala, Pakistan. We architect high-performance full-stack web platforms, custom AI copilot workflows, and resilient cloud infrastructure. We partner directly with founders and enterprise leaders, guaranteeing 100% code ownership and sub-second performance.",
    url: "/about",
    tags: ["about", "overview", "novity", "company", "mission", "values"]
  },
  {
    category: "contact",
    title: "Contact Details & Office Hours",
    content: "Reach Novity Tech directly:\n• Phone: +92 329 1013649\n• Email: novitytechh@gmail.com\n• Office: Gujranwala, Pakistan\n• Business Hours: Monday – Friday: 9:00 AM – 6:00 PM | Saturday: 10:00 AM – 2:00 PM (PKT).\n• Direct consultations can be scheduled through our contact page or by emailing our leads directly.",
    url: "/contact",
    tags: ["contact", "phone", "number", "email", "office", "location", "address", "call", "hours", "gujranwala", "pakistan"]
  },
  {
    category: "team",
    title: "Team Structure & Leadership",
    content: "Novity Tech is driven by senior technical leaders with zero junior delegation:\n• 1 Founder & Chief Executive Officer (CEO)\n• 2 Co-Founders: Chief Technology Officer (CTO) & Chief Operating Officer (COO)\n• 4 Specialized Core Team Members across Full-Stack Web Development, Cloud DevOps, AI Systems, and UI/UX Architecture.\nClients collaborate directly with founding engineers on every milestone.",
    url: "/team",
    tags: ["team", "founder", "cofounder", "members", "leadership", "engineers", "architects", "who"]
  },
  {
    category: "services",
    title: "Core Engineering Services",
    content: "Novity Tech delivers five core engineering pillars:\n1. Full-Stack Web Applications: Next.js, React, Node.js, TypeScript with sub-second performance.\n2. Custom AI Workflows: Autonomous AI agents, Gemini/OpenAI RAG copilots, and intelligent data pipelines.\n3. Cloud & DevOps Resilience: AWS, GCP, Docker, Kubernetes with automated CI/CD and zero-downtime deployments.\n4. MVP Acceleration: Rapid 4-to-6 week sprint launches for venture-backed and bootstrapped startups.\n5. Design Systems & UX: Luxury typography, accessible component libraries, and bespoke brand aesthetics.",
    url: "/services",
    tags: ["services", "web", "ai", "cloud", "devops", "mvp", "design", "nextjs", "react", "capabilities", "offer"]
  },
  {
    category: "process",
    title: "How to Start a Project",
    content: "To initiate a software project with Novity Tech, submit an inquiry on our contact page or call +92 329 1013649. We begin with a complimentary architectural discovery call to map technical requirements, sprint milestones, and SLA guarantees before writing a single line of code.",
    url: "/contact",
    tags: ["hire", "start", "quote", "pricing", "cost", "process", "nda", "contract"]
  }
];

async function seed() {
  console.log('\n[Neon Database Seeding]');
  console.log('Connecting to Neon PostgreSQL...');

  try {
    // 1. Create table
    await sql`
      CREATE TABLE IF NOT EXISTS chatbot_knowledge (
        id SERIAL PRIMARY KEY,
        category VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        url VARCHAR(255),
        tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('✓ Table `chatbot_knowledge` ensured in Neon.');

    // 2. Clear old seeded rows to avoid duplicates
    await sql`TRUNCATE TABLE chatbot_knowledge;`;
    console.log('✓ Cleaned existing rows.');

    // 3. Insert items
    for (const item of KNOWLEDGE_ITEMS) {
      await sql`
        INSERT INTO chatbot_knowledge (category, title, content, url, tags)
        VALUES (${item.category}, ${item.title}, ${item.content}, ${item.url}, ${item.tags});
      `;
      console.log(`  + Seeded: ${item.title}`);
    }

    // 4. Verify count
    const rows = await sql`SELECT count(*)::int as total FROM chatbot_knowledge;`;
    console.log(`\n🎉 Success! Seeded ${rows[0].total} knowledge entries into your Neon database.`);
    console.log('Your chatbot will now query live data directly from Neon!\n');
  } catch (err) {
    console.error('\n❌ Neon Seeding Error:', err.message);
    process.exit(1);
  }
}

seed();
