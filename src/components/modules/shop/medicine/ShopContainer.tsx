import { MedicineCard } from "@/components/ui/MedicineCard";
import PaginationControls from "@/components/ui/pagination-control";
import { AISearchBanner } from "@/components/modules/shop/medicine/AISearchBanner";
import { AIRecommendations } from "@/components/modules/shop/medicine/AIRecommendations";

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
  views: number;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
  _count: {
    reviews: number;
  };
  category?: {
    id: string;
    name: string;
  };
  seller?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Review {
  id: string;
  userId: string;
  medicineId: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
}

interface ShopContainerProps {
  medicineData: any;
}

export default function ShopContainer({ medicineData }: ShopContainerProps) {
  return (
    <div className="space-y-6">
      {medicineData?.searchInsight &&
        medicineData.searchInsight.intent !== "general" && (
          <AISearchBanner insight={medicineData.searchInsight} />
        )}

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicineData?.data?.map((medicine: Medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={{
              ...medicine,
              category: medicine.category || { id: "", name: "Uncategorized" },
              seller: medicine.seller || {
                id: "",
                name: "Unknown Seller",
                email: "",
              },
              reviewCount: medicine._count?.reviews || 0,
              averageRating:
                medicine.reviews?.length > 0
                  ? medicine.reviews.reduce(
                      (acc, review) => acc + review.rating,
                      0,
                    ) / medicine.reviews.length
                  : 0,
            }}
          />
        ))}
      </div>

      {medicineData?.meta && <PaginationControls meta={medicineData.meta} />}

      {/* No results message */}
      {(!medicineData?.data || medicineData.data.length === 0) && (
        <div className="text-center py-12 bg-muted/20 rounded-2xl border border-dashed border-border mt-8">
          <p className="text-muted-foreground text-lg">
            No exact medicines found for this query.
          </p>
        </div>
      )}

      {medicineData?.recommendations?.length > 0 && (
        <AIRecommendations recommendations={medicineData.recommendations} />
      )}
    </div>
  );
}
