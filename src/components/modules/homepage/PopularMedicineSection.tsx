import React from "react";
import { MedicineCard } from "@/components/ui/MedicineCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MedicineService } from "@/services/medicine.service";
import { IMedicineTypes } from "@/types";

const PopularMedicineSection = async () => {
  const featuredData = await MedicineService.getPopularMedicine();

  const medicines: IMedicineTypes[] = featuredData.data || [];

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col justify-center text-center mb-12">
        <h1 className="text-5xl font-bold py-2">
          Top Viewed <span className="text-muted-foreground">Medicines</span>
        </h1>
        <p className="text-muted-foreground text-xl">
          Discover our most popular and highly viewed medicines
        </p>
      </div>

      <div className="relative px-12 md:px-2">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {medicines.map((medicine) => (
              <CarouselItem
                key={medicine.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <MedicineCard medicine={medicine} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 md:-left-16" />
          <CarouselNext className="-right-12 md:-right-16" />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularMedicineSection;
