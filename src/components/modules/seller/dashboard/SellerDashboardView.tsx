import { getSellerStatsAction } from "@/actions/seller.action";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardSection from "@/components/layout/dashboard-layout/DashboardSection";
import DashboardGrid from "@/components/layout/dashboard-layout/DashboardGrid";
import StatCard from "@/components/layout/dashboard-layout/StartCard";
import SimpleChart from "@/components/layout/dashboard-layout/SimpleChartData";
import MetricsOverview from "@/components/layout/dashboard-layout/MetricsOverview";

interface SellerStats {
  medicines: {
    total: number;
    active: number;
    inactive: number;
    outOfStock: number;
  };
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    active: number;
  };
  sales: {
    totalOrderItems: number;
    totalRevenue: number;
    successfulOrders: number;
    orderCompletionRate: number;
  };
}

const SellerDashboardView = async () => {
  //api
  const statsResult = await getSellerStatsAction();

  if (statsResult.error) {
    return (
      <div className="space-y-6">
        <DashboardSection
          title="Dashboard"
          description="Welcome to your seller dashboard"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {typeof statsResult.error === "string"
                ? statsResult.error
                : statsResult.error?.message || "An error occurred"}
            </AlertDescription>
          </Alert>
        </DashboardSection>
      </div>
    );
  }

  const stats = statsResult.data as SellerStats;

  //formate data for charts
  const medicineChartData = [
    {
      label: "Active Medicines",
      value: stats.medicines.active,
      total: stats.medicines.total,
    },
    {
      label: "Inactive Medicines",
      value: stats.medicines.inactive,
      total: stats.medicines.total,
    },
    {
      label: "Out of Stock",
      value: stats.medicines.outOfStock,
      total: stats.medicines.total,
    },
  ];

  const orderMetrics: Array<{
    label: string;
    value: number;
    status: "success" | "warning" | "danger" | "default";
  }> = [
    {
      label: "Pending",
      value: stats.orders.pending,
      status: stats.orders.pending > 0 ? "warning" : "default",
    },
    {
      label: "Shipped",
      value: stats.orders.shipped,
      status: "default",
    },
    {
      label: "Delivered",
      value: stats.orders.delivered,
      status: "success",
    },
    {
      label: "Cancelled",
      value: stats.orders.cancelled,
      status: stats.orders.cancelled > 0 ? "danger" : "default",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardSection
        title="Seller Dashboard"
        description="Welcome to your seller dashboard"
      >
        <></>
      </DashboardSection>

      {/* Key Performance Metrics StatCards */}

      <DashboardGrid cols={4}>
        <StatCard
          title="Total Revenue"
          value={`$${stats.sales.totalRevenue.toLocaleString()}`}
          description="All time earnings"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.total}
          description="All time orders"
          icon={ShoppingCart}
        />
        <StatCard
          title="Items Sold"
          value={stats.sales.totalOrderItems}
          description="Total items sold"
          icon={Package}
        />
        <StatCard
          title="Success Rate"
          value={`${stats.sales.orderCompletionRate}%`}
          description="Order completion rate"
          icon={TrendingUp}
        />
      </DashboardGrid>

      {/* Medicine Inventory  */}
      <DashboardGrid cols={2}>
        <SimpleChart
          title="Medicine Inventory Status"
          description="Current status of your medicine stock"
          data={medicineChartData}
        />
        <MetricsOverview
          title="Order Status Overview"
          icon={ShoppingCart}
          metrics={orderMetrics}
        />
      </DashboardGrid>

      {/* Detailed Order Statistics */}
      <DashboardSection
        title="Order Details"
        description="Detailed breakdown of your orders"
      >
        <DashboardGrid cols={4}>
          <StatCard
            title="Pending Orders"
            value={stats.orders.pending}
            description="Awaiting confirmation"
            icon={Clock}
          />
          <StatCard
            title="Confirmed Orders"
            value={stats.orders.confirmed}
            description="Ready to ship"
            icon={CheckCircle}
          />
          <StatCard
            title="Shipped Orders"
            value={stats.orders.shipped}
            description="On the way"
            icon={Truck}
          />
          <StatCard
            title="Delivered Orders"
            value={stats.orders.delivered}
            description="Successfully completed"
            icon={CheckCircle}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Alerts and Notifications */}
      {(stats.medicines.outOfStock > 0 || stats.orders.pending > 0) && (
        <DashboardSection title="Attention Required">
          <div className="space-y-4">
            {stats.medicines.outOfStock > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You have {stats.medicines.outOfStock} medicine(s) that are out
                  of stock. Consider restocking to avoid lost sales.
                </AlertDescription>
              </Alert>
            )}
            {stats.orders.pending > 0 && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  You have {stats.orders.pending} pending order(s) awaiting your
                  attention.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </DashboardSection>
      )}
    </div>
  );
};

export default SellerDashboardView;
