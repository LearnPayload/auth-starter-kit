import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Security() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <HeadingSmall
          title="Update password"
          description="Ensure your account is using a long, random password to stay secure"
        />
        <form className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="current_password">Current password</Label>

            <Input
              id="current_password"
              type="password"
              className="mt-1 block w-full"
              autoComplete="current-password"
              placeholder="Current password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>

            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              autoComplete="new-password"
              placeholder="New password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>

            <Input
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              autoComplete="new-password"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button>Save password</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
