"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import route, { Route } from "@/lib/route"; // Adjust the import path as needed

interface RouteLinkProps<P>
  extends Omit<React.ComponentProps<typeof Link>, "href"> {
  to: Route;
  params?: Partial<P>;
  activeClassName?: string;
  exact?: boolean;
}

function RouteLink<P>({
  className,
  activeClassName,
  to,
  params,
  exact = false,
  ...rest
}: RouteLinkProps<P>) {
  const pathname = usePathname();
  const href = route(to, params);

  // Determine if the link is active
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) && (href !== "/" || pathname === "/");

  return (
    <Link
      className={cn(
        "flex items-center gap-2",
        className,
        isActive && activeClassName,
      )}
      href={href}
      {...rest}
    />
  );
}

export { RouteLink };
