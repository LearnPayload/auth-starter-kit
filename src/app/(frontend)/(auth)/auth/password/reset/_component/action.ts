"use server";

import { User } from "@/authkit/collections/users/user";
import { actionClient } from "@/authkit/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

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

    return { success: true };
  });
