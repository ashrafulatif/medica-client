import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { env } from "@/env";

import { cookies } from "next/headers";

const BASE_URL = env.BACKEND_URL;

interface IParamsTypes {
  search?: string;
  isActive?: boolean;
  page?: string;
  limit?: string;
}

interface IOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface IBlogData {
  title: string;
  content: string;
  tags?: string[];
}

const getMedicine = async (params?: IParamsTypes, options?: IOptions) => {
  try {
    //url
    const url = new URL(`${buildApiUrl(API_ENDPOINTS.medicines.getAll)}`);

    //handle params for filtering
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    //handle config for cache or revalidate
    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options?.revalidate };
    }

    config.next = { ...config.next, tags: ["medicine-revalidate"] };

    //fetch posts
    const result = await fetch(url.toString(), config);

    const data = await result.json();

    if (!data.success) {
      return {
        message: "Error fetching data",
      };
    }
    return {
      data: data.data.response,
      meta: data.data.meta,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};
const getFeaturedMedicine = async () => {
  try {
    //url
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.medicines.getFeaturedMedicine),
    );

    const result = await fetch(url.toString(), { next: { revalidate: 60 } });

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

const getPopularMedicine = async () => {
  try {
    //url
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.medicines.getPopulardMedicine),
    );

    const result = await fetch(url.toString(), { next: { revalidate: 60 } });

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

const getMedicinebyId = async (id: string) => {
  try {
    const res = await fetch(
      `${buildApiUrl(API_ENDPOINTS.medicines.getMedicineById(id))}`,
    );

    const data = await res.json();

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

const createMedicine = async (blogPosts: IBlogData) => {
  try {
    const cookieStorage = await cookies();

    const res = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },

      body: JSON.stringify(blogPosts),
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: "Error: Post not created." },
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

export const MedicineService = {
  getMedicine,
  getFeaturedMedicine,
  getPopularMedicine,
  getMedicinebyId
};
