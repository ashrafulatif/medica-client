"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2, User, Phone } from "lucide-react";

// Simplified Zod schema
const profileEditSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name too long")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .max(11, "Phone too long")
      .regex(/^[0-9+\-\s()]*$/, "Invalid phone format")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => data.name?.trim() || data.phone?.trim(),
    "Please provide at least one field to update",
  );

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    phone: string;
  };
  onSave: (data: { name: string; phone: string }) => Promise<void>;
}

const ProfileEditModal = ({
  isOpen,
  onClose,
  userData,
  onSave,
}: ProfileEditModalProps) => {
  const form = useForm({
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = profileEditSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues.map((err) => err.message).join(", ");
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      try {
        // Clean and prepare data
        const name = value.name?.trim() || userData.name;
        const phone = value.phone?.trim() || userData.phone;

        await onSave({ name, phone });
        onClose();
      } catch (error) {
        console.error("Modal save error:", error);
      }
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Update your personal information below. You can update one or both
            fields.
          </DialogDescription>
        </DialogHeader>

        <form
          id="profile-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Name{" "}
                      <span className="text-muted-foreground text-sm">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter your full name"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Phone Field */}
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number{" "}
                      <span className="text-muted-foreground text-sm">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter your phone number"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          {/* Form-level errors */}
          <form.Subscribe selector={(state) => state.errors}>
            {(errors) =>
              errors.length > 0 && (
                <div className="text-sm text-destructive">
                  {String(errors[0])}
                </div>
              )
            }
          </form.Subscribe>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  form="profile-edit-form"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
