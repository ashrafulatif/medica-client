"use server";
import { ReviewService } from "@/services/review.service";
import { IReviewData } from "@/types";
import { updateTag } from "next/cache";

export const postReviewAction = async (reviewData: IReviewData) => {
  const result = await ReviewService.postReview(reviewData);
  updateTag("medicine-revalidate");
  return result;
};
