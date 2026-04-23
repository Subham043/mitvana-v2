import { useCartStore } from "@/lib/store/cart.store";
import { CartType } from "@/lib/types";

function CartProductCard({ item }: { item: CartType["products"][0] }) {
  const cartItem = useCartStore((state) => state.item(item.product.id, null));
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="flex items-center py-3 border-b md:px-4">
      <div className="w-1/2">
        <div className="flex flex-wrap gap-3 items-start">
          <img
            src={item.product.thumbnail_link}
            alt=""
            width={70}
            className="h-20 object-cover"
          />
          <div className="w-full md:w-auto">
            <h6 className="m-0 p-0 font-semibold text-sm">
              {item.product.title}
            </h6>
            <div className="flex flex-col gap-2">
              {item.color && (
                <p className="text-sm">Color: {item.color.name}</p>
              )}
              <button
                onClick={() => removeFromCart(item.product.id, null)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="red"
                  className="bi bi-trash-fill mt-[10px]"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 text-sm">
        {/* Product Price */}₹
        {item.product.discounted_price
          ? item.product.discounted_price
          : item.product.price}
      </div>
      <div className="w-1/2 md:w-1/4">
        {/* Quantity Controls */}
        <div className="inline-flex p-4 h-5 md:h-10 border rounded-full items-center justify-between">
          <button
            className="text-lg hover:cursor-pointer hover:text-red-500"
            onClick={() =>
              updateQuantity(
                item.product.id,
                Math.max((cartItem ? cartItem.quantity : item.quantity) - 1, 1),
                null,
              )
            }
          >
            −
          </button>
          <input
            type="text"
            readOnly
            value={cartItem ? cartItem.quantity : item.quantity}
            className="w-20 text-center border-none outline-none"
          />
          <button
            className="text-lg hover:cursor-pointer hover:text-green-500"
            onClick={() =>
              updateQuantity(
                item.product.id,
                Math.min(
                  (cartItem ? cartItem.quantity : item.quantity) + 1,
                  item.product.stock,
                ),
                null,
              )
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="w-1/4 text-right text-sm">
        {/* Total Price */}₹{item.total_price_per_product.toFixed(2)}
      </div>
    </div>
  );
}

export default CartProductCard;
