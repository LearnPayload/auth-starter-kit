import { PropsWithChildren } from "react";
import { AuthProviderServer } from "./auth-provider-server";

export const Providers = ({ children }: PropsWithChildren) => {
  return <AuthProviderServer>{children}</AuthProviderServer>;
};
