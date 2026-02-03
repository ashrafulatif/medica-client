"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Stethoscope,
  Truck,
  FileText,
  Shield,
  Bell,
  Heart,
  Pill,
  Users,
} from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

interface FeatureProps {
  features: FeatureItem[];
  className?: string;
}

// Icon mapping
const iconMap = {
  stethoscope: Stethoscope,
  truck: Truck,
  fileText: FileText,
  shield: Shield,
  bell: Bell,
  heart: Heart,
  pill: Pill,
  users: Users,
};

const Feature = ({ features = [], className }: FeatureProps) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(
    features[0]?.id || 1,
  );
  const [activeIcon, setActiveIcon] = useState(
    features[0]?.icon || "stethoscope",
  );

  const ActiveIconComponent =
    iconMap[activeIcon as keyof typeof iconMap] || Stethoscope;

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
              {features.map((feature) => {
                const IconComponent =
                  iconMap[feature.icon as keyof typeof iconMap] || Stethoscope;
                return (
                  <AccordionItem
                    key={feature.id}
                    value={`item-${feature.id}`}
                    className="transition-opacity hover:opacity-80 border-border"
                  >
                    <AccordionTrigger
                      onClick={() => {
                        setActiveIcon(feature.icon);
                        setActiveTabId(feature.id);
                      }}
                      className="cursor-pointer py-6 hover:no-underline transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            feature.id === activeTabId
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h4
                          className={`text-lg md:text-xl font-semibold text-left ${
                            feature.id === activeTabId
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {feature.title}
                        </h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-base text-muted-foreground leading-relaxed ml-14">
                        {feature.description}
                      </p>
                      <div className="mt-6 md:hidden flex justify-center">
                        <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                          <IconComponent className="w-32 h-32 text-primary mx-auto" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <div className="relative hidden w-1/2 md:block">
            <div className="sticky top-8">
              <div className="overflow-hidden rounded-xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <ActiveIconComponent className="w-48 h-48 text-primary mx-auto mb-6" />
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {features.find((f) => f.id === activeTabId)?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced healthcare technology at your fingertips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };
