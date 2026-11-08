import { getSlackBot } from "@/lib/slackBot";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // Clone request to check for Slack URL verification challenge if needed
    const bodyText = await request.clone().text();

    if (bodyText) {
      try {
        const parsed = JSON.parse(bodyText);
        // Slack Event Subscriptions URL verification
        if (parsed.type === "url_verification") {
          return new Response(parsed.challenge, {
            status: 200,
            headers: { "Content-Type": "text/plain" },
          });
        }
      } catch {
        // Not a JSON body or handled by adapter
      }
    }

    const bot = getSlackBot();

    if (!bot) {
      return new Response(
        JSON.stringify({
          error:
            "Slack bot credentials are not configured. Please set SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET environment variables.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Delegate to @chat-adapter/slack
    return await bot.webhooks.slack(request);
  } catch (error) {
    console.error("[Slack Webhook Route] Handler error:", error);
    return new Response(
      JSON.stringify({ error: "Slack webhook processing failed", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  const configured = Boolean(
    process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET
  );

  return new Response(
    JSON.stringify({
      status: "online",
      adapter: "@chat-adapter/slack",
      service: "Novity Tech Slack Bot Webhook",
      isConfigured: configured,
      instructions: configured
        ? "Bot is ready to receive events from Slack."
        : "Set SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET in your environment.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
