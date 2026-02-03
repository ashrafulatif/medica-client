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

export const getAllUsersAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  return await AdminService.getAllUsers(params);
};

export const addCategoryAction = async (name: string, description: string) => {
  const result = await AdminService.addCategory(name, description);
  return result;
};

export const deleteUserAction = async (userId: string) => {
  return await AdminService.deleteUser(userId);
};

export const updateUserStatusAction = async (
  userId: string,
  status: "ACTIVE" | "INACTIVE",
) => {
  return await AdminService.updateUserStatus(userId, status);
};

export const getAllMedicinesAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  return await AdminService.getAllMedicinesAdmin(params);
};

export const getAllOrdersAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  return await AdminService.getAllOrdersAdmin(params);
};
