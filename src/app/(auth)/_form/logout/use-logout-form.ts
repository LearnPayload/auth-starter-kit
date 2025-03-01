"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { logoutAction } from "./action";
import { logoutSchema } from "./validation";

export const useLogoutForm = () => {
  return useHookFormAction(logoutAction, zodResolver(logoutSchema), {
    actionProps: {},
    formProps: {},
    errorMapProps: {},
  });
};
