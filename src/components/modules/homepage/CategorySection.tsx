import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const CategorySection = () => {
  const categories: Category[] = [
    {
      id: "f1fd83e0-8f5e-4ffc-bd3a-f87a79f94e3f04",
      name: "Pain Relief",
      description: "Medicines used for pain management and fever reduction.",
      createdAt: "2026-01-28T20:43:30.426Z",
      updatedAt: "2026-01-28T20:43:30.426Z",
      userId: "cHbsVX4qAQEU4MdOf8EOV5kATSHOKPyK",
    },
    {
      id: "f1fd83e0-8fc5e-4ffc-fbd3a-f877994e3f04",
      name: "Pain Relief",
      description: "Medicines used for pain management and fever reduction.",
      createdAt: "2026-01-28T20:43:30.426Z",
      updatedAt: "2026-01-28T20:43:30.426Z",
      userId: "cHbsVX4qAQEU4MdOf8EOV5kATSHOKPyK",
    },
    {
      id: "f1fd83e0-8f5e-4fafc-bd3a-f87f7994e3f04",
      name: "Pain Relief",
      description: "Medicines used for pain management and fever reduction.",
      createdAt: "2026-01-28T20:43:30.426Z",
      updatedAt: "2026-01-28T20:43:30.426Z",
      userId: "cHbsVX4qAQEU4MdOf8EOV5kATSHOKPyK",
    },
    {
      id: "f1ffd83e0-8f5e-4ffc-bd3a-f87s7994e3f04",
      name: "Pain Relief",
      description: "Medicines used for pain management and fever reduction.",
      createdAt: "2026-01-28T20:43:30.426Z",
      updatedAt: "2026-01-28T20:43:30.426Z",
      userId: "cHbsVX4qAQEU4MdOf8EOV5kATSHOKPyK",
    },
  ];

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
        {categories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30"
          >
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
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
