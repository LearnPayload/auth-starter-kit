"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { resetPasswordAction } from "./action";

const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const useResetPasswordForm = (
  defaultValues: z.infer<typeof resetPasswordSchema> = {
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
