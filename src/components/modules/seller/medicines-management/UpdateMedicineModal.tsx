"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { updateMedicineAction } from "@/actions/seller.action";
import { useRouter } from "next/navigation";
import { IMedicineUpdateModelPorops } from "@/types/medicine.type";

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stocks: z.number().min(0, "Stock cannot be negative"),
  manufacturer: z.string().min(2, "Manufacturer must be at least 2 characters"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

interface UpdateMedicineModalProps {
  medicine: IMedicineUpdateModelPorops;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateMedicineModal = ({
  medicine,
  isOpen,
  onClose,
}: UpdateMedicineModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: medicine.name,
      description: medicine.description,
      price: medicine.price,
      stocks: medicine.stocks,
      manufacturer: medicine.manufacturer,
      isFeatured: medicine.isFeatured,
      isActive: medicine.isActive,
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating medicine...");
      setIsLoading(true);

      try {
        const result = await updateMedicineAction(medicine.id, value);

        if (result.error) {
          toast.error(result.error?.message || "Failed to update medicine", {
            id: toastId,
          });
          return;
        }

        toast.success("Medicine updated successfully", { id: toastId });
        onClose();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => {
    if (!isLoading) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Medicine</DialogTitle>
          <DialogDescription>
            Update the medicine details. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Medicine Name */}
            <form.Field
              name="name"
              validators={{
                onChange: medicineSchema.shape.name,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Medicine Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter medicine name"
                    disabled={isLoading}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Manufacturer */}
            <form.Field
              name="manufacturer"
              validators={{
                onChange: medicineSchema.shape.manufacturer,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Manufacturer</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter manufacturer"
                    disabled={isLoading}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: medicineSchema.shape.description,
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter medicine description"
                  rows={3}
                  disabled={isLoading}
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <form.Field
              name="price"
              validators={{
                onChange: medicineSchema.shape.price,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Price ($)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    step="0.01"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                    disabled={isLoading}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Stock */}
            <form.Field
              name="stocks"
              validators={{
                onChange: medicineSchema.shape.stocks,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Stock Quantity</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value) || 0)
                    }
                    placeholder="0"
                    disabled={isLoading}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Checkbox Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Is Featured */}
            <form.Field
              name="isFeatured"
              validators={{
                onChange: medicineSchema.shape.isFeatured,
              }}
              children={(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-none"
                  >
                    Featured Medicine
                  </Label>
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive ml-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Is Active */}
            <form.Field
              name="isActive"
              validators={{
                onChange: medicineSchema.shape.isActive,
              }}
              children={(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-none"
                  >
                    Active Status
                  </Label>
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive ml-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting
                    ? "Updating..."
                    : "Update Medicine"}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMedicineModal;
