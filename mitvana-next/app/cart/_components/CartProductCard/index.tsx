import {
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@/lib/data/mutations/cart";
import { useCartProductQuery } from "@/lib/data/queries/cart";
import { CartType } from "@/lib/types";
import Link from "next/link";
import { useCallback, useMemo } from "react";

function CartProductCard({ item }: { item: CartType["products"][0] }) {
  const { data: cartItem } = useCartProductQuery(item.product.id);
  const removeFromCartMutate = useRemoveCartMutation();
  const updateQuantityMutate = useUpdateCartMutation();

  const quantity = useMemo(() => {
    return cartItem ? cartItem.quantity : item.quantity;
  }, [cartItem, item]);

  const totalPrice = useMemo(() => {
    return cartItem
      ? cartItem.total_price_per_product
      : item.total_price_per_product;
  }, [cartItem, item]);

  const stock = useMemo(() => {
    return cartItem ? cartItem.product.stock : item.product.stock;
  }, [cartItem, item]);

  const price = useMemo(() => {
    return cartItem ? cartItem.product.price : item.product.price;
  }, [cartItem, item]);

  const discountedPrice = useMemo(() => {
    return cartItem
      ? cartItem.product.discounted_price
      : item.product.discounted_price;
  }, [cartItem, item]);

  const currentPrice = useMemo(() => {
    return discountedPrice ? discountedPrice : price;
  }, [discountedPrice, price]);

  const increaseQuantity = useCallback(async () => {
    if (quantity < stock) {
      await updateQuantityMutate.mutateAsync({
        productId: item.product.id,
        quantity: quantity + 1,
        stock,
      });
    }
  }, [updateQuantityMutate, item, quantity, stock]);

  const decreaseQuantity = useCallback(async () => {
    if (quantity > 1) {
      await updateQuantityMutate.mutateAsync({
        productId: item.product.id,
        quantity: quantity - 1,
        stock,
      });
    }
  }, [updateQuantityMutate, item, quantity, stock]);

  const handleRemoveFromCart = useCallback(async () => {
    await removeFromCartMutate.mutateAsync({ productId: item.product.id });
  }, [removeFromCartMutate, item]);

  return (
    <div className="flex items-center py-3 border-b md:px-4">
      <div className="w-1/2">
        <div className="flex flex-wrap gap-3 items-start">
          <Link href={`/shop/${item.product.slug}`} className="cursor-pointer">
            <img
              src={item.product.thumbnail_link}
              alt=""
              width={70}
              className="h-20 object-cover"
            />
          </Link>
          <div className="w-full md:w-auto">
            <Link
              href={`/shop/${item.product.slug}`}
              className="cursor-pointer m-0 p-0 font-semibold text-sm inline"
            >
              {item.product.title}
            </Link>
            <div className="flex flex-col gap-2">
              {item.color && (
                <p className="text-sm">Color: {item.color.name}</p>
              )}
              <button onClick={handleRemoveFromCart} className="cursor-pointer">
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
        {/* Product Price */}₹{currentPrice}
      </div>
      <div className="w-1/2 md:w-1/4">
        {/* Quantity Controls */}
        <div className="inline-flex p-4 h-5 md:h-10 border rounded-full items-center justify-between">
          <button
            className="text-lg hover:cursor-pointer hover:text-red-500"
            onClick={decreaseQuantity}
          >
            −
          </button>
          <input
            type="text"
            readOnly
            value={quantity}
            className="w-20 text-center border-none outline-none"
          />
          <button
            className="text-lg hover:cursor-pointer hover:text-green-500"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-1/4 text-right text-sm">
        {/* Total Price */}₹{totalPrice}
      </div>
    </div>
  );
}

export default CartProductCard;
