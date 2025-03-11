import { z } from "zod";

export const googleLoginSchema = z.object({});

export type GoogleUserProfile = {
  login: string;
  id: number;
  avatar_url: string;
  email: string;
  name: string;
};
