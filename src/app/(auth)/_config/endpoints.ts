import { Endpoint, PayloadRequest } from "payload";
import { loginAs } from "../_lib/login-as";
import { getUserByEmail } from "../_services/get-user-by-email";
import { createUser } from "../_services/create-user";
import { AUTH_CONFIG } from "./config";

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
      return Response.redirect(new URL(`/login?error=github_email`, req.url));
    }

    const body = await tokenRes.json();

    const { access_token } = body;

    if (!access_token) {
      return Response.redirect(new URL(`/login?error=github_email`, req.url));
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const githubUser = await userRes.json();

    if (!githubUser || !githubUser.email) {
      return Response.redirect(new URL(`/login?error=github_email`, req.url));
    }
    const user =
      (await getUserByEmail(githubUser.email)) ??
      (await createUser({
        email: githubUser.email,
        name: githubUser.name,
        avatar: githubUser.avatar_url,
      }));

    try {
      await loginAs(user, { collection: "users" });
    } catch (error) {
      console.error(error);
      return Response.redirect(new URL(`/login?error=github_email`, req.url));
    }

    return Response.redirect(new URL(AUTH_CONFIG.redirectAfterLogin, req.url));
  },
};
