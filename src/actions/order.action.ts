"use server";

import { CustomerService } from "@/services/customer.service";
import { IOrderData } from "@/types";

export const cancelOrderAction = async (id: string) => {
  return await CustomerService.cancelOrder(id);
};

export const createOrderAction = async (orderData: IOrderData) => {
  return await CustomerService.createOrder(orderData);
};
