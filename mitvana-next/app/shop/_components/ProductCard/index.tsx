import { ProductListType } from "@/lib/types";
import ProductCardInfo from "./ProductCardInfo";
import ProductCardTag from "./ProductCardTag";
import ProductCardQuickViewBtn from "./ProductCardQuickViewBtn";
import ProductCardWishlistButton from "./ProductCardWishlistButton";
import ProductCardImage from "./ProductCardImage";
import ProductCardCartBtn from "./ProductCardCartBtn";

type Props = {
  thumbnail: ProductListType["thumbnail"];
  thumbnail_link: ProductListType["thumbnail_link"];
  product_images: ProductListType["product_images"];
  slug: ProductListType["slug"];
  title: ProductListType["title"];
  name: ProductListType["name"];
  stock: ProductListType["stock"];
  tags: ProductListType["tags"];
  price: ProductListType["price"];
  discounted_price: ProductListType["discounted_price"];
  id: ProductListType["id"];
};

function ProductCard({
  thumbnail,
  thumbnail_link,
  product_images,
  slug,
  title,
  name,
  stock,
  tags,
  price,
  discounted_price,
  id,
}: Props) {
  return (
    <div
      className="relative pb-3 w-full afacad-flux flex justify-between h-full flex-col cursor-pointer group"
      // onClick={handleClick}
    >
      <div className="relative overflow-hidden flex flex-col gap-4 h-full justify-between">
        {/* IMAGE SECTION */}
        <ProductCardImage
          thumbnail={thumbnail}
          thumbnail_link={thumbnail_link}
          product_images={product_images}
          name={name}
          slug={slug}
        />

        <ProductCardCartBtn
          stock={stock}
          id={id}
          title={title}
          price={price}
          discounted_price={discounted_price}
          thumbnail={thumbnail}
          thumbnail_link={thumbnail_link}
          slug={slug}
        />

        {/* DESKTOP WISHLIST */}
        <ProductCardWishlistButton />

        {/* QUICK VIEW (DESKTOP) */}
        <ProductCardQuickViewBtn />

        {/* TAG */}
        <ProductCardTag tags={tags} />
      </div>

      {/* PRODUCT INFO */}
      <ProductCardInfo
        title={title}
        price={price}
        discounted_price={discounted_price}
      />
    </div>
  );
}

export default ProductCard;
