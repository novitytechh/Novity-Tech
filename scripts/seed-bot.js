/**
 * Novity Tech - Knowledge Base Ingestion Script for Chatbot
 * 
 * Run with: node scripts/seed-bot.js
 * Requires: GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

const fs = require('fs');
const path = require('path');

// Load .env.local if present
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      value = value.trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const {
  ingestDocument,
  createGeminiEmbeddingAdapter,
} = require('@hasaan_6/rag-chatbot-widget/server');

const geminiKey = process.env.GEMINI_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!geminiKey || !supabaseUrl || !supabaseKey) {
  console.error('Missing credentials! Please make sure these are set in .env.local:');
  console.error('• GEMINI_API_KEY');
  console.error('• SUPABASE_URL');
  console.error('• SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const embedText = createGeminiEmbeddingAdapter(geminiKey);

const knowledgeChunks = [
  {
    content: "Novity Tech is a digital-first engineering and design agency founded in Gujranwala, Pakistan. We partner with ambitious startups and enterprises to architect scalable full-stack web applications, custom AI copilot workflows, cloud-native infrastructures, and bespoke design systems. We guarantee 100% code and asset ownership with zero vendor lock-in.",
    metadata: { title: "Company Overview", url: "https://novitytech.com/about" },
  },
  {
    content: "Novity Tech Contact Details: Direct phone number: +92 329 1013649. Email: novitytechh@gmail.com. Office Location: Gujranwala, Pakistan. Business Hours: Monday to Friday from 9:00 AM to 6:00 PM, Saturday from 10:00 AM to 2:00 PM.",
    metadata: { title: "Contact Information & Business Hours", url: "https://novitytech.com/contact" },
  },
  {
    content: "Novity Tech Team & Leadership: Formed by 1 Founder & Chief Executive Officer (CEO), 2 Co-Founders (Chief Technology Officer & Chief Operating Officer), and 4 specialized core team members across Full-Stack Engineering, UI/UX Design Systems, and Cloud DevOps/AI Systems.",
    metadata: { title: "Leadership Team", url: "https://novitytech.com/team" },
  },
  {
    content: "Core Services offered by Novity Tech: 1. Web Application Development (Next.js, React, Node.js). 2. Custom AI Agents & Copilots. 3. Cloud & DevOps Infrastructure (Docker, Kubernetes, AWS). 4. MVP Development for Startups. 5. UI/UX Design Systems. 6. IT Staff Augmentation with dedicated senior engineers.",
    metadata: { title: "Services & Capabilities", url: "https://novitytech.com/services" },
  },
  {
    content: "Client satisfaction rate at Novity Tech is 4.7 out of 5.0 with 4+ verified client reviews. We operate on transparent agile sprint milestones with weekly video demos, live staging deployments, and SLA performance guarantees.",
    metadata: { title: "Client Reviews & Metrics", url: "https://novitytech.com/reviews" },
  },
];

async function seed() {
  console.log('Seeding knowledge base into Supabase vector store...');
  for (const doc of knowledgeChunks) {
    try {
      await ingestDocument(doc.content, doc.metadata, embedText, supabaseUrl, supabaseKey);
      console.log(`Ingested: ${doc.metadata.title}`);
    } catch (err) {
      console.error(`Failed to ingest "${doc.metadata.title}":`, err.message);
    }
  }
  console.log('All knowledge chunks successfully uploaded!');
}

seed();
