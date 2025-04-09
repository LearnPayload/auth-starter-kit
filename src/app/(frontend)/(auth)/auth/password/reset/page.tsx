import { ResetPasswordFlow } from "@/authkit/forms/reset-password-flow/reset-password-flow";
export const metadata = {
  title: "Reset Password | Payload Auth Starter",
  description: "Please enter your email to reset your password.",
};

export default function Login() {
  return <ResetPasswordFlow />;
}
