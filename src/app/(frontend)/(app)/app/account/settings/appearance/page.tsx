import { UserProfileForm } from "@/authkit/forms/user-profile/user-profile-form";
import AppearanceToggleTab from "@/components/appearance-tabs";
import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";

export default function Appearance() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <HeadingSmall
          title="Appearance settings"
          description="Update your account's appearance settings"
        />
        <AppearanceToggleTab />
      </div>
    </div>
  );
}
