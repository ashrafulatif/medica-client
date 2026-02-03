import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryService } from "@/services/category.service";
import Link from "next/link";
import React from "react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {categories.map((category: Category) => (
          <Link key={category.id} href={`/shop?category=${category.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30 h-full">
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {category.description}
                </p>

                <span className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground">
                  Available
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
