"use client";

import { AuthSetting } from "@/payload-types";
import { createContext, ReactNode, useContext } from "react";

type AuthSettingsContextType = {
  settings: AuthSetting;
  isDraftMode: boolean;
};

const AuthSettingsContext = createContext<AuthSettingsContextType | undefined>(
  undefined,
);

export const AuthSettingsProvider = ({
  children,
  settings,
  isDraftMode,
}: {
  children: ReactNode;
  settings: AuthSetting;
  isDraftMode: boolean;
}) => {
  return (
    <AuthSettingsContext.Provider value={{ settings, isDraftMode }}>
      {children}
    </AuthSettingsContext.Provider>
  );
};

export const useAuthSettings = () => {
  const context = useContext(AuthSettingsContext);
  if (context === undefined) {
    throw new Error("useAuthSettings must be used within a AuthProvider");
  }

  return context;
};
