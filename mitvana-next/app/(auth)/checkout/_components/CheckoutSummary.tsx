import { Button } from "@/components/ui/button";
import { CartType } from "@/lib/types";
import Image from "next/image";

function CheckoutSummary({ data }: { data: CartType }) {
  return (
    <div className="bg-[#f6f6f8] py-6 px-4 rounded-lg">
      <h3 className="p-0 mb-0 font-semibold text-xl border-b pb-3">
        Your order
      </h3>
      <div className="h-1 mb-4 bg-[#56cfe1] w-[134px]"></div>
      <div className="flex justify-between font-medium border-b mb-0 p-2 mt-6">
        <h6 className="mb-0 text-sm">Product</h6>
        <h6 className="mb-0 text-sm">Subtotal</h6>
      </div>
      {data.products.length > 0 &&
        data.products.map((product) => {
          return (
            <div
              className="flex justify-between font-medium border-b mb-0 p-2 py-3"
              key={product.product.id}
            >
              <h6 className="mb-0 text-sm" style={{ width: "70%" }}>
                <span className="font-normal">{product.product.title}</span> x{" "}
                {product.quantity}
              </h6>
              <p className="mb-0 text-sm">
                ₹{product.total_price_per_product.toFixed(2)}
              </p>
            </div>
          );
        })}

      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Subtotal</h6>
        <p className="mb-0 text-sm">₹{data.sub_total.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Shipping Cost</h6>
        <p className="mb-0 text-sm">
          {data.shipping_charges === 0 ? (
            <>
              FREE {"  "}
              <span className="line-through">₹59</span>
            </>
          ) : (
            `₹${data.shipping_charges.toFixed(2)}`
          )}
        </p>
      </div>

      {data.discount !== 0 && (
        <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
          <h6 className="mb-0 text-sm">Coupon Discount</h6>
          <p className="mb-0 text-sm">{`- ₹${data.discount.toFixed(2)}`}</p>
        </div>
      )}

      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Total</h6>
        <p className="mb-0 text-sm">₹{data.total_price.toFixed(2)}</p>
      </div>

      <div>
        <form>
          {/* Radio button for Credit Card */}
          <p className="font-medium text-sm mt-5">
            Credit Card/Debit Card/NetBanking
          </p>

          <Image
            height={70}
            className="stripe-visa-icon"
            alt="Visa"
            width={180}
            src="/rzp_payment_icon.svg"
          />
          <p className="py-2 text-sm">
            Pay securely by Credit or Debit card or Internet Banking through
            Razorpay.
          </p>

          <p className="py-4 text-sm">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
          <div className="mb-3 text-md flex gap-2 items-center justify-start">
            <input
              className="form-check-input rounded-0"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              //   checked={isChecked}
              //   onChange={handleCheckboxChange}
            />
            <label
              htmlFor="flexCheckChecked"
              role="button"
              className="ms-1 work-sans"
            >
              I agree with the terms and conditions.
            </label>
          </div>

          <Button
            type="submit"
            className="bg-[#56cfe1] text-white border border-[#56cfe1] my-3 px-5 py-3 fw-bold w-full rounded-full mb-2"
          >
            PLACE ORDER
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutSummary;
