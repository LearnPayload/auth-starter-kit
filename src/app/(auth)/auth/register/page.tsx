import CardLayout from "@/app/(auth)/_components/layouts/card-layout";
import { CreateAccountForm } from "../../_form/create-account/form";

export const metadata = {
  title: "Create your account | Payload Auth Starter",
  description: "Welcome! Please fill in the details to get started.",
};

export default async function Register() {
  return (
    <CardLayout
      title="Create your account"
      description="Welcome! Please fill in the details to get started."
    >
      <CreateAccountForm />
    </CardLayout>
  );
}
