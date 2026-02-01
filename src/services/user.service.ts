import { API_ENDPOINTS } from "@/apiInstance";
import { env } from "@/env";
import { cookies } from "next/headers";

const getSession = async () => {
  const AUTH_URL = env.AUTH_URL;

  try {
    const cookieStorage = await cookies();

    const res = await fetch(`${AUTH_URL}${API_ENDPOINTS.auth.getSession}`, {
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

export const userService = {
  getSession,
};
