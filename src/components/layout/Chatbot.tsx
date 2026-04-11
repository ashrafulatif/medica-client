"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { chatWithAssistantAction } from "@/actions/chatbot.action";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hello! I am your Medica AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const history = messages
      .filter((m) => m.id !== "welcome-message")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAssistantAction(
        userMessage.content,
        history,
      );

      if (response?.success && response?.data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response.data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Sorry, I am having trouble connecting to my service right now. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "An unexpected error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window-motion"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[500px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-primary/10 mb-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 animate-pulse text-white" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">Medica AI</h3>
                  <span className="text-[10px] text-white/80">
                    Always here to help
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex w-full gap-2",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-7 w-7 mt-1 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/20 bg-primary/10 text-primary">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "flex max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted border border-border/50 text-foreground rounded-tl-sm",
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-full justify-start gap-2"
                  >
                    <div className="flex h-7 w-7 mt-1 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/20 bg-primary/10 text-primary">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-muted border border-border/50 px-4 py-3 text-sm shadow-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="border-t bg-card/50 p-3 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (input.trim() && !isLoading) {
                        handleSubmit(e);
                      }
                    }
                  }}
                  placeholder="Ask Medica AI..."
                  className="max-h-[120px] min-h-[44px] w-full resize-none rounded-xl border border-input bg-background/80 px-3 py-3 text-sm flex-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  disabled={isLoading}
                  rows={1}
                />
                <motion.div
                  whileHover={!isLoading && input.trim() ? { scale: 1.05 } : {}}
                  whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
                >
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="h-[44px] w-[44px] rounded-xl mb-0 shrink-0 bg-primary hover:bg-primary/90 transition-all shadow-sm disabled:bg-muted disabled:text-muted-foreground"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-button-motion"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all hover:shadow-primary/50 border-2 border-primary/20 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Sparkles className="relative z-10 h-6 w-6 group-hover:animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
