import MedicineDetails from "@/components/modules/shop/Medicine-detail";
import { MedicineService } from "@/services/medicine.service";
import React from "react";

const MedicineDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicineResponse = await MedicineService.getMedicinebyId(id);

  if ('error' in medicineResponse || !medicineResponse.data) {
    return <div>Medicine not found</div>;
  }

  return <div>{ <MedicineDetails medicine={medicineResponse.data} /> }</div>;
};

export default MedicineDetailPage;
