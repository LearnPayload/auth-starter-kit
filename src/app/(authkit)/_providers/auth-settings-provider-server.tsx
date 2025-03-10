import { getAuthSettings } from "../_services/get-auth-settings";
import { AuthSettingsProvider } from "./auth-settings-provider";

export async function AuthSettingsProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data server-side
  const settings = await getAuthSettings();

  // Pass the initial user to the client UserProvider component
  return (
    <AuthSettingsProvider settings={settings}>{children}</AuthSettingsProvider>
  );
}
