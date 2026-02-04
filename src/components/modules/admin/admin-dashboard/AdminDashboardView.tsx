import { getAdminStatsAction } from "@/actions/admin.action";
import {
  Package,
  Users,
  Eye,
  UserCheck,
  UserX,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardSection from "@/components/layout/dashboard-layout/DashboardSection";
import DashboardGrid from "@/components/layout/dashboard-layout/DashboardGrid";
import StatCard from "@/components/layout/dashboard-layout/StartCard";
import SimpleChart from "@/components/layout/dashboard-layout/SimpleChartData";
import MetricsOverview from "@/components/layout/dashboard-layout/MetricsOverview";

interface AdminStats {
  totalMedicines: number;
  activeMedicines: number;
  inactiveMedicines: number;
  totalUsers: number;
  sellerCount: number;
  buyerCount: number;
  totalViews: number;
}

const AdminDashboardView = async () => {
  
  const statsResult = await getAdminStatsAction();

  if (statsResult.error) {
    return (
      <div className="space-y-6">
        <DashboardSection
          title="Admin Dashboard"
          description="Welcome to your admin dashboard"
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

  const stats = statsResult.data as AdminStats;

  // prepare data
  const medicineChartData = [
    {
      label: "Active Medicines",
      value: stats.activeMedicines,
      total: stats.totalMedicines,
    },
    {
      label: "Inactive Medicines",
      value: stats.inactiveMedicines,
      total: stats.totalMedicines,
    },
  ];

  // user distribution metrics
  const userMetrics: Array<{
    label: string;
    value: number;
    status: "success" | "warning" | "danger" | "default";
  }> = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      status: "default",
    },
    {
      label: "Sellers",
      value: stats.sellerCount,
      status: "success",
    },
    {
      label: "Buyers",
      value: stats.buyerCount,
      status: stats.buyerCount === 0 ? "warning" : "success",
    },
    {
      label: "Views",
      value: stats.totalViews,
      status: "default",
    },
  ];

  // user distribution percentages
  const sellerPercentage =
    stats.totalUsers > 0
      ? Math.round((stats.sellerCount / stats.totalUsers) * 100)
      : 0;
  const buyerPercentage =
    stats.totalUsers > 0
      ? Math.round((stats.buyerCount / stats.totalUsers) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardSection
        title="Admin Dashboard"
        description="System overview and platform statistics"
      >
        <></>
      </DashboardSection>

      {/* MAIN Platform data */}
      <DashboardGrid cols={4}>
        <StatCard
          title="Total Medicines"
          value={stats.totalMedicines}
          description="All medicines in system"
          icon={Package}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered users"
          icon={Users}
        />
        <StatCard
          title="Platform Views"
          value={stats.totalViews.toLocaleString()}
          description="Total page views"
          icon={Eye}
        />
        <StatCard
          title="Active Medicines"
          value={stats.activeMedicines}
          description="Available for sale"
          icon={CheckCircle}
        />
      </DashboardGrid>

      {/* medicine Status and user distribution */}
      <DashboardGrid cols={2}>
        <SimpleChart
          title="Medicine Status Distribution"
          description="Current status of all medicines"
          data={medicineChartData}
        />
        <MetricsOverview
          title="User & Activity Overview"
          icon={Users}
          metrics={userMetrics}
        />
      </DashboardGrid>

      {/* user analytics */}
      <DashboardSection
        title="User Analytics"
        description="Detailed user statistics and engagement"
      >
        <DashboardGrid cols={3}>
          <StatCard
            title="Sellers"
            value={stats.sellerCount}
            description={`${sellerPercentage}% of total users`}
            icon={UserCheck}
          />
          <StatCard
            title="Buyers"
            value={stats.buyerCount}
            description={`${buyerPercentage}% of total users`}
            icon={UserX}
          />
          <StatCard
            title="Engagement Rate"
            value={`${Math.round(stats.totalViews / Math.max(stats.totalUsers, 1))}%`}
            description="Views per user"
            icon={TrendingUp}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* system health & alerts */}
      <div className="space-y-4">
        {stats.inactiveMedicines > 50 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There are {stats.inactiveMedicines} inactive medicine(s) in the
              system. You may want to review these listings.
            </AlertDescription>
          </Alert>
        )}

        {stats.buyerCount === 0 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              No buyers are currently registered. Consider reviewing your
              marketing strategy to attract more customers.
            </AlertDescription>
          </Alert>
        )}

        {stats.totalViews > 100 && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Great! Your platform has reached {stats.totalViews} total views.
              The platform is gaining good traction.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardView;
