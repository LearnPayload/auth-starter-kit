"use server";

import { actionClient } from "@/authkit/lib/safe-action";
import { User } from "@/authkit/lib/user";
import { getAuth } from "@/authkit/services/get-auth";
import { returnValidationErrors } from "next-safe-action";
import { userProfileSchema } from "./validation";
export const updateUserProfile = actionClient
  .schema(userProfileSchema)
  .action(async ({ parsedInput: { email, name } }) => {
    const auth = await getAuth();
    if (!auth.user) {
      throw new Error("User not found");
    }

    const user = new User(auth.user);

    try {
      await user.update({
        name,
      });

      if (email !== user.email) {
        await user.update({
          email,
          _verified: false,
        });
        await user.updateAndSendEmailVerification();
      }
    } catch (error: unknown) {
      const errorMessage = "Failed to update user profile";
      if (error instanceof Error) {
        console.error(error);
      }
      returnValidationErrors(userProfileSchema, {
        _errors: [errorMessage],
      });
    }

    return { success: true };
  });
