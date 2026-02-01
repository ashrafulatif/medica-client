import { env } from "./env";

//base api
export const API_BASE_URL = env.BACKEND_URL;

//api endpoints
export const API_ENDPOINTS = {
  auth: {
    me: "/auth/me",
    getSession: "/get-session",
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  medicines: {
    getAll: "/api/medicines",
    getFeaturedMedicine: "/api/medicines/isFeatured",
    getPopulardMedicine: "/api/medicines/topViewed-medicine",
    getMedicineById: (id: string) => `/api/medicines/${id}`,
  },

  orders: {
    getCustomerOrderStats: "/api/orders/customerOrderStats",
    getCustomerRecentOrders: "/api/orders/recent",
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
