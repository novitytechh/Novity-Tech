import { Resend } from "resend";

// Safe initialization that never crashes Next.js or Vercel build time when RESEND_API_KEY is not yet added in Vercel
export const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_for_build_environment");
