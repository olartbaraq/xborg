import { apiClient } from "./axios";
import type { User } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface AuthCheckResponse {
  authenticated: boolean;
  canRefresh?: boolean;
  user?: Partial<User>;
}

export interface AuthMeResponse {
  user: User;
}

export const authApi = {
  /**
   * Get Google OAuth URL - redirects to Google
   */
  getGoogleAuthUrl: (): string => {
    return `${API_BASE_URL}/auth/google`;
  },

  /**
   * Get current authenticated user
   * Uses HTTP-only cookie automatically
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<AuthMeResponse>("/auth/me");
    return response.data.user;
  },

  /**
   * Check authentication status
   * Returns whether user is authenticated and if token can be refreshed
   */
  checkAuth: async (): Promise<AuthCheckResponse> => {
    const response = await apiClient.get<AuthCheckResponse>("/auth/check");
    return response.data;
  },

  /**
   * Refresh access token
   * Uses HTTP-only refresh_token cookie automatically
   */
  refreshToken: async (): Promise<{ user: Partial<User> }> => {
    const response = await apiClient.post<{ user: Partial<User> }>(
      "/auth/refresh"
    );
    return response.data;
  },

  /**
   * Logout user - clears HTTP-only cookies on server
   */
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
