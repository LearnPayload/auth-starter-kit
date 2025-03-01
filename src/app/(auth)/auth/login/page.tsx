import CardLayout from "@/app/(auth)/_components/layouts/card-layout";
import { StandardLoginForm } from "../../_form/standard-login/standard-login-form";

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
      <StandardLoginForm />
    </CardLayout>
  );
}
