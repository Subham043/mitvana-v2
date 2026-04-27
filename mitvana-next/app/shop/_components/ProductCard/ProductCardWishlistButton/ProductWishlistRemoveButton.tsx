import { Spinner } from "@/components/ui/spinner";
import { useWishlistRemoveMutation } from "@/lib/data/mutations/wishlist";
import { ProductListType } from "@/lib/types";
import debounce from "lodash.debounce";
import { Heart } from "lucide-react";
import { useEffect, useMemo } from "react";

function ProductWishlistRemoveButton({
  id,
  slug,
}: {
  id: ProductListType["id"];
  slug: ProductListType["slug"];
}) {
  const removeFromWishlistMutation = useWishlistRemoveMutation();

  const debouncedRemove = useMemo(
    () =>
      debounce((data: { product_id: string; slug: string }) => {
        removeFromWishlistMutation.mutate(data);
      }, 500),
    [removeFromWishlistMutation],
  );

  // cleanup to avoid memory leaks / stale calls
  useEffect(() => {
    return () => {
      debouncedRemove.cancel();
    };
  }, [debouncedRemove]);
  return (
    <button
      onClick={() => debouncedRemove({ product_id: id, slug: slug })}
      className="lg:flex absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 fill-red-700 text-red-700 hover:text-red-700 cursor-pointer"
      disabled={removeFromWishlistMutation.isPending}
    >
      {removeFromWishlistMutation.isPending ? (
        <Spinner className="size-5" />
      ) : (
        <Heart
          className="w-5 h-5 fill-red-700 animate-bounce cursor-pointer"
          fill="red"
          stroke="red"
        />
      )}
    </button>
  );
}

export default ProductWishlistRemoveButton;
