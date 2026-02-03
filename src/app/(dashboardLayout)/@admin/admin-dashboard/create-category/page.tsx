import { CreateCategoryView } from "@/components/modules/admin/CategoryManagment/CreateCategoryView";
import { Metadata } from "next";

const CreateCategoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreateCategoryView />
    </div>
  );
};

export default CreateCategoryPage;

export const metadata: Metadata = {
  title: "Create Category",
  description: "Browse all medicine",
};
