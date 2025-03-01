"use server";

import { returnValidationErrors } from "next-safe-action";
import { standardLoginSchema } from "./validation";
import { actionClient } from "../_lib/safe-action";
import { redirect } from "next/navigation";

export const standardLoginAction = actionClient
  .schema(standardLoginSchema)
  .action(async ({ parsedInput }) => {
    if (
      parsedInput.email === "admin@example.com" &&
      parsedInput.password === "admin"
    ) {
      redirect("/");
    }
    returnValidationErrors(standardLoginSchema, {
      _errors: ["These credentials do not match our records."],
    });
  });
