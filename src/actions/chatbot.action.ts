"use server";
import { ChatbotService } from "@/services/chatbot.service";

export const chatWithAssistantAction = async (message: string, history: Array<{role: "user" | "assistant"; content: string}>) => {
  return await ChatbotService.chatWithAssistant(message, history);
};
