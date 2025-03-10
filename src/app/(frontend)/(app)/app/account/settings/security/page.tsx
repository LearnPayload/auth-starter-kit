import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";

export default function Security() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <HeadingSmall
          title="Update password"
          description="Ensure your account is using a long, random password to stay secure"
        />
        Security Form
      </div>
    </div>
  );
}
