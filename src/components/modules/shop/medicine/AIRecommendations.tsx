"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { MedicineCard } from "@/components/ui/MedicineCard";

interface AIRecommendationsProps {
  recommendations: any[];
}

export const AIRecommendations = ({
  recommendations,
}: AIRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
      className="mt-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-white shadow-lg">
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          AI Suggested Alternatives
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((medicine: any, i: number) => (
          <motion.div
            key={medicine.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <MedicineCard
              medicine={{
                ...medicine,
                category: medicine.category || {
                  id: "",
                  name: "Uncategorized",
                },
                seller: medicine.seller || {
                  id: "",
                  name: "Unknown Seller",
                  email: "",
                },
                reviewCount: medicine._count?.reviews || 0,
                averageRating:
                  medicine.reviews?.length > 0
                    ? medicine.reviews.reduce(
                        (acc: number, review: any) => acc + review.rating,
                        0,
                      ) / medicine.reviews.length
                    : 0,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
