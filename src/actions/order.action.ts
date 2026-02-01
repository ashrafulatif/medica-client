"use server";

import { CustomerService } from "@/services/customer.service";

export const cancelOrderAction = async (id: string) => {
  return await CustomerService.cancelOrder(id);
};
