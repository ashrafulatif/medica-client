import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { IReviewData } from "@/types";
import { cookies } from "next/headers";

const postReview = async (reviewData: IReviewData) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.reviews.postReview));

    const result = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(reviewData),
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

export const ReviewService = { postReview };
