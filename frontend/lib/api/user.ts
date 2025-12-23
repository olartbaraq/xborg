import { apiClient } from "./axios";
import type { User, UpdateUserDto } from "../types";

export const userApi = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/user");
    return response.data;
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/user/profile/${id}`);
    return response.data;
  },

  /**
   * Update user profile
   */
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>(`/user/profile/${id}`, data);
    return response.data;
  },
};
