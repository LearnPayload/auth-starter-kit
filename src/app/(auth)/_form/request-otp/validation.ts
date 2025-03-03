import { z } from "zod";

export const requestOneTimePasswordSchema = z.object({
  email: z.string().email(),
});

export type RequestOneTimePasswordType = z.infer<
  typeof requestOneTimePasswordSchema
>;
