"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Loader2,
  Banknote,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.action";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useCart } from "@/context/cartContext";
import { clearCartAction } from "@/actions/cart.action";

export const checkoutFormSchema = z.object({
  shippingAddress: z
    .string()
    .min(10, "Please provide a complete shipping address"),
});

const CheckoutView = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const form = useForm({
    defaultValues: {
      shippingAddress: "",
    },
    validators: {
      onSubmit: checkoutFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (cartItems.length === 0) {
        toast.error("Your cart is empty", { id: "checkout-error" });
        return;
      }

      const toastId = toast.loading("Placing your order...");

      try {
        const orderData = {
          orderItems: cartItems.map((item) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
          })),
          shippingAddress: value.shippingAddress,
          paymentMethod: "COD",
        };

        const response = await createOrderAction(orderData);

        console.log(response.data?.[0]?.id);

        if (response.error) {
          toast.error(response.error.message || "Failed to place order", {
            id: toastId,
          });
        } else {
          toast.success("Order placed successfully!", { id: toastId });
          await clearCartAction();
          router.push(`/dashboard/orders/${response.data?.[0]?.id || ""}`);
        }
      } catch (error) {
        toast.error("Something went wrong! Try again.", { id: toastId });
      }
    },
  });

  const handleBackToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={handleBackToCart} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order by providing your shipping address
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <form.Field
                      name="shippingAddress"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Complete Shipping Address *
                            </FieldLabel>
                            <Textarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="Enter your complete shipping address (Street, City, State, ZIP Code, Country)"
                              rows={4}
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
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                    <Banknote className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order is delivered to your doorstep
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/fallbackMedicine.jpg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm truncate max-w-[120px]">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Display */}
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950 p-2 rounded">
                <Banknote className="h-4 w-4" />
                <span>Cash on Delivery</span>
              </div>

              {/* Place Order Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    form="checkout-form"
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Place Order (COD)
                      </>
                    )}
                  </Button>
                )}
              />

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
