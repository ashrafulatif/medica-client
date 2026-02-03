import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

export interface IMedicineProps {
  name: string;
  description: string;
  price: number;
  stocks: number;
  manufacturer: string;
}

const getSellerStats = async () => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.seller.getStats));

    const result = await fetch(url.toString(), {
      cache: "no-store",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getAllSellerMedicine = async (params?: {
  page?: string;
  limit?: string;
}) => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.seller.getSellerMedicines));

    if (params?.page) {
      url.searchParams.set("page", params.page);
    }
    if (params?.limit) {
      url.searchParams.set("limit", params.limit);
    }

    const result = await fetch(url.toString(), {
      cache: "no-store",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getAllSellerOders = async (params?: {
  page?: string;
  limit?: string;
}) => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.seller.getOrders));

    if (params?.page) {
      url.searchParams.set("page", params.page);
    }
    if (params?.limit) {
      url.searchParams.set("limit", params.limit);
    }

    const result = await fetch(url.toString(), {
      cache: "no-store",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const updateMedicine = async (id: string, newData: IMedicineProps) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.seller.updateMedicine(id)));

    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },

      body: JSON.stringify(newData),
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: "Error: User not Updated." },
      };
    }
    return {
      data: data,
      error: null,
    };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

const updateOrderStatus = async (
  orderId: string,
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED",
) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.seller.updateOrderStatus(orderId)),
      {
        method: "PATCH",
        headers: {
          Cookie: cookieStorage.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

const deleteMedicine = async (medicineId: string) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.seller.deleteMedicine(medicineId)),
      {
        method: "DELETE",
        headers: { Cookie: cookieStorage.toString() },
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

export const SellerService = {
  getSellerStats,
  getAllSellerMedicine,
  getAllSellerOders,
  updateMedicine,
  updateOrderStatus,
  deleteMedicine,
};
