"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Star, Loader2, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/context/authContext";
import { postReviewAction } from "@/actions/review.action";
import Link from "next/link";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(2, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

interface SubmitReviewProps {
  medicineId: string;
}

const SubmitReview = ({ medicineId }: SubmitReviewProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useSession();

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const newReview = {
          medicineId,
          rating: value.rating,
          comment: value.comment,
        };

        const response = await postReviewAction(newReview);

        if (!response.data && response.error) {
          throw new Error(response.error || "Failed to submit review");
        }

        toast.success("Review submitted successfully!");
        form.reset();
      } catch (error: any) {
        toast.error(error.message || "Failed to submit review");
        console.error("Review submission error:", error);
      }
    },
  });

  // if not loggin
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5" />
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please log in to write a review
            </p>
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          Write a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Rating Field */}
            <form.Field
              name="rating"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Rating <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => field.handleChange(star)}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredRating || field.state.value)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm text-muted-foreground">
                        {field.state.value > 0
                          ? `${field.state.value} star${field.state.value > 1 ? "s" : ""}`
                          : "Select rating"}
                      </span>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Comment Field */}
            <form.Field
              name="comment"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Your Review <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Share your experience with this medicine..."
                      className="min-h-[100px] resize-none"
                      maxLength={500}
                      aria-invalid={isInvalid}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {field.state.value.length}/500
                      </span>
                    </div>
                  </Field>
                );
              }}
            />
          </FieldGroup>

          {/* Submit Button */}
          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitReview;
