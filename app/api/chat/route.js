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
      "Novity Tech guarantees:\n• 100% Direct Architect Access (no sales middlemen or junior delegation)\n• Full IP & GitHub Repository Ownership from Day 1\n• Strict Bilateral Non-Disclosure Agreement (NDA) on every project\n• Fixed-Scope Milestones & SLA Commitments with zero technical debt\n• Weekly interactive video demos & transparent progress reporting\n• 4.7 / 5.0 client satisfaction rating backed by verified global reviews.",
  },
  {
    title: "How to Start a Project",
    content:
      "To start an engagement with Novity Tech, submit an inquiry on our contact page (novitytech.com/contact) or call +92 329 1013649. Every project begins with a complimentary architectural discovery session under bilateral NDA, followed by a fixed-scope milestone timeline and SLA agreement.",
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
    return (
      "Novity Tech was founded and is led by **Muhammad Faseeh Altaf**, who serves as the **Founder & Chief Executive Officer (CEO)** and leads Business Development.\n\n" +
      "Our core executive team also includes our Co-Founders (CTO & COO) and principal engineers across Full-Stack Web Development, Cloud DevOps, AI Systems, and UI/UX Architecture. You can reach out directly to Muhammad Faseeh Altaf and our leads at **+92 329 1013649** or **novitytechh@gmail.com**."
    );
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
    return (
      "You can connect directly with Novity Tech:\n\n" +
      "• **Founder & CEO:** Muhammad Faseeh Altaf\n" +
      "• **Phone / WhatsApp:** +92 329 1013649 (Alt: +92 303 5696807)\n" +
      "• **Email:** novitytechh@gmail.com\n" +
      "• **Headquarters:** Gujranwala, Pakistan (serving clients globally)\n" +
      "• **Business Hours:** Mon – Fri: 9:00 AM – 6:00 PM | Sat: 10:00 AM – 2:00 PM (PKT)\n\n" +
      "Feel free to request a complimentary architectural discovery session on our contact page!"
    );
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
    return (
      "Novity Tech specializes in five core digital engineering pillars:\n\n" +
      "1. **Full-Stack Web Platforms:** Enterprise Next.js, React, Node.js, TypeScript with sub-second performance.\n" +
      "2. **Custom AI Agents & Copilots:** Autonomous LLM workflows, RAG knowledge systems, and multi-agent integrations.\n" +
      "3. **Cloud & DevOps Resilience:** AWS, GCP, Docker, Kubernetes with zero-downtime CI/CD deployment.\n" +
      "4. **MVP Acceleration:** Rapid 4-to-6 week sprint delivery for high-growth startups.\n" +
      "5. **Design Systems & UI/UX:** Luxury typography, Figma design systems, and conversion-focused interfaces.\n\n" +
      "Every project includes direct senior architect collaboration and 100% intellectual property ownership from day one."
    );
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
    return (
      "Starting a project with Novity Tech is seamless:\n\n" +
      "1. **Complimentary Discovery Session:** We evaluate your technical requirements and product goals under a strict bilateral NDA.\n" +
      "2. **Fixed-Scope Roadmap:** We define transparent sprint milestones with guaranteed fixed SLAs.\n" +
      "3. **Direct Senior Engineering:** You work directly with our founding engineers—no middlemen or junior outsourcing.\n" +
      "4. **Full IP Handover:** You own 100% of all code, architecture, and GitHub repositories.\n\n" +
      "Ready to start? Reach out at **novitytechh@gmail.com** or call **+92 329 1013649**!"
    );
  }

  // General fallback
  return (
    "Novity Tech is a premier digital engineering and AI agency based in Gujranwala, Pakistan, led by Founder & CEO **Muhammad Faseeh Altaf**.\n\n" +
    "We build high-performance full-stack web platforms, custom AI copilot workflows, and resilient cloud systems for startups and enterprises worldwide.\n\n" +
    "How can I assist you with your project? You can also reach our leadership directly at **+92 329 1013649** or **novitytechh@gmail.com**."
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

    const systemPrompt = `You are the versatile, highly intelligent AI Assistant representing Novity Tech (novitytech.com), an elite digital engineering and custom AI agency based in Gujranwala, Pakistan.

YOUR MISSION:
You must answer ALL user queries with high intelligence, depth, and helpfulness—whether the user asks about Novity Tech, web development, or completely non-web topics (such as general programming, Python, databases, algorithms, math, science, business ideas, general advice, or conversational questions).

1. FOR GENERAL & NON-WEB TOPICS:
- Always answer the user's question completely, accurately, and thoroughly first (e.g. provide code snippets, clear explanations, step-by-step guidance, or creative thoughts).
- Do NOT refuse to answer general questions or force a sales pitch.
- Where naturally relevant, you may add: "If you ever need production software, AI copilots, or scalable systems built, our engineering leads at Novity Tech are ready to collaborate."

2. FOR NOVITY TECH & WEB DEVELOPMENT TOPICS:
- Deliver authoritative, senior-architect level answers.
- Founder & CEO: Muhammad Faseeh Altaf (Chief Executive Officer & Business Development).
- Leadership: Muhammad Faseeh Altaf (CEO), Co-Founders (CTO & COO), and Principal Architects.
- Location: Gujranwala, Pakistan (collaborating with startups and enterprise brands globally).
- Direct Contact: Phone/WhatsApp +92 329 1013649 (Alt: +92 303 5696807) | Email novitytechh@gmail.com | Website https://novitytech.com
- Core Expertise: Full-Stack Web Development (Next.js, React, Node.js, TypeScript), Custom AI Copilots & Autonomous Agents (Gemini & OpenAI), Cloud & DevOps Resilience (AWS, Docker, Kubernetes), MVP Sprint Acceleration (4-6 weeks), and UI/UX Design Systems.
- Client Model: 100% Direct Architect Access (zero middlemen, zero junior outsourcing), Full IP & Repository Ownership from day one, Bilateral NDA Guaranteed, Fixed-Scope Milestones & SLAs.

VERIFIED COMPANY KNOWLEDGE:
${knowledgeText}

BEHAVIORAL RULES:
1. When asked who the CEO, founder, or owner is, ALWAYS state clearly that Muhammad Faseeh Altaf is the Founder & CEO of Novity Tech.
2. Format responses cleanly using markdown, bold headers, and bullet points.`;

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
