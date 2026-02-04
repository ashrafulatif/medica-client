import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Eye, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "@/helpers/colorHelpers";
import { OrdersViewProps } from "@/types/order.types";

const OrdersView = ({ orders }: OrdersViewProps) => {
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
  if (!orders || !orders.meta || !orders.result) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">
          {orders.meta.total} order{orders.meta.total !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Orders List */}
      {orders.result.length > 0 ? (
        <div className="space-y-4">
          {orders.result.map((order) => (
            <Card
              key={order.id}
              className="hover:shadow-md transition-shadow border-2 hover:border-primary/30"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {formatOrderId(order.id)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="h-4 w-4" />
                          <span>{order.orderItems.length} items</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ${order.totalAmount}
                      </p>
                      <Badge
                        className={getStatusColor(order.status)}
                        variant="secondary"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet.
            </p>
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersView;
