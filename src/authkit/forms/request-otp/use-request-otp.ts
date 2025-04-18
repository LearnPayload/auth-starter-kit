"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { requestOneTimePasswordLoginAction } from "./action";
import { requestOneTimePasswordSchema } from "./validation";

export type RequestOTPSuccessArgs = {
  data?: { successful: boolean; email: string };
};

export const useRequestOTP = (
  defaultValues: z.infer<typeof requestOneTimePasswordSchema> = {
    email: "",
  },
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  return useHookFormAction(
    requestOneTimePasswordLoginAction,
    zodResolver(requestOneTimePasswordSchema),
    {
      actionProps: {
        onError: (error) => {
          onError?.(error);
        },
        onSuccess: () => {
          onSuccess?.();
        },
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
