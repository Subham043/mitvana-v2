import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/lib/types";

function ProductTabInformation({
  features,
}: {
  features: ProductType["features"];
}) {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      <CardContent className="text-sm text-muted-foreground px-0">
        <div className="product-description">
          <div
            dangerouslySetInnerHTML={{
              __html: features
                ? features
                : "<p class='text-sm text-muted-foreground text-center italic'>No features available</p>",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductTabInformation;
