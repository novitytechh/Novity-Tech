import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req) {
  try {
    const { toEmail, htmlSignature, recipientName } = await req.json();

    if (!toEmail) {
      return NextResponse.json(
        { error: "Target email address is required." },
        { status: 400 }
      );
    }

    const emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0a0e; color: #f5f3ef; padding: 40px 20px; max-width: 620px; margin: 0 auto; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 22px;">
            NOVITY <span style="color: #dfc15d;">TECH</span>
          </h2>
          <p style="color: #b8b3a8; font-size: 13px; margin-top: 4px;">
            Here is your official Novity Tech email card preview
          </p>
        </div>

        <div style="display: flex; justify-content: center; margin-bottom: 30px;">
          ${htmlSignature}
        </div>

        <div style="background-color: #131219; padding: 18px; border-radius: 12px; border: 1px solid rgba(223, 193, 93, 0.2); font-size: 13px; color: #b8b3a8; line-height: 1.6;">
          <strong style="color: #dfc15d;">Quick Tip:</strong> To use this signature in Gmail, select the card above, press <strong>Ctrl+C</strong> (or Cmd+C), open Gmail Settings &rarr; Signature, and press <strong>Ctrl+V</strong>!
        </div>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured on Vercel. Please add it to your Vercel Project Settings > Environment Variables." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Novity Tech <onboarding@resend.dev>",
      to: [toEmail],
      subject: `Your Novity Tech Official Email Card`,
      html: emailContent,
    });

    if (error) {
      console.error("Resend Signature Send Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to dispatch email signature." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email card successfully delivered via Resend!",
      data,
    });
  } catch (err) {
    console.error("Signature Route Error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
