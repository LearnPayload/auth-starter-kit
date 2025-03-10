import { z } from "zod";

export const otpLoginSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .max(6),
});

export type SubmitOneTimePasswordType = z.infer<typeof otpLoginSchema>;
export type SubmitOneTimePasswordEmail = {
  email: SubmitOneTimePasswordType["email"];
};
