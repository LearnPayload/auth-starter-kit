import { actionClient } from "../../_lib/safe-action";
import { AUTH_CONFIG } from "../../_config/config";
import { redirect } from "next/navigation";
import { destroyAuthCookie } from "../../_lib/set-auth-cookie";

export const logoutAction = actionClient.action(async () => {
  await destroyAuthCookie();

  redirect(AUTH_CONFIG.redirectAfterLogout);
});
