"use client";

import { AUTH_CONFIG } from "@/authkit/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { submitOneTimePasswordAction } from "./action";
import { otpLoginSchema } from "./validation";
export const useSubmitOneTimePasswordForm = (
  defaultValues: z.infer<typeof otpLoginSchema> = {
    email: "",
    otp: "",
  },
) => {
  const router = useRouter();
  return useHookFormAction(
    submitOneTimePasswordAction,
    zodResolver(otpLoginSchema),
    {
      actionProps: {
        onSuccess: () => {
          console.log("onSuccess");
          router.push(AUTH_CONFIG.redirectAfterUserLogin);
        },
      },
      formProps: { defaultValues },
      errorMapProps: {},
    },
  );
};
