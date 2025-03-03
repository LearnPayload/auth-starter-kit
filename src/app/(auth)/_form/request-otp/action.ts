"use server";

import { actionClient } from "../../_lib/safe-action";
import { requestOneTimePasswordSchema } from "./validation";

export const requestOneTimePasswordLoginAction = actionClient
  .schema(requestOneTimePasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    return { email, successful: true };
    //
  });
