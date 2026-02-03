import { getCategoriesAction } from "@/actions/category.action";
import CreateMedicineForm from "@/components/modules/shop/medicine/Medicine-Form";

const CreateMedicinePage = async () => {
  const categoriesResult = await getCategoriesAction();

  return (
    <div>
      <CreateMedicineForm categories={categoriesResult.data.result || []} />
    </div>
  );
};

export default CreateMedicinePage;
