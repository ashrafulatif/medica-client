export interface IStatsData {
  totalOrders: number;
  pendingOrders: number;
  totalSpent: number;
  totalOrderItems: number;
}

export interface IRecentOrderData {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
  medicines: Array<{
    id: string;
    name: string;
    thumbnail: string | null;
    price: number;
    quantity: number;
    totalPrice: number;
  }>;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
}
