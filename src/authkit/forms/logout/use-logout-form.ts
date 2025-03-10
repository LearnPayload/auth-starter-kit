"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { logoutAction } from "./action";
import { logoutSchema } from "./validation";
import { useAuth } from "../../providers/auth-provider";

export const useLogoutForm = () => {
  const { logout } = useAuth();
  return useHookFormAction(logoutAction, zodResolver(logoutSchema), {
    actionProps: {
      onError: (error) => {
        console.error("Error logging out", error);
      },
      onSuccess: () => {
        console.log("Logged out");
        logout();
      },
    },
    formProps: {},
    errorMapProps: {},
  });
};
