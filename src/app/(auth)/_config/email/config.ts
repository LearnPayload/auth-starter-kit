"use server";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { resendAdapter } from "@payloadcms/email-resend";
export const emailConfig = async () => {
  if (process.env.MAIL_MAILER === "resend") {
    return resendAdapter({
      defaultFromAddress: "onboarding@resend.dev",
      defaultFromName: "Payload CMS",
      apiKey: process.env.RESEND_API_KEY || "",
    });
  }

  return nodemailerAdapter({
    defaultFromAddress: "info@payloadcms.com",
    defaultFromName: "Payload",
    transportOptions: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    },
  });
};
