"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const carouselCategories =
    categories.length > 1 && categories.length < 7
      ? [...categories, ...categories]
      : categories;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api || carouselCategories.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      api.scrollPrev();
    }, 2600);

    return () => clearInterval(timer);
  }, [api, carouselCategories.length, isHovered]);

  return (
    <motion.div
      className="relative px-12 md:px-2 -mt-2 pt-2"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: carouselCategories.length > 1 }}
        className="w-full overflow-visible"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2 overflow-visible">
          {carouselCategories.map((category, index) => (
            <CarouselItem
              key={`${category.id}-${index}`}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link key={category.id} href={`/shop?category=${category.id}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30 h-full rounded-tl-4xl rounded-br-4xl rounded-tr-xs rounded-bl-xs">
                    <CardHeader className="pb-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <motion.div
                          className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                          whileHover={{ scale: 1.08 }}
                        >
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 h-full flex flex-col">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      <span className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground mt-auto w-fit">
                        Available
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 md:-left-16" />
        <CarouselNext className="-right-12 md:-right-16" />
      </Carousel>
    </motion.div>
  );
}
