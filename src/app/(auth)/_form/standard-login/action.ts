"use server";

import { returnValidationErrors } from "next-safe-action";
import { standardLoginSchema } from "./validation";
import { actionClient } from "../../_lib/safe-action";
import { redirect } from "next/navigation";
import { getPayload } from "../../_services/payload";
import { setAuthCookie } from "../../_lib/set-auth-cookie";

const ERROR_MESSAGES: Record<string, string> = {
  Default: "An error occurred.",
  InvalidCredentials: "These credentials do not match our records.",
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
    } catch (error: any) {
      returnValidationErrors(standardLoginSchema, {
        _errors: [ERROR_MESSAGES[error.name] ?? ERROR_MESSAGES.Default],
      });
    }

    redirect("/");
  });
