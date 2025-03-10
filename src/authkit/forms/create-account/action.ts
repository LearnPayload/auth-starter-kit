"use server";

import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "../../lib/safe-action";
import { redirect } from "next/navigation";
import { createAccountSchema } from "./validation";
import { loginAs } from "../../lib/login-as";
import { User } from "../../collections/users/user";
import { AUTH_CONFIG } from "../../lib/config";

const ERROR_MESSAGES: Record<string, string> = {
  Default: "An error occurred.",
  ValidationError: "The email has already been taken.",
} as const;

export const createAccountAction = actionClient
  .schema(createAccountSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    try {
      const user = await User.create({ email, password, name, role: "user" });

      await user.updateAndSendEmailVerification();

      await loginAs(user);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.Default;
      if (error instanceof Error) {
        errorMessage =
          error.message ?? ERROR_MESSAGES[error.name] ?? ERROR_MESSAGES.Default;
      }
      returnValidationErrors(createAccountSchema, {
        _errors: [errorMessage],
      });
    }

    return redirect(AUTH_CONFIG.redirectAfterUserLogin);
  });
