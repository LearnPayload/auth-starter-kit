"use client";

import { useState } from "react";
import { ResetPasswordForm } from "./reset-password-form";
import { SendResetPasswordOtp } from "./send-reset-password-otp";
import { VerifyOtpForm } from "./verify-otp-form";
export const ResetPasswordFlow = () => {
  const [step, setStep] = useState<
    "send-otp" | "verify-otp" | "reset-password"
  >("send-otp");
  const [email, setEmail] = useState<string | null>(null);

  console.log({ email });

  return (
    <div className="grid gap-4">
      {step === "send-otp" && (
        <SendResetPasswordOtp
          onSuccess={(input: { email: string }) => {
            setStep("verify-otp");
            setEmail(input.email);
          }}
        />
      )}
      {step === "verify-otp" && email && (
        <VerifyOtpForm
          email={email}
          onSuccess={() => {
            setStep("reset-password");
          }}
        />
      )}
      {step === "reset-password" && email && (
        <ResetPasswordForm email={email} />
      )}
    </div>
  );
};
