"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAuth } from "../../providers/auth-provider";
import { logoutAction } from "./action";
import { logoutSchema } from "./validation";

export const useLogoutForm = () => {
  const { logout } = useAuth();
  return useHookFormAction(logoutAction, zodResolver(logoutSchema), {
    actionProps: {
      onError: () => {
        // console.error("Error logging out", error);
      },
      onSuccess: () => {
        logout();
      },
    },
    formProps: {},
    errorMapProps: {},
  });
};
