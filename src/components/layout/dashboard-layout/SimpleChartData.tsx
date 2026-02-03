"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SimpleChartData {
  label: string;
  value: number;
  total: number;
  color?: string;
}

interface SimpleChartProps {
  title: string;
  description?: string;
  data: SimpleChartData[];
}

const SimpleChart = ({ title, description, data }: SimpleChartProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm text-muted-foreground">
                {item.value} / {item.total}
              </span>
            </div>
            <Progress value={(item.value / item.total) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SimpleChart;
