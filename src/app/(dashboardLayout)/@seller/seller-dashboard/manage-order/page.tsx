import SellerOrderList from "@/components/modules/seller/order-management/SellerOrderList";
import { Metadata } from "next";

interface ManageOrderPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const ManageOrderPage = async ({ searchParams }: ManageOrderPageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <SellerOrderList searchParams={params} />
    </div>
  );
};

export default ManageOrderPage;

export const metadata: Metadata = {
  title: "Manage Order",
  description: "Browse all medicine",
};
