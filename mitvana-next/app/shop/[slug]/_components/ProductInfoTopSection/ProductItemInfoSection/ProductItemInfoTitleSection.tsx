import { ProductType } from "@/lib/types";
import { Star } from "lucide-react";

type Props = {
  title: ProductType["title"];
  sub_title: ProductType["sub_title"];
  reviews_count: ProductType["reviews_count"];
};

function ProductItemInfoTitleSection({
  title,
  sub_title,
  reviews_count,
}: Props) {
  return (
    <>
      <h1 className="mb-1 text-3xl font-semibold text-wrap">{title}</h1>

      {sub_title && <p className="mb-1 text-sm">{sub_title}</p>}

      <div className="flex gap-3 items-center">
        <span className="flex gap-1 items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="w-4 h-4 text-yellow-500 fill-yellow-500"
            />
          ))}
        </span>
        <p className="text-sm">({reviews_count} reviews)</p>
      </div>

      <p className="text-zinc-500 text-xs mt-3">
        <span className="font-bold">200+ bought</span> in past month
      </p>
    </>
  );
}

export default ProductItemInfoTitleSection;
