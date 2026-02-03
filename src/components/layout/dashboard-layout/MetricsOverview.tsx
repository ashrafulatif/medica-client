import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

type MetricStatus = "success" | "warning" | "danger" | "default";

interface MetricItem {
  label: string;
  value: number;
  percentage?: number;
  status?: MetricStatus;
}

interface MetricsOverviewProps {
  title: string;
  icon?: LucideIcon;
  metrics: MetricItem[];
}

const MetricsOverview = ({
  title,
  icon: Icon,
  metrics,
}: MetricsOverviewProps) => {
  const getStatusColor = (status?: MetricStatus) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {metric.label}
                </span>
                {metric.status && (
                  <Badge
                    variant="secondary"
                    className={getStatusColor(metric.status)}
                  >
                    {metric.value}
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-bold">
                {!metric.status && metric.value}
                {metric.percentage !== undefined && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({metric.percentage}%)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsOverview;
