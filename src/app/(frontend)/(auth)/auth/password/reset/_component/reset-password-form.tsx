"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useResetPasswordForm } from "./use-reset-password-form";

type ResetPasswordFormProps = {
  email: string;
};

export const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useResetPasswordForm({
    email,
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="grid gap-4">
      <div className="">
        <h3 className="text-center text-lg font-semibold">
          Create a new password
        </h3>
        <p className="text-center text-sm leading-relaxed opacity-80">
          Please enter your new password below.
        </p>
      </div>
      <Form {...form}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoFocus
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="w-full"
            disabled={isPending}
            onClick={handleSubmitWithAction}
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
