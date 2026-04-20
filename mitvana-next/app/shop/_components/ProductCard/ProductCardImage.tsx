import { ProductListType } from "@/lib/types";
import Link from "next/link";

type Props = {
  thumbnail: ProductListType["thumbnail"];
  thumbnail_link: ProductListType["thumbnail_link"];
  product_images: ProductListType["product_images"];
  slug: ProductListType["slug"];
  name: ProductListType["name"];
};

function ProductCardImage({
  thumbnail,
  thumbnail_link,
  product_images,
  slug,
  name,
}: Props) {
  if (!thumbnail) return null;
  return (
    <Link
      href={`/shop/${slug}`}
      className="aspect-square flex items-center justify-center overflow-hidden relative"
    >
      {/* Default Image */}
      <img
        src={thumbnail_link}
        alt={name ? name : undefined}
        className="object-cover absolute inset-0 w-full h-full transition-all duration-500 ease-out scale-100 opacity-100 group-hover:scale-110 group-hover:opacity-0"
      />

      {/* Hover Image */}
      {product_images.length > 0 && (
        <img
          src={product_images[0].image_link}
          alt={name ? name : undefined}
          className="object-cover absolute inset-0 w-full h-full transition-all duration-500 ease-out scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100"
        />
      )}
    </Link>
  );
}

export default ProductCardImage;
