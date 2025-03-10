import route from "@/lib/route";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect(route("account.settings"));
}
