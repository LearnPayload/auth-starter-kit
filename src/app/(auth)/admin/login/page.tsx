import { redirect } from "next/navigation";

export default function RedirectLoginPage() {
  return redirect("/auth/login");
}
