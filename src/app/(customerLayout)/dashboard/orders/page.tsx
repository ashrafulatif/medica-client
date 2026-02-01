import OrdersView from "@/components/modules/customer/OrdersView";
import { CustomerService } from "@/services/customer.service";

const ALLOrderPage = async () => {
  const orders = await CustomerService.getAllOrders();

  return (
    <div className="container mx-auto px-6 py-8">
      <OrdersView orders={orders.data} />
    </div>
  );
};

export default ALLOrderPage;