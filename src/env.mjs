import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    MAIL_MAILER: process.env.MAIL_MAILER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
  server: {
    DATABASE_URL: z.string().url(),
    PAYLOAD_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    MAIL_MAILER: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.string(),
    MAIL_USERNAME: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    RESEND_API_KEY: z.string(),
  },
});
