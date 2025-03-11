"use client";

import { BoxesIcon, ChartAreaIcon, Users2Icon, WrenchIcon } from "lucide-react";

import { useAuth } from "@/authkit/providers/auth-provider";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RouteLink } from "./route-link";

export function NavAdmin() {
  const { user } = useAuth();
  if (!user || !user.role.includes("admin")) {
    return null;
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>AuthKit Admin</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <RouteLink
              exact
              to="authkit.overview"
              activeClassName="bg-primary/10"
            >
              <ChartAreaIcon className="h-6 w-6 shrink-0" />
              <span>Overview</span>
            </RouteLink>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <RouteLink to="authkit.users" activeClassName="bg-primary/10">
              <Users2Icon className="h-6 w-6 shrink-0" />
              <span>Users</span>
            </RouteLink>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <RouteLink to="authkit.orgs" activeClassName="bg-primary/10">
              <BoxesIcon className="h-6 w-6 shrink-0" />
              <span>Organizations</span>
            </RouteLink>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <RouteLink to="authkit.config" activeClassName="bg-primary/10">
              <WrenchIcon className="h-6 w-6 shrink-0" />
              <span>Configure</span>
            </RouteLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
