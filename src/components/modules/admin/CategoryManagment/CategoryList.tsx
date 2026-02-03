import { getCategoriesAction } from "@/actions/category.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertCircle, Package } from "lucide-react";
import Link from "next/link";
import PaginationControls from "@/components/ui/pagination-control";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesResponse {
  result: Category[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface CategoryListProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

const CategoryList = async ({ searchParams }: CategoryListProps) => {
  const result = await getCategoriesAction(searchParams);

  if (result.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {typeof result.error === "string"
                ? result.error
                : result.error?.message || "Failed to load categories"}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const categoriesData = result.data as CategoriesResponse;
  const categories = categoriesData?.result || [];
  const meta = categoriesData?.meta;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Categories ({categories.length})
        </CardTitle>
        <Button asChild>
          <Link href="/admin-dashboard/create-category">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {!categories || categories.length === 0 ? (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first category to organize medicines.
            </p>
            <Button asChild>
              <Link href="/dashboard/admin/categories/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableCaption>A list of all medicine categories.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">
                        {category.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {category.updatedAt !== category.createdAt ? (
                        <Badge variant="outline">
                          {new Date(category.updatedAt).toLocaleDateString()}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Not updated
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Add Pagination Controls */}
            {meta && <PaginationControls meta={meta} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryList;
