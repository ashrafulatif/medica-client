"use server";

import { SellerService } from "@/services/seller.service";

export const getSellerStatsAction = async () => {
  try {
    const result = await SellerService.getSellerStats();

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
