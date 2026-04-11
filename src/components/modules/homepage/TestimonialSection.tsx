"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "motion/react";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Regular Customer",
      content: "Medica has completely changed how I manage my prescriptions. The delivery is always on time, and the support team is incredibly helpful whenever I have questions.",
      rating: 5,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Patient",
      content: "I love the clean interface and how easy it is to reorder my monthly medications. The digital prescription upload feature works flawlessly.",
      rating: 5,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Healthcare Professional",
      content: "As a nurse, I often recommend Medica to my patients who have mobility issues. It's a reliable platform that ensures they get their medications without hassle.",
      rating: 4,
      avatar: "ER",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
           <h1 className="text-5xl font-bold py-2">
            What <span className="text-muted-foreground">Patients</span> Say <span className="text-primary animate-bounce inline-block italic">?</span> 
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their experience with Medica.
          </p>  

        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="bg-background border-border shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
