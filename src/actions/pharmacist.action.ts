"use server";

import { PharmacistService } from "@/services/pharmacist.service";
import { revalidatePath } from "next/cache";

export const getPendingMedicinesAction = async (
  params?: Record<string, any>,
) => {
  const result = await PharmacistService.getPendingMedicines(params);
  return result;
};

export const verifyMedicineAction = async (
  id: string,
  data: { status: string; note?: string },
) => {
  const result = await PharmacistService.verifyMedicine(id, data);
  if (result.success) {
    revalidatePath("/pharmacist-dashboard/pending-medicines");
  }
  return result;
};

export const getCategoryRecommendationsAction = async (
  params?: Record<string, any>,
) => {
  const result = await PharmacistService.getCategoryRecommendations(params);
  return result;
};

export const createCategoryRecommendationAction = async (data: {
  categoryId: string;
  note: string;
}) => {
  const result = await PharmacistService.createCategoryRecommendation(data);
  if (result.success) {
    revalidatePath("/pharmacist-dashboard/category-recommendations");
  }
  return result;
};

export const updateCategoryRecommendationAction = async (
  id: string,
  data: { note: string },
) => {
  const result = await PharmacistService.updateCategoryRecommendation(id, data);
  if (result.success) {
    revalidatePath("/pharmacist-dashboard/category-recommendations");
  }
  return result;
};

export const getQuestionsAction = async (params?: Record<string, any>) => {
  const result = await PharmacistService.getQuestions(params);
  return result;
};

export const answerQuestionAction = async (
  questionId: string,
  data: { reply: string },
) => {
  const result = await PharmacistService.answerQuestion(questionId, data);
  if (result.success) {
    revalidatePath("/pharmacist-dashboard/questions");
  }
  return result;
};

export const updateReplyStatusAction = async (
  replyId: string,
  data: { status: string },
) => {
  const result = await PharmacistService.updateReplyStatus(replyId, data);
  if (result.success) {
    revalidatePath("/pharmacist-dashboard/questions");
  }
  return result;
};

export const createQuestionAction = async (data: {
  medicineId: string;
  question: string;
}) => {
  const result = await PharmacistService.createQuestion(data);
  if (result.success) {
    revalidatePath(`/shop/${data.medicineId}`);
    revalidatePath("/pharmacist-dashboard/questions");
  }
  return result;
};
