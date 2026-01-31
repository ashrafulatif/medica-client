import React from "react";
import { MedicineCard } from "@/components/MedicineCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MedicineService } from "@/services/medicine.service";
import { IMedicineTypes } from "@/types";

const FeaturedMedicineSection = async () => {
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

      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {medicines.map((medicine) => (
            <CarouselItem
              key={medicine.id}
              className="pl-1 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <MedicineCard medicine={medicine} className="w-full h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedMedicineSection;
