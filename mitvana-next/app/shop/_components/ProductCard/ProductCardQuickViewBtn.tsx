import { useQuickViewStore } from "@/lib/store/quickview.store";
import { ProductListType } from "@/lib/types";
import { Eye } from "lucide-react";

function ProductCardQuickViewBtn({ slug }: { slug: ProductListType["slug"] }) {
  const setModal = useQuickViewStore((s) => s.setModal);
  return (
    <div className="lg:flex flex-col gap-2 absolute top-[40%] left-1/2 -translate-x-1/2 opacity-0 translate-y-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300 z-10 cursor-pointer">
      <button
        onClick={() => setModal({ show: true, slug })}
        className="group/eye relative overflow-hidden bg-white px-4 py-4 shadow rounded-full text-sm flex items-center justify-center w-[100px] hover:bg-[#222] hover:text-white ease-in-out duration-300"
      >
        {/* TEXT */}
        <span className="absolute transition-all duration-300 ease-out w-full text-center translate-y-0 opacity-100 group-hover/eye:-translate-y-full group-hover/eye:opacity-0">
          Quick View
        </span>

        {/* ICON */}
        <span className="absolute transition-all duration-300 ease-out w-full text-center translate-y-full opacity-0 group-hover/eye:translate-y-0 group-hover/eye:opacity-100 cursor-pointer">
          <Eye className="mx-auto w-5 h-5" />
        </span>
      </button>
    </div>
  );
}

export default ProductCardQuickViewBtn;
