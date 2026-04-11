import { CategoryService } from "@/services/category.service";
import CategoryCarousel from "./CategoryCarousel";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const CategorySection = async () => {
  const categoryData = await CategoryService.getAllCategories();

  const categories = categoryData.data?.result || [];

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col justify-center text-center mb-12">
        <h1 className="text-5xl font-bold py-2">
          Medicine <span className="text-muted-foreground">Categories</span>
        </h1>
        <p className="text-muted-foreground text-xl">
          Discover medicines by category
        </p>
      </div>

      <CategoryCarousel categories={categories} />
    </div>
  );
};

export default CategorySection;
