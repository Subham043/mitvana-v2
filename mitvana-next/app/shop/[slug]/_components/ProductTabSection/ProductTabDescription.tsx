import { Card, CardContent } from "@/components/ui/card";

function ProductTabDescription({
  description,
}: {
  description: string | null;
}) {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      <CardContent className="text-sm text-muted-foreground px-0">
        <div className="product-description">
          <div
            dangerouslySetInnerHTML={{
              __html: description
                ? description
                : "<p>No description available</p>",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductTabDescription;
