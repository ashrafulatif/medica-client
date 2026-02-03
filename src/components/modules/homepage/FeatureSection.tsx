"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface FeatureProps {
  features: FeatureItem[];
  className?: string;
}

const Feature = ({ features = [], className }: FeatureProps) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(
    features[0]?.id || 1,
  );
  const [activeImage, setActiveImage] = useState(features[0]?.image || "");

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Header Section */}

        <div className="flex flex-col justify-center text-center mb-12">
          <h1 className="text-5xl font-bold py-2">
            Why Choose <span className="text-muted-foreground">Medica</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of healthcare with our comprehensive digital
            platform designed to make medical care accessible, convenient, and
            reliable.
          </p>
        </div>

        <div className="flex w-full items-start justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((feature) => (
                <AccordionItem
                  key={feature.id}
                  value={`item-${feature.id}`}
                  className="transition-opacity hover:opacity-80 border-border"
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(feature.image);
                      setActiveTabId(feature.id);
                    }}
                    className="cursor-pointer py-6 hover:no-underline transition-colors"
                  >
                    <h4
                      className={`text-lg md:text-xl font-semibold text-left ${
                        feature.id === activeTabId
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {feature.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 md:hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full max-h-80 w-full rounded-lg object-cover shadow-md"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative hidden w-1/2 md:block">
            <div className="sticky top-8">
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 p-2">
                <img
                  src={activeImage}
                  alt="Medical service feature"
                  className="w-full aspect-[4/3] rounded-lg object-cover shadow-lg transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };
