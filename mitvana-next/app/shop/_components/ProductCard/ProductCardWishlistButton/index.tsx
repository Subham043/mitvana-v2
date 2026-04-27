import { useAuthStore } from "@/lib/store/auth.store";
import { ProductListType } from "@/lib/types";
import ProductWishlistButton from "./ProductWishlistButton";
import ProductWishlistRemoveButton from "./ProductWishlistRemoveButton";
import ProductWishlistAddButton from "./ProductWishlistAddButton";

function ProductCardWishlistButton({
  is_in_wishlist,
  id,
  slug,
}: {
  is_in_wishlist: ProductListType["is_in_wishlist"];
  id: ProductListType["id"];
  slug: ProductListType["slug"];
}) {
  const authToken = useAuthStore((state) => state.authToken);
  if (!authToken) {
    return <ProductWishlistButton is_in_wishlist={is_in_wishlist} />;
  }

  if (is_in_wishlist) {
    return <ProductWishlistRemoveButton id={id} slug={slug} />;
  }
  return <ProductWishlistAddButton id={id} slug={slug} />;
}

export default ProductCardWishlistButton;
