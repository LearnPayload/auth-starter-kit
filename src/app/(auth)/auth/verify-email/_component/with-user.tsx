"use client";

import { RequestOneTimePasswordButton } from "@/app/(auth)/_form/request-otp/request-otp-button";
import { SubmitOneTimePasswordForm } from "@/app/(auth)/_form/submit-otp/submit-otp-form";
import { useAuth } from "@/app/(auth)/_providers/auth-provider";

export const WithUser = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="grid gap-2">
      <SubmitOneTimePasswordForm email={user?.email} onSuccess={console.log} />

      <RequestOneTimePasswordButton
        email={user?.email}
        label="Resend one-time password"
        onSuccess={(args) => {
          // console.log({ args });
        }}
      />
    </div>
  );
};
