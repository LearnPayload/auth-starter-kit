"use client";

import TextLink from "@/authkit/components/text-link";
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
import route from "@/lib/route";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { RequestOneTimePasswordButton } from "../request-otp/request-otp-button";
import { SubmitOneTimePasswordForm } from "../submit-otp/submit-otp-form";
import { useStandardLoginForm } from "./use-standard-login-form";

type LoginStep = "init" | "password" | "otp";

export const StandardLoginForm = () => {
  const [formStep, setFormStep] = useState<LoginStep>("init");
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useStandardLoginForm({
    email: "hello@example.com",
    password: "password",
  });

  const rootError = form.formState.errors.root;
  return (
    <Form {...form}>
      <div className="grid gap-4">
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
                {rootError && (
                  <div className="text-destructive text-center text-sm">
                    {rootError.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>

        {formStep === "password" && (
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <TextLink
                      href={route("password.reset")}
                      tabIndex={5}
                      className="text-xs"
                    >
                      Reset password
                    </TextLink>
                  </div>

                  <FormControl>
                    <Input
                      type="password"
                      autoFocus
                      tabIndex={1}
                      autoComplete="current-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {formStep === "otp" && (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <SubmitOneTimePasswordForm email={form.getValues("email")} />
          </div>
        )}

        {formStep === "init" && (
          <Button
            type="button"
            className="w-full"
            tabIndex={4}
            onClick={() => setFormStep("password")}
          >
            Continue <ChevronRightIcon size={12} />
          </Button>
        )}

        {formStep === "password" && (
          <div className="grid gap-2">
            <Button
              type="button"
              className="w-full"
              tabIndex={4}
              disabled={isPending}
              onClick={handleSubmitWithAction}
            >
              {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Sign in with password
            </Button>

            <RequestOneTimePasswordButton
              email={form.getValues("email")}
              onSuccess={() => {
                setFormStep("otp");
              }}
            />
          </div>
        )}
      </div>

      <div className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <TextLink href={route("register")} tabIndex={5}>
          Sign up
        </TextLink>
      </div>
    </Form>
  );
};
