import React from "react";
import { MedicineCard } from "@/components/MedicineCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  thumbnail: string | null;
  manufacturer: string;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
  };
  reviewCount: number;
  averageRating: number;
}

const FeaturedMedicineSection = () => {
  const medicines: Medicine[] = [
    {
      id: "a859c8f6-5bb5-45d5-8bfa-1a4415cb6564",
      name: "Aspirin 300mg",
      description: "Used to relieve mild pain, headaches, and reduce fever.",
      price: 18.75,
      stocks: 128,
      thumbnail: null,
      manufacturer: "Beximco Pharmaceuticals",
      isActive: true,
      isFeatured: true,
      views: 8,
      createdAt: "2026-01-28T22:00:21.053Z",
      updatedAt: "2026-01-30T10:41:00.024Z",
      category: {
        id: "f1fd83e0-8f5e-4ffc-bd3a-f877994e3f04",
        name: "Pain Relief",
      },
      seller: {
        id: "HlHYDU4kYQaeYaxdlcrb1gwWCUP8hxFR",
        name: "Blake",
        email: "blake@gmail.com",
      },
      reviewCount: 0,
      averageRating: 0,
    },
    {
      id: "d3f6df73-24b5-43e9-82d4-e2124eb322db",
      name: "Napa",
      description: "Used to relieve mild pain, headaches, and reduce fever.",
      price: 10.2,
      stocks: 200,
      thumbnail:
        "https://i.ibb.co/fVpWSgQS/medicine-1769732293146-napa-png.png",
      manufacturer: "Beximco Pharmaceuticals",
      isActive: true,
      isFeatured: true,
      views: 0,
      createdAt: "2026-01-30T00:41:25.125Z",
      updatedAt: "2026-01-30T00:41:25.125Z",
      category: {
        id: "f1fd83e0-8f5e-4ffc-bd3a-f877994e3f04",
        name: "Pain Relief",
      },
      seller: {
        id: "HlHYDU4kYQaeYaxdlcrb1gwWCUP8hxFR",
        name: "Blake",
        email: "blake@gmail.com",
      },
      reviewCount: 0,
      averageRating: 0,
    },
    {
      id: "c3f6df73-24b5-43e9-82d4-e2124eb322dc",
      name: "Paracetamol 500mg",
      description:
        "Effective pain relief and fever reducer for adults and children.",
      price: 12.5,
      stocks: 75,
      thumbnail: null,
      manufacturer: "Square Pharmaceuticals",
      isActive: true,
      isFeatured: true,
      views: 15,
      createdAt: "2026-01-29T00:41:25.125Z",
      updatedAt: "2026-01-29T00:41:25.125Z",
      category: {
        id: "f1fd83e0-8f5e-4ffc-bd3a-f877994e3f04",
        name: "Pain Relief",
      },
      seller: {
        id: "HlHYDU4kYQaeYaxdlcrb1gwWCUP8hxFR",
        name: "Blake",
        email: "blake@gmail.com",
      },
      reviewCount: 5,
      averageRating: 4.5,
    },
    {
      id: "c3f6df73-24b5-43e9-82d4s-e2124eb322dc",
      name: "Paracetamol 500mg",
      description:
        "Effective pain relief and fever reducer for adults and children.",
      price: 12.5,
      stocks: 75,
      thumbnail: null,
      manufacturer: "Square Pharmaceuticals",
      isActive: true,
      isFeatured: true,
      views: 15,
      createdAt: "2026-01-29T00:41:25.125Z",
      updatedAt: "2026-01-29T00:41:25.125Z",
      category: {
        id: "f1fd83e0-8f5e-4ffc-bd3a-f877994e3f04",
        name: "Pain Relief",
      },
      seller: {
        id: "HlHYDU4kYQaeYaxdlcrb1gwWCUP8hxFR",
        name: "Blake",
        email: "blake@gmail.com",
      },
      reviewCount: 5,
      averageRating: 4.5,
    },
    {
      id: "c3f6df73-24b5-43fe9-82d4-e2124eb322dc",
      name: "Paracetamol 500mg",
      description:
        "Effective pain relief and fever reducer for adults and children.",
      price: 12.5,
      stocks: 75,
      thumbnail: null,
      manufacturer: "Square Pharmaceuticals",
      isActive: true,
      isFeatured: true,
      views: 15,
      createdAt: "2026-01-29T00:41:25.125Z",
      updatedAt: "2026-01-29T00:41:25.125Z",
      category: {
        id: "f1fd83e0-8f5e-4ffc-bd3a-f877994e3f04",
        name: "Pain Relief",
      },
      seller: {
        id: "HlHYDU4kYQaeYaxdlcrb1gwWCUP8hxFR",
        name: "Blake",
        email: "blake@gmail.com",
      },
      reviewCount: 5,
      averageRating: 4.5,
    },
  ];

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
