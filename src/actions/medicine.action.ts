"use server";

import { MedicineService } from "@/services/medicine.service";
import { updateTag } from "next/cache";

interface ICreateMedicineData {
  name: string;
  description: string;
  price: number;
  stocks: number;
  manufacturer: string;
  categoryId: string;
  thumbnail?: File | null;
}

export const createMedicineAction = async (
  medicineData: ICreateMedicineData,
) => {
  const result = await MedicineService.createMedicine(medicineData);

  if (result.error) {
    return {
      data: null,
      error: result.error,
    };
  }

  // revalidate
  updateTag("medicines");
  updateTag("featured-medicines");
  updateTag("popular-medicines");

  return result;
};
