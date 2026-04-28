"use client";
import EmptySection from "@/components/EmptySection";
import { Button } from "@/components/ui/button";
import { isAxiosError } from "axios";
import { StickyNote } from "lucide-react";
import Link from "next/link";

// Error boundaries must be Client Components

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  if (isAxiosError(error)) {
    const status = error.response?.status || 500;
    const statusText = error.response?.statusText || "Internal Server Error";
    const message = error.response?.data?.message || "Something went wrong";
    return (
      <div className="w-full py-10">
        <div className="container mx-auto max-w-[90%]">
          <EmptySection
            title={`${status} - ${statusText}`}
            description={message}
            Icon={StickyNote}
          />
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => unstable_retry()}
            >
              Retry
            </Button>
            <Button variant="default" className="cursor-pointer" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-10">
      <div className="container mx-auto max-w-[90%]">
        <EmptySection
          title={`500 - Internal Server Error`}
          description="Something went wrong"
          Icon={StickyNote}
        />
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => unstable_retry()}
          >
            Retry
          </Button>
          <Button variant="default" className="cursor-pointer" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
