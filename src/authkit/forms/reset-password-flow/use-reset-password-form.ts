"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { resetPasswordAction, sendOtpAction } from "./action";
import { resetPasswordSchema, sendOtpSchema } from "./validation";

export const useResetPasswordForm = (
  defaultValues: Partial<z.infer<typeof resetPasswordSchema>> = {
    email: "",
    password: "",
    confirmPassword: "",
  },
) => {
  const router = useRouter();
  return useHookFormAction(
    resetPasswordAction,
    zodResolver(resetPasswordSchema),
    {
      actionProps: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};

export const useSendOtpForm = (
  defaultValues: Partial<z.infer<typeof sendOtpSchema>> = {
    email: "",
  },
  onSuccess: (input: { email: string }) => void,
) => {
  return useHookFormAction(sendOtpAction, zodResolver(sendOtpSchema), {
    actionProps: {
      onSuccess: ({ input }) => {
        onSuccess?.(input);
      },
    },
    formProps: { defaultValues },
    errorMapProps: {},
  });
};
