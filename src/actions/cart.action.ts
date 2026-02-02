"use server";
import { CartService } from "@/services/cart.service";
import { revalidateTag } from "next/cache";

export const getCartItemsAction = async () => {
  return await CartService.getCartItems();
};

export const addToCartAction = async (medicineId: string, quantity: number) => {
  const result = await CartService.addToCart(medicineId, quantity);
  revalidateTag("cart-items", "max");
  return result;
};

export const updateCartQuantityAction = async (
  id: string,
  newQuantity: number,
) => {
  const result = await CartService.updateCartQuantity(id, newQuantity);
  revalidateTag("cart-items", "max");
  return result;
};

export const deleteCartItemAction = async (id: string) => {
  const result = await CartService.deleteCartItems(id);
  revalidateTag("cart-items", "max");
  return result;
};

export const clearCartAction = async () => {
  const result = await CartService.clearCart();
  revalidateTag("cart-items", "max");
  return result;
};
