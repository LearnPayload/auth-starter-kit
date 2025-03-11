"use client";

import { ChevronsUpDown, SettingsIcon, UserIcon } from "lucide-react";

import { PayloadIcon } from "@/authkit/components/icons/payload";
import { UserInfo } from "@/authkit/components/user-info";
import { LogoutButton } from "@/authkit/forms/logout/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getInitials } from "@/lib/utils";
import { User } from "@/payload-types";
import { RouteLink } from "./route-link";

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserInfo user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarImage
                    src={user?.avatar ?? ""}
                    alt={user?.name ?? ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name ? (
                      getInitials(user.name)
                    ) : (
                      <UserIcon size={20} />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name ?? "No name"}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === "admin" && (
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <RouteLink to="payload.admin">
                    <PayloadIcon />
                    Payload Admin
                  </RouteLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <RouteLink to="account.settings">
                  <SettingsIcon />
                  Settings
                </RouteLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutButton variant={"ghost"} className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
