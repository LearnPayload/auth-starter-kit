"use client";

import { Button } from "@/components/ui/button";

import { CardContent } from "@/components/ui/card";

import { RouteLink } from "@/components/route-link";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import AppLogoIcon from "@/components/app-logo-icon";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useResetPasswordForm } from "./use-reset-password-form";

export const ResetPasswordForm = ({ email }: { email: string }) => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useResetPasswordForm({
    email,
    password: "",
    confirmPassword: "",
  });

  const errors = form.formState.errors;

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
        <CardDescription>Please enter your new password.</CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <div>
          <div className="flex flex-col gap-6">
            {errors.email && (
              <p className="text-destructive">{errors.email.message}</p>
            )}
            {errors.password && (
              <p className="text-destructive">{errors.password.message}</p>
            )}
            {errors.confirmPassword && (
              <p className="text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
            <Form {...form}>
              <form onSubmit={handleSubmitWithAction} className="grid gap-4">
                <div className={cn("grid gap-4")}>
                  <FormField
                    control={form.control}
                    name="email"
                    disabled
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            placeholder="Enter email"
                            disabled={isPending}
                            readOnly
                            aria-disabled
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoFocus
                            tabIndex={2}
                            autoComplete="password"
                            placeholder="Enter new password"
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
                      <FormItem className="w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="password"
                            placeholder="Confirm new password"
                            tabIndex={3}
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
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <LoaderCircle size={16} className="animate-spin" />
                    )}
                    Reset Password
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
