import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSubmitOneTimePasswordForm } from "./use-submit-otp-form";
import { SubmitOneTimePasswordEmail } from "./validation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type SubmitOneTimePasswordFormProps = SubmitOneTimePasswordEmail & {
  onSuccess: () => void;
};

export const SubmitOneTimePasswordForm = ({
  email,
  onSuccess,
}: SubmitOneTimePasswordFormProps) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useSubmitOneTimePasswordForm({ email, otp: "" }, onSuccess);

  return (
    <div className="grid gap-4">
      <div className="">
        <h3 className="font-semibold text-lg text-center">
          Check your email for a code
        </h3>
        <p className="leading-relaxed text-sm opacity-80 text-center">
          We&apos;ve sent a 6-character code to{" "}
          <span className="font-semibold">{form.getValues("email")}</span> The
          code expires shortly, so please enter it soon.
        </p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-center justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          className="w-full"
          tabIndex={4}
          disabled={isPending}
          onClick={handleSubmitWithAction}
        >
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </Form>
    </div>
  );
};
