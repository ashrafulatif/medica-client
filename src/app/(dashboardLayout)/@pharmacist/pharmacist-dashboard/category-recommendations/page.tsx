import { getCategoriesAction } from "@/actions/category.action";
import { getCategoryRecommendationsAction } from "@/actions/pharmacist.action";
import CategoryRecommendationsList from "@/components/modules/pharmacist/CategoryRecommendationsList";

export default async function CategoryRecommendationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) {
  const resolvedParams = await searchParams;
  const recommendationsData = await getCategoryRecommendationsAction(resolvedParams);
  const categoriesResult = await getCategoriesAction();

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Category Recommendations
        </h1>
        <p className="text-muted-foreground">
          Suggest recommendations or updates for medicine categories.
        </p>
      </div>

      <CategoryRecommendationsList
        categories={categoriesResult?.data?.result || []}
      />
    </div>
  );
}
