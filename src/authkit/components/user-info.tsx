import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { User } from "@/payload-types";
import { UserIcon } from "lucide-react";

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar>
        <AvatarImage src={user?.avatar ?? ""} alt={user?.name ?? ""} />
        <AvatarFallback className="rounded-lg">
          {user?.name ? getInitials(user.name) : <UserIcon size={20} />}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
};
