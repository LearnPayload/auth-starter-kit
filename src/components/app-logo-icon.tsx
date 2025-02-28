import Image from "next/image";

import darkLogo from "@/public/logo-dark.svg";
import lightLogo from "@/public/logo-light.svg";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-12",
  md: "size-16",
  lg: "size-48",
} as const;

type AppLogoIconProps = {
  size?: keyof typeof sizes;
};

export default function AppLogoIcon({ size = "md" }: AppLogoIconProps) {
  return (
    <div className="w-full max-w-48 min-w-8 shrink-0">
      <Image
        src={darkLogo}
        alt="Logo"
        className={cn("hidden shrink-0 dark:flex", sizes[size])}
        width={48}
        height={48}
      />
      <Image
        src={lightLogo}
        alt="Logo"
        className={cn("shrink-0 dark:hidden", sizes[size])}
        width={48}
        height={48}
      />
    </div>
  );
}
