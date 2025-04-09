"use server";

import { AUTH_CONFIG } from "@/authkit/lib/config";
import { loginAs } from "@/authkit/lib/login-as";
import { actionClient } from "@/authkit/lib/safe-action";
import { User } from "@/authkit/lib/user";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { otpLoginSchema } from "../submit-otp/validation";

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

    return redirect(AUTH_CONFIG.redirectAfterUserLogin);
  });
