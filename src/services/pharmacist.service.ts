import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

export const PharmacistService = {
  getPendingMedicines: async (params?: Record<string, any>) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.getPendingMedicines),
      );

      if (params?.page) url.searchParams.set("page", params.page);
      if (params?.limit) url.searchParams.set("limit", params.limit);

      const result = await fetch(url.toString(), {
        cache: "no-store",
        headers: { Cookie: cookieStorage.toString() },
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  verifyMedicine: async (
    id: string,
    data: { status: string; note?: string },
  ) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.verifyMedicine(id)),
      );

      const result = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  getCategoryRecommendations: async (params?: Record<string, any>) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(buildApiUrl(API_ENDPOINTS.category.getAllCategory));

      const result = await fetch(url.toString(), {
        cache: "no-store",
        headers: { Cookie: cookieStorage.toString() },
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  createCategoryRecommendation: async (data: {
    categoryId: string;
    note: string;
  }) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.createCategoryRecommendation),
      );

      const result = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  updateCategoryRecommendation: async (id: string, data: { note: string }) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.updateCategoryRecommendation(id)),
      );

      const result = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  getQuestions: async (params?: Record<string, any>) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(buildApiUrl(API_ENDPOINTS.pharmacist.getQuestions));

      if (params?.page) url.searchParams.set("page", params.page);
      if (params?.limit) url.searchParams.set("limit", params.limit);
      if (params?.status) url.searchParams.set("status", params.status);
      if (params?.medicineId) url.searchParams.set("medicineId", params.medicineId);

      const result = await fetch(url.toString(), {
        cache: "no-store",
        headers: { Cookie: cookieStorage.toString() },
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  createQuestion: async (data: { medicineId: string; question: string }) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(buildApiUrl(API_ENDPOINTS.pharmacist.createQuestion));

      const result = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  answerQuestion: async (questionId: string, data: { reply: string }) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.answerQuestion(questionId)),
      );

      const result = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },

  updateReplyStatus: async (replyId: string, data: { status: string }) => {
    try {
      const cookieStorage = await cookies();
      const url = new URL(
        buildApiUrl(API_ENDPOINTS.pharmacist.updateReplyStatus(replyId)),
      );

      const result = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(data),
      });
      return await result.json();
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong" };
    }
  },
};
