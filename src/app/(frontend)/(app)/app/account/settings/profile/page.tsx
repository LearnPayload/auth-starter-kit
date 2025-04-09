import { UserProfileForm } from "@/authkit/forms/user-profile/user-profile-form";
import HeadingSmall from "@/components/heading-small";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <HeadingSmall
          title="Profile information"
          description="Update your name and email address"
        />
        <UserProfileForm />
      </div>
    </div>
  );
}
