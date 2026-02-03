import CheckoutView from "@/components/modules/customer/CheckoutView";
import { Metadata } from "next";

const CheckoutPage = () => {
  return (
    <div>
      <CheckoutView />
    </div>
  );
};

export default CheckoutPage;

export const metadata: Metadata = {
  title: "Checkout",
  description: "Browse all medicine",
};
