import { Spinner } from "@/components/ui/spinner";
import { useWishlistRemoveMutation } from "@/lib/data/mutations/wishlist";
import { ProductListType } from "@/lib/types";
import debounce from "lodash.debounce";
import { Heart } from "lucide-react";
import { useEffect, useMemo } from "react";

function RemoveWishlistBtn({
  id,
  slug,
}: {
  id: ProductListType["id"];
  slug: ProductListType["slug"];
}) {
  const removeFromWishlistMutation = useWishlistRemoveMutation();

  const debouncedRemove = useMemo(
    () =>
      debounce(async (data: { product_id: string; slug: string }) => {
        await removeFromWishlistMutation.mutateAsync(data);
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
      className="group rounded-full p-2 border border-black hover:border-[#56cfe1] bg-transparent transition-all duration-200 flex items-center justify-center cursor-pointer"
      disabled={removeFromWishlistMutation.isPending}
    >
      {removeFromWishlistMutation.isPending ? (
        <Spinner className="size-5" />
      ) : (
        <Heart
          className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
          strokeWidth={1.2}
          fill="red"
          stroke="red"
        />
      )}
    </button>
  );
}

export default RemoveWishlistBtn;
