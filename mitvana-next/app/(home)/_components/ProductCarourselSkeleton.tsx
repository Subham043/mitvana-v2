import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Flower } from "lucide-react";

const ARRAY_LIST = Array.from({ length: 5 }, (_, index) => index + 1);

function ProductCarourselSkeleton({ title }: { title: string }) {
  return (
    <div className="mt-12 mb-12 lg:mt-24 lg:mb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-2">{title}</h1>
        <span className="flex items-center justify-center gap-2">
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
          <Flower className="w-5 h-5 text-[#878787]" />
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {ARRAY_LIST.map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductCarourselSkeleton;
