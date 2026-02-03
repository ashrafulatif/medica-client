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
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.medicines.getMedicineById(id)),
    );

    const res = await fetch(url.toString());

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

interface ICreateMedicineData {
  name: string;
  description: string;
  price: number;
  stocks: number;
  manufacturer: string;
  categoryId: string;
  thumbnail?: File | null;
}

const createMedicine = async (medicineData: ICreateMedicineData) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.medicines.createMedicine));

    //create FormData
    const formData = new FormData();

    // append text fields
    formData.append("name", medicineData.name.trim());
    formData.append("description", medicineData.description.trim());
    formData.append("price", medicineData.price.toString());
    formData.append("stocks", medicineData.stocks.toString());
    formData.append("manufacturer", medicineData.manufacturer.trim());
    formData.append("categoryId", medicineData.categoryId.trim());

    // append image file if provided
    if (medicineData.thumbnail) {
      formData.append("thumbnail", medicineData.thumbnail);
    }

    const result = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      body: formData,
    });

    const data = await result.json();

    if (!result.ok) {
      return {
        data: null,
        error: { message: data.message || "Failed to create medicine" },
      };
    }

    if (!data.success) {
      return {
        data: null,
        error: { message: data.message || "Failed to create medicine" },
      };
    }

    return {
      data: data.data,
      error: null,
      message: data.message,
    };
  } catch (error: any) {
    console.error("Create medicine error:", error);
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};

export const MedicineService = {
  getMedicine,
  getFeaturedMedicine,
  getPopularMedicine,
  getMedicinebyId,
  createMedicine,
};
