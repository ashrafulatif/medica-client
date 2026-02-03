"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/actions/seller.action";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = [
  {
    value: "PENDING",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    color: "bg-green-100 text-green-800",
  },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
}

const SellerOrderActions = ({ orderId, currentStatus }: OrderActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async () => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    const toastId = toast.loading("Updating order status...");
    setIsLoading(true);

    try {
      const result = await updateOrderStatusAction(orderId, newStatus as any);

      if (result.error) {
        toast.error(result.error, { id: toastId });
        return;
      }

      toast.success("Order status updated successfully", { id: toastId });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusConfig = ORDER_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of this order. The customer will be notified of
            the update.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Status</label>
            <Badge className={getStatusColor(currentStatus)}>
              {ORDER_STATUSES.find((s) => s.value === currentStatus)?.label ||
                currentStatus}
            </Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Status</label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <Badge className={status.color} variant="secondary">
                      {status.label}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={isLoading || newStatus === currentStatus}
          >
            {isLoading ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellerOrderActions;
