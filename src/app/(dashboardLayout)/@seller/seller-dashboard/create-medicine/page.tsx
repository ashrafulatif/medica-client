import { getCategoriesAction } from "@/actions/category.action";
import CreateMedicineForm from "@/components/modules/shop/medicine/Medicine-Form";
import { Metadata } from "next";

const CreateMedicinePage = async () => {
  const categoriesResult = await getCategoriesAction();

  return (
    <div>
      <CreateMedicineForm categories={categoriesResult.data.result || []} />
    </div>
  );
};

export default CreateMedicinePage;

export const metadata: Metadata = {
  title: "Create Medicine",
  description: "Browse all medicine",
};
