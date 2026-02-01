import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Heart,
  Package,
  Building2,
  Calendar,
  Eye,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IMedicineDetailsProps } from "@/types/medicine.type";

const MedicineDetails = ({ medicine }: IMedicineDetailsProps) => {
  const defaultImage = "/fallbackMedicine.jpg";

  const averageRating =
    medicine.reviews?.length > 0
      ? medicine.reviews.reduce((acc, review) => acc + review.rating, 0) /
        medicine.reviews.length
      : 0;

  const getBadgeInfo = () => {
    if (medicine.stocks < 50) {
      return { text: "Low Stock", variant: "destructive" as const };
    }
    if (medicine.isFeatured) {
      return { text: "Featured", variant: "default" as const };
    }
    return { text: "In Stock", variant: "secondary" as const };
  };

  const badgeInfo = getBadgeInfo();

  return (
    <div className="container mx-auto px-4 py-15">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                <img
                  src={medicine.thumbnail || defaultImage}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </CardContent>
          </Card>{" "}
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

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Added {new Date(medicine.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* button */}
          <div className="flex gap-2">
            <Button className="flex-1 cursor-pointer">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {medicine.reviews?.length > 0 && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {medicine.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
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
