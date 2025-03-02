"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { githubLoginAction } from "./action";
import { githubLoginSchema } from "./validation";

export const useGithubLogin = () => {
  return useHookFormAction(githubLoginAction, zodResolver(githubLoginSchema), {
    actionProps: {
      onSuccess: () => {
        console.log("Github login success");
      },
    },
    formProps: {},
    errorMapProps: {},
  });
};
