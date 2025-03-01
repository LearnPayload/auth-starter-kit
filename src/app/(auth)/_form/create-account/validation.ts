import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(3),
});
