"use server";

import { returnValidationErrors } from "next-safe-action";
import { User } from "../../_collections/users/user-data";
import { actionClient } from "../../_lib/safe-action";
import { otpLoginSchema } from "./validation";
import { loginAs } from "../../_lib/login-as";

export const submitOneTimePasswordAction = actionClient
  .schema(otpLoginSchema)
  .action(async ({ parsedInput: { email, otp } }) => {
    // redirect(AUTH_CONFIG.redirectAfterLogin);

    const user = await User.findFirst({
      email: { equals: email },
      otp: { equals: otp },
    });

    if (!user) {
      returnValidationErrors(otpLoginSchema, {
        _errors: ["Invalid email or OTP"],
      });
    }
    const expires = new Date(user.otp_expiration ?? "");
    const now = new Date();

    await user.update({
      otp: null,
      otp_expiration: null,
    });

    if (expires < now) {
      returnValidationErrors(otpLoginSchema, {
        _errors: ["OTP has expired"],
      });
    }

    await loginAs(user);

    return { data: { email, otp }, successful: true };
  });
