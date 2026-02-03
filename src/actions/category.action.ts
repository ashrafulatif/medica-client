"use server";

import { CategoryService } from "@/services/category.service";

export const getCategoriesAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  try {
    const result = await CategoryService.getAllCategories(params);

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
      error: { message: error.message || "Failed to fetch categories" },
    };
  }
};
