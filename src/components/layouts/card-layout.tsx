import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import React from "react";
import AppLogoIcon from "../app-logo-icon";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function CardLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="bg-muted w-full flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-20 w-20 items-center justify-center text-zinc-800">
            <AppLogoIcon size="lg" />
          </div>
        </Link>

        <div className="flex flex-col gap-6 w-full">
          <Card className="rounded-xl w-full">
            <CardHeader className="px-10 pt-8 pb-0 text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-10 py-8">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
