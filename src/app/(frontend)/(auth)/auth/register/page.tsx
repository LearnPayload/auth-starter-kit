import { CreateAccountForm } from "@/authkit/forms/create-account/form";
import AppLogoIcon from "@/components/app-logo-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Create your account | Payload Auth Starter",
  description: "Welcome! Please fill in the details to get started.",
};

export default async function Register() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="text-center">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <AppLogoIcon size="sm" />
        </Link>
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8 pt-0">
        <CreateAccountForm />
      </CardContent>
    </Card>
  );
}
