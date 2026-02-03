import React from "react";

interface DashboardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
}

const DashboardGrid = ({ children, cols = 4, gap = 4 }: DashboardGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClass = `gap-${gap}`;

  return <div className={`grid ${gridCols[cols]} ${gapClass}`}>{children}</div>;
};

export default DashboardGrid;
