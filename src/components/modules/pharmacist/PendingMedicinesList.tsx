"use client";

import { useState } from "react";
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
import PaginationControls from "@/components/ui/pagination-control";
import { verifyMedicineAction } from "@/actions/pharmacist.action";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatData";

interface PendingMedicinesListProps {
  medicines: any[];
  meta: any;
}

export default function PendingMedicinesList({
  medicines,
  meta,
}: PendingMedicinesListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleVerify = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      setLoadingId(id);
      let note = "";
      if (status === "REJECTED") {
        const inputNote = window.prompt(
          "Please provide a reason for rejection:",
        );
        if (!inputNote || !inputNote.trim()) {
          toast.error("A rejection reason is required.");
          setLoadingId(null);
          return;
        }
        note = inputNote;
      }

      const res = await verifyMedicineAction(id, { status, note });

      if (res.success) {
        toast.success(`Medicine ${status.toLowerCase()} successfully`);
      } else {
        toast.error(res.error || "Failed to verify medicine");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  if (!medicines?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <p className="text-xl font-semibold mb-2">No pending medicines</p>
          <p className="text-muted-foreground text-sm">
            All medicines have been reviewed!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Needs Verification ({meta?.total || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Info</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((medicine: any) => (
                <TableRow key={medicine.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">{medicine.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {medicine.manufacturer}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {medicine.category?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">
                      {medicine.seller?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {medicine.seller?.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    {medicine.createdAt
                      ? formatDate(medicine.createdAt)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleVerify(medicine.id, "APPROVED")}
                      disabled={loadingId === medicine.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleVerify(medicine.id, "REJECTED")}
                      disabled={loadingId === medicine.id}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {meta && (
          <div className="mt-4">
            <PaginationControls meta={meta} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
