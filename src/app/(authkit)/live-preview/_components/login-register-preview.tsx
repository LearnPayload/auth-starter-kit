"use client";

import { GoogleIcon } from "@/app/(authkit)/_components/icons/google";
import TextLink from "@/app/(authkit)/_components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import route from "@/lib/route";
import { ChevronRightIcon, MailCheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "../../_components/icons/github";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLogoIcon from "../../_components/app-logo-icon";
import { useAuthSettings } from "../../_providers/auth-settings-provider";
import { RouteLink } from "@/components/route-link";

type LoginStep = "init" | "password" | "otp";

export const LoginRegisterPreview = () => {
  const [formStep, setFormStep] = useState<LoginStep>("init");
  const { settings } = useAuthSettings();

  return (
    <Card className="rounded-xl w-full">
      <CardHeader className="text-center">
        <RouteLink
          to={"home"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </RouteLink>
        <CardTitle className="text-xl">{settings.title}</CardTitle>
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
                <Button type="submit" variant={"outline"}>
                  <GithubIcon />
                  Github
                </Button>
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
            <div className="grid gap-4">
              <div className={cn("grid gap-2")}>
                <Input
                  type="text"
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="email@example.com"
                />
              </div>

              {formStep === "password" && (
                <div className="grid gap-2">
                  <Input
                    type="password"
                    autoFocus
                    tabIndex={1}
                    autoComplete="current-password"
                  />
                </div>
              )}

              {formStep === "otp" && (
                <div className="gap-2 flex flex-col items-center justify-center text-center">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                      <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                      <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                      <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                      <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                      <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
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
                  <Button type="button" className="w-full" tabIndex={4}>
                    Sign in with password
                  </Button>

                  <div className="grid gap-2">
                    <Button
                      type="button"
                      className="w-full"
                      variant={"outline"}
                      tabIndex={5}
                    >
                      <MailCheckIcon />
                      Send me a one-time password (OTP)
                    </Button>
                  </div>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
