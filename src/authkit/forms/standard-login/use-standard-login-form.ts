"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { standardLoginAction } from "./action";
import { standardLoginSchema } from "./validation";

export const useStandardLoginForm = (
  defaultValues: z.infer<typeof standardLoginSchema> = {
    email: "",
    password: "",
  },
) => {
  return useHookFormAction(
    standardLoginAction,
    zodResolver(standardLoginSchema),
    {
      actionProps: {
        onSuccess: () => {
          // redirect to home
          window.location.reload();
        },
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
