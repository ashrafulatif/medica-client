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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCategoryRecommendationAction } from "@/actions/pharmacist.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoryRecommendationsList({
  categories,
}: {
  categories: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedCategory || !note) {
      toast.error(
        "Please select a category and provide a recommendation note.",
      );
      return;
    }

    try {
      setLoading(true);
      const res = await createCategoryRecommendationAction({
        categoryId: selectedCategory,
        note,
      });

      if (res.success) {
        toast.success("Recommendation submitted successfully!");
        setNote("");
        setSelectedCategory("");
      } else {
        toast.error(res.error || "Failed to submit recommendation.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Category Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 max-w-xl">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Type your recommendation or notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button
            className="w-full sm:w-auto self-start"
            onClick={handleSubmit}
            disabled={loading || !selectedCategory || !note}
          >
            {loading ? "Submitting..." : "Submit Recommendation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
