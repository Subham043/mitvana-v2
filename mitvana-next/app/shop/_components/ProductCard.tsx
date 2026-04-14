import { Eye, Heart, HeartIcon } from "lucide-react";
import Link from "next/link";

function ProductCard({ product }: any) {
  return (
    <div
      className="relative pb-3 w-full afacad-flux flex justify-between h-full flex-col cursor-pointer group"
      // onClick={handleClick}
    >
      <div className="relative overflow-hidden flex flex-col gap-4 h-full justify-between">
        {/* IMAGE SECTION */}
        {product?.thumbnail && (
          <>
            <div className="aspect-square flex items-center justify-center overflow-hidden relative">
              {/* Default Image */}
              <img
                src={"https://api.mitvana.com/" + product.thumbnail}
                alt={product.name}
                className="absolute inset-0 w-full h-full
      transition-all duration-500 ease-out
      scale-100 opacity-100
      group-hover:scale-110 group-hover:opacity-0"
              />

              {/* Hover Image */}
              {product.images?.length > 0 && (
                <img
                  src={"https://api.mitvana.com/" + product.images[0]}
                  alt={product.name}
                  className="
      absolute inset-0 w-full h-full
        transition-all duration-500 ease-out
        scale-100 opacity-0
        group-hover:scale-110 group-hover:opacity-100"
                />
              )}
            </div>

            {/* BUTTON */}
            <button
              className="hover:bg-sky-700 cursor-pointer z-[1] text-gray-50 bg-[#193A43] py-2 transition-all duration-300"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   product.stock > 0
              //     ? handleAddtoCart(product, selectedColor)
              //     : handleNotifyMeClick(product);
              // }}
            >
              {product.stock > 0 ? "Add to Cart" : "Notify Me"}
            </button>
          </>
        )}

        {/* DESKTOP WISHLIST */}
        {product?._id && (
          <Link
            href=""
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
          </Link>
        )}

        {/* QUICK VIEW (DESKTOP) */}
        <div
          className="
    lg:flex flex-col gap-2 absolute top-[40%] left-1/2 -translate-x-1/2
    opacity-0 translate-y-0
    group-hover:opacity-100 group-hover:translate-y-4
    transition-all duration-300 z-10
  "
        >
          <Link
            href=""
            className="group/eye relative overflow-hidden bg-white px-4 py-4 shadow rounded-full text-sm flex items-center justify-center w-[100px] hover:bg-[#222] hover:text-white ease-in-out duration-300"
          >
            {/* TEXT */}
            <span
              className="
        absolute transition-all duration-300 ease-out
        w-full text-center
        translate-y-0 opacity-100
        group-hover/eye:-translate-y-full group-hover/eye:opacity-0
      "
            >
              Quick View
            </span>

            {/* ICON */}
            <span
              className="
        absolute transition-all duration-300 ease-out
        w-full text-center
        translate-y-full opacity-0
        group-hover/eye:translate-y-0 group-hover/eye:opacity-100
      "
            >
              <Eye className="mx-auto w-5 h-5" />
            </span>
          </Link>
        </div>

        {/* TAG */}
        <p className="absolute top-0 left-0 px-2 py-1 w-fit h-fit bg-red-400 text-white text-xs">
          {product?.tags?.[0]?.name}
        </p>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-3">
        <h6 className="mb-1 fw-medium text-center">
          <button className="text-center line-clamp-1 w-full">
            {product.name}
          </button>
        </h6>

        {product?.discountedPrice ? (
          <p className="mb-0 text-center">
            <del className="text-[#878787]">
              ₹{parseInt(product.price)?.toFixed(2)}
            </del>{" "}
            <span>₹{parseInt(product.discountedPrice)?.toFixed(2)}</span>
          </p>
        ) : (
          <p className="mb-0 text-center">
            ₹{parseInt(product.price)?.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
