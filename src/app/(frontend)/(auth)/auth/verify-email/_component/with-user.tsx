"use client";

import { RequestOneTimePasswordButton } from "@/app/_authkit/forms/request-otp/request-otp-button";
import { SubmitOneTimePasswordForm } from "@/app/_authkit/forms/submit-otp/submit-otp-form";
import { useAuth } from "@/app/_authkit/providers/auth-provider";

export const WithUser = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="grid gap-2">
      <SubmitOneTimePasswordForm email={user?.email} onSuccess={console.log} />

      <RequestOneTimePasswordButton
        email={user?.email}
        label="Resend one-time password"
        onSuccess={() => {
          // console.log({ args });
        }}
      />
    </div>
  );
};
