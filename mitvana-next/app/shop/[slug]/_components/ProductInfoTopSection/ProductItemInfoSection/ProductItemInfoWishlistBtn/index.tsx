import { useAuthStore } from "@/lib/store/auth.store";
import { ProductType } from "@/lib/types";
import WishlistBtn from "./WishlistBtn";
import RemoveWishlistBtn from "./RemoveWishlistBtn";
import AddWishlistBtn from "./AddWishlistBtn";

function ProductItemInfoWishlistBtn({
  is_in_wishlist,
  id,
  slug,
}: {
  is_in_wishlist: ProductType["is_in_wishlist"];
  id: ProductType["id"];
  slug: ProductType["slug"];
}) {
  const authToken = useAuthStore((state) => state.authToken);
  if (!authToken) {
    return <WishlistBtn is_in_wishlist={is_in_wishlist} />;
  }

  if (is_in_wishlist) {
    return <RemoveWishlistBtn id={id} slug={slug} />;
  }
  return <AddWishlistBtn id={id} slug={slug} />;
}

export default ProductItemInfoWishlistBtn;
