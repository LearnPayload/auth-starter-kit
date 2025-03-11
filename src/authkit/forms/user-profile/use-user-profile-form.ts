"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { z } from "zod";
import { updateUserProfile } from "./action";
import { userProfileSchema } from "./validation";

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
