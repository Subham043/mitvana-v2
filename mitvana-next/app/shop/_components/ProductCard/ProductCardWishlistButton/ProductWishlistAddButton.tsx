import { Spinner } from "@/components/ui/spinner";
import { useWishlistAddMutation } from "@/lib/data/mutations/wishlist";
import { ProductListType } from "@/lib/types";
import debounce from "lodash.debounce";
import { HeartIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

function ProductWishlistAddButton({
  id,
  slug,
}: {
  id: ProductListType["id"];
  slug: ProductListType["slug"];
}) {
  const addToWishlistMutation = useWishlistAddMutation();

  const debouncedAdd = useMemo(
    () =>
      debounce((data: { product_id: string; slug: string }) => {
        addToWishlistMutation.mutate(data);
      }, 500),
    [addToWishlistMutation],
  );

  // cleanup to avoid memory leaks / stale calls
  useEffect(() => {
    return () => {
      debouncedAdd.cancel();
    };
  }, [debouncedAdd]);

  return (
    <button
      onClick={() => debouncedAdd({ product_id: id, slug: slug })}
      className="lg:flex absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-sky-700 cursor-pointer"
      disabled={addToWishlistMutation.isPending}
    >
      {addToWishlistMutation.isPending ? (
        <Spinner className="size-5" />
      ) : (
        <HeartIcon className="w-5 h-5" />
      )}
    </button>
  );
}

export default ProductWishlistAddButton;
