import { ProductListType } from "@/lib/types";

function ProductCardTag({ tags }: { tags: ProductListType["tags"] }) {
  if (!tags.length) return null;
  return (
    <p className="absolute top-0 left-0 px-2 py-1 w-fit h-fit bg-red-400 text-white text-xs">
      {tags[0].name}
    </p>
  );
}

export default ProductCardTag;
