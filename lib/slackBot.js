import { Chat } from "chat";
import { createSlackAdapter } from "@chat-adapter/slack";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const SYSTEM_PROMPT = `You are the concise, intelligent Slack AI Bot for Novity Tech (novitytech.com), an elite engineering & custom AI agency led by Founder & CEO Ali Haider.

STRICT RULE — BE HIGHLY CONCISE & DIRECT:
- Answer ONLY what was asked in 1–3 short sentences or bullet points.
- No unsolicited fluff, no repetitive disclaimers, no essay answers.
- For coding: provide just the clean code snippet with a 1-sentence note.
- CEO / Founder: "Ali Haider is the Founder & CEO of Novity Tech."
- Contact: "Email: novitytechh@gmail.com | Phone: +92 329 1013649 (Gujranwala, Pakistan)."
- Services: Full-Stack Next.js, Custom AI Agents, Cloud & DevOps, MVP Launches (4–6 wks), and UI/UX Design Systems.`;

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
          "I can help you with questions about our engineering architecture, services, executive leadership (CEO Ali Haider), fixed-price sprint milestones, and project inquiries.\n\n" +
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
          "• *Founder & CEO:* Ali Haider\n" +
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
