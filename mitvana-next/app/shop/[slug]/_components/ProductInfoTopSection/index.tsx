import { ProductType } from "@/lib/types";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductItemInfoSection from "./ProductItemInfoSection";

function ProductInfoTopSection({
  productInfoData,
}: {
  productInfoData: ProductType;
}) {
  const slides = [
    productInfoData.thumbnail_link,
    ...productInfoData.product_images.map((item) => item.image_link),
  ].filter((item) => item !== undefined);
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 py-10">
      <ProductImageCarousel slides={slides} />
      <ProductItemInfoSection productInfoData={productInfoData} />
    </div>
  );
}

export default ProductInfoTopSection;
