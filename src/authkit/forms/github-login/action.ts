"use server";

import { redirect } from "next/navigation";
import { actionClient } from "../../lib/safe-action";

export const githubLoginAction = actionClient.action(async () => {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`,
  );
});
