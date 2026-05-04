import { env } from "@/config/env";
import { useToast } from "@/hooks/useToast";
import {
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@/lib/data/mutations/cart";
import { useCartProductQuery } from "@/lib/data/queries/cart";
import { CartType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

function CartProductCard({ item }: { item: CartType["products"][0] }) {
  const { data: cartItem } = useCartProductQuery(item.product.id);
  const removeFromCartMutate = useRemoveCartMutation();
  const updateQuantityMutate = useUpdateCartMutation();
  const { toastError } = useToast();

  const quantity = useMemo(() => {
    return cartItem ? cartItem.quantity : item.quantity;
  }, [cartItem?.quantity, item.quantity]);

  const totalPrice = useMemo(() => {
    return cartItem
      ? cartItem.total_discounted_price_per_product
      : item.total_discounted_price_per_product;
  }, [
    cartItem?.total_discounted_price_per_product,
    item.total_discounted_price_per_product,
  ]);

  const stock = useMemo(() => {
    return cartItem ? cartItem.product.stock : item.product.stock;
  }, [cartItem?.product.stock, item.product.stock]);

  const price = useMemo(() => {
    return cartItem ? cartItem.product.price : item.product.price;
  }, [cartItem?.product.price, item.product.price]);

  const discountedPrice = useMemo(() => {
    return cartItem
      ? cartItem.product.discounted_price
      : item.product.discounted_price;
  }, [cartItem?.product.discounted_price, item.product.discounted_price]);

  const currentPrice = useMemo(() => {
    return discountedPrice ? discountedPrice : price;
  }, [discountedPrice, price]);

  const stockStatus = useMemo(() => {
    if (stock <= 0) {
      return {
        status: "Out of stock",
        textColor: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
      };
    }
    if (quantity > stock) {
      return {
        status: `Only ${stock} left in stock`,
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
      };
    }
    return null;
  }, [stock, quantity]);

  const handleRemoveFromCart = useCallback(async () => {
    await removeFromCartMutate.mutateAsync({ productId: item.product.id });
  }, [removeFromCartMutate, item]);

  const increaseQuantity = useCallback(async () => {
    if (stock <= 0) {
      toastError(`Sorry! ${item.product.title} is out of stock`);
      return;
    }

    const newQuantity = Math.min(quantity + 1, stock);

    if (newQuantity === quantity) {
      toastError(`Maximum quantity for ${item.product.title} is ${stock}`);
      return;
    }

    await updateQuantityMutate.mutateAsync({
      productId: item.product.id,
      quantity: newQuantity,
      stock,
    });
  }, [updateQuantityMutate, item, quantity, stock, toastError]);

  const decreaseQuantity = useCallback(async () => {
    if (stock <= 0) {
      await handleRemoveFromCart();
      return;
    }
    if (quantity <= 1) {
      toastError(`Minimum quantity for ${item.product.title} is 1`);
      return;
    }

    const newQuantity = Math.min(quantity - 1, stock);

    await updateQuantityMutate.mutateAsync({
      productId: item.product.id,
      quantity: newQuantity,
      stock,
    });
  }, [
    updateQuantityMutate,
    item,
    quantity,
    stock,
    handleRemoveFromCart,
    toastError,
  ]);

  return (
    <div
      className={`flex items-center py-3 border-b md:px-4 ${
        stockStatus ? stockStatus.bgColor : ""
      }`}
    >
      <div className="w-1/2">
        <div className="flex flex-wrap gap-3 items-start">
          <Link href={`/shop/${item.product.slug}`} className="cursor-pointer">
            <Image
              src={
                item.product.thumbnail_link ? item.product.thumbnail_link : ""
              }
              alt=""
              width={100}
              height={100}
              className="h-20 object-cover"
              unoptimized={env.MODE === "development"}
            />
          </Link>
          <div className="w-full md:w-auto">
            <Link
              href={`/shop/${item.product.slug}`}
              className="cursor-pointer m-0 p-0 font-semibold text-sm inline"
            >
              {item.product.title}
            </Link>
            <div className="flex flex-col gap-1">
              {stockStatus && (
                <p className={`text-sm ${stockStatus.textColor} `}>
                  {stockStatus.status}
                </p>
              )}
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
        <div
          className={`inline-flex p-4 h-5 md:h-10 border ${stockStatus ? stockStatus?.borderColor : ""} rounded-full items-center justify-between`}
        >
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
