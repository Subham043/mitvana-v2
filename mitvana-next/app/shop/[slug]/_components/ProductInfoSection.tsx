import ProductInfoTopSection from "./ProductInfoTopSection";
import ProductTabSection from "./ProductTabSection";
import ProductRecommendation from "./ProductRecommendation";

function ProductInfoSection() {
  return (
    <div>
      <div className="container mx-auto">
        <ProductInfoTopSection />
      </div>
      <div className="bg-[#f6f6f8]">
        <div className="container mx-auto">
          <ProductTabSection />
        </div>
      </div>
      <div className="container mx-auto">
        <ProductRecommendation />
      </div>
    </div>
  );
}

export default ProductInfoSection;
