"use client";

import { motion } from "motion/react";
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
      url: "/shop",
    },
  },
  image = {
    src: "/hero.svg",
    alt: "Online pharmacy illustration",
  },
  className,
}: HeroProps) => {
  return (
    <section
      className={cn("bg-background py-20 lg:py-6 overflow-hidden", className)}
    >
      <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row">
        <motion.div
          className="flex flex-col gap-7 lg:w-2/3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="text-5xl font-semibold text-foreground md:text-5xl lg:text-7xl ml-8 lg:ml-0"
          >
            <span>{heading}</span>
            <span className="text-muted-foreground ">
              {subheading}
              <span className="text-primary/80">.</span>
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="text-base text-muted-foreground md:text-lg lg:text-xl ml-8 lg:ml-0"
          >
            {description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="flex flex-wrap items-start gap-5 lg:gap-7 ml-8 lg:ml-0"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
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
              width={350}
              height={889}
              alt="iphone"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero };
