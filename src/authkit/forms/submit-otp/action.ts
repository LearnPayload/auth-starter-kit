"use server";

import { returnValidationErrors } from "next-safe-action";
import { otpLoginSchema } from "./validation";
import { actionClient } from "@/authkit/lib/safe-action";
import { User } from "@/authkit/collections/users/user";
import { loginAs } from "@/authkit/lib/login-as";

export const submitOneTimePasswordAction = actionClient
  .schema(otpLoginSchema)
  .action(async ({ parsedInput: { email, otp } }) => {
    const user = await User.findFirst({
      email: { equals: email },
      otp: { equals: otp },
    });

    if (!user) {
      returnValidationErrors(otpLoginSchema, {
        otp: {
          _errors: ["Invalid email or OTP"],
        },
      });
    }
    const expires = new Date(user.otp_expiration ?? "");
    const now = new Date();

    await user.update({
      otp: null,
      otp_expiration: null,
      _verified: true,
    });

    if (expires < now) {
      returnValidationErrors(otpLoginSchema, {
        otp: {
          _errors: ["OTP has expired"],
        },
      });
    }

    await loginAs(user);

    return { success: true };
  });
