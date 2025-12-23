"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "../api";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      const authCheck = await authApi.checkAuth();

      if (authCheck.authenticated && authCheck.user) {
        setUserState(authCheck.user as User);
      } else if (authCheck.canRefresh) {
        // Try to refresh the token
        try {
          const result = await authApi.refreshToken();
          if (result.user) {
            // After refresh, fetch full user data
            const fullUser = await authApi.getCurrentUser();
            setUserState(fullUser);
          }
        } catch {
          setUserState(null);
        }
      } else {
        setUserState(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUserState(null);
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        await refreshAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [refreshAuth]);

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
