import { GithubLogin } from "@/authkit/forms/github-login/github-login";
import { GoogleLogin } from "@/authkit/forms/google-login/google-login";
import { StandardLoginForm } from "@/authkit/forms/standard-login/standard-login-form";
import AppLogoIcon from "@/components/app-logo-icon";
import { RouteLink } from "@/components/route-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Sign in | Payload Auth Starter",
  description: "Welcome back! Please sign in to continue.",
};

export default function Login() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="text-center">
        <RouteLink
          to="home"
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </RouteLink>
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="grid grid-flow-col gap-2">
                <GoogleLogin variant={"outline"} className="w-full" />
                <GithubLogin variant={"outline"} className="w-full" />
              </div>
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background text-muted-foreground px-2">
                    or
                  </span>
                </div>
              </div>
            </div>
            <StandardLoginForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
