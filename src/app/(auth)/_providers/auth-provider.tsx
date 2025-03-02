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
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);

  useEffect(() => {
    // If we already have initial user data, skip fetching
    console.log("initialUser", initialUser);
    if (!initialUser) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await fetchMe();
        if (!user) {
          throw new Error("Failed to fetch user");
        }
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        // You might want to handle auth errors here (redirect to login, etc.)
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [initialUser]);

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
