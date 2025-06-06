import { AUTH_CONFIG } from "@/authkit/lib/config";
import { loginAs } from "@/authkit/lib/login-as";
import { User } from "@/authkit/lib/user";
import { env } from "@/env.mjs";
import { fetchFileByURL } from "@/lib/fetch-file-by-url";
import { decodeJwt } from "jose/jwt/decode";
import { randomBytes } from "node:crypto";
import { PayloadRequest } from "payload";
import { googleCallbackUrl, googleState } from "./client";

export const handler = async (req: PayloadRequest) => {
  const code = req.query.code as string | undefined;
  let error = null;

  const cachedState = await googleState();
  const state = req.query.state;

  if (!code || cachedState !== state) {
    error = "invalid_state";
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: googleCallbackUrl,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    error = "invalid_token";
  }

  const token = await tokenRes.json();
  const password = randomBytes(16).toString("hex");

  const googleUser = decodeJwt(token.id_token) as {
    email: string;
    name: string;
    picture: string;
  };

  const user = await User.updateOrCreate(
    { email: { equals: googleUser.email } },
    {
      name: googleUser.name,
      email: googleUser.email,
      password,
      role: "admin",
    },
  );

  if (!user.avatar) {
    const image = await fetchFileByURL(googleUser.picture);

    const media = await req.payload.create({
      collection: "media",
      data: { alt: googleUser.name },
      file: image,
    });

    await user.update({ avatar: media.url });
  }

  try {
    await loginAs(user);
  } catch (error) {
    console.error(error);
    error = "login_failed";
  }

  if (error) {
    return Response.redirect(
      new URL(`/auth/login?error=google_login`, req.url),
    );
  }

  return Response.redirect(
    new URL(AUTH_CONFIG.redirectAfterUserLogin, req.url),
  );
};
