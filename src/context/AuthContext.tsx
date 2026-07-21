"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";

interface AuthUser {
  name: string;
  email: string;
  plan: string | null;
  role: "USER" | "ADMIN";
  isVerified: boolean;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const value: AuthContextValue = {
    isLoggedIn: !!session?.user,
    isLoading: status === "loading",
    user: session?.user
      ? {
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          plan: session.user.plan,
          role: session.user.role,
          isVerified: session.user.isVerified,
        }
      : null,
    logout: () => signOut({ callbackUrl: "/" }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
