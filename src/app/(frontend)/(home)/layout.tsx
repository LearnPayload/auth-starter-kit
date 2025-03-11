import { AuthProviderServer } from "@/authkit/providers/auth-provider-server";
import { PropsWithChildren } from "react";

export default async function HomeLayout({ children }: PropsWithChildren) {
  return (
    <AuthProviderServer>
      <main>{children}</main>
    </AuthProviderServer>
  );
}
