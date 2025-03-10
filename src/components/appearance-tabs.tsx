"use client";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function AppearanceToggleTab() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <ToggleGroup variant={"outline"} value={theme ?? "system"} type="single">
        <ToggleGroupItem
          value="light"
          aria-label="Light theme"
          onClick={() => setTheme("light")}
          className="px-4"
        >
          <SunIcon className="h-4 w-4" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem
          value="dark"
          aria-label="Dark theme"
          onClick={() => setTheme("dark")}
          className="px-4"
        >
          <MoonIcon className="h-4 w-4" />
          Dark
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="System"
          onClick={() => setTheme("system")}
          className="px-4"
        >
          <MonitorIcon className="h-4 w-4" />
          System
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
