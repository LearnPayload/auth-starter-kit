"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { googleLoginAction } from "./action";
import { googleLoginSchema } from "./types";

export const useGoogleLogin = () => {
  return useHookFormAction(googleLoginAction, zodResolver(googleLoginSchema), {
    actionProps: {
      onSuccess: () => {},
    },
    formProps: {},
    errorMapProps: {},
  });
};
