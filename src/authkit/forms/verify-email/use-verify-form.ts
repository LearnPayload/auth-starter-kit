"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { submitOneTimePasswordAction } from "./action";
import { otpLoginSchema } from "../submit-otp/validation";

export const useVerifyEmailForm = (
  defaultValues: z.infer<typeof otpLoginSchema> = {
    email: "",
    otp: "",
  },
  onSuccess: () => void,
) => {
  return useHookFormAction(
    submitOneTimePasswordAction,
    zodResolver(otpLoginSchema),
    {
      actionProps: {
        onSuccess,
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
