import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StandardLoginForm } from "../../_form/standard-login/standard-login-form";
import Link from "next/link";
import AppLogoIcon from "../../_components/app-logo-icon";

export const metadata = {
  title: "Sign in | Payload Auth Starter",
  description: "Welcome back! Please sign in to continue.",
};

export default function Login() {
  return (
    <Card className="rounded-xl w-full">
      <CardHeader className="text-center">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </Link>
        <CardTitle className="text-xl">
          Sign in to Payload Auth Starter
        </CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <StandardLoginForm />
      </CardContent>
    </Card>
  );
}
