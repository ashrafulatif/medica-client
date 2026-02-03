import { IMedicineDetailsProps } from "@/types/medicine.type";

export const getStatusColorProfile = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getRoleBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "customer":
      return "bg-blue-100 text-blue-700";
    case "admin":
      return "bg-purple-100 text-purple-700";
    case "seller":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "pending":
      return "bg-orange-100 text-orange-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getPaymentMethodColor = (method: string) => {
  switch (method.toLowerCase()) {
    case "cod":
      return "bg-orange-100 text-orange-700";
    case "card":
      return "bg-blue-100 text-blue-700";
    case "wallet":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};


export const getBadgeInfo = ({medicine} : IMedicineDetailsProps ) => {
    if (medicine.stocks < 1) {
      return { text: "Out of Stock", variant: "destructive" as const };
    }
    if (medicine.stocks < 50) {
      return { text: "Low Stock", variant: "destructive" as const };
    }
    if (medicine.isFeatured) {
      return { text: "Featured", variant: "default" as const };
    }
    return { text: "In Stock", variant: "secondary" as const };
  };