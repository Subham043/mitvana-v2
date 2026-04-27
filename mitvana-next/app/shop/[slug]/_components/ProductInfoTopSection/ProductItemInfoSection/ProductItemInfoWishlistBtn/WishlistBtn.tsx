import { ProductListType } from "@/lib/types";
import { Heart, HeartIcon } from "lucide-react";
import Link from "next/link";

function WishlistBtn({
  is_in_wishlist,
}: {
  is_in_wishlist: ProductListType["is_in_wishlist"];
}) {
  return (
    <Link
      href="/auth/login"
      className="group rounded-full p-2 border border-black hover:border-[#56cfe1] bg-transparent transition-all duration-200 flex items-center justify-center"
    >
      {is_in_wishlist ? (
        <Heart
          style={{ color: "red" }}
          className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
          strokeWidth={1.2}
        />
      ) : (
        <HeartIcon
          className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
          strokeWidth={1.2}
        />
      )}
    </Link>
  );
}

export default WishlistBtn;
