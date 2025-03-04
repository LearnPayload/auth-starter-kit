"use server";

import { randomBytes } from "node:crypto";
import { actionClient } from "../../_lib/safe-action";
import { requestOneTimePasswordSchema } from "./validation";
import { User } from "../../_collections/users/user";
import { returnValidationErrors } from "next-safe-action";

export const requestOneTimePasswordLoginAction = actionClient
  .schema(requestOneTimePasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
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
      await user.updateAndSendEmailVerification();
    } catch (error) {
      console.error(error);
      returnValidationErrors(requestOneTimePasswordSchema, {
        _errors: ["There was an error sending the email"],
      });
    }

    return { email, successful: true };
    //
  });
