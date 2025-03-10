"use server";

import { actionClient } from "../../lib/safe-action";
import { destroyAuthCookie } from "../../lib/set-auth-cookie";

export const logoutAction = actionClient.action(async () => {
  await destroyAuthCookie();

  return {
    successful: true,
  };
});
