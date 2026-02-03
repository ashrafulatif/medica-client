"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createMedicineAction } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const MedicineValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  price: z
    .number("Price is required")
    .min(0.01, "Price must be greater than 0"),
  stocks: z
    .number("Stock quantity is required")
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  manufacturer: z
    .string()
    .min(2, "Manufacturer must be at least 2 characters")
    .max(100, "Manufacturer must be less than 100 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  thumbnail: z.any().optional(),
});

interface Category {
  id: string;
  name: string;
}

interface CreateMedicineFormProps {
  categories: Category[];
  onSuccess?: () => void;
}

const CreateMedicineForm = ({
  categories,
  onSuccess,
}: CreateMedicineFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stocks: 0,
      manufacturer: "",
      categoryId: "",
      thumbnail: null as File | null,
    },
    validators: {
      onSubmit: MedicineValidationSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating medicine...");

      try {
        const medicineData = {
          ...value,
          thumbnail: selectedImage,
        };

        const res = await createMedicineAction(medicineData);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Medicine created successfully!", { id: toastId });

        // Reset form
        form.reset();
        setSelectedImage(null);
        setImagePreview(null);

        onSuccess?.();
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      form.setFieldValue("thumbnail", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    form.setFieldValue("thumbnail", null);
  };

  return (
    <div>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Create New Medicine</CardTitle>
          <CardDescription>
            Add a new medicine to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="medicine-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
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
                      <FieldLabel htmlFor={field.name}>
                        Medicine Name{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter medicine name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Description Field */}
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Description <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter medicine description"
                        className="min-h-[100px]"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Price and Stocks Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price Field */}
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Price ($) <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(parseFloat(e.target.value) || 0)
                          }
                          placeholder="0.00"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Stocks Field */}
                <form.Field
                  name="stocks"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Stock Quantity{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          type="number"
                          min="0"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(parseInt(e.target.value) || 0)
                          }
                          placeholder="0"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              {/* Manufacturer Field */}
              <form.Field
                name="manufacturer"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Manufacturer <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter manufacturer name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Category Field */}
              <form.Field
                name="categoryId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Category <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Image Upload Field */}
              <Field>
                <FieldLabel>
                  Medicine Image{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </FieldLabel>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="relative w-32 h-32">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {selectedImage ? "Change Image" : "Upload Image"}
                    </Button>
                    {selectedImage && (
                      <span className="text-sm text-muted-foreground">
                        {selectedImage.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                  </p>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button form="medicine-form" type="submit" className="w-full">
            Create Medicine
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateMedicineForm;
