import { getAllSellerOrderAction } from "@/actions/seller.action";
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
import { ShoppingCart, AlertCircle, User, MapPin } from "lucide-react";
import PaginationControls from "@/components/ui/pagination-control";
import SellerOrderActions from "./SellerOrderAction";

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
  customer: Customer;
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

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface SellerOrderListProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

const SellerOrderList = async ({ searchParams }: SellerOrderListProps) => {
  const result = await getAllSellerOrderAction(searchParams);

  if (result.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            My Orders
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
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          My Orders ({orders.length} orders)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!orders || orders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              You don't have any orders for your medicines yet.
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
                  <TableHead>Actions</TableHead>
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
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.customer.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium mb-1">
                          {getTotalItems(order.orderItems)} items
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          {order.orderItems.map((item) => (
                            <div key={item.id}>
                              {item.medicine.name} × {item.quantity}
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
                      <Badge className={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 max-w-[200px]">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate text-sm">
                          {order.shippingAddress}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <SellerOrderActions
                        orderId={order.id}
                        currentStatus={order.status}
                      />
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

export default SellerOrderList;
