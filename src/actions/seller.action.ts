"use server";

import { IMedicineProps, SellerService } from "@/services/seller.service";

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

export const getAllSellerMedicineAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  return await SellerService.getAllSellerMedicine(params);
};

export const getAllSellerOrderAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  return await SellerService.getAllSellerOders(params);
};

export const updateMedicineAction = async (
  medicineId: string,
  newData: IMedicineProps,
) => {
  return await SellerService.updateMedicine(medicineId, newData);
};

export const deleteMedicineAction = async (medicineId: string) => {
  return await SellerService.deleteMedicine(medicineId);
};

export const updateOrderStatusAction = async (
  orderId: string,
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED",
) => {
  return await SellerService.updateOrderStatus(orderId, status);
};
