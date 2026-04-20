import { Heart } from "lucide-react";

function ProductItemInfoWishlistBtn() {
  return (
    <button className="group rounded-full p-2 border border-black hover:border-[#56cfe1] bg-transparent transition-all duration-200 flex items-center justify-center">
      <Heart
        className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
        strokeWidth={1.2}
      />
    </button>
  );
}

export default ProductItemInfoWishlistBtn;
