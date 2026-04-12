import { Suspense } from "react";
import PharmacistDashboardOverview from "../../../../components/modules/pharmacist/PharmacistDashboardOverview";
import { Spinner } from "@/components/ui/spinner";

export default function PharmacistDashboard() {
  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pharmacist Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your tasks.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <PharmacistDashboardOverview />
      </Suspense>
    </div>
  );
}
