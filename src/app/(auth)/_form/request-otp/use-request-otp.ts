"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { requestOneTimePasswordSchema } from "./validation";
import { requestOneTimePasswordLoginAction } from "./action";

export const useRequestOTP = (
  defaultValues: z.infer<typeof requestOneTimePasswordSchema> = {
    email: "",
  },
  onSubmit: () => void,
) => {
  return useHookFormAction(
    requestOneTimePasswordLoginAction,
    zodResolver(requestOneTimePasswordSchema),
    {
      actionProps: {
        onSuccess: onSubmit,
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
