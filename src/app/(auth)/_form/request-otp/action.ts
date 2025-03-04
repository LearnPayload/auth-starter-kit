"use server";

import { randomBytes, randomInt } from "node:crypto";
import { actionClient } from "../../_lib/safe-action";
import { requestOneTimePasswordSchema } from "./validation";
import { send } from "../../_emails/otp";
import { User } from "../../_collections/users/user";
import { AUTH_CONFIG } from "../../_lib/config";
import { returnValidationErrors } from "next-safe-action";

export const requestOneTimePasswordLoginAction = actionClient
  .schema(requestOneTimePasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    // 1. generate otp
    const code = String(randomInt(100000, 999999));

    // 2. update user

    const user = await User.findFirstOrCreate(
      { email: { equals: email } },
      {
        name: "",
        email,
        avatar: `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`,
        password: randomBytes(32).toString("hex"),
      },
    );

    try {
      await user.update({
        otp: code,
        otp_expiration: new Date(
          Date.now() + AUTH_CONFIG.otpExpirationMinutes * 60 * 1000,
        ).toISOString(),
      });
      await send({ email, code });
    } catch (error) {
      console.error(error);
      returnValidationErrors(requestOneTimePasswordSchema, {
        _errors: ["There was an error sending the email"],
      });
    }

    return { email, successful: true };
    //
  });
