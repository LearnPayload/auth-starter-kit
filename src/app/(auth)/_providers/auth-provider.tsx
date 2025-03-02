"use client";

import { User } from "@/payload-types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchMe } from "../_services/fetch-me";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading] = useState<boolean>(!initialUser);

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  const value = {
    user,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
