"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    // Use Better Auth client method for email verification
    const verifyEmail = async () => {
      try {
        const { data, error } = await authClient.verifyEmail({
          query: {
            token: token,
          },
        });

        if (error) {
          setStatus("error");
          setMessage(error.message || "Verification failed");
        } else {
          setStatus("success");
          setMessage("Email verified successfully!");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Something went wrong");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          {status === "loading" && (
            <div>
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="mt-2">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="mt-2">{message}</p>
              <p className="text-sm text-muted-foreground">
                Redirecting to login...
              </p>
            </div>
          )}

          {status === "error" && (
            <div>
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-2">{message}</p>
              <Button onClick={() => router.push("/login")} className="mt-4">
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
