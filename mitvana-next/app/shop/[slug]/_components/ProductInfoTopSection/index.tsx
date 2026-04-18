import ProductImageCarousel from "./ProductImageCarousel";
import ProductItemInfoSection from "./ProductItemInfoSection";

function ProductInfoTopSection({ productInfoData }: any) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 py-10">
      <ProductImageCarousel />
      <ProductItemInfoSection productInfoData={productInfoData} />
    </div>
  );
}

export default ProductInfoTopSection;
