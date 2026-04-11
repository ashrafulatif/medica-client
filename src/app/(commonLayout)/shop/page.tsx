import { Metadata } from "next";
import { Suspense } from "react";
import MedicineFilterForm from "@/components/modules/shop/medicine/MedicineFilterForm";
import ShopDataFetcher from "@/components/modules/shop/medicine/ShopDataFetcher";
import ShopSkeleton from "@/components/modules/shop/medicine/ShopSkeleton";

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Medicine Shop</h1>
        <p className="text-muted-foreground">
          Discover and purchase quality medicines
        </p>
      </div>

      {/* Filter Form always remains visible during search */}
      <MedicineFilterForm />

      {/* Grid and AI content suspended during search */}
      <Suspense key={JSON.stringify(cleanParams)} fallback={<ShopSkeleton />}>
        <ShopDataFetcher searchParams={cleanParams} />
      </Suspense>
    </div>
  );
};

export default ShopPage;

export const metadata: Metadata = {
  title: "Browse Shop",
  description: "Browse all medicine",
};
