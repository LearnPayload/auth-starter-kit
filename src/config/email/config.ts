"use server";
import { env } from "@/env.mjs";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { resendAdapter } from "@payloadcms/email-resend";
export const emailConfig = async () => {
  if (env.MAIL_MAILER === "resend") {
    return resendAdapter({
      defaultFromAddress: "onboarding@resend.dev",
      defaultFromName: "Payload CMS",
      apiKey: env.RESEND_API_KEY || "",
    });
  }

  return nodemailerAdapter({
    defaultFromAddress: "info@payloadcms.com",
    defaultFromName: "Payload",
    transportOptions: {
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      auth: {},
    },
  });
};
