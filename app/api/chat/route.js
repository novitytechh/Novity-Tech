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
      "Novity Tech (novitytech.com) is an elite digital engineering and custom AI agency founded in Gujranwala, Pakistan. We partner directly with founders, startups, and global enterprises to architect high-performance full-stack web platforms, custom autonomous AI agents, and resilient cloud infrastructure. We operate on 100% intellectual property code handover, sub-second performance SLAs, and zero junior outsourcing.",
  },
  {
    title: "Leadership Team & Founder",
    content:
      "Novity Tech is founded and led by Muhammad Faseeh Altaf, who serves as Founder & Chief Executive Officer (CEO) and leads Business Development. The executive team also features 2 Co-Founders (Chief Technology Officer & Chief Operating Officer) along with 4 Principal Engineers specializing in Full-Stack Web Architecture, Cloud DevOps, Autonomous AI Systems, and UI/UX Design Systems. Clients work directly with founding architects on every engagement.",
  },
  {
    title: "Contact Details & Office Hours",
    content:
      "Reach Novity Tech directly:\n• Founder & CEO: Muhammad Faseeh Altaf\n• Phone / WhatsApp: +92 329 1013649 (Alt: +92 303 5696807)\n• Official Email: novitytechh@gmail.com\n• Website: https://novitytech.com\n• Headquarters: Gujranwala, Pakistan (collaborating globally)\n• Business Hours: Monday – Friday: 9:00 AM – 6:00 PM | Saturday: 10:00 AM – 2:00 PM (PKT).\n• Architectural discovery sessions can be scheduled directly on the website or via phone/email.",
  },
  {
    title: "Core Engineering Services",
    content:
      "Novity Tech delivers five core engineering pillars:\n1. Full-Stack Web Applications: Enterprise Next.js, React, Node.js, TypeScript, PostgreSQL with guaranteed sub-second performance.\n2. Custom AI Agents & Workflows: Autonomous multi-agent pipelines, Gemini & OpenAI LLM integrations, enterprise RAG copilots, and intelligent data systems.\n3. Cloud & DevOps Resilience: AWS, GCP, Docker, Kubernetes, CI/CD pipelines, and zero-downtime infrastructure.\n4. MVP Acceleration: Rapid 4-to-6 week sprint delivery for funded and bootstrapped startups.\n5. Design Systems & UI/UX: Luxury aesthetics, Figma design systems, accessible component libraries, and brand identities.",
  },
  {
    title: "Client Commitment & Working Standards",
    content:
      "Novity Tech guarantees:\n• 100% Direct Architect Access (no sales middlemen or junior delegation)\n• Full IP & GitHub Repository Ownership from Day 1\n• Strict Bilateral Non-Disclosure Agreement (NDA) on every project\n• Fixed-Scope Milestones & SLA Commitments with zero technical debt\n• Weekly interactive video demos & transparent progress reporting",
  },
  {
    title: "How to Start a Project",
    content:
      "To start an engagement with Novity Tech, submit an inquiry on our contact page (novitytech.com/contact) or call +92 329 1013649. Every project begins with a complimentary architectural discovery session under bilateral NDA, followed by a fixed-scope milestone timeline and SLA agreement.",
  },
];

const KNOWLEDGE_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedKnowledge = null;
let cachedKnowledgeExpiresAt = 0;

async function getKnowledgeBase() {
  const now = Date.now();
  if (cachedKnowledge && now < cachedKnowledgeExpiresAt) {
    return cachedKnowledge;
  }

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        SELECT title, content, category, tags
        FROM chatbot_knowledge
        ORDER BY id ASC;
      `;
      if (rows && rows.length > 0) {
        cachedKnowledge = rows;
        cachedKnowledgeExpiresAt = now + KNOWLEDGE_CACHE_TTL_MS;
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

  // 1. Leadership / CEO / Founder queries
  if (
    q.includes("ceo") ||
    q.includes("founder") ||
    q.includes("owner") ||
    q.includes("faseeh") ||
    q.includes("altaf") ||
    q.includes("who runs") ||
    q.includes("who is the head") ||
    q.includes("leadership")
  ) {
    return "**Muhammad Faseeh Altaf** is the Founder & Chief Executive Officer (CEO) of Novity Tech.";
  }

  // 2. Contact / Phone / Email / Location queries
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("email") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where are you") ||
    q.includes("office") ||
    q.includes("hours")
  ) {
    return "You can reach Novity Tech directly:\n• **Email:** novitytechh@gmail.com\n• **Phone / WhatsApp:** +92 329 1013649\n• **Location:** Gujranwala, Pakistan";
  }

  // 3. Services / Capabilities
  if (
    q.includes("service") ||
    q.includes("what do you do") ||
    q.includes("build") ||
    q.includes("nextjs") ||
    q.includes("react") ||
    q.includes("ai") ||
    q.includes("agent") ||
    q.includes("cloud") ||
    q.includes("devops") ||
    q.includes("mvp")
  ) {
    return "Novity Tech specializes in: Enterprise Next.js Platforms, Custom AI Agents & Copilots, Cloud & DevOps (AWS/Docker/K8s), 4–6 week MVP Launches, and UI/UX Design Systems.";
  }

  // 4. Starting a project / Hire / Pricing / NDA
  if (
    q.includes("start") ||
    q.includes("hire") ||
    q.includes("quote") ||
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("proposal") ||
    q.includes("nda")
  ) {
    return "To start a project, email **novitytechh@gmail.com** or visit **/contact**. We operate on fixed-price milestones with guaranteed SLAs and strict bilateral NDAs.";
  }

  // General fallback
  return "How can I assist you today? Feel free to ask about our engineering capabilities, tech stack, or starting a project.";
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

    const systemPrompt = `You are the concise, intelligent AI Assistant for Novity Tech (novitytech.com), an elite engineering & custom AI agency led by Founder & CEO Muhammad Faseeh Altaf.

STRICT RULE — BE HIGHLY CONCISE & DIRECT:
- Answer ONLY what the user asks. Do NOT provide extra unsolicited information, lengthy preambles, marketing fluff, or long background stories.
- Keep responses short, clear, and direct (typically 1 to 3 sentences or concise bullet points).
- For coding / technical questions: Provide the clean code snippet directly with a 1-sentence explanation. No essays.
- For non-web / general questions: Answer the question accurately and concisely. Do not inject sales pitches.
- For Novity Tech questions:
  • CEO / Founder: "Muhammad Faseeh Altaf is the Founder & CEO of Novity Tech."
  • Location: "Headquartered in Gujranwala, Pakistan, serving clients globally."
  • Contact: "Email: novitytechh@gmail.com | Phone: +92 329 1013649."
  • Services: Briefly state: Full-Stack Next.js, Custom AI Agents, Cloud & DevOps, 4–6 week MVP Launches, and UI/UX Design Systems.

VERIFIED COMPANY KNOWLEDGE:
${knowledgeText}`;

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
        console.warn("[Chat API] Gemini streaming notice, switching to resilient knowledge responder:", streamError.message);
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
