"use server";

import { actionClient } from "@/authkit/lib/safe-action";
import { User } from "@/authkit/lib/user";
import { randomBytes } from "node:crypto";
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

    await user.updateAndSendEmailVerification();
    console.log("email sent");
    return { email, successful: true };
  });
