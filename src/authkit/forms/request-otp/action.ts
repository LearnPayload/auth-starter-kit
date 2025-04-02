"use server";

import { actionClient } from "@/authkit/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { randomBytes } from "node:crypto";
import { User } from "../../collections/users/user";
import { requestOneTimePasswordSchema } from "./validation";

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
        role: "user",
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
