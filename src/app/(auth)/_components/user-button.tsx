"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../_providers/auth-provider";
import { getInitials } from "@/lib/utils";
import { User2Icon } from "lucide-react";

export const UserButton = () => {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div>
      <Avatar className="h-10 w-10 flex items-center p-1 justify-center overflow-hidden rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
        <AvatarImage src={user.avatar} alt={user.name!} />
        <AvatarFallback>
          {user.name ? getInitials(user.name) : <User2Icon size={24} />}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
