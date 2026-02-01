import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, CreditCard, User, Truck } from "lucide-react";

import { getPaymentMethodColor, getStatusColor } from "@/helpers/colorHelpers";
import { OrderDetailsViewProps } from "@/types/orderDetailsTypes";
import { CancelOrderDialog } from "./CancelOrder";

const OrderDetailsView = ({ order }: OrderDetailsViewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatOrderId = (id: string) => {
    return `ORD-${id.slice(-8).toUpperCase()}`;
  };

  const calculateSubtotal = () => {
    return order.orderItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{formatOrderId(order.id)}</h1>
        <p className="text-muted-foreground">
          Ordered on {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Order Status
              </CardTitle>
              <Badge
                className={getStatusColor(order.status)}
                variant="secondary"
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Last updated</span>
              <span>{formatDate(order.updatedAt)}</span>
            </div>
          </CardContent>

          <div className="flex justify-end p-4">
            <CancelOrderDialog orderId={order.id} orderStatus={order.status} />
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${order.totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items  */}
        <Card className="lg:col-span-3 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Items Ordered ({order.orderItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.medicine.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Info  */}
        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.customer.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method*/}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={getPaymentMethodColor(order.paymentMethod)}
              variant="secondary"
            >
              {order.paymentMethod}
            </Badge>
          </CardContent>
        </Card>

        {/* Shipping Address  */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{order.shippingAddress}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailsView;
