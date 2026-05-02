import { Spinner } from "@/components/ui/spinner";
import { useWishlistAddMutation } from "@/lib/data/mutations/wishlist";
import { ProductListType } from "@/lib/types";
import debounce from "lodash.debounce";
import { HeartIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

function AddWishlistBtn({
  id,
  slug,
}: {
  id: ProductListType["id"];
  slug: ProductListType["slug"];
}) {
  const addToWishlistMutation = useWishlistAddMutation();

  const debouncedAdd = useMemo(
    () =>
      debounce(async (data: { product_id: string; slug: string }) => {
        await addToWishlistMutation.mutateAsync(data);
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
      className="group rounded-full p-2 border border-black hover:border-[#56cfe1] bg-transparent transition-all duration-200 flex items-center justify-center cursor-pointer"
      disabled={addToWishlistMutation.isPending}
    >
      {addToWishlistMutation.isPending ? (
        <Spinner className="size-5" />
      ) : (
        <HeartIcon
          className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
          strokeWidth={1.2}
        />
      )}
    </button>
  );
}

export default AddWishlistBtn;
