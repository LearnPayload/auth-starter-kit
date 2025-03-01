"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { standardLoginSchema } from "./validation";
import { standardLoginAction } from "./action";

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
      actionProps: {},
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
