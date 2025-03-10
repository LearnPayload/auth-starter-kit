"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { userProfileSchema } from "./validation";
import { updateUserProfile } from "./action";

export const useUserProfileForm = (
  defaultValues: z.infer<typeof userProfileSchema> = {
    email: "",
    name: "",
  },
) => {
  return useHookFormAction(updateUserProfile, zodResolver(userProfileSchema), {
    actionProps: {},
    formProps: { defaultValues },
    errorMapProps: {},
  });
};
