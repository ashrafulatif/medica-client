export interface ICartItem {
  id: string;
  medicineId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  inStock: boolean;
}

export interface CartContextType {
  cartItems: ICartItem[];
  loading: boolean;
  addToCart: (medicineId: string, quantity: number) => Promise<void>;
  updateQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}