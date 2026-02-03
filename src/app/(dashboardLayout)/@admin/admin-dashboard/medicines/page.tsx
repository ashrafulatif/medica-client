import MedicinesList from "@/components/modules/admin/MedicinesList";
import { Metadata } from "next";

interface MedicineListAdminPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const MedicineListAdminPage = async ({
  searchParams,
}: MedicineListAdminPageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <MedicinesList searchParams={params} />
    </div>
  );
};

export default MedicineListAdminPage;

export const metadata: Metadata = {
  title: "Medicine Management",
  description: "Browse all medicine",
};
