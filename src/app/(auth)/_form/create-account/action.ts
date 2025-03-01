"use server";

import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "../../_lib/safe-action";
import { redirect } from "next/navigation";
import { getPayload } from "../../_services/payload";
import { createAccountSchema } from "./validation";
import { loginWith } from "../../_lib/login-as";

const ERROR_MESSAGES: Record<string, string> = {
  Default: "An error occurred.",
  ValidationError: "The email has already been taken.",
} as const;

export const createAccountAction = actionClient
  .schema(createAccountSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const payload = await getPayload();

    try {
      const user = await payload.create({
        collection: "users", // required
        data: {
          email,
          password,
          name,
        },
        overrideAccess: true,
      });

      await loginWith(user, { collection: "users" });
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.Default;
      if (error instanceof Error) {
        errorMessage = ERROR_MESSAGES[error.name] ?? ERROR_MESSAGES.Default;
      }
      returnValidationErrors(createAccountSchema, {
        _errors: [errorMessage],
      });
    }

    redirect("/");
  });
