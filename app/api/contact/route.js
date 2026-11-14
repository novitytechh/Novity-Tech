import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const OFFICIAL_EMBLEM_URL = "https://raw.githubusercontent.com/novitytechh/Novity-Tech/main/public/img/novity-emblem.png";

// Official Email Signature Card HTML (Ali Haider & Novity Tech)
const EMAIL_CARD_HTML = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e0d13; border: 1px solid rgba(223, 193, 93, 0.45); border-radius: 14px; max-width: 530px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.25); overflow: hidden; color: #ffffff; margin: 24px auto 0 auto;">
  <tr>
    <td style="padding: 22px 18px 22px 22px; vertical-align: top; width: 135px; text-align: center; border-right: 1px solid rgba(223, 193, 93, 0.35);">
      <!-- Emblem (No Box Border, Globally CDN Hosted) -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 10px auto;">
        <tr>
          <td style="width: 74px; height: 74px; text-align: center; vertical-align: middle; padding: 0; border: none; background: transparent;">
            <img src="${OFFICIAL_EMBLEM_URL}" alt="Novity Tech" width="70" height="70" style="border-radius: 50%; display: block; object-fit: contain; width: 70px; height: 70px; border: none; outline: none; margin: 0 auto;" />
          </td>
        </tr>
      </table>

      <!-- Company Wordmark -->
      <div style="font-weight: 800; font-size: 13px; letter-spacing: 1.8px; text-transform: uppercase; line-height: 1.2; margin-bottom: 10px;">
        <span style="color: #ffffff;">NOVITY</span>
        <span style="color: #dfc15d;"> TECH</span>
      </div>

      <!-- Social Media Badges -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
        <tr>
          <td style="padding: 0 3px;">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: #1a1822; border: 1px solid rgba(223,193,93,0.45); border-radius: 50%; color: #dfc15d; font-weight: bold; font-size: 10.5px;">in</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="https://novitytech.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: #1a1822; border: 1px solid rgba(223,193,93,0.45); border-radius: 50%; color: #dfc15d; font-weight: bold; font-size: 10.5px;">&#127760;</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="https://x.com/NovityTech" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: #1a1822; border: 1px solid rgba(223,193,93,0.45); border-radius: 50%; color: #dfc15d; font-weight: bold; font-size: 10.5px;">&#120143;</a>
          </td>
          <td style="padding: 0 3px;">
            <a href="https://github.com/novitytechh" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block; width: 25px; height: 25px; line-height: 25px; text-align: center; background-color: #1a1822; border: 1px solid rgba(223,193,93,0.45); border-radius: 50%; color: #dfc15d; font-weight: bold; font-size: 10px;">GH</a>
          </td>
        </tr>
      </table>
    </td>

    <!-- Details Column -->
    <td style="padding: 22px 22px 22px 18px; vertical-align: middle;">
      <div style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px; line-height: 1.2; margin-bottom: 4px;">
        Ali Haider
      </div>
      <div style="font-size: 13px; font-weight: 700; color: #dfc15d; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 2px;">
        Founder
      </div>
      <div style="font-size: 11.5px; color: #b8b3a8; font-weight: 500; margin-bottom: 10px;">
        Digital Engineering & AI Agency
      </div>

      <div style="height: 1px; background: rgba(223, 193, 93, 0.35); margin-bottom: 10px; width: 100%;"></div>

      <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12.5px; line-height: 1.7; color: #ffffff;">
        <tr>
          <td style="vertical-align: middle; width: 20px; color: #dfc15d; font-size: 12px; padding-bottom: 3px;">&#9993;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="mailto:novitytechh@gmail.com" style="color: #ffffff; text-decoration: none; font-weight: 500;">novitytechh@gmail.com</a>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: #dfc15d; font-size: 12px; padding-bottom: 3px;">&#9742;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="tel:+923291013649" style="color: #ffffff; text-decoration: none; font-weight: 500;">+92 329 1013649</a>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: #dfc15d; font-size: 12px; padding-bottom: 3px;">&#127760;</td>
          <td style="vertical-align: middle; padding-bottom: 3px;">
            <a href="https://novitytech.com" target="_blank" rel="noopener noreferrer" style="color: #dfc15d; text-decoration: none; font-weight: 600;">novitytech.com</a>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle; width: 20px; color: #dfc15d; font-size: 12px;">&#128205;</td>
          <td style="vertical-align: middle; color: #b8b3a8; font-size: 11.5px;">Gujranwala, Pakistan</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

export async function POST(req) {
  try {
    const { name, email, company, service, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required fields." },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "novitytechh@gmail.com";

    // Format HTML email for Novity Tech team with email card attached
    const htmlEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0a0e; color: #f5f3ef; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(223, 193, 93, 0.4);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">
            NOVITY <span style="color: #dfc15d;">TECH</span>
          </h2>
          <p style="color: #dfc15d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">
            New Technical Consultation Request
          </p>
        </div>

        <div style="background-color: #131219; padding: 24px; border-radius: 12px; border: 1px solid rgba(223, 193, 93, 0.2); margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.8;">
            <tr>
              <td style="color: #dfc15d; font-weight: 700; width: 140px; padding: 6px 0;">Client Name:</td>
              <td style="color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="color: #dfc15d; font-weight: 700; padding: 6px 0;">Work Email:</td>
              <td style="color: #ffffff;"><a href="mailto:${email}" style="color: #dfc15d; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #dfc15d; font-weight: 700; padding: 6px 0;">Organization:</td>
              <td style="color: #ffffff;">${company || "Not specified"}</td>
            </tr>
            <tr>
              <td style="color: #dfc15d; font-weight: 700; padding: 6px 0;">Required Capability:</td>
              <td style="color: #ffffff;">${service || "General Inquiry"}</td>
            </tr>
          </table>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(223, 193, 93, 0.2);">
            <div style="color: #dfc15d; font-weight: 700; margin-bottom: 6px; font-size: 13px;">Project Scope / Message:</div>
            <div style="color: #b8b3a8; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; background: #0e0d13; padding: 12px; border-radius: 8px;">
              ${message || "No specific message provided."}
            </div>
          </div>
        </div>

        <!-- Official Executive Email Card Attached Directly -->
        <div style="margin-top: 24px; border-top: 1px solid rgba(223, 193, 93, 0.2); padding-top: 20px;">
          <div style="text-align: center; color: #dfc15d; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px; font-weight: 700;">
            Novity Tech Lead Identity
          </div>
          ${EMAIL_CARD_HTML}
        </div>

        <div style="text-align: center; color: #757168; font-size: 12px; margin-top: 24px;">
          Sent securely via Novity Tech Consultation Engine &bull; Powered by Resend
        </div>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured on Vercel yet.");
      return NextResponse.json({
        success: true,
        message: "Inquiry received. Note: To enable live email dispatch on Vercel, please add RESEND_API_KEY in Vercel project environment variables.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Novity Tech <onboarding@resend.dev>",
      to: [receiverEmail],
      replyTo: email,
      subject: `New Lead: ${name} (${company || "Inquiry"}) — Novity Tech`,
      html: htmlEmail,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation inquiry sent successfully with email card via Resend.",
      data,
    });
  } catch (err) {
    console.error("Server Error sending email:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
