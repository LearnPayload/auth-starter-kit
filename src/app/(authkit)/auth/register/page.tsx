import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardLayout from "@/components/layouts/card-layout";
import route from "@/lib/route";
import { ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import configPromise from "@/payload.config";
import { Field } from "payload";

type UserField = Field & {
  name: string;
  required: boolean;
};

export default async function Register() {
  const config = await configPromise;
  const userConfig = config.collections.find((c) => c.slug === "users")!;
  const fields = userConfig.fields as UserField[];
  const nameField = fields.find((field) => field.name === "name");

  return (
    <CardLayout
      title="Create your account"
      description="Welcome! Please fill in the details to get started."
    >
      <form className="flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="grid grid-flow-col gap-2">
              <Button variant={"outline"}>
                <GoogleIcon size="sm" /> Google
              </Button>
              <Button variant={"outline"}>
                <GithubIcon size="sm" /> Github
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

          {nameField && (
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="name">Name</Label>
                {!nameField.required && (
                  <span
                    id="email-optional"
                    className="text-sm/6 text-gray-500 leading-none"
                  >
                    Optional
                  </span>
                )}
              </div>
              <Input
                id="name"
                type="text"
                name="name"
                required
                autoFocus
                tabIndex={1}
                autoComplete="name"
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              autoFocus
              tabIndex={2}
              autoComplete="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              autoFocus
              tabIndex={3}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="mt-4 w-full" tabIndex={4}>
            Continue <ChevronRight size={12} />
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <TextLink href={route("login")} tabIndex={5}>
            Sign in
          </TextLink>
        </div>
      </form>
    </CardLayout>
  );
}
