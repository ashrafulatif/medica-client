"use client";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Price, PriceValue } from "./price";
import { Plus } from "lucide-react";
import { useCart } from "@/context/cartContext";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  thumbnail: string | null;
  manufacturer: string;
  isActive: boolean;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
  };
  reviewCount: number;
  averageRating: number;
}

interface MedicineCardProps {
  medicine: Medicine;
  className?: string;
}

const MedicineCard = ({ medicine, className }: MedicineCardProps) => {
  const defaultImage = "/fallbackMedicine.jpg";
  const { addToCart } = useCart();

  const getBadgeInfo = () => {
    if (medicine.stocks < 50) {
      return { text: "Low Stock", backgroundColor: "#ef4444" };
    }
    if (medicine.isFeatured) {
      return { text: "Featured", backgroundColor: "#10b981" };
    }
    return { text: "In Stock", backgroundColor: "#6366f1" };
  };

  const badgeInfo = getBadgeInfo();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (medicine.isActive && medicine.stocks > 0) {
      await addToCart(medicine.id, 1);
    }
  };

  return (
    <Link href={`/shop/${medicine.id}`} className={cn(className)}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
        <CardHeader className="relative p-0">
          <AspectRatio ratio={1} className="overflow-hidden">
            <img
              src={medicine.thumbnail || defaultImage}
              alt={medicine.name}
              className="block size-full object-cover object-center transition-transform duration-300 hover:scale-105 rounded-md"
            />
          </AspectRatio>
          <Badge
            style={{ backgroundColor: badgeInfo.backgroundColor }}
            className="absolute start-3 top-3 text-white"
          >
            {badgeInfo.text}
          </Badge>
        </CardHeader>

        <CardContent className="flex h-full flex-col gap-3 p-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {medicine.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {medicine.description}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-2">
              by {medicine.manufacturer}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="bg-primary/90 px-2 py-1 rounded-full text-muted">
                {medicine.category.name}
              </span>
              <span className="text-muted-foreground">
                {medicine.stocks} in stock
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Price className="text-lg font-bold text-primary">
                <PriceValue
                  price={medicine.price}
                  currency="USD"
                  variant="regular"
                />
              </Price>

              <Button
                size="icon"
                onClick={handleAddToCart}
                disabled={!medicine.isActive || medicine.stocks === 0}
                className="h-8 px-3 cursor-pointer"
                variant={"outline"}
              >
                <Plus className="h-4 w-4 rounded-b-lg" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { MedicineCard };
