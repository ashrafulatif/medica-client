import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { env } from "@/env";
import { IUpdateProfile } from "@/types";
import { cookies } from "next/headers";

const getSession = async () => {
  const AUTH_URL = env.AUTH_URL;

  try {
    const cookieStorage = await cookies();

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStorage.toString(),
      },
      cache: "no-store",
    });

    const session = await res.json();

    if (session === null) {
      return { data: null, error: "Session is missing" };
    }

    return { data: session, error: null };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const updateProfile = async (newData: IUpdateProfile) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.updateProfile));

    const res = await fetch(url.toString(), {
      method: "PATCH",
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

const getLoggedInUserData = async () => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.me));

    const result = await fetch(url.toString(), {
      next: { tags: ["userData"] },
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: "Error Fetching",
      };
    }
    return {
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const userService = {
  getSession,
  updateProfile,
  getLoggedInUserData,
};
