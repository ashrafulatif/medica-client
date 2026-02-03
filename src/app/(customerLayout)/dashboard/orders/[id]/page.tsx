import OrderDetailsView from "@/components/modules/customer/OrderDetailsView";
import { CustomerService } from "@/services/customer.service";
import { Metadata } from "next";

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await CustomerService.getOrderId(id);

  return (
    <div className="container mx-auto px-6 py-8">
      <OrderDetailsView order={data.data} />
    </div>
  );
};

export default OrderDetails;

export const metadata: Metadata = {
  title: "Order Details",
  description: "Browse all medicine",
};