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
import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

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

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const MedicineCard = ({ medicine, className }: MedicineCardProps) => {
  const defaultImage = "/fallbackMedicine.jpg";
  const { addToCart } = useCart();

  const getBadgeInfo = (): { text: string; variant: BadgeVariant } => {
    if (medicine.stocks < 50) {
      return { text: "Low Stock", variant: "destructive" };
    }
    if (medicine.isFeatured) {
      return { text: "Featured", variant: "default" };
    }
    return { text: "In Stock", variant: "secondary" };
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
    <Link
      href={`/shop/${medicine.id}`}
      className={cn("block h-full", className)}
    >
      <Card
        className={cn(
          "h-full gap-0 overflow-hidden border-2 border-border/80 bg-card py-0 shadow-sm",
          "rounded-tl-4xl rounded-br-4xl rounded-tr-xs rounded-bl-xs",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
          "cursor-pointer group ring-1 ring-transparent hover:ring-primary/10",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        )}
      >
        <CardHeader className="relative space-y-0 p-0">
          <AspectRatio
            ratio={1}
            className="overflow-hidden bg-muted/60 rounded-tl-4xl rounded-tr-xs"
          >
            <img
              src={medicine.thumbnail || defaultImage}
              alt={medicine.name}
              className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </AspectRatio>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/80 to-transparent" />
          <Badge
            variant={badgeInfo.variant}
            className="absolute start-3 top-3 shadow-sm backdrop-blur-[2px]"
          >
            {badgeInfo.text}
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 border-t border-border/50 bg-card/50 px-4 pb-4 pt-4 backdrop-blur-[2px]">
          <div className="flex min-h-0 flex-1 flex-col gap-1">
            <CardTitle className="line-clamp-2 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary md:text-lg">
              {medicine.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm leading-relaxed">
              {medicine.description}
            </CardDescription>
            <p className="mt-1.5 text-xs text-muted-foreground">
              by {medicine.manufacturer}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex max-w-[55%] truncate rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                {medicine.category.name}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {medicine.stocks} in stock
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-3">
              <Price className="text-lg font-bold tabular-nums text-primary md:text-xl">
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
                className="size-9 shrink-0 rounded-full border-primary/20 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                variant="outline"
                aria-label="Add to cart"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { MedicineCard };
