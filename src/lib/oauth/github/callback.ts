import { User } from "@/authkit/collections/users/user";
import { GithubUserProfile } from "@/authkit/forms/github-login/types";
import { AUTH_CONFIG } from "@/authkit/lib/config";
import { loginAs } from "@/authkit/lib/login-as";
import { env } from "@/env.mjs";
import { fetchFileByURL } from "@/lib/fetch-file-by-url";
import { randomBytes } from "node:crypto";
import { PayloadRequest } from "payload";

export const handler = async (req: PayloadRequest) => {
  const code = req.query.code;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return Response.redirect(
      new URL(`/auth/login?error=github_email`, req.url),
    );
  }

  const body = await tokenRes.json();

  const { access_token } = body;

  if (!access_token) {
    return Response.redirect(
      new URL(`/auth/login?error=github_email`, req.url),
    );
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const githubUser = (await userRes.json()) as GithubUserProfile;

  if (!githubUser || !githubUser.email) {
    return Response.redirect(
      new URL(`/auth/login?error=github_email`, req.url),
    );
  }

  const image = await fetchFileByURL(githubUser.avatar_url);

  const media = await req.payload.create({
    collection: "media",
    data: { alt: githubUser.name },
    file: image,
  });

  const password = randomBytes(16).toString("hex");
  const user = await User.updateOrCreate(
    { email: { equals: githubUser.email } },
    {
      name: githubUser.name,
      email: githubUser.email,
      avatar: media.url,
      password,
      role: "admin",
      _verified: true,
    },
  );

  try {
    await loginAs(user);
  } catch (error) {
    console.error(error);
    return Response.redirect(
      new URL(`/auth/login?error=github_email`, req.url),
    );
  }

  return Response.redirect(
    new URL(AUTH_CONFIG.redirectAfterUserLogin, req.url),
  );
};
