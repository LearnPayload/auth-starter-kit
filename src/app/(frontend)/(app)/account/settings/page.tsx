import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/account/settings/profile");
}
