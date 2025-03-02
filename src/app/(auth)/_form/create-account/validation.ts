import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  name: z.string().min(3),
  avatar: z.string().optional(),
});

export type CreateAccountProps = z.infer<typeof createAccountSchema>;
