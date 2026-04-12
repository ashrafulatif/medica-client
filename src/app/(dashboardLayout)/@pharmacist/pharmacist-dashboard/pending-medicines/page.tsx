import { getPendingMedicinesAction } from "@/actions/pharmacist.action";
import PendingMedicinesList from "@/components/modules/pharmacist/PendingMedicinesList";

export default async function PendingMedicinesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) {
  const resolvedParams = await searchParams;
  const data = await getPendingMedicinesAction(resolvedParams);

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Medicines</h1>
        <p className="text-muted-foreground">
          Verify and approve new medicines added by sellers.
        </p>
      </div>

      <PendingMedicinesList
        medicines={data?.data?.result || []}
        meta={data?.data?.meta}
      />
    </div>
  );
}
