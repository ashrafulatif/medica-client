import { IRoutes } from "@/types";
import {
  Home,
  LayoutDashboard,
  Clock,
  ListTree,
  MessageCircleQuestion,
} from "lucide-react";

export const pharmacistRoute: IRoutes[] = [
  {
    title: "Medica. Pharmacist portal",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/pharmacist-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Pending Medicines",
        url: "/pharmacist-dashboard/pending-medicines",
        icon: Clock,
      },
      {
        title: "Category Recommendations",
        url: "/pharmacist-dashboard/category-recommendations",
        icon: ListTree,
      },
      {
        title: "Questions & Replies",
        url: "/pharmacist-dashboard/questions",
        icon: MessageCircleQuestion,
      },
    ],
  },
];
