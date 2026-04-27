import { ProductType } from "@/lib/types";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductItemInfoSection from "./ProductItemInfoSection";

type Props = {
  title: ProductType["title"];
  sub_title: ProductType["sub_title"];
  reviews_count: ProductType["reviews_count"];
  discounted_price: ProductType["discounted_price"];
  price: ProductType["price"];
  saved_price: ProductType["saved_price"];
  saved_percentage: ProductType["saved_percentage"];
  child_products: ProductType["child_products"];
  product_images: ProductType["product_images"];
  thumbnail_link: ProductType["thumbnail_link"];
  stock: ProductType["stock"];
  id: ProductType["id"];
  thumbnail: ProductType["thumbnail"];
  slug: ProductType["slug"];
  hsn: ProductType["hsn"];
  sku: ProductType["sku"];
  is_in_wishlist: ProductType["is_in_wishlist"];
};

function ProductInfoTopSection({
  title,
  sub_title,
  reviews_count,
  discounted_price,
  price,
  saved_price,
  saved_percentage,
  child_products,
  product_images,
  thumbnail_link,
  stock,
  id,
  thumbnail,
  slug,
  hsn,
  sku,
  is_in_wishlist,
}: Props) {
  const slides = [
    thumbnail_link,
    ...product_images.map((item) => item.image_link),
  ].filter((item) => item !== undefined);
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 py-10">
      <ProductImageCarousel slides={slides} />
      <ProductItemInfoSection
        title={title}
        sub_title={sub_title}
        reviews_count={reviews_count}
        discounted_price={discounted_price}
        price={price}
        saved_price={saved_price}
        saved_percentage={saved_percentage}
        child_products={child_products}
        stock={stock}
        id={id}
        thumbnail={thumbnail}
        thumbnail_link={thumbnail_link}
        slug={slug}
        hsn={hsn}
        sku={sku}
        is_in_wishlist={is_in_wishlist}
      />
    </div>
  );
}

export default ProductInfoTopSection;
