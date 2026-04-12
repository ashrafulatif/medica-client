"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { createQuestionAction } from "@/actions/pharmacist.action";
import { formatDate } from "@/helpers/formatData";

interface MedicineQuestionsProps {
  medicineId: string;
  questions: any[];
}

export default function MedicineQuestions({ medicineId, questions }: MedicineQuestionsProps) {
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      const res = await createQuestionAction({
        medicineId,
        question: newQuestion,
      });

      if (res.success) {
        toast.success("Question submitted successfully!");
        setNewQuestion("");
      } else {
        toast.error(res.error || "Failed to submit question. Only logged in customers can ask questions.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8 border-none shadow-sm bg-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageCircle className="h-5 w-5 text-primary" />
          Q&A with Pharmacists
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question about this medicine..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            className="bg-background"
          />
          <Button onClick={handleSubmit} disabled={loading || !newQuestion.trim()}>
            {loading ? "Sending..." : (
              <>
                <span className="hidden sm:inline">Ask Question</span>
                <Send className="sm:hidden h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {questions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No questions yet. Be the first to ask!
            </div>
          ) : (
            questions.map((q) => (
              <div key={q.id} className="bg-background p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold text-sm">
                      {q.customer?.name || "Customer"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {q.createdAt ? formatDate(q.createdAt) : "Recently"}
                    </span>
                  </div>
                  {q.status === "OPEN" ? (
                    <Badge variant="secondary" className="text-[10px]">Open</Badge>
                  ) : (
                    <Badge variant="default" className="text-[10px] bg-green-600 hover:bg-green-700">Answered</Badge>
                  )}
                </div>
                
                <p className="text-sm font-medium mb-3">Q: {q.question}</p>

                {q.replies && q.replies.length > 0 ? (
                  <div className="space-y-2 mt-3 pl-4 border-l-2 border-primary/20">
                    {q.replies.map((reply: any) => (
                      <div key={reply.id} className="bg-primary/5 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary">Pharmacist</span>
                          <span className="text-[10px] text-muted-foreground">
                            {reply.createdAt ? formatDate(reply.createdAt) : ""}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90">{reply.reply}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-muted-foreground mt-2 pl-4 border-l-2 border-muted">
                    Awaiting response from a pharmacist...
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}