import CategorySection from "@/components/modules/homepage/CategorySection";
import FeaturedMedicineSection from "@/components/modules/homepage/FeaturedMedicine";
import { Hero } from "@/components/modules/homepage/Hero";
import PopularMedicineSection from "@/components/modules/homepage/PopularMedicineSection";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategorySection />
      <FeaturedMedicineSection />
      <PopularMedicineSection />
    </div>
  );
};

export default Home;
