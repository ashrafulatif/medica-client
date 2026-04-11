import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";

export const ChatbotService = {
  chatWithAssistant: async (message: string, history: Array<{role: "user" | "assistant"; content: string}>) => {
    try {
      const url = new URL(buildApiUrl(API_ENDPOINTS.chatbot.chat));

      const result = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history }),
        cache: "no-store",
      });

      const data = await result.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to communicate with AI assistant",
      };
    }
  },
};
