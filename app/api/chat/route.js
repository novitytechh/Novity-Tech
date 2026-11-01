import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { question, conversation = [] } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Invalid question provided" },
        { status: 400 }
      );
    }

    // 1. If Supabase and Gemini are configured, execute the server-side RAG pipeline
    if (
      process.env.GEMINI_API_KEY &&
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      try {
        const {
          runRagPipeline,
          createGeminiEmbeddingAdapter,
          createGeminiLLMAdapter,
        } = await import("@hasaan_6/rag-chatbot-widget/server");

        const result = await runRagPipeline(question, conversation, {
          embeddingAdapter: createGeminiEmbeddingAdapter(process.env.GEMINI_API_KEY),
          llmAdapter: createGeminiLLMAdapter(process.env.GEMINI_API_KEY),
          supabaseUrl: process.env.SUPABASE_URL,
          supabaseAnonKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        });

        return NextResponse.json(result);
      } catch (ragError) {
        console.warn("[RAG Pipeline Notice - Falling back to local responder]:", ragError.message);
      }
    }

    // 2. Intelligent Built-in Knowledge Base Responder for Novity Tech
    const qLower = question.toLowerCase();

    let answer = "";
    let sources = [];
    let needsHumanHandoff = false;
    let suggestedQuestions = [];

    if (
      qLower.includes("service") ||
      qLower.includes("what do you do") ||
      qLower.includes("offer") ||
      qLower.includes("build")
    ) {
      answer =
        "Novity Tech specializes in full-stack web application development, custom AI copilots and autonomous agent workflows, cloud resilience (Docker, Kubernetes, AWS), MVP development for ambitious startups, and enterprise UI/UX design systems. We engineer digital platforms with 100% code ownership and sub-second performance.";
      sources = [
        { title: "Core Services", url: "/services" },
        { title: "Web Application Development", url: "/services/web-application-development" },
      ];
      suggestedQuestions = [
        "How do I start a project?",
        "What are your pricing or sprint timelines?",
        "Where are you located?",
      ];
    } else if (
      qLower.includes("contact") ||
      qLower.includes("call") ||
      qLower.includes("phone") ||
      qLower.includes("email") ||
      qLower.includes("reach") ||
      qLower.includes("number")
    ) {
      answer =
        "You can reach Novity Tech directly:\n• Phone: +92 329 1013649\n• Email: novitytechh@gmail.com\n• Office: Gujranwala, Pakistan\n• Business Hours: Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 2:00 PM.";
      sources = [{ title: "Contact Page", url: "/contact" }];
      suggestedQuestions = [
        "Can we schedule a call?",
        "Where is your office located?",
        "What services do you offer?",
      ];
    } else if (
      qLower.includes("location") ||
      qLower.includes("where") ||
      qLower.includes("city") ||
      qLower.includes("office") ||
      qLower.includes("address") ||
      qLower.includes("pakistan")
    ) {
      answer =
        "Novity Tech is proudly based in Gujranwala, Pakistan, collaborating with clients and ambitious businesses across the globe. You are always welcome to contact us at +92 329 1013649 or novitytechh@gmail.com.";
      sources = [{ title: "Office Details", url: "/contact" }];
      suggestedQuestions = [
        "What are your business hours?",
        "How can I contact your team?",
        "Who is on the team?",
      ];
    } else if (
      qLower.includes("team") ||
      qLower.includes("founder") ||
      qLower.includes("who is") ||
      qLower.includes("people") ||
      qLower.includes("architect")
    ) {
      answer =
        "Our engineering leadership is formed by 1 Founder & CEO, 2 Co-Founders (Chief Technology Officer & Chief Operating Officer), and 4 specialized core team engineers across Full-Stack development, Cloud DevOps, AI Systems, and UI/UX Architecture. We provide direct access to technical leads with zero bureaucratic overhead.";
      sources = [{ title: "Leadership Team", url: "/team" }];
      suggestedQuestions = [
        "What services do you offer?",
        "How do I start a project?",
        "Can we request an NDA?",
      ];
    } else if (
      qLower.includes("project") ||
      qLower.includes("work") ||
      qLower.includes("portfolio") ||
      qLower.includes("hire") ||
      qLower.includes("start") ||
      qLower.includes("quote")
    ) {
      answer =
        "Starting a project with Novity Tech is straightforward! We begin with an architectural discovery sprint to define your product blueprint, tech stack, and timeline. All projects come with guaranteed fixed-scope SLAs, weekly demos, and 100% repository handover.";
      sources = [
        { title: "Featured Work", url: "/work" },
        { title: "Inquire About a Project", url: "/contact" },
      ];
      suggestedQuestions = [
        "What is your phone number?",
        "What is your team structure?",
        "What technologies do you use?",
      ];
    } else if (
      qLower.includes("tech") ||
      qLower.includes("stack") ||
      qLower.includes("react") ||
      qLower.includes("next") ||
      qLower.includes("ai")
    ) {
      answer =
        "We build primarily on modern, battle-tested technologies including Next.js, React, TypeScript, Node.js, Python, PostgreSQL, Docker, Kubernetes, and major cloud providers (AWS, GCP). We also engineer custom AI agent workflows and LLM copilot pipelines.";
      sources = [{ title: "Our Capabilities", url: "/services" }];
      suggestedQuestions = [
        "Do you build mobile apps?",
        "How do you handle cloud deployment?",
        "How do we contact you?",
      ];
    } else {
      answer =
        "Novity Tech is a digital-first engineering and design agency in Gujranwala, Pakistan. We partner with ambitious companies to build high-performance web platforms, custom AI systems, and cloud architectures. How can I assist with your software requirements today?";
      sources = [
        { title: "About Novity Tech", url: "/about" },
        { title: "Contact Us", url: "/contact" },
      ];
      suggestedQuestions = [
        "What are your core services?",
        "How can I reach your team?",
        "Where is your office?",
      ];
    }

    return NextResponse.json({
      answer,
      sources,
      needsHumanHandoff,
      suggestedQuestions,
    });
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
