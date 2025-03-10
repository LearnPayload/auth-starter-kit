"use client";

import { LayoutGrid } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RouteLink } from "./route-link";
import { useAuth } from "@/app/(authkit)/_providers/auth-provider";

export function NavAdmin() {
  const { user } = useAuth();
  if (!user || !user.role.includes("admin")) {
    return null;
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Organizations</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <RouteLink to="authkit.settings" activeClassName="bg-primary/10">
              <LayoutGrid className="w-6 h-6 shrink-0" />
              <span>Settings</span>
            </RouteLink>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <RouteLink to="authkit.settings" activeClassName="bg-primary/10">
              <LayoutGrid className="w-6 h-6 shrink-0" />
              <span>Settings</span>
            </RouteLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
