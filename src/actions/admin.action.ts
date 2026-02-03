"use server";

import { AdminService } from "@/services/admin.service";

export const getAdminStatsAction = async () => {
  try {
    const result = await AdminService.getAdminStats();

    if (result.error) {
      return {
        data: null,
        error: result.error,
      };
    }

    return {
      data: result.data,
      error: null,
      message: result.message,
    };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Failed to fetch seller stats" },
    };
  }
};

export const getAllUsersAction = async () => {
  return await AdminService.getAllUsers();
};

export const addCategoryAction = async (name: string, description: string) => {
  const result = await AdminService.addCategory(name, description);
  return result;
};
