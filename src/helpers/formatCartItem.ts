import { ICartItem } from "@/types";

// Helper function to transform backend cart item to frontend format
export const transformCartItem = (item: any): ICartItem => {
  return {
    id: item.id,
    medicineId: item.medicineId,
    name: item.medicine?.name || "Unknown Medicine",
    price: parseFloat(item.medicine?.price || "0"),
    quantity: item.quantity,
    image: item.medicine?.thumbnail,
    category: item.medicine?.category?.name,
    inStock: item.medicine?.stocks > 0 && item.medicine?.isActive,
  };
};
