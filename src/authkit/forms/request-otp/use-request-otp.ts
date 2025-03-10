"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { requestOneTimePasswordSchema } from "./validation";
import { requestOneTimePasswordLoginAction } from "./action";

export type RequestOTPSuccessArgs = {
  data?: { successful: boolean; email: string };
};

export const useRequestOTP = (
  defaultValues: z.infer<typeof requestOneTimePasswordSchema> = {
    email: "",
  },
  onSuccess: (args: RequestOTPSuccessArgs) => void,
) => {
  return useHookFormAction(
    requestOneTimePasswordLoginAction,
    zodResolver(requestOneTimePasswordSchema),
    {
      actionProps: {
        onSuccess,
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
