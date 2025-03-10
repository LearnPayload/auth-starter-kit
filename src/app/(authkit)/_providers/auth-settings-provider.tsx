"use client";

import { AuthSetting } from "@/payload-types";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthSettingsContextType = {
  settings: AuthSetting;
};

const AuthSettingsContext = createContext<AuthSettingsContextType | undefined>(
  undefined,
);

export const AuthSettingsProvider = ({
  children,
  settings,
}: {
  children: ReactNode;
  settings: AuthSetting;
}) => {
  return (
    <AuthSettingsContext.Provider value={{ settings }}>
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
