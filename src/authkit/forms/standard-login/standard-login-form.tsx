"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import route from "@/lib/route";
import { ChevronRightIcon, LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStandardLoginForm } from "./use-standard-login-form";
import { GithubLogin } from "../github-login/github-login";
import { useState } from "react";
import { RequestOneTimePasswordButton } from "../request-otp/request-otp-button";
import { cn } from "@/lib/utils";
import { SubmitOneTimePasswordForm } from "../submit-otp/submit-otp-form";
import { useRouter } from "next/navigation";
import { GoogleIcon } from "@/authkit/components/icons/google";
import TextLink from "@/authkit/components/text-link";
import { useAuthSettings } from "@/authkit/providers/auth-settings-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteLink } from "@/components/route-link";
import AppLogoIcon from "@/authkit/components/app-logo-icon";

type LoginStep = "init" | "password" | "otp";

export const StandardLoginForm = () => {
  const {
    settings: { title },
  } = useAuthSettings();
  const [formStep, setFormStep] = useState<LoginStep>("init");
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useStandardLoginForm({ email: "hello@example.com", password: "1234" });

  const router = useRouter();

  const redirectOnSuccess = () => router.push(route("authkit.overview"));

  const rootError = form.formState.errors.root;
  return (
    <Card className="rounded-xl w-full">
      <CardHeader className="text-center">
        <RouteLink
          to="home"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </RouteLink>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="grid grid-flow-col gap-2">
                <Button variant={"outline"}>
                  <GoogleIcon size="sm" /> Google
                </Button>
                <GithubLogin variant={"outline"} className="w-full" />
              </div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>
            </div>
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
                          <div className="text-destructive text-sm text-center">
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
                          <FormLabel>Password</FormLabel>
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
                  <div className="gap-2 flex flex-col items-center justify-center text-center">
                    <SubmitOneTimePasswordForm
                      email={form.getValues("email")}
                      onSuccess={redirectOnSuccess}
                    />
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
                      {isPending && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      )}
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

                {formStep !== "init" && (
                  <Button
                    type="button"
                    className="w-full"
                    tabIndex={4}
                    variant={"link"}
                    onClick={() => setFormStep("init")}
                  >
                    Start over
                  </Button>
                )}
              </div>

              <div className="text-muted-foreground text-center text-sm">
                Don&apos;t have an account?{" "}
                <TextLink href={route("register")} tabIndex={5}>
                  Sign up
                </TextLink>
              </div>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
