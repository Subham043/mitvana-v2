import ProductCard from "@/app/shop/_components/ProductCard";
import { ProductType } from "@/lib/types";
import { Flower } from "lucide-react";

function ProductRecommendation({
  related_products,
}: {
  related_products: ProductType["related_products"];
}) {
  if (related_products.length === 0) return null;
  const getCols = (count: number, max: number) => Math.min(count, max);
  return (
    <div className=" mt-10 mb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-2">
          You May Also Like
        </h1>
        <span className="flex items-center justify-center gap-2">
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
          <Flower className="w-5 h-5 text-[#878787]" />
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
        </span>
      </div>
      <div
        className={`grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-${getCols(related_products.length, 4)} xl:grid-cols-${getCols(related_products.length, 5)} gap-5 justify-items-center`}
      >
        {related_products.map((item) => (
          <ProductCard
            key={item.id}
            thumbnail={item.thumbnail}
            thumbnail_link={
              item.thumbnail_link ? item.thumbnail_link : undefined
            }
            product_images={item.product_images}
            slug={item.slug}
            title={item.title}
            name={item.title}
            stock={item.stock}
            tags={item.tags}
            price={item.price}
            discounted_price={item.discounted_price ? item.discounted_price : 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductRecommendation;
