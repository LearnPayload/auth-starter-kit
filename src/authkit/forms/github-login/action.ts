"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { actionClient } from "@/authkit/lib/safe-action";

export const githubLoginAction = actionClient.action(async () => {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=read:user`,
  );
});
