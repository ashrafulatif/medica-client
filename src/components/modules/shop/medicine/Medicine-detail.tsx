"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Star,
  ShoppingCart,
  Heart,
  Package,
  Building2,
  Calendar,
  Eye,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IMedicineDetailsProps } from "@/types/medicine.type";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { getBadgeInfo } from "@/helpers/colorHelpers";
import SubmitReview from "../review/reviewSubmit";

const MedicineDetails = ({ medicine }: IMedicineDetailsProps) => {
  const { addToCart, loading, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const defaultImage = "/fallbackMedicine.jpg";

  // Check if item is already in cart
  const existingCartItem = cartItems.find(
    (item) => item.medicineId === medicine.id,
  );

  const averageRating =
    medicine.reviews?.length > 0
      ? medicine.reviews.reduce((acc, review) => acc + review.rating, 0) /
        medicine.reviews.length
      : 0;

  //get badge color
  const badgeInfo = getBadgeInfo({ medicine });

  const isOutOfStock = medicine.stocks < 1;
  const maxQuantity = Math.min(medicine.stocks, 10); // limit mx 10

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("This item is out of stock", { id: "error" });
      return;
    }

    if (quantity < 1 || quantity > maxQuantity) {
      toast.error(`Please select a quantity between 1 and ${maxQuantity}`, {
        id: "error",
      });
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(medicine.id, quantity);
      // Reset quantity after successful add
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-15">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Card className="border-2">
            <CardContent className="p-4">
              <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                <img
                  src={medicine.thumbnail || defaultImage}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{medicine.name}</h1>
              <Badge variant={badgeInfo.variant}>{badgeInfo.text}</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= averageRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({medicine._count.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1" />
                {medicine.views} views
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-4">
              ${medicine.price.toFixed(2)}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {medicine.description}
            </p>
          </div>

          <Separator />

          {/* Product Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Manufacturer</p>
                  <p className="text-sm text-muted-foreground">
                    {medicine.manufacturer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Stock</p>
                  <p className="text-sm text-muted-foreground">
                    {medicine.stocks} units
                  </p>
                </div>
              </div>

              {medicine.category && (
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <Badge variant="outline">{medicine.category.name}</Badge>
                </div>
              )}

              {medicine.seller && (
                <div>
                  <p className="text-sm font-medium">Seller</p>
                  <p className="text-sm text-muted-foreground">
                    {medicine.seller.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Quantity Selection */}
          {!isOutOfStock && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= maxQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum {maxQuantity} items
                </p>
              </div>

              {/* Show if already in cart */}
              {existingCartItem && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Already in cart: {existingCartItem.quantity} item(s)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Added {new Date(medicine.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isOutOfStock || addingToCart || loading}
            >
              {addingToCart ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Submit Review Section */}
      <div className="mt-12">
        <SubmitReview medicineId={medicine.id} />
      </div>

      {/* Reviews Section */}
      {medicine.reviews?.length > 0 && (
        <div className="mt-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {medicine.reviews.map((review) => (
                <div key={review.id} className="border-b pb-2 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{review.customer.name}</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MedicineDetails;
