import { IRoutes } from "@/types";

export const sellerRoute: IRoutes[] = [
  {
    title: "Midica. Seller Medicine Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Dashboard",
        url: "/seller-dashboard",
      },
      {
        title: "Create Medicine",
        url: "/seller-dashboard/create-medicine",
      },
      {
        title: "History",
        url: "/seller-dashboard/history",
      },
    ],
  },
];
