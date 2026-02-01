import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  Heart,
  Package,
  User,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "@/helpers/colorHelpers";
import {
  IRecentOrderData,
  IStatsData,
  IUserInfo,
} from "@/types/dashboardTypes";

interface CustomerDashboardViewProps {
  stats: IStatsData;
  recentOrder: IRecentOrderData[];
  user: IUserInfo;
}

const CustomerDashboardView = ({
  stats,
  recentOrder,
  user,
}: CustomerDashboardViewProps) => {
  const statsData = stats;
  const recentOrders = recentOrder;
  const customerData = user;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatOrderId = (id: string) => {
    return `ORD-${id.slice(-8).toUpperCase()}`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-12 w-12">
          <AvatarImage src={customerData.email} />
          <AvatarFallback>
            {customerData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {customerData.name}!
          </h1>
          <p className="text-muted-foreground">{customerData.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{statsData.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{statsData.pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${statsData.totalSpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Items Ordered</p>
                <p className="text-2xl font-bold">
                  {statsData.totalOrderItems}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/shop">
              <div className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors">
                <Package className="h-6 w-6 text-primary" />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium">Browse Medicines</h3>
                  <p className="text-sm text-muted-foreground">Shop now</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/dashboard/orders">
              <div className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium">My Orders</h3>
                  <p className="text-sm text-muted-foreground">Track orders</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/dashboard/profile">
              <div className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors">
                <User className="h-6 w-6 text-primary" />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">Edit details</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/orders">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent p-2 rounded">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{formatOrderId(order.id)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)} • {order.itemCount} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.totalAmount}</p>
                    <Badge
                      className={getStatusColor(order.status)}
                      variant="secondary"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No recent orders found</p>
                <Button className="mt-4" asChild>
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardView;
