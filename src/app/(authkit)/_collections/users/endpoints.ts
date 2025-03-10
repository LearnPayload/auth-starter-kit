import { Endpoint, PayloadRequest } from "payload";
import { loginAs } from "../../_lib/login-as";
import { AUTH_CONFIG } from "../../_lib/config";
import { randomBytes } from "node:crypto";
import { User } from "./user";
import { GithubUserProfile } from "../../_form/github-login/types";

export const oAuthCallbackEndpoint: Endpoint = {
  path: "/auth/:provider/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const code = req.query.code;

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );

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
    const password = randomBytes(16).toString("hex");
    const user = await User.updateOrCreate(
      { email: { equals: githubUser.email } },
      {
        name: githubUser.name,
        email: githubUser.email,
        avatar: githubUser.avatar_url,
        password,
        role: "user",
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
  },
};
