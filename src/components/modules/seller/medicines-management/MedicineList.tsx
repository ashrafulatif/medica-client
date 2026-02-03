import { getAllSellerMedicineAction } from "@/actions/seller.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pill, AlertCircle, Plus, Eye } from "lucide-react";
import PaginationControls from "@/components/ui/pagination-control";
import MedicineActions from "./SellerMedicineAction";
import Link from "next/link";
import { IMedicine } from "@/types";

interface MedicinesListProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

const MedicineList = async ({ searchParams }: MedicinesListProps) => {
  const result = await getAllSellerMedicineAction(searchParams);

  //   console.log(result);

  if (result.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            My Medicines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {result.error || "Failed to load medicines"}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const medicines = result.data?.result || [];
  const meta = result.data?.meta;

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "destructive";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          My Medicines ({medicines.length} medicines)
        </CardTitle>
        <Button asChild>
          <Link href="/seller-dashboard/create-medicine">
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {!medicines || medicines.length === 0 ? (
          <div className="text-center py-8">
            <Pill className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No medicines found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't added any medicines yet. Start by creating your first
              medicine.
            </p>
            <Button asChild>
              <Link href="/seller-dashboard/create-medicine">
                <Plus className="h-4 w-4 mr-2" />
                Add First Medicine
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((medicine: IMedicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {medicine.thumbnail ? (
                          <img
                            src={medicine.thumbnail}
                            alt={medicine.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                            <Pill className="h-6 w-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium truncate max-w-[200px]">
                            {medicine.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {medicine.manufacturer}
                          </p>
                          {medicine.isFeatured && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {medicine.category?.name || "Uncategorized"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(medicine.price)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span
                          className={medicine.stocks < 10 ? "text-red-600" : ""}
                        >
                          {medicine.stocks}
                        </span>
                        {medicine.stocks < 10 && (
                          <Badge variant="destructive" className="text-xs">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(medicine.isActive)}>
                        {medicine.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="h-3 w-3" />
                        {medicine.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(medicine.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <MedicineActions
                        medicine={{
                          id: medicine.id,
                          name: medicine.name,
                          description: medicine.description,
                          price: medicine.price,
                          stocks: medicine.stocks,
                          manufacturer: medicine.manufacturer,
                          isFeatured: medicine.isFeatured,
                          isActive: medicine.isActive,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {meta && <PaginationControls meta={meta} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicineList;
