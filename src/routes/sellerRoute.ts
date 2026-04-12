import { IRoutes } from "@/types";
import {
  Home,
  LayoutDashboard,
  Pill,
  Database,
  ShoppingCart,
} from "lucide-react";

export const sellerRoute: IRoutes[] = [
  {
    title: "Midica. Seller Medicine Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Medicine",
        url: "/seller-dashboard/create-medicine",
        icon: Pill,
      },
      {
        title: "Manage Medicine",
        url: "/seller-dashboard/manage-medicine",
        icon: Database,
      },
      {
        title: "Manage Order",
        url: "/seller-dashboard/manage-order",
        icon: ShoppingCart,
      },
    ],
  },
];
