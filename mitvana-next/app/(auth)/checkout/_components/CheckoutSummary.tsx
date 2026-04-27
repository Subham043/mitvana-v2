import { Button } from "@/components/ui/button";
import Image from "next/image";

const orderItems = [
  {
    product: {
      _id: "678e2dc42375026c6ed2fab2",
      productTitle: "Acne and Pimple Gel",
      productSubtitle:
        "Soothe acne-prone skin and heal breakouts with this spot treatment gel.",
      productCustomUrl: "acne-and-pimple-gel",
      productMetaDiscription: "",
      productCustomScript: "",
      productSku: "",
      productOGSiteName: "",
      productTwitterDescription: "",
      productFacebookDescription: "",
      sizeOrColor: "30gm",
      productBought: "",
      price: "170",
      tax: 18,
      discountedPrice: "153",
      stock: 27,
      name: "Acne and Pimple Gel",
      description:
        "<p>A spot-on acne treatment powered with anti-bacterial neem that cleanses the skin surface and heals with its antiseptic qualities. It does not disturb the balance of natural sebum production in the skin thereby maintaining hydration and treating pimples without over-drying.</p><p><br></p><p>Why Acne Pimple Gel?</p><p><br></p><ul><li>Reduces pimples caused due to acne</li><li>Reduces dark spots and occurrence of blackheads</li><li>Reduces blemishes due to acne</li><li>Acts as a natural antiseptic and aids in healing acne</li></ul>",
      category: ["678e21712375026c6ed2f986"],
      features:
        "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
      thumbnail: "public/uploads/thumbnail-MITV-045.jpg",
      images: [
        "public/uploads/images-ACNE-PIMPLE-GEL-03.jpg",
        "public/uploads/images-ACNE-PIMPLE-GEL-04.jpg",
        "public/uploads/images-ACNE-PIMPLE-GEL-05.jpg",
        "public/uploads/images-ACNE-PIMPLE-GEL-06.jpg",
        "public/uploads/images-ACNE-PIMPLE-GEL-02.jpg",
      ],
      ratings: 0,
      availableColors: [],
      productFaq: [
        {
          question: "",
          answer: "",
          _id: "678e2dc42375026c6ed2fab3",
        },
      ],
      relatedProduct: [
        "678e41cb2375026c6ed30144",
        "678e4bcd2375026c6ed30494",
        "678e561a2375026c6ed30aac",
        "6790f9e7ce0007fe8e3639ff",
      ],
      productSelected: null,
      howToUse: {
        description:
          "<p>Step One: Cleanse your face with water and pat dry.</p><p><br></p><p>Step Two: Take an adequate amount of MITVANA ACNE AND PIMPLE GEL and spot treat by applying directly to the affected area (pimples).</p><p><br></p><p>Use twice a day after washing your face.</p>",
        _id: "67de49033234420e684df64b",
      },
      tags: ["678e2bc22375026c6ed2fa8e"],
      ingredients: [
        "678e239e2375026c6ed2f9a0",
        "678e2a8f2375026c6ed2fa77",
        "678e2aea2375026c6ed2fa7b",
        "678e2b2e2375026c6ed2fa7f",
      ],
      isDraft: false,
      reviews: [],
      createdAt: "2025-01-20T11:04:36.229Z",
      __v: 0,
      HSN: "33049910",
    },
    quantity: 4,
    selectedColor: null,
    _id: "69dddefa21f94566746bd68d",
  },
];

const cartDetail = {
  itemsPrice: 612,
  shippingPrice: 59,
  totalPrice: 671,
  discountPrice: 0,
};

const settings = {
  _id: "6789ead8ba9602aac3776fbd",
  __v: 0,
  shippingCharges: "100",
  topBannerText: "Newly Launched Products | Free Shipping Pan-India 🇮🇳",
  minCartValueForFreeShipping: 1000,
  adminEmail: "info@matxinlabs.com",
};

function CheckoutSummary() {
  const totalSavings = orderItems?.reduce((acc, product) => {
    const originalPrice = Number(product.product.price);
    const discountedPrice =
      Number(product.product.discountedPrice) || originalPrice;
    return acc + (originalPrice - discountedPrice) * product.quantity;
  }, 0);
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
      {orderItems?.length > 0 &&
        orderItems?.map((product) => {
          return (
            <div
              className="flex justify-between font-medium border-b mb-0 p-2 py-3"
              key={product?._id}
            >
              <h6 className="mb-0 text-sm" style={{ width: "70%" }}>
                <span className="font-normal">{product.product.name}</span> x{" "}
                {product?.quantity}
              </h6>
              <p className="mb-0 text-sm">
                ₹
                {product?.product?.discountedPrice
                  ? parseInt(product?.product?.discountedPrice).toFixed(2)
                  : parseInt(product?.product?.price).toFixed(2)}
              </p>
            </div>
          );
        })}

      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Subtotal</h6>
        <p className="mb-0 text-sm">₹{cartDetail?.itemsPrice?.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Shipping Cost</h6>
        <p className="mb-0 text-sm">
          {cartDetail?.shippingPrice === 0 ? (
            <>
              FREE {"  "}
              <span className="line-through">₹59</span>
            </>
          ) : Number(cartDetail?.itemsPrice?.toFixed(2)) >
            settings?.minCartValueForFreeShipping ? (
            <>
              FREE {"  "}
              <span className="line-through">₹{cartDetail?.shippingPrice}</span>
            </>
          ) : (
            `₹${parseInt(cartDetail?.shippingPrice.toString()).toFixed(2)}`
          )}
        </p>
      </div>

      {totalSavings > 0 && (
        <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
          <h6 className="mb-0 text-sm">Savings</h6>
          <p className="mb-0 text-sm">- ₹{totalSavings?.toFixed(2)}</p>
        </div>
      )}
      {cartDetail?.discountPrice != 0 && (
        <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
          <h6 className="mb-0 text-sm">Coupon Discount</h6>
          <p className="mb-0 text-sm">
            {`₹${cartDetail?.discountPrice?.toFixed(2)} `}
          </p>
        </div>
      )}

      <div className="flex justify-between font-medium border-b mb-0 p-2 py-3">
        <h6 className="mb-0 text-sm">Total</h6>
        <p className="mb-0 text-sm">₹{cartDetail?.totalPrice?.toFixed(2)}</p>
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
            src={
              "https://cdn.razorpay.com/static/assets/logo/rzp_payment_icon.svg"
            }
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
