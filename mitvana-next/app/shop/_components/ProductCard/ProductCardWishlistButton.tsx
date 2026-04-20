import { Heart, HeartIcon } from "lucide-react";

function ProductCardWishlistButton() {
  return (
    <button
      className="lg:flex absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-sky-700"
      // onClick={(e) => e.stopPropagation()}
    >
      {false ? (
        <Heart
          style={{ color: "red" }}
          className="w-4 h-4"
          // onClick={(e) => handleRemoveWishlist(e)}
        />
      ) : (
        <HeartIcon
          className="w-4 h-4"
          // onClick={(e) => handleWishlistAdd(e, product)}
        />
      )}
    </button>
  );
}

export default ProductCardWishlistButton;
