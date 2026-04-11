import { MedicineService } from "@/services/medicine.service";
import ShopContainer from "./ShopContainer";

interface ShopDataFetcherProps {
  searchParams: Record<string, any>;
}

export default async function ShopDataFetcher({
  searchParams,
}: ShopDataFetcherProps) {
  // get data
  const medicineData = await MedicineService.getMedicine(searchParams, {
    revalidate: 60,
  });

  return <ShopContainer medicineData={medicineData} />;
}
