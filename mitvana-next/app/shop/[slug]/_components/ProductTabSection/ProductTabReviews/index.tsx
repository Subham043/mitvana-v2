import { Card, CardContent } from "@/components/ui/card";
import StatsSection from "./StatsSection";
import CommentSection from "./CommentSection";
import { ProductType } from "@/lib/types";

function ProductTabReviews({ id }: { id: ProductType["id"] }) {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      <CardContent className="text-sm text-muted-foreground px-0">
        <StatsSection id={id} />
        <CommentSection id={id} />
      </CardContent>
    </Card>
  );
}

export default ProductTabReviews;
