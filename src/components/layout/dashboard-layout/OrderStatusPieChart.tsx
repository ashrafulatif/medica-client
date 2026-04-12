"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { ShoppingCart } from "lucide-react";

interface PieMetric {
  label: string;
  value: number;
  status: "success" | "warning" | "danger" | "default";
}

interface OrderStatusPieChartProps {
  title: string;
  metrics: PieMetric[];
}

const colorByStatus: Record<PieMetric["status"], string> = {
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  default: "#3b82f6",
};

const bgByStatus: Record<PieMetric["status"], string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  default: "bg-blue-500",
};

const chartConfig = {
  pending: { label: "Pending", color: "#f59e0b" },
  shipped: { label: "Shipped", color: "#3b82f6" },
  delivered: { label: "Delivered", color: "#22c55e" },
  cancelled: { label: "Cancelled", color: "#ef4444" },
} satisfies ChartConfig;

const OrderStatusPieChart = ({ title, metrics }: OrderStatusPieChartProps) => {
  const total = metrics.reduce((sum, metric) => sum + metric.value, 0);
  const chartData = metrics.map((metric) => ({
    label: metric.label,
    value: metric.value,
    status: metric.status,
    fill: colorByStatus[metric.status],
  }));

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ShoppingCart className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:items-center">
        <div className="mx-auto">
          <ChartContainer config={chartConfig} className="mx-auto h-40 w-40">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={34} outerRadius={72} strokeWidth={2} />
            </PieChart>
          </ChartContainer>
          <p className="mt-3 text-center text-sm text-muted-foreground">Total: {total}</p>
        </div>

        <div className="space-y-3">
          {metrics.map((metric) => {
            const percentage = total > 0 ? Math.round((metric.value / total) * 100) : 0;
            return (
              <div key={metric.label} className="flex items-center justify-between rounded-md border px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${bgByStatus[metric.status]}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusPieChart;
