"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

const AppearanceContext = createContext(null);

export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    function initializeTheme() {
      const savedAppearance =
        (localStorage.getItem("appearance") as Appearance) || "system";
      applyTheme(savedAppearance);
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Add the event listener for system theme changes...
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }

    initializeTheme();
  }, []);
  return (
    <AppearanceContext.Provider value={null}>
      {children}
    </AppearanceContext.Provider>
  );
};

export type Appearance = "light" | "dark" | "system";
const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyTheme = (appearance: Appearance) => {
  const isDark =
    appearance === "dark" || (appearance === "system" && prefersDark());

  document.documentElement.classList.toggle("dark", isDark);
};
const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance") as Appearance;
  applyTheme(currentAppearance || "system");
};

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>("system");

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const updateAppearance = (mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    applyTheme(mode);
  };

  useEffect(() => {
    const savedAppearance = localStorage.getItem(
      "appearance",
    ) as Appearance | null;
    updateAppearance(savedAppearance || "system");

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  return { appearance, updateAppearance };
}
