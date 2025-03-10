"use server";

import { actionClient } from "@/app/_authkit/lib/safe-action";
import { userProfileSchema } from "./validation";
import { getPayload } from "@/app/_authkit/services/payload";
import { getAuth } from "@/app/_authkit/services/get-auth";
import { returnValidationErrors } from "next-safe-action";

export const updateUserProfile = actionClient
  .schema(userProfileSchema)
  .action(async ({ parsedInput: { email, name, avatar } }) => {
    console.log(process.env.DATABASE_URL);
    const payload = await getPayload();
    const { user } = await getAuth();
    if (!user) {
      throw new Error("User not found");
    }

    try {
      await payload.update({
        collection: "users", // required
        id: user.id, // required
        data: {
          email,
          name,
          avatar,
        },
      });
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
