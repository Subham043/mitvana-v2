import EmptySection from "@/components/EmptySection";
import { Button } from "@/components/ui/button";
import { StickyNote } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full py-10">
      <div className="container mx-auto max-w-[90%]">
        <EmptySection
          title="404 - Not Found"
          description="The page you are looking for does not exist."
          Icon={StickyNote}
        />
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
