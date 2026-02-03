import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

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
export const SellerService = { getSellerStats };
