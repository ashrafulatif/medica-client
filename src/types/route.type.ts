import { LucideIcon } from "lucide-react";

export interface IRoutes {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
