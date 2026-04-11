"use client";

import { motion } from "motion/react";
import { Sparkles, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface SearchInsight {
  normalizedQuery: string;
  intent:
    | "medicine_search"
    | "availability"
    | "symptom"
    | "brand"
    | "category"
    | "general";
  suggestedKeywords: string[];
  categoryHints: string[];
  manufacturerHints: string[];
}

export const AISearchBanner = ({ insight }: { insight: SearchInsight }) => {
  if (!insight || insight.intent === "general") {
    return null;
  }

  const formatIntent = (intent: string) => {
    return intent
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-4 mb-8 shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <Sparkles className="h-5 w-5 animate-pulse" />
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-sm font-medium flex items-center gap-2">
          <span>AI Insight:</span>
          <span className="text-primary font-semibold">
            {formatIntent(insight.intent)}
          </span>
          <span className="text-muted-foreground font-normal">
            &quot;{insight.normalizedQuery}&quot;
          </span>
        </p>

        {insight.suggestedKeywords?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs text-muted-foreground mr-1 self-center">
              Keywords:
            </span>
            {insight.suggestedKeywords.slice(0, 4).map((kw, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-background text-xs border-primary/10"
              >
                {kw}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
