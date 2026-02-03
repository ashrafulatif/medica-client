import OrderList from "@/components/modules/admin/OrderList";
import { Metadata } from "next";

interface OrderListAdminPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const OrderListAdminPage = async ({
  searchParams,
}: OrderListAdminPageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderList searchParams={params} />
    </div>
  );
};

export default OrderListAdminPage;

export const metadata: Metadata = {
  title: "Order Management",
  description: "Browse all medicine",
};
