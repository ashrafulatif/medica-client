"use server";

import { CategoryService } from "@/services/category.service";

export const getCategoriesAction = async () => {
  try {
    const result = await CategoryService.getAllCategories();
    return result;
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "Failed to fetch categories",
    };
  }
};
