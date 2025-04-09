"use client";

import { RequestOneTimePasswordButton } from "@/authkit/forms/request-otp/request-otp-button";
import { SubmitOneTimePasswordForm } from "@/authkit/forms/submit-otp/submit-otp-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordForm } from "./reset-password-form";

type ResetStep = "email" | "otp" | "password";

const emailSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordPage = () => {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    setEmail(data.email);
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <div className="grid gap-4">
              <p className="text-center text-sm text-muted-foreground">
                Enter your email address and we&apos;ll send you a one-time
                password to reset your password.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoFocus
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <RequestOneTimePasswordButton
                    email={form.getValues("email")}
                    onSuccess={() => setStep("otp")}
                    label="Send reset code"
                  />
                </form>
              </Form>
            </div>
          )}

          {step === "otp" && (
            <div className="grid gap-4">
              <SubmitOneTimePasswordForm
                email={email}
                onSuccess={() => setStep("password")}
              />
            </div>
          )}

          {step === "password" && (
            <div className="grid gap-4">
              <ResetPasswordForm email={email} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
