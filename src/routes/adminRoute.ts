import { IRoutes } from "@/types";

export const adminRoute: IRoutes[] = [
  {
    title: "Medica. User Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/create-category",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Category List",
        url: "/admin-dashboard/category-list",
      },
      {
        title: "Medicines",
        url: "/admin-dashboard/medicines",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
    ],
  },
];
