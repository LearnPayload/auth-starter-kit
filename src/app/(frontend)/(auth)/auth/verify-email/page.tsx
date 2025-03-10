import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { WithUser } from "./_component/with-user";
import { AuthProviderServer } from "@/authkit/providers/auth-provider-server";
import AppLogoIcon from "@/authkit/components/app-logo-icon";

export const metadata = {
  title: "Create your account | Payload Auth Starter",
  description: "Welcome! Please fill in the details to get started.",
};

export default async function VerifyEmail() {
  return (
    <AuthProviderServer>
      <Card className="rounded-xl w-full">
        <CardHeader className="text-center">
          <Link
            href={"/"}
            className="flex items-center gap-2 self-center font-medium"
          >
            <AppLogoIcon size="sm" />
          </Link>
          <CardTitle className="text-xl">Verify email</CardTitle>
          <CardDescription className="sr-only">
            Please verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10 py-8 pt-0 flex flex-col items-center">
          <WithUser />
        </CardContent>
      </Card>
    </AuthProviderServer>
  );
}
