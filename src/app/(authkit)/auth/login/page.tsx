import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardLayout from "@/components/layouts/card-layout";
import route from "@/lib/route";

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <CardLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <form className="flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink
                  href={route("password.request")}
                  className="ml-auto text-sm"
                  tabIndex={5}
                >
                  Forgot password?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox id="remember" name="remember" tabIndex={3} />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button type="submit" className="mt-4 w-full" tabIndex={4}>
            Log in
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <TextLink href={route("register")} tabIndex={5}>
            Sign up
          </TextLink>
        </div>
      </form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </CardLayout>
  );
}
