import CategorySection from "@/components/modules/homepage/CategorySection";
import FeaturedMedicineSection from "@/components/modules/homepage/FeaturedMedicine";
import { FeatureWrapper } from "@/components/modules/homepage/FeatureWrapper";
import { Hero } from "@/components/modules/homepage/Hero";
import PopularMedicineSection from "@/components/modules/homepage/PopularMedicineSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";
import TestimonialSection from "@/components/modules/homepage/TestimonialSection";
import CTASection from "@/components/modules/homepage/CTASection";
import { Metadata } from "next";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategorySection />
      <FeaturedMedicineSection />
      <HowItWorksSection />
      <PopularMedicineSection />
      <FeatureWrapper />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "Home",
  description: "Browse all medicine",
};
