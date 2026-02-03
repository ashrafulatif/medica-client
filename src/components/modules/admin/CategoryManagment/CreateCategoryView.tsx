"use client";
import { addCategoryAction } from "@/actions/admin.action";
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
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";
import CategoryList from "./CategoryList";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z
    .string()
    .min(5, "Description must be atleast 5 characters")
    .max(200, "Description should be within 200 characters"),
});

export function CreateCategoryView({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: { name: "", description: "" },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating Category!");
      try {
        const { data, error } = await addCategoryAction(
          value.name,
          value.description,
        );

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Category Created Successfully !", { id: toastId });
        router.push("/admin-dashboard/category-list");

        form.reset();
      } catch (error) {
        toast.error("Something went wrong! Try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create a Category</CardTitle>
        <CardDescription>
          Enter your information below to create your Category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your category name"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter category description..."
                      className="min-h-[100px] resize-none"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {field.state.value.length}/200 characters
                    </p>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button form="login-form" type="submit">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
