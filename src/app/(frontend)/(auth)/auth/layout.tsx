import { AuthSettingsProviderServer } from "@/authkit/providers/auth-settings-provider-server";

export default function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <AuthSettingsProviderServer>
      <div className="bg-muted w-full flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-col gap-6 w-full">{children}</div>
        </div>
      </div>
    </AuthSettingsProviderServer>
  );
}
