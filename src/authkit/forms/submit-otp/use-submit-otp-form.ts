"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { submitOneTimePasswordAction } from "./action";
import { otpLoginSchema } from "./validation";

export const useSubmitOneTimePasswordForm = (
  defaultValues: z.infer<typeof otpLoginSchema> = {
    email: "",
    otp: "",
  },
  onSuccess?: () => void,
) => {
  return useHookFormAction(
    submitOneTimePasswordAction,
    zodResolver(otpLoginSchema),
    {
      actionProps: {
        onSuccess: () => {
          onSuccess?.();
        },
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
