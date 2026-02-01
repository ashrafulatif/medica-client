"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cancelOrderAction } from "@/actions/order.action";

interface CancelOrderDialogProps {
  orderId: string;
  orderStatus: string;
}

export function CancelOrderDialog({
  orderId,
  orderStatus,
}: CancelOrderDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canCancelOrder = !["CANCELLED", "DELIVERED", "SHIPPED"].includes(
    orderStatus,
  );

  const handleCancelOrder = () => {
    startTransition(async () => {
      try {
        const result = await cancelOrderAction(orderId);

        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message || "Order cancelled successfully");
          router.refresh(); // Refresh to show updated status
        }
      } catch (error) {
        toast.error("Failed to cancel order");
      }
    });
  };

  if (!canCancelOrder) {
    return null; // Don't show cancel button for non-cancellable orders
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          {isPending ? "Cancelling..." : "Cancel Order"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel your
            order and restock the medicines.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelOrder} disabled={isPending}>
            {isPending ? "Cancelling..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
