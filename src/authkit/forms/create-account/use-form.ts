"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { createAccountAction } from "./action";
import { createAccountSchema } from "./validation";

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
