import { Chat } from "chat";
import { createSlackAdapter } from "@chat-adapter/slack";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const SYSTEM_PROMPT = `You are the versatile, highly intelligent Slack AI Bot representing Novity Tech (novitytech.com), an elite digital-first engineering and custom AI agency founded in Gujranwala, Pakistan.

YOUR MISSION:
Answer ALL questions brilliantly, helpfully, and accurately—whether the user asks about Novity Tech, web systems, or non-web topics (general programming, Python, math, science, business strategy, or general advice).

1. GENERAL & NON-WEB TOPICS:
- Answer completely, accurately, and thoroughly with clear explanations, code blocks, or advice.
- Never refuse general questions.

2. NOVITY TECH & WEB DEVELOPMENT:
- Deliver authoritative executive and senior engineering answers.
- Founder & CEO: Muhammad Faseeh Altaf (leads executive strategy & business development).
- Leadership: Co-Founders (CTO, COO) and Principal Architects.
- Contact: Phone/WhatsApp: +92 329 1013649 (Alt: +92 303 5696807), Email: novitytechh@gmail.com, Location: Gujranwala, Pakistan.
- Core Pillars: Enterprise Next.js Platforms, Autonomous AI Agents & Copilots, Cloud & DevOps (AWS/Docker/Kubernetes), MVP Sprint Launches (4-6 weeks), Luxury Design Systems.
- Guarantees: 100% IP & repository handover, strict bilateral NDA, fixed-price SLA milestones, sub-second performance.

Format responses cleanly for Slack (bullet points, bold text).`;

let cachedBot = null;

export function getSlackBot() {
  if (cachedBot) return cachedBot;

  const botToken = process.env.SLACK_BOT_TOKEN;
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  if (!botToken || !signingSecret) {
    return null;
  }

  const bot = new Chat({
    userName: process.env.SLACK_BOT_NAME || "novitybot",
    adapters: {
      slack: createSlackAdapter({
        botToken,
        signingSecret,
      }),
    },
  });

  // When mentioned in a new channel/thread: subscribe and introduce
  bot.onNewMention(async (thread) => {
    try {
      await thread.subscribe();
      await thread.post(
        "👋 *Hello!* I am the *Novity Tech Slack Assistant*.\n" +
          "I can help you with questions about our engineering architecture, services, executive leadership (CEO Muhammad Faseeh Altaf), fixed-price sprint milestones, and project inquiries.\n\n" +
          "_How can I assist you today?_"
      );
    } catch (err) {
      console.error("[Slack Bot] Error on mention:", err);
    }
  });

  // When a user posts a message in a subscribed thread
  bot.onSubscribedMessage(async (thread, message) => {
    try {
      const userText = message?.text || "";
      if (!userText.trim()) return;

      let answer = "";

      const geminiKey =
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY;

      if (geminiKey) {
        try {
          const google = createGoogleGenerativeAI({
            apiKey: geminiKey,
          });
          const { text } = await generateText({
            model: google("gemini-3.5-flash-lite"),
            system: SYSTEM_PROMPT,
            prompt: userText,
          });
          answer = text;
        } catch (aiErr) {
          console.warn("[Slack Bot] Gemini AI generation notice, falling back:", aiErr.message);
        }
      }

      // Fallback if AI is unavailable
      if (!answer) {
        answer =
          "Thanks for reaching out! For direct consultations, you can reach **Novity Tech** leadership directly:\n" +
          "• *Founder & CEO:* Muhammad Faseeh Altaf\n" +
          "• *Phone / WhatsApp:* +92 329 1013649\n" +
          "• *Email:* novitytechh@gmail.com\n" +
          "• *Headquarters:* Gujranwala, Pakistan (Global Delivery)";
      }

      await thread.post(answer);
    } catch (err) {
      console.error("[Slack Bot] Error replying to message:", err);
    }
  });

  cachedBot = bot;
  return bot;
}
