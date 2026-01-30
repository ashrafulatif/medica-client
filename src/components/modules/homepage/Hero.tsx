import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const Hero = ({
  heading = "Your Trusted Online Pharmacy",
  subheading = "Modern, fast & secure medicine ordering",
  description = "Order authentic medicines online with ease. Browse products, place orders securely, and get fast delivery — all built with a modern, reliable web experience.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/login",
    },
    secondary: {
      text: "Browse Medicines",
      url: "/medicines",
    },
  },
  image = {
    src: "/hero.svg",
    alt: "Online pharmacy illustration",
  },
  className,
}: HeroProps) => {
  return (
    <section className={cn("bg-background py-20 lg:py-6", className)}>
      <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row">
        <div className="flex flex-col gap-7 lg:w-2/3">
          <h2 className="text-5xl font-semibold text-foreground md:text-5xl lg:text-7xl">
            <span>{heading}</span>
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap items-start gap-5 lg:gap-7">
            <Button asChild>
              <Link href={buttons.primary?.url || "/login"}>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="size-4" />
                </div>
                <span className="pr-6 pl-4 text-sm whitespace-nowrap lg:pr-8 lg:pl-6 lg:text-base">
                  {buttons.primary?.text}
                </span>
              </Link>
            </Button>
            <Button asChild variant="link" className="underline">
              <Link href={buttons.secondary?.url || "/"}>
                {buttons.secondary?.text}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative z-10">
          <div className="absolute top-2.5 left-1/2! h-[92%]! w-[69%]! -translate-x-[52%] overflow-hidden rounded-[35px]">
            <img
              src={image.src}
              alt={image.alt}
              className="size-full object-cover object-[50%_0%]"
            />
          </div>
          <img
            className="relative z-10"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
            width={450}
            height={889}
            alt="iphone"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
