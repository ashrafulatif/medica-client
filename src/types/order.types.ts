export interface OrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: string;
  medicine: {
    id: string;
    name: string;
    price: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: string;
  paymentMethod: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface OrdersData {
  result: Order[];
  meta: {
    total: number;
  };
}

export interface OrdersViewProps {
  orders: OrdersData;
}


interface IOrderItem {
  medicineId: string;
  quantity: number;
}

export interface IOrderData {
  orderItems: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}