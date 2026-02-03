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

const getAllUsers = async () => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.admin.getAllUsers));

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

export const AdminService = { getAdminStats, addCategory, getAllUsers };
