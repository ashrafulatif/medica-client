"use client";

import type { LucideIcon } from "lucide-react";
import {
  Store,
  LogIn,
  Banknote,
  ClipboardList,
  ListOrdered,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps: {
  Icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    Icon: Store,
    title: "Browse the shop",
    description:
      "Use the medicine shop with search and filters, browse categories and featured items on the home page, then open any product for details, live stock, and reviews.",
  },
  {
    Icon: LogIn,
    title: "Sign in & add to cart",
    description:
      "Create a customer account and sign in. Add items from the medicine page—quantities respect live stock—and your cart stays in sync with the server.",
  },
  {
    Icon: Banknote,
    title: "Checkout with COD",
    description:
      "Go to checkout, enter your full shipping address, and place the order with cash on delivery. Orders over $50 qualify for free shipping.",
  },
  {
    Icon: ClipboardList,
    title: "Track in your dashboard",
    description:
      "After checkout you land on your order details; use the customer dashboard anytime to review orders and manage your profile.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-primary/6 to-transparent "
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
              <ListOrdered className="size-3.5 text-primary" aria-hidden />
              Four simple steps
            </span>
          </motion.div>

          <motion.h1
            className="py-2 text-5xl font-bold"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            How{" "}
            <span className="text-muted-foreground">
              Medica Works{" "}
              <span className="inline-block text-primary italic animate-bounce">?</span>
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Anyone can browse the catalog; customers sign in to keep a
            server-backed cart, pay with cash on delivery at checkout, and
            follow orders in the dashboard.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, index) => {
            const { Icon } = step;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative h-full"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {index < steps.length - 1 && (
                  <motion.div
                    className="pointer-events-none absolute top-21 left-[calc(50%+2.75rem)] z-0 hidden h-[2px] w-[calc(100%-5.5rem)] origin-left rounded-full bg-linear-to-r from-primary/35 via-primary/15 to-transparent lg:block"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: 0.35 + index * 0.12,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden
                  />
                )}

                <Card
                  className={cn(
                    "relative z-1 h-full border-border bg-background/80 shadow-sm backdrop-blur-sm",
                    "transition-shadow duration-300 hover:shadow-md border-2 border-secondary/10 rounded-tl-4xl rounded-br-4xl rounded-tr-xs rounded-bl-xs",
                  )}
                >
                  <CardContent className="flex flex-col items-center p-6 pt-10 text-center md:p-7 md:pt-11">
                    <motion.span
                      className="absolute top-4 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-2 ring-background"
                      initial={{ scale: 0, rotate: -40 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                        delay: 0.08 + index * 0.06,
                      }}
                    >
                      {index + 1}
                    </motion.span>

                    <motion.div
                      className="mb-5 flex h-18 w-18 items-center justify-center rounded-2xl border border-border bg-linear-to-br from-primary/12 to-primary/5 shadow-sm"
                      whileHover={{ scale: 1.06 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 22,
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 3.2 + index * 0.35,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4,
                        }}
                      >
                        <Icon
                          className="size-8 text-primary"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </motion.div>
                    </motion.div>

                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
