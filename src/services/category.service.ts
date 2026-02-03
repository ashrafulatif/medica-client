import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";

const getAllCategories = async (params?: { page?: string; limit?: string }) => {
  try {
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.category.getAllCategory));

    if(params?.page){
      url.searchParams.set("page", params.page)
    }if (params?.limit){
      url.searchParams.set("limit", params.limit)
    }

    const result = await fetch(url.toString());

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

const getMedicineByCategoryId = async (id: string) => {
  try {
    //url
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.category.getAllMedicineByCategory(id)),
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

export const CategoryService = { getAllCategories, getMedicineByCategoryId };
