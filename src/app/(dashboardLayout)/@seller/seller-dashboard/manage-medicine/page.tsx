import MedicineList from "@/components/modules/seller/medicines-management/MedicineList";
import { Metadata } from "next";

interface ManageMedicinePageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const ManageMedicinePage = async ({
  searchParams,
}: ManageMedicinePageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <MedicineList searchParams={params} />
    </div>
  );
};

export default ManageMedicinePage;

export const metadata: Metadata = {
  title: "Manage Medicine",
  description: "Browse all medicine",
};
