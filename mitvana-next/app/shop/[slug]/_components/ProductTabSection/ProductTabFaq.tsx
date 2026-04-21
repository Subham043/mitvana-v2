import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/lib/types";

function ProductTabFaq({
  product_faqs,
}: {
  product_faqs: ProductType["product_faqs"];
}) {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      {product_faqs && product_faqs.length > 0 ? (
        <CardContent className="text-sm text-muted-foreground px-0">
          {product_faqs.map((faq) => (
            <div key={faq.id} className="mb-4">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      ) : (
        <CardContent className="text-sm text-muted-foreground text-center italic px-0">
          No FAQ available
        </CardContent>
      )}
    </Card>
  );
}

export default ProductTabFaq;
