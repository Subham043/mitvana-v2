import { useQuickViewStore } from "@/lib/store/quickview.store";
import { ProductType } from "@/lib/types";

type Props = {
  child_products: ProductType["child_products"];
};

function ProductQuickViewInfoVariantSection({ child_products }: Props) {
  const setModal = useQuickViewStore((s) => s.setModal);
  if (child_products.length === 0) return null;
  return (
    <>
      <h6 className="text-uppercase fw-bold mt-3">Select Variant:</h6>
      <div className="mt-2 gap-1 md:gap-2 flex flex-wrap items-center">
        {child_products.map(
          (item: ProductType["child_products"][number], index: number) => (
            <button
              onClick={() => setModal({ show: true, slug: item.slug })}
              key={index}
              className={`border-2 ${item.is_selected ? "border-[#193A43]" : "border-zinc-300"} w-25 md:w-40 cursor-pointer rounded-xl overflow-hidden text-left`}
            >
              <div
                className={`${item.is_selected ? "bg-[#193A43] text-white border-[#193A43]" : "bg-[#F4F6F8] text-zinc-800 border-zinc-300"} font-semibold w-full py-1 border-b-2`}
              >
                <p className="pl-2 text-sm m-0">{item.size_or_color}</p>
              </div>
              <div className="flex space-y-1 flex-col p-2 justify-around ">
                {item.discounted_price ? (
                  <>
                    <b className="text-[16px] text-zinc-800">
                      ₹{parseInt(item.discounted_price.toString()).toFixed(2)}
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
                  {parseInt(item.saved_percentage.toString()).toFixed(2)}% off
                </p>
              )}
            </button>
          ),
        )}
        {/* {productInfoData?.variants?.length > 1 &&
            variants.map((variant: any) => {
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
    </>
  );
}

export default ProductQuickViewInfoVariantSection;
