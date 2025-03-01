import { z } from "zod";

export const standardLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
