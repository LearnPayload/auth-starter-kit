import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { useSubmitOneTimePasswordForm } from "./use-submit-otp-form";
import { SubmitOneTimePasswordEmail } from "./validation";

type SubmitOneTimePasswordFormProps = SubmitOneTimePasswordEmail & {
  onSuccess?: () => void;
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
        <h3 className="text-center text-lg font-semibold">
          Check your email for a code
        </h3>
        <p className="text-center text-sm leading-relaxed opacity-80">
          We&apos;ve sent a 6-character code to{" "}
          <span className="font-semibold">{form.getValues("email")}</span> The
          code expires shortly, so please enter it soon.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
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
            type="submit"
            className="w-full"
            tabIndex={4}
            disabled={isPending}
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
};
