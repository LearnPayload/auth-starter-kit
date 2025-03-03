"use server";

import { actionClient } from "../../_lib/safe-action";
import { otpLoginSchema } from "./validation";

export const submitOneTimePasswordAction = actionClient
  .schema(otpLoginSchema)
  .action(async ({ parsedInput: { email, otp } }) => {
    console.log("submitOneTimePasswordAction", email, otp);
    // redirect(AUTH_CONFIG.redirectAfterLogin);

    return { data: { email, otp }, successful: true };
  });
