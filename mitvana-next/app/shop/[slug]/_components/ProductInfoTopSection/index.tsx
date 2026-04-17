import ProductImageCarousel from "./ProductImageCarousel";
import ProductItemInfoSection from "./ProductItemInfoSection";

function ProductInfoTopSection({ productInfoData }: any) {
  return (
    <div className="flex justify-between gap-10 py-10">
      <ProductImageCarousel />
      <ProductItemInfoSection productInfoData={productInfoData} />
    </div>
  );
}

export default ProductInfoTopSection;
