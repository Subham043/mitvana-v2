import { ProductListType } from "@/lib/types";

function ProductCardCartBtn({ stock }: { stock: ProductListType["stock"] }) {
  return (
    <button
      className="hover:bg-sky-700 cursor-pointer z-1 text-gray-50 bg-[#193A43] py-2 transition-all duration-300"
      // onClick={(e) => {
      //   e.stopPropagation();
      //   product.stock > 0
      //     ? handleAddtoCart(product, selectedColor)
      //     : handleNotifyMeClick(product);
      // }}
    >
      {stock > 0 ? "Add to Cart" : "Notify Me"}
    </button>
  );
}

export default ProductCardCartBtn;
