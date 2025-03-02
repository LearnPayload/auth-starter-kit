"use server";

import { actionClient } from "../../_lib/safe-action";
import { destroyAuthCookie } from "../../_lib/set-auth-cookie";

export const logoutAction = actionClient.action(async () => {
  await destroyAuthCookie();

  return {
    successful: true,
  };
});
