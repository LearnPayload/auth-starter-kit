import { draftMode } from "next/headers";
import { getAuthSettings } from "../services/get-auth-settings";
import { AuthSettingsProvider } from "./auth-settings-provider";

export async function AuthSettingsProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data server-side
  const { isEnabled: isDraftMode } = await draftMode();
  const settings = await getAuthSettings({ isDraftMode });

  // Pass the initial user to the client UserProvider component
  return (
    <AuthSettingsProvider isDraftMode={isDraftMode} settings={settings}>
      {children}
    </AuthSettingsProvider>
  );
}
