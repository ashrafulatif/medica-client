import MedicineFilterForm from "@/components/modules/shop/MedicineFilterForm";
import { MedicineService } from "@/services/medicine.service";
import { MedicineCard } from "@/components/MedicineCard";
import PaginationControls from "@/components/ui/pagination-control";

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

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    isActive?: string;
    sortBy?: string;
    sortOrder?: string;
    limit?: string;
  }>;
}) => {
  const params = await searchParams;

  // Prepare filter parameters
  const filterParams = {
    page: params.page,
    search: params.search,
    isActive:
      params.isActive === "true"
        ? true
        : params.isActive === "false"
          ? false
          : undefined,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    limit: params.limit,
  };

  // Remove undefined values
  const cleanParams = Object.fromEntries(
    Object.entries(filterParams).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  );

  //get data
  const medicineData = await MedicineService.getMedicine(cleanParams);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Medicine Shop</h1>
        <p className="text-muted-foreground">
          Discover and purchase quality medicines
        </p>
      </div>

      <MedicineFilterForm />

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
              reviewCount: medicine._count.reviews,
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
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No medicines found.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
