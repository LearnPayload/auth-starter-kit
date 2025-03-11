"use server";

import { actionClient } from "@/authkit/lib/safe-action";
import { googleClient, googleState } from "@/lib/google-client";
import { redirect } from "next/navigation";

export const googleLoginAction = actionClient.action(async () => {
  const state = await googleState();

  const url = googleClient.generateAuthUrl({
    scope: ["email", "openid", "profile"],
    state,
  });
  redirect(url);
});
