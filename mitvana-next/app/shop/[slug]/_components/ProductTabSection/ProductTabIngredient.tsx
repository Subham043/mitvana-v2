import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/lib/types";

function ProductTabIngredient({
  ingredients,
}: {
  ingredients: ProductType["ingredients"];
}) {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      {ingredients && ingredients.length > 0 ? (
        <CardContent className="text-sm text-muted-foreground px-0">
          <div className="flex flex-wrap flex-col md:flex-row justify-center gap-4">
            {ingredients.map((item) => (
              <Card
                className="relative w-full max-w-[200px] pt-0 p-1 gap-2 ring-0"
                key={item.id}
              >
                <img
                  src={item.thumbnail_link ? item.thumbnail_link : undefined}
                  alt={item.title}
                  className="relative z-20 w-auto h-32 object-contain"
                />
                <CardHeader className="p-0 px-1 text-center">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="text-sm text-muted-foreground text-center italic px-0">
          No ingredients available
        </CardContent>
      )}
    </Card>
  );
}

export default ProductTabIngredient;
