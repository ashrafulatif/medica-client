"use client";

import { useEffect, useState } from "react";
import { MedicineCard } from "@/components/ui/MedicineCard";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IMedicineTypes } from "@/types";

interface MedicineCarouselProps {
  medicines: IMedicineTypes[];
}

export default function MedicineCarousel({ medicines }: MedicineCarouselProps) {
  const carouselMedicines =
    medicines.length > 1 && medicines.length < 7
      ? [...medicines, ...medicines]
      : medicines;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api || carouselMedicines.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      api.scrollPrev();
    }, 3000);

    return () => clearInterval(timer);
  }, [api, carouselMedicines.length, isHovered]);

  if (!medicines || medicines.length === 0) {
    return null;
  }

  return (
    <div
      className="relative px-12 md:px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: carouselMedicines.length > 1,
        }}
        className="w-full overflow-visible"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2 overflow-visible">
          {carouselMedicines.map((medicine, index) => (
            <CarouselItem
              key={`${medicine.id}-${index}`}
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
  );
}
