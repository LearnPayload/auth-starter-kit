"use server";

import { returnValidationErrors } from "next-safe-action";
import { standardLoginSchema } from "./validation";
import { actionClient } from "../../_lib/safe-action";
import { redirect } from "next/navigation";
import { getPayload } from "../../_services/payload";
import { setAuthCookie } from "../../_lib/set-auth-cookie";
import { AUTH_CONFIG } from "../../_lib/config";

const ERROR_MESSAGES: Record<string, string> = {
  Default: "An error occurred.",
  AuthenticationError: "The email or password provided is incorrect.",
  InvalidCredentials: "The email or password provided is incorrect.",
  LockedAuth: "This account has been locked.",
} as const;

export const standardLoginAction = actionClient
  .schema(standardLoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const payload = await getPayload();

    try {
      const { token } = await payload.login({
        collection: "users", // required
        data: {
          email,
          password,
        },
      });

      await setAuthCookie(token!);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.Default;
      if (error instanceof Error) {
          console.error(error);
        errorMessage = ERROR_MESSAGES[error.name] ?? ERROR_MESSAGES.Default;
      }
      returnValidationErrors(standardLoginSchema, {
        _errors: [errorMessage],
      });
    }

    redirect(AUTH_CONFIG.redirectAfterLogin);
  });
