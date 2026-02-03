import { env } from "./env";

//base api
export const API_BASE_URL = env.BACKEND_URL;

//api endpoints
export const API_ENDPOINTS = {
  auth: {
    me: "/api/auth/me",
    getSession: "/get-session",
    updateProfile: "/api/auth/update",
  },
  medicines: {
    getAll: "/api/medicines",
    getFeaturedMedicine: "/api/medicines/isFeatured",
    getPopulardMedicine: "/api/medicines/topViewed-medicine",
    getMedicineById: (id: string) => `/api/medicines/${id}`,
    createMedicine: "/api/seller/medicines",
  },

  category: {
    getAllCategory: "/api/category",
    getAllMedicineByCategory: (id: string) => `/api/medicines/category/${id}`,
  },

  orders: {
    getCustomerOrderStats: "/api/orders/customerOrderStats",
    getCustomerRecentOrders: "/api/orders/recent",
    getAllOrders: "/api/orders",
    getOrderById: (id: string) => `/api/orders/${id}`,
    cancelOrder: (id: string) => `/api/orders/cancel/${id}`,
    createOrder: "/api/orders",
  },
  cart: {
    getCartItems: "/api/cart",
    addCartItems: "/api/cart/add",
    updateCartItem: (id: string) => `/api/cart/item/${id}`,
    removeCartItem: (id: string) => `/api/cart/item/${id}`,
    clearCart: "/api/cart/clear",
  },
  reviews: {
    postReview: "/api/reviews",
  },
  seller: {
    getStats: "/api/seller/statistics",
    getOrders: "/api/seller/orders",
    updateMedicine: (id: string) => `/api/seller/medicines/${id}`,
    updateOrderStatus: (id: string) => `/api/seller/orders/${id}`,
    deleteMedicine: (id: string) => `/api/seller/medicines/${id}`,
  },
  admin: {
    getStats: "/api/admin/getAllTableStats",
    getAllUsers: "/api/admin/users",
    updateUserStatus: (id: string) => `/api/admin/users/${id}`,
    createCategory: "/api/category",
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
