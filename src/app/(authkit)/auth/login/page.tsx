import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardLayout from "@/components/layouts/card-layout";
import route from "@/lib/route";
import { ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";

export const metadata = {
  title: "Sign in | Payload Auth Starter",
  description: "Welcome back! Please sign in to continue.",
};

export default function Login() {
  return (
    <CardLayout
      title="Sign in to Payload Auth Starter"
      description="Welcome back! Please sign in to continue."
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              placeholder="email@example.com"
            />
          </div>

          <Button type="submit" className="mt-4 w-full" tabIndex={4}>
            Continue <ChevronRight size={12} />
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <TextLink href={route("register")} tabIndex={5}>
            Sign up
          </TextLink>
        </div>
      </form>
    </CardLayout>
  );
}
