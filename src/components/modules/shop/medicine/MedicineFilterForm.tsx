"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";

const MedicineFilterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateUrlParams = (values: any) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "" && value !== "all") {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const form = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
      isActive: searchParams.get("isActive") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: searchParams.get("sortOrder") || "",
      limit: searchParams.get("limit") || "",
    },
    onSubmit: async ({ value }) => {
      updateUrlParams(value);
    },
  });

  const handleSelectChange = (
    field: keyof typeof form.state.values,
    value: string,
  ) => {
    form.setFieldValue(field, value);

    const currentValues = {
      search: form.getFieldValue("search"),
      isActive: form.getFieldValue("isActive"),
      sortBy: form.getFieldValue("sortBy"),
      sortOrder: form.getFieldValue("sortOrder"),
      limit: form.getFieldValue("limit"),
      [field]: value,
    };

    updateUrlParams(currentValues);
  };

  const clearAllFilters = () => {
    form.reset();
    router.push("/shop");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Search */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <form.Field name="search">
                {(field) => (
                  <Input
                    placeholder="Search medicines..."
                    className="pl-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>
            <Button type="submit">Search</Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <form.Field name="isActive">
              {(field) => (
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    handleSelectChange("isActive", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            <form.Field name="sortBy">
              {(field) => (
                <Select
                  value={field.state.value}
                  onValueChange={(value) => handleSelectChange("sortBy", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stocks">Stock</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            <form.Field name="sortOrder">
              {(field) => (
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    handleSelectChange("sortOrder", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            <form.Field name="limit">
              {(field) => (
                <Select
                  value={field.state.value}
                  onValueChange={(value) => handleSelectChange("limit", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>
          </div>
        </form>

        <Button variant="secondary" size="default" onClick={clearAllFilters}>
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicineFilterForm;
