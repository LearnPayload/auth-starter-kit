"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createAccountSchema } from "./validation";
import { createAccountAction } from "./action";

export const useCreateAccountForm = (
  defaultValues: z.infer<typeof createAccountSchema> = {
    email: "",
    password: "",
    name: "",
  },
) => {
  return useHookFormAction(
    createAccountAction,
    zodResolver(createAccountSchema),
    {
      actionProps: {},
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
