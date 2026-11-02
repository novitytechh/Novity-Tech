import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { neon } from "@neondatabase/serverless";

// Built-in company knowledge for Novity Tech
const DEFAULT_KNOWLEDGE = [
  {
    title: "About Novity Tech",
    content:
      "Novity Tech is a premier digital engineering and design agency founded in Gujranwala, Pakistan. We architect high-performance full-stack web platforms, custom AI copilot workflows, and resilient cloud infrastructure. We partner directly with founders and enterprise leaders, guaranteeing 100% code ownership and sub-second performance.",
  },
  {
    title: "Contact Details & Office Hours",
    content:
      "Reach Novity Tech directly:\n• Phone: +92 329 1013649\n• Email: novitytechh@gmail.com\n• Office: Gujranwala, Pakistan\n• Business Hours: Monday – Friday: 9:00 AM – 6:00 PM | Saturday: 10:00 AM – 2:00 PM (PKT).\n• Direct consultations can be scheduled through our contact page or by emailing our leads directly.",
  },
  {
    title: "Team Structure & Leadership",
    content:
      "Novity Tech is driven by senior technical leaders with zero junior delegation:\n• 1 Founder & Chief Executive Officer (CEO)\n• 2 Co-Founders: Chief Technology Officer (CTO) & Chief Operating Officer (COO)\n• 4 Specialized Core Team Members across Full-Stack Web Development, Cloud DevOps, AI Systems, and UI/UX Architecture.\nClients collaborate directly with founding engineers on every milestone.",
  },
  {
    title: "Core Engineering Services",
    content:
      "Novity Tech delivers five core engineering pillars:\n1. Full-Stack Web Applications: Next.js, React, Node.js, TypeScript with sub-second performance.\n2. Custom AI Workflows: Autonomous AI agents, Gemini/OpenAI RAG copilots, and intelligent data pipelines.\n3. Cloud & DevOps Resilience: AWS, GCP, Docker, Kubernetes with automated CI/CD and zero-downtime deployments.\n4. MVP Acceleration: Rapid 4-to-6 week sprint launches for venture-backed and bootstrapped startups.\n5. Design Systems & UX: Luxury typography, accessible component libraries, and bespoke brand aesthetics.",
  },
  {
    title: "Track Record & Client Endorsements",
    content:
      "Novity Tech holds a 4.7 / 5.0 client satisfaction rating backed by 4+ verified client reviews. We operate on fixed-scope SLA commitments, weekly interactive video demos, shared GitHub repositories, and 100% full repository handover upon milestone delivery.",
  },
  {
    title: "How to Start a Project",
    content:
      "To initiate a software project with Novity Tech, submit an inquiry on our contact page or call +92 329 1013649. We begin with a complimentary architectural discovery call to map technical requirements, sprint milestones, and SLA guarantees before writing a single line of code.",
  },
];

async function getKnowledgeBase() {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        SELECT title, content, category, tags
        FROM chatbot_knowledge
        ORDER BY id ASC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (dbErr) {
      console.warn("[Chat API] Neon query notice, using default knowledge:", dbErr.message);
    }
  }
  return DEFAULT_KNOWLEDGE;
}

function getFallbackAnswer(userText, knowledge) {
  const q = (userText || "").toLowerCase().trim();

  // Match against knowledge entries
  for (const item of knowledge) {
    const full = `${item.title} ${item.content} ${(item.tags || []).join(" ")}`.toLowerCase();
    const words = q.replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 2);
    if (full.includes(q) || words.some((w) => full.includes(w))) {
      return item.content;
    }
  }

  return (
    "Novity Tech is a digital-first engineering and design agency in Gujranwala, Pakistan. " +
    "We architect modern full-stack web platforms, AI copilots, and scalable cloud systems. " +
    "How can I help you today? You can contact us at +92 329 1013649 or novitytechh@gmail.com."
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages = [] } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Retrieve company knowledge from Neon or fallback
    const knowledge = await getKnowledgeBase();
    const knowledgeText = knowledge
      .map((k) => `### ${k.title}\n${k.content}`)
      .join("\n\n");

    const systemPrompt = `You are the official AI Assistant for Novity Tech (novitytech.com), a premier software engineering and design agency based in Gujranwala, Pakistan.

Your mission is to represent Novity Tech with high professionalism, elegance, and deep technical clarity. Always be courteous, helpful, concise, and focused on converting inquiries into successful engineering collaborations.

Verified Company Knowledge:
${knowledgeText}

Key Guidelines:
- Highlight Novity Tech's core strengths: high-performance Next.js/React engineering, custom AI copilot workflows, cloud resilience (AWS/Docker/K8s), and full repository ownership.
- Office location: Gujranwala, Pakistan.
- Contact: Phone (+92 329 1013649) & Email (novitytechh@gmail.com).
- Keep answers formatted with clean markdown, bullet points, and clear calls-to-action when appropriate.`;

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (apiKey) {
      try {
        const google = createGoogleGenerativeAI({ apiKey });
        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
          model: google("gemini-3.5-flash-lite"),
          system: systemPrompt,
          messages: modelMessages,
        });

        return result.toUIMessageStreamResponse();
      } catch (streamError) {
        console.warn("[Chat API] Gemini streaming error, switching to resilient knowledge responder:", streamError.message);
      }
    }

    // Resilient Fallback UI Message Stream if API key is absent or temporarily throttled
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const userText = Array.isArray(lastUserMessage?.parts)
      ? lastUserMessage.parts
          .filter((p) => p.type === "text")
          .map((p) => p.text)
          .join(" ")
      : typeof lastUserMessage?.content === "string"
      ? lastUserMessage.content
      : "";

    const fallbackResponseText = getFallbackAnswer(userText, knowledge);

    const fallbackStream = createUIMessageStream({
      execute: ({ writer }) => {
        writer.write({ type: "start" });
        writer.write({ type: "start-step" });
        writer.write({ type: "text-start", id: "0" });
        writer.write({ type: "text-delta", id: "0", delta: fallbackResponseText });
        writer.write({ type: "text-end", id: "0" });
        writer.write({ type: "finish-step" });
        writer.write({ type: "finish" });
      },
    });

    return createUIMessageStreamResponse({ stream: fallbackStream });
  } catch (error) {
    console.error("[Chat API Handler Exception]:", error);
    return new Response(JSON.stringify({ error: "Failed to generate chat response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
