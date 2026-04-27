import { ProductListType } from "@/lib/types";
import { Heart, HeartIcon } from "lucide-react";
import Link from "next/link";

function ProductWishlistButton({
  is_in_wishlist,
}: {
  is_in_wishlist: ProductListType["is_in_wishlist"];
}) {
  return (
    <Link
      href="/auth/login"
      className="lg:flex absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-sky-700 cursor-pointer"
    >
      {is_in_wishlist ? (
        <Heart style={{ color: "red" }} className="w-4 h-4" />
      ) : (
        <HeartIcon className="w-4 h-4" />
      )}
    </Link>
  );
}

export default ProductWishlistButton;
