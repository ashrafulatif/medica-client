import CategorySection from "@/components/modules/homepage/CategorySection";
import { Hero } from "@/components/modules/homepage/Hero";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategorySection />
    </div>
  );
};

export default Home;
