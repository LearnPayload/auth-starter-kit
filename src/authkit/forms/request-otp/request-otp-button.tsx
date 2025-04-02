import { Button } from "@/components/ui/button";
import { LoaderCircle, MailCheckIcon } from "lucide-react";
import React from "react";
import InputError from "../../components/input-error";
import { useRequestOTP } from "./use-request-otp";
import { RequestOneTimePasswordType } from "./validation";

type RequestOneTimePasswordButtonProps = RequestOneTimePasswordType & {
  label?: React.ReactNode;
};

export const RequestOneTimePasswordButton = ({
  email,
  label = "Send me a one-time password (OTP)",
}: RequestOneTimePasswordButtonProps) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useRequestOTP({ email });
  return (
    <div className="grid gap-2">
      <Button
        type="button"
        className="w-full"
        variant={"outline"}
        tabIndex={5}
        disabled={isPending}
        onClick={handleSubmitWithAction}
      >
        {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
        <MailCheckIcon />
        {label}
      </Button>

      {form.formState.errors.root && (
        <InputError message={form.formState.errors?.root?.message} />
      )}
    </div>
  );
};
