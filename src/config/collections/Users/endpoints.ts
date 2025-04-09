import { AUTH_CONFIG } from "@/authkit/lib/config";
import { handler as githubHandler } from "@/lib/oauth/github/callback";
import { handler as googleHandler } from "@/lib/oauth/google/callback";
import { Endpoint, PayloadRequest } from "payload";

export const oAuthCallbackEndpoint: Endpoint = {
  path: "/auth/:provider/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const provider = req.routeParams?.provider;

    if (provider === "google") {
      return googleHandler(req);
    }

    if (provider === "github") {
      return githubHandler(req);
    }

    return Response.redirect(new URL(AUTH_CONFIG.defaultSignInRoute, req.url));
  },
};
