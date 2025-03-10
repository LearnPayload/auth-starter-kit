import { StandardLoginForm } from "@/app/_authkit/forms/standard-login/standard-login-form";

export const metadata = {
  title: "Sign in | Payload Auth Starter",
  description: "Welcome back! Please sign in to continue.",
};

export default function Login() {
  return <StandardLoginForm />;
}
