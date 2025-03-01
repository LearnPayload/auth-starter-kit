"use client";

import { User } from "@/payload-types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

interface AuthProviderProps extends PropsWithChildren {
  user: User | null;
}

export type Logout = () => Promise<void>;

export const AuthProvider = ({
  children,
  user: serverUser,
}: AuthProviderProps) => {
  const [user] = useState<User | null>(serverUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
