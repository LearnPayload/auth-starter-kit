"use client";

import AppLogoIcon from "@/authkit/components/app-logo-icon";
import { RouteLink } from "@/components/route-link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useVerifyOtpForm } from "./use-verify-otp-form";
export const VerifyOtpForm = ({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useVerifyOtpForm({ email, otp: "" }, onSuccess);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="text-center">
        <RouteLink
          to="home"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </RouteLink>
        <CardTitle className="text-xl">Check your email for a code</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-character code to{" "}
          <span className="font-mono font-medium bg-accent px-1 py-0.5 rounded-sm">
            {email}
          </span>{" "}
          The code expires shortly, so please enter it soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className="grid gap-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-center justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-12 w-12 text-lg"
                          />
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
      </CardContent>
    </Card>
  );
};
