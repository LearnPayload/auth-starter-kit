import { AuthSettingsProviderServer } from "@/authkit/providers/auth-settings-provider-server";

export default function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <AuthSettingsProviderServer>
      <div className="bg-muted flex min-h-svh w-full flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="flex w-full flex-col gap-6">{children}</div>
        </div>
      </div>
    </AuthSettingsProviderServer>
  );
}
