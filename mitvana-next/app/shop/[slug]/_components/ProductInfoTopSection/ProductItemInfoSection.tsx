import { Button } from "@/components/ui/button";
import { Heart, MapPinCheck, Star } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/lib/types";

function ProductItemInfoSection({
  productInfoData,
}: {
  productInfoData: ProductType;
}) {
  return (
    <div className="w-full md:w-1/3 leading-4">
      <h1 className="mb-1 text-3xl font-semibold text-wrap">
        {productInfoData.title}
      </h1>

      {productInfoData.sub_title && (
        <p className="mb-1 text-sm">{productInfoData.sub_title}</p>
      )}

      <a href="#reviewTab">
        <div className="flex gap-3 items-center">
          <span className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
              />
            ))}
          </span>
          <p className="text-sm">({productInfoData.reviews_count} reviews)</p>
        </div>
      </a>

      <p className="text-zinc-500 text-xs mt-3">
        <span className="font-bold">200+ bought</span> in past month
      </p>
      <hr className="my-5 border-gray-300" />
      <div className="flex mt-3 flex-wrap justify-between gap-4">
        <div>
          {productInfoData?.discounted_price ? (
            <div className="space-y-2">
              <p className="text-xs mb-2 font-semibold text-zinc-600">
                <span className="line-through">
                  MRP: ₹{parseInt(productInfoData.price.toString()).toFixed(2)}
                </span>
              </p>
              <p className="text-2xl">
                ₹
                {parseInt(productInfoData.discounted_price.toString()).toFixed(
                  2,
                )}
              </p>
              <p className="text-sm text-green-600">
                You saved ₹
                {parseInt(productInfoData.saved_price.toString()).toFixed(2)} (
                {parseInt(productInfoData.saved_percentage.toString()).toFixed(
                  2,
                )}
                %)
              </p>

              <p className="text-xs">Inclusive of all taxes</p>
            </div>
          ) : (
            <p className="text-2xl mb-4">
              MRP: ₹{parseInt(productInfoData.price.toString()).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <hr className="my-5 border-gray-300" />

      {productInfoData.child_products.length > 0 && (
        <div>
          <h6 className="text-uppercase fw-bold mt-3">Select Variant:</h6>
          <div className="mt-2 gap-1 md:gap-2 flex flex-wrap items-center">
            {/* <div className="border-2 border-[#193A43] w-25 md:w-40 cursor-pointer rounded-xl overflow-hidden">
                <div className="bg-[#193A43] text-white w-full py-1">
                  <p className="pl-2 text-sm m-0">
                    {productInfoData?.sizeOrColor}
                  </p>
                </div>
                <div className="flex flex-col p-2 justify-around space-y-1">
                  <b className="text-[16px] text-zinc-800">
                    ₹{parseInt(productInfoData?.discountedPrice)?.toFixed(2)}
                  </b>
                  <s className="text-sm text-zinc-700 ">
                    ₹{parseInt(productInfoData?.price)?.toFixed(2)}
                  </s>
                </div>
                <p className="text-red-600 text-[12px] font-semibold p-2">
                  {(() => {
                    if (
                      productInfoData?.price &&
                      productInfoData?.discountedPrice
                    ) {
                      return Math.round(
                        ((productInfoData.price -
                          productInfoData.discountedPrice) /
                          productInfoData.price) *
                          100,
                      );
                    } else {
                      return null;
                    }
                  })()}
                  % off
                </p>
              </div> */}

            {productInfoData.child_products.map(
              (item: ProductType["child_products"][number], index: number) => (
                <Link
                  href={`/shop/${item.slug}`}
                  key={index}
                  className="border-2 border-zinc-300 w-25 md:w-40 cursor-pointer rounded-xl overflow-hidden"
                >
                  <div className="bg-[#F4F6F8] text-zinc-800 font-semibold w-full py-1 border-b-2 border-zinc-300">
                    <p className="pl-2 text-sm m-0">{item.size_or_color}</p>
                  </div>
                  <div className="flex space-y-1 flex-col p-2 justify-around ">
                    {item.discounted_price ? (
                      <>
                        <b className="text-[16px] text-zinc-800">
                          ₹
                          {parseInt(item.discounted_price.toString()).toFixed(
                            2,
                          )}
                        </b>
                        <s className="text-sm text-zinc-700 ">
                          ₹{parseInt(item.price.toString()).toFixed(2)}
                        </s>
                      </>
                    ) : (
                      <>
                        <b className="text-[16px] text-zinc-800">
                          ₹{parseInt(item.price.toString()).toFixed(2)}
                        </b>
                      </>
                    )}
                  </div>
                  {item.discounted_price && (
                    <p className="text-red-600 text-[12px] font-semibold p-2">
                      10% off
                    </p>
                  )}
                </Link>
              ),
            )}
            {/* {productInfoData?.variants?.length > 1 &&
            productInfoData.variants.map((variant: any) => {
              return (
                <Link
                  href="#!"
                  style={{ width: "100px" }}
                  className={`d-inline-block p-3 d-flex align-items-center justify-content-center`}
                >
                  {variant.size}
                </Link>
              );
            })} */}
          </div>
        </div>
      )}

      {/* {productInfoData?.availableColors?.length > 0 && (
        <div className="row mt-0">
          <h6 className="text-uppercase fw-bold mt-3">Available Colors:</h6>
          {productInfoData?.availableColors.map((item: any, index: number) => {
            const isSelected = false;
            return (
              <div
                key={index}
                className="ml-2 mt-2 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  padding: "2px",
                  border: isSelected ? "2px solid black" : "none",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: item?.colorCode,
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      )} */}

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <div className="inline-flex p-4 h-10 border rounded-full items-center justify-between">
          <button className="text-lg hover:cursor-pointer hover:text-red-500">
            −
          </button>
          <input
            type="text"
            readOnly
            value={1}
            className="w-20 text-center border-none outline-none"
          />
          <button className="text-lg hover:cursor-pointer hover:text-green-500">
            +
          </button>
        </div>

        <Button
          variant="default"
          className="bg-[#56cfe1] text-white border border-[#56cfe1] w-[170px] uppercase p-4 py-5 rounded-full"
        >
          Add To Cart
        </Button>
        <button className="group rounded-full p-2 border border-black hover:border-[#56cfe1] bg-transparent transition-all duration-200 flex items-center justify-center">
          <Heart
            className="w-5 h-5 text-black transition-colors group-hover:text-[#56cfe1] cursor-pointer"
            strokeWidth={1.2}
          />
        </button>
      </div>

      <hr className="my-5 border-gray-300" />

      <div className="mt-8 flex flex-col items-start w-full md:w-[60%]">
        <div className="flex flex-col md:flex-row gap-4">
          <span className="text-zinc-500 font-semibold text-sm">Delivery</span>
          <div className="border-b-2 border-solid border-[#193A43] input-icons flex items-center">
            <MapPinCheck size={15} className="text-[#193A43]" />
            <input
              className="input-field font-semibold text-sm border-none outline-none ml-2 py-1"
              type="text"
              placeholder="Enter pincode to check"
            />
            <span className="text-[#193A43] font-semibold text-sm cursor-pointer ml-2">
              Check
            </span>
          </div>
        </div>

        <div>
          <div className="mt-2 ml-0 md:ml-[65px]">
            <div className="text-green-600">
              <span className="text-sm font-semibold">
                Delivery by{" "}
                {new Date(
                  Date.now() + 5 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  weekday: "long",
                })}
              </span>
              <span className="text-[14px] font-medium"> | </span>
              <span className="text-sm font-semibold">₹40</span>
            </div>
            {/* <span className="text-red-600 text-xs font-semibold">
                          None of the sellers deliver to this pin code
                        </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItemInfoSection;
