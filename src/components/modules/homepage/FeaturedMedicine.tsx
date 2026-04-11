import MedicineCarousel from "./MedicineCarousel";
import { MedicineService } from "@/services/medicine.service";
import { IMedicineTypes } from "@/types";

const FeaturedMedicineSection = async () => {
  //fetchData
  const featuredData = await MedicineService.getFeaturedMedicine();

  const medicines: IMedicineTypes[] = featuredData.data || [];

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col justify-center text-center mb-12">
        <h1 className="text-5xl font-bold py-2">
          Featured <span className="text-muted-foreground">Medicines</span>
        </h1>
        <p className="text-muted-foreground text-xl">
          Discover our top-rated and popular medicines
        </p>
      </div>

      <MedicineCarousel medicines={medicines} />
    </div>
  );
};

export default FeaturedMedicineSection;
