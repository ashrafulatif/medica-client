import { getAllOrdersAction } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, AlertCircle } from "lucide-react";
import PaginationControls from "@/components/ui/pagination-control";

interface Order {
  id: string;
  userId: string;
  totalAmount: string;
  paymentMethod: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: string;
  medicine: {
    id: string;
    name: string;
    price: string;
  };
}

interface OrdersListProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

const OrderList = async ({ searchParams }: OrdersListProps) => {
  const result = await getAllOrdersAction(searchParams);

  if (result.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Orders Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {result.error || "Failed to load orders"}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const orders = result.data?.result || [];
  const meta = result.data?.meta;

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "outline";
      case "confirmed":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(amount));
  };

  const getTotalItems = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Orders Management ({orders.length} orders)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!orders || orders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              No orders have been placed yet.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Shipping Address</TableHead>
                  <TableHead>Order Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-mono text-sm">
                        #{order.id.slice(0, 8)}...
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {order.userId.slice(0, 8)}...
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {getTotalItems(order.orderItems)} items
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.orderItems.map((item, index) => (
                            <div key={item.id}>
                              {item.medicine.name} (x{item.quantity})
                              {index < order.orderItems.length - 1 && ", "}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatAmount(order.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-sm">
                        {order.shippingAddress}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {meta && <PaginationControls meta={meta} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderList;
