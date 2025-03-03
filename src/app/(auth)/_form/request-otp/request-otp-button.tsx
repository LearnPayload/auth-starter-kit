import { Button } from "@/components/ui/button";
import { LoaderCircle, MailCheckIcon } from "lucide-react";
import { useRequestOTP } from "./use-request-otp";
import { RequestOneTimePasswordType } from "./validation";

type RequestOneTimePasswordButtonProps = RequestOneTimePasswordType & {
  onSubmit: () => void;
};

export const RequestOneTimePasswordButton = ({
  email,
  onSubmit,
}: RequestOneTimePasswordButtonProps) => {
  const {
    action: { isPending },
    handleSubmitWithAction,
  } = useRequestOTP({ email }, onSubmit);
  return (
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
      Send me a one-time password (OTP)
    </Button>
  );
};
