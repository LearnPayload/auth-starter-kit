import { PropsWithChildren } from "react";
import { AuthProviderServer } from "./auth-provider-server";
import { AuthSettingsProviderServer } from "./auth-settings-provider-server";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthSettingsProviderServer>
      <AuthProviderServer>{children}</AuthProviderServer>
    </AuthSettingsProviderServer>
  );
};
