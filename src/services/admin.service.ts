import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getAdminStats = async () => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.admin.getStats));

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

const addCategory = async (name: string, description: string) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.admin.createCategory));

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await res.json();

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

const getAllUsers = async (params?: { page?: string; limit?: string }) => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.admin.getAllUsers));

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

const deleteUser = async (userId: string) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.admin.deleteUser(userId)),
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

const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "INACTIVE",
) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.admin.updateUserStatus(userId)),
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

const getAllMedicinesAdmin = async (params?: {
  page?: string;
  limit?: string;
}) => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.medicines.getAll));

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

const getAllOrdersAdmin = async (params?: {
  page?: string;
  limit?: string;
}) => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.orders.getAllOrdersByAdmin));

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

export const AdminService = {
  getAdminStats,
  addCategory,
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllMedicinesAdmin,
  getAllOrdersAdmin,
};
