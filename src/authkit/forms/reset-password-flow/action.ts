"use server";

import { User } from "@/authkit/collections/users/user";
import { AUTH_CONFIG } from "@/authkit/lib/config";
import { loginAs } from "@/authkit/lib/login-as";
import { actionClient } from "@/authkit/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import {
  resetPasswordSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from "./validation";

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await User.findFirst({
      email: { equals: email },
    });

    if (!user) {
      returnValidationErrors(resetPasswordSchema, {
        email: {
          _errors: ["User not found"],
        },
      });
    }

    await user.update({
      password,
    });

    await loginAs(user);

    redirect(AUTH_CONFIG.redirectAfterUserLogin);
  });

export const sendOtpAction = actionClient
  .schema(sendOtpSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await User.findFirst({
      email: { equals: email },
    });

    if (!user) {
      returnValidationErrors(sendOtpSchema, {
        email: { _errors: ["User not found"] },
      });
    }

    await user.updateAndSendEmailVerification();

    return { success: true, email: user.email };
  });

export const verifyOtpAction = actionClient
  .schema(verifyOtpSchema)
  .action(async ({ parsedInput: { email, otp } }) => {
    const user = await User.findFirst({
      email: { equals: email },
      otp: { equals: otp },
    });

    if (!user) {
      returnValidationErrors(verifyOtpSchema, {
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
      returnValidationErrors(verifyOtpSchema, {
        otp: {
          _errors: ["OTP has expired"],
        },
      });
    }

    return { success: true };
  });
