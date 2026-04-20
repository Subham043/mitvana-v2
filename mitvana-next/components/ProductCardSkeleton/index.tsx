import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-xs outline-none border-none shadow-none ring-0">
      <CardContent>
        <Skeleton className="h-64 w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </CardHeader>
    </Card>
  );
}

export default ProductCardSkeleton;
