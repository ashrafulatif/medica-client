import { Skeleton } from "@/components/ui/skeleton";

export default function ShopSkeleton() {
  return (
    <div className="space-y-6 mt-8">
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 rounded-xl border p-4 shadow-sm">
            <Skeleton className="h-50 w-full rounded-xl bg-muted" />
            <div className="space-y-3 mt-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center justify-between pt-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}