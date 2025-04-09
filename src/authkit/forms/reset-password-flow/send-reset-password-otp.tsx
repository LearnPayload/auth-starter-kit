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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoaderCircle, MailCheckIcon } from "lucide-react";
import { useSendOtpForm } from "./use-reset-password-form";

export const SendResetPasswordOtp = ({
  onSuccess,
}: {
  onSuccess: (input: { email: string }) => void;
}) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useSendOtpForm({ email: "hello@example.com" }, onSuccess);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="text-center">
        <RouteLink
          to="home"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </RouteLink>
        <CardTitle className="text-xl">Password Reset</CardTitle>
        <CardDescription>
          Please enter your email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <div>
          <div className="flex flex-col gap-6">
            <Form {...form}>
              <form onSubmit={handleSubmitWithAction} className="grid gap-4">
                <div className={cn("grid gap-2")}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            placeholder="email@example.com"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Button
                    type="submit"
                    variant={"outline"}
                    disabled={isPending}
                  >
                    {isPending && (
                      <LoaderCircle size={16} className="animate-spin" />
                    )}
                    <MailCheckIcon />
                    Send Reset Code
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
