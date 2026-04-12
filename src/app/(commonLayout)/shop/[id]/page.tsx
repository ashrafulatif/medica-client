import MedicineDetails from "@/components/modules/shop/medicine/Medicine-detail";
import { MedicineService } from "@/services/medicine.service";
import { getQuestionsAction } from "@/actions/pharmacist.action";
import { Metadata } from "next";
import React from "react";

const MedicineDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [medicineResponse, questionsResponse] = await Promise.all([
    MedicineService.getMedicinebyId(id),
    getQuestionsAction({ medicineId: id })
  ]);

  if ("error" in medicineResponse || !medicineResponse.data) {
    return <div>Medicine not found</div>;
  }

  const questions = questionsResponse?.data?.result || [];

  return (
    <div>
      <MedicineDetails
        medicine={medicineResponse.data}
        questions={questions}
      />
    </div>
  );
};

export default MedicineDetailPage;

export const metadata: Metadata = {
  title: "Medicine Details",
  description: "Browse all medicine",
};
