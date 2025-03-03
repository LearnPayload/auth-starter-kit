"use server";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

export const emailConfig = async () =>
  nodemailerAdapter({
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
