import SellerDashboardView from "@/components/modules/seller/dashboard/SellerDashboardView";
import { Metadata } from "next";

const SellerDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SellerDashboardView />
    </div>
  );
};

export default SellerDashboardPage;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Browse all medicine",
};
