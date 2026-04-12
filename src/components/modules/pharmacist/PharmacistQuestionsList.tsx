"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PaginationControls from "@/components/ui/pagination-control";
import { answerQuestionAction } from "@/actions/pharmacist.action";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatData";

export default function PharmacistQuestionsList({
  questions,
  meta,
}: {
  questions: any[];
  meta: any;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleReplyChange = (id: string, text: string) => {
    setReplyText((prev) => ({ ...prev, [id]: text }));
  };

  const handleReplySubmit = async (questionId: string) => {
    const text = replyText[questionId];
    if (!text?.trim()) {
      toast.error("Reply text cannot be empty");
      return;
    }

    try {
      setLoadingId(questionId);
      const res = await answerQuestionAction(questionId, { reply: text });

      if (res.success) {
        toast.success("Reply successfully sent!");
        setReplyText((prev) => {
          const newState = { ...prev };
          delete newState[questionId];
          return newState;
        });
      } else {
        toast.error(res.error || "Failed to post reply.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {questions?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-xl font-semibold mb-2">No active questions</p>
            <p className="text-muted-foreground">
              All customer queries have been addressed!
            </p>
          </CardContent>
        </Card>
      ) : (
        questions?.map((q: any) => (
          <Card key={q.id} className="relative overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Regarding: {q.medicine?.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Asked by {q.customer?.name} on{" "}
                    {q.createdAt ? formatDate(q.createdAt) : "Recently"}
                  </p>
                </div>
                <Badge
                  variant={q.status === "OPEN" ? "destructive" : "secondary"}
                >
                  {q.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="font-medium">"{q.question}"</p>
              </div>

              {q.status === "OPEN" && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your medical reply..."
                    className="flex-1"
                    value={replyText[q.id] || ""}
                    onChange={(e) => handleReplyChange(q.id, e.target.value)}
                  />
                  <Button
                    onClick={() => handleReplySubmit(q.id)}
                    disabled={loadingId === q.id || !replyText[q.id]?.trim()}
                  >
                    {loadingId === q.id ? "Sending..." : "Send Reply"}
                  </Button>
                </div>
              )}

              {/* Show existing replies */}
              {q.replies && q.replies.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Previous Replies
                  </h4>
                  {q.replies.map((reply: any) => (
                    <div
                      key={reply.id}
                      className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-blue-600">
                          Pharmacist {reply.pharmacist?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reply.createdAt ? formatDate(reply.createdAt) : ""}
                        </p>
                      </div>
                      <p className="text-sm">{reply.reply}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {meta && (
        <div className="flex justify-center mt-8">
          <PaginationControls meta={meta} />
        </div>
      )}
    </div>
  );
}
