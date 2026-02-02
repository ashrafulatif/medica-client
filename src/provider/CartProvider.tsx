"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getCartItemsAction,
  addToCartAction,
  updateCartQuantityAction,
  deleteCartItemAction,
  clearCartAction,
} from "@/actions/cart.action";
import { ICartItem } from "@/types";
import { transformCartItem } from "@/helpers/formatCartItem";
import { CartContext } from "@/context/cartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!initialLoading) setLoading(true);

    try {
      const response = await getCartItemsAction();
      //   console.log("Cart response:", response);

      if (response.data && response.data.cart && response.data.cart.items) {
        const transformedItems =
          response.data.cart.items.map(transformCartItem);
        setCartItems(transformedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const addToCart = async (medicineId: string, quantity: number) => {
    try {
      const response = await addToCartAction(medicineId, quantity);
      if (response.data) {
        toast.success(response.message || "Item added to cart", {
          id: "success",
        });
        // only refresh cart after adding
        await fetchCartItems();
      } else {
        toast.error(
          response.error || response.message || "Failed to add item to cart",
        );
      }
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(id);
      return;
    }

    // ui update
    const originalItems = [...cartItems];
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      const response = await updateCartQuantityAction(id, newQuantity);
      if (response.data) {
        toast.success("Cart updated", { id: "success" });
      } else {
        // revert on error
        setCartItems(originalItems);
        toast.error(
          response.error || response.message || "Failed to update cart",
        );
      }
    } catch (error) {
      // revert on error
      setCartItems(originalItems);
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (id: string) => {
    // ui update
    const originalItems = [...cartItems];
    setCartItems((items) => items.filter((item) => item.id !== id));

    try {
      const response = await deleteCartItemAction(id);
      if (response.data) {
        toast.success("Item removed from cart", { id: "success" });
      } else {
        // revert on error
        setCartItems(originalItems);
        toast.error(
          response.error || response.message || "Failed to remove item",
        );
      }
    } catch (error) {
      // revert on error
      setCartItems(originalItems);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    // ui update
    const originalItems = [...cartItems];
    setCartItems([]);

    try {
      const response = await clearCartAction();
      if (response.data) {
        toast.success("Cart cleared", { id: "success" });
      } else {
        // revert on error
        setCartItems(originalItems);
        toast.error(
          response.error || response.message || "Failed to clear cart",
        );
      }
    } catch (error) {
      setCartItems(originalItems);
      toast.error("Failed to clear cart");
    }
  };

  const refreshCart = async () => {
    await fetchCartItems();
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = {
    cartItems,
    loading: initialLoading, // Only show loading on initial load
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
