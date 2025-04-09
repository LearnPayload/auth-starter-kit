import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const sendOtpSchema = z.object({
  email: z.string().email(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type SendOtpType = z.infer<typeof sendOtpSchema>;
export type VerifyOtpType = z.infer<typeof verifyOtpSchema>;
