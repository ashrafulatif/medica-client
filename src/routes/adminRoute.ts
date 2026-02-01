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
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
    ],
  },
];
