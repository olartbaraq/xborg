"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../api";
import { useAuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, isAuthenticated, isLoading, refreshAuth } =
    useAuthContext();

  const login = useCallback(() => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = authApi.getGoogleAuthUrl();
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      router.push("/signin");
    }
  }, [router, setUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAuth,
  };
};
