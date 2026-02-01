interface OrderItem {
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

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface OrderData {
  id: string;
  userId: string;
  totalAmount: string;
  paymentMethod: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  customer: Customer;
}

export interface OrderDetailsViewProps {
  order: OrderData;
}
