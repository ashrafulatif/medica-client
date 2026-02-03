import CartView from "@/components/modules/cart/CartView";
import { Metadata } from "next";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <CartView />
    </div>
  );
};

export default CartPage;

export const metadata: Metadata = {
  title: "Cart",
  description: "Browse all medicine",
};
