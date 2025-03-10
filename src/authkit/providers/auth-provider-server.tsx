import { getAuth } from "../services/get-auth";
import { AuthProvider } from "./auth-provider";

export async function AuthProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data server-side
  const { user } = await getAuth();

  // Pass the initial user to the client UserProvider component
  return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
