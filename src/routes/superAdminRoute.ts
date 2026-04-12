import { IRoutes } from "@/types";
import {
  Home,
  LayoutDashboard,
  FolderPlus,
  Users,
  List,
  Pill,
  ShoppingCart,
} from "lucide-react";

export const superAdminRoute: IRoutes[] = [
  {
    title: "Medica. User Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/super-admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Category",
        url: "/super-admin-dashboard/create-category",
        icon: FolderPlus,
      },
      {
        title: "Manage Users",
        url: "/super-admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Category List",
        url: "/super-admin-dashboard/category-list",
        icon: List,
      },
      {
        title: "Medicines",
        url: "/super-admin-dashboard/medicines",
        icon: Pill,
      },
      {
        title: "Orders",
        url: "/super-admin-dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
];
