import { env } from "@/env.mjs";
import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { randomBytes } from "node:crypto";

export const googleCallbackUrl = `${env.NEXT_PUBLIC_SERVER_URL}/api/users/auth/google/callback`;

export const googleState = unstable_cache(
  async () => randomBytes(16).toString("hex"),
  ["google-state"],
);

export const googleClient = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl,
);
