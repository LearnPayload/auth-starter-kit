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

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>App</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <RouteLink to="app.dashboard" activeClassName="bg-primary/10">
              <LayoutGrid className="w-6 h-6 shrink-0" />
              <span>Dashboard</span>
            </RouteLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
