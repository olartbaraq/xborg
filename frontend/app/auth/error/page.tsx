"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Suspense } from "react";

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "Authentication failed";

  useEffect(() => {
    // Log error for debugging
    console.error("Auth error:", errorMessage);
  }, [errorMessage]);

  return (
    <div className="min-h-screen bg-borg-dark flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <Card variant="glass">
          <CardContent className="text-center py-8">
            {/* Error Icon */}
            <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-white mb-2">
              Authentication Error
            </h1>
            <p className="text-borg-gray mb-8">{errorMessage}</p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push("/signin")}
                leftIcon={<RefreshCw className="h-4 w-4" />}
                className="w-full"
              >
                Try Again
              </Button>
              <Link href="/" className="w-full">
                <Button
                  variant="ghost"
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  className="w-full"
                >
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <p className="text-xs text-borg-gray mt-8">
              If this problem persists, please contact support or try clearing
              your browser cookies.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-borg-dark flex items-center justify-center">
          <div className="animate-pulse text-borg-gray">Loading...</div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
