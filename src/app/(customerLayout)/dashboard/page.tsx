import CustomerDashboardView from "@/components/modules/customer/CustomerDashboardView";
import { CustomerService } from "@/services/customer.service";
import { userService } from "@/services/user.service";
import { Metadata } from "next";

const CustomerDashboardPage = async () => {
  const orderStats = await CustomerService.getCustomerOrderstats();
  const recentOrders = await CustomerService.getCustomerRecentOrder();
  const { data } = await userService.getSession();

  const userInfo = data.user;

  return (
    <div className="container mx-auto px-6 py-20">
      <CustomerDashboardView
        stats={orderStats.data}
        recentOrder={recentOrders.data}
        user={userInfo}
      />
    </div>
  );
};

export default CustomerDashboardPage;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Browse all medicine",
};
