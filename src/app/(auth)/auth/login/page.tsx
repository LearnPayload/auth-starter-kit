import CardLayout from "@/components/layouts/card-layout";
import { LoginForm } from "../_components/login-form";

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
      <LoginForm />
    </CardLayout>
  );
}
