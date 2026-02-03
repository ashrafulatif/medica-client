import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface About3Props {
  className?: string;
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const About = ({ className, ...props }: About3Props) => {
  const { title, description, mainImage, secondaryImage, breakout } = {
    ...defaultProps,
    ...props,
  };
  return (
    <section className={cn("py-20", className)}>
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12 dark:invert"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <Link href={breakout.buttonUrl || "#"} target="_blank">
                  {breakout.buttonText}
                </Link>
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };

const defaultProps = {
  title: "About Medica",
  description:
    "Your trusted online medicine shop for over-the-counter medications. We connect customers with verified sellers to ensure safe and convenient access to quality medicines.",
  mainImage: {
    src: "/hero.svg",
    alt: "Medica online medicine platform",
  },
  secondaryImage: {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Healthcare professionals",
  },
  breakout: {
    src: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    alt: "medicine icon",
    title: "Trusted Sellers & Quality Medicines",
    description:
      "Browse hundreds of OTC medicines from verified sellers. Easy ordering, secure payments, and fast delivery to your doorstep.",
    buttonText: "Shop Medicines",
    buttonUrl: "/shop",
  },
};
