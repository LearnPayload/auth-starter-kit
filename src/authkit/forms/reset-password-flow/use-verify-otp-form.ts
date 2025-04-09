"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { verifyOtpAction } from "./action";
import { verifyOtpSchema } from "./validation";

export const useVerifyOtpForm = (
  defaultValues: z.infer<typeof verifyOtpSchema> = {
    email: "",
    otp: "",
  },
  onSuccess: () => void,
) => {
  return useHookFormAction(verifyOtpAction, zodResolver(verifyOtpSchema), {
    actionProps: {
      onSuccess: () => {
        onSuccess();
      },
    },
    formProps: { defaultValues },
    errorMapProps: {},
  });
};
