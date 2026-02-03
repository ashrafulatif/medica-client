"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMedicineAction } from "@/actions/seller.action";
import { useRouter } from "next/navigation";
import UpdateMedicineModal from "./UpdateMedicineModal";
import { IMedicineUpdateModelPorops } from "@/types/medicine.type";

interface MedicineActionsProps {
  medicine: IMedicineUpdateModelPorops;
}

const MedicineActions = ({ medicine }: MedicineActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting medicine...");
    setIsLoading(true);

    try {
      const result = await deleteMedicineAction(medicine.id);

      if (result.error) {
        toast.error(result.error, { id: toastId });
        return;
      }

      toast.success("Medicine deleted successfully", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* Fix: Remove asChild and use onClick instead */}
          <DropdownMenuItem onClick={() => setShowUpdateModal(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Medicine
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Medicine
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update Modal */}
      <UpdateMedicineModal
        medicine={medicine}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{medicine.name}</strong>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              variant="destructive"
            >
              {isLoading ? "Deleting..." : "Delete Medicine"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MedicineActions;