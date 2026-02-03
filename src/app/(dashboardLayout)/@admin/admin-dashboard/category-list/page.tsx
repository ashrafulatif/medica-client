import CategoryList from "@/components/modules/admin/CategoryManagment/CategoryList";
import { Metadata } from "next";

interface CategoryListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const CategoryListPage = async ({ searchParams }: CategoryListPageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryList searchParams={params} />
    </div>
  );
};

export default CategoryListPage;

export const metadata: Metadata = {
  title: "Category List",
  description: "Browse all medicine",
};
