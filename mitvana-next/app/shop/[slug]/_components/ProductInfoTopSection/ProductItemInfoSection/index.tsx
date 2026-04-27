import { ProductType } from "@/lib/types";
import ProductItemInfoPincodeSection from "./ProductItemInfoPincodeSection";
import ProductItemInfoWishlistBtn from "./ProductItemInfoWishlistBtn";
import ProductItemInfoCartBtnSection from "./ProductItemInfoCartBtnSection";
import ProductItemInfoPriceSection from "./ProductItemInfoPriceSection";
import ProductItemInfoTitleSection from "./ProductItemInfoTitleSection";
import ProductItemInfoVariantSection from "./ProductItemInfoVariantSection";

type Props = {
  title: ProductType["title"];
  sub_title: ProductType["sub_title"];
  reviews_count: ProductType["reviews_count"];
  discounted_price: ProductType["discounted_price"];
  price: ProductType["price"];
  saved_price: ProductType["saved_price"];
  saved_percentage: ProductType["saved_percentage"];
  child_products: ProductType["child_products"];
  stock: ProductType["stock"];
  id: ProductType["id"];
  thumbnail: ProductType["thumbnail"];
  thumbnail_link: ProductType["thumbnail_link"];
  slug: ProductType["slug"];
  hsn: ProductType["hsn"];
  sku: ProductType["sku"];
  is_in_wishlist: ProductType["is_in_wishlist"];
};

function ProductItemInfoSection({
  title,
  sub_title,
  reviews_count,
  discounted_price,
  price,
  saved_price,
  saved_percentage,
  child_products,
  stock,
  id,
  thumbnail,
  thumbnail_link,
  slug,
  hsn,
  sku,
  is_in_wishlist,
}: Props) {
  return (
    <div className="w-full md:w-1/3 leading-4">
      <ProductItemInfoTitleSection
        title={title}
        sub_title={sub_title}
        reviews_count={reviews_count}
      />
      <hr className="my-5 border-gray-300" />
      <ProductItemInfoPriceSection
        discounted_price={discounted_price}
        price={price}
        saved_price={saved_price}
        saved_percentage={saved_percentage}
      />
      <hr className="my-5 border-gray-300" />

      <ProductItemInfoVariantSection child_products={child_products} />

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
        <ProductItemInfoCartBtnSection
          stock={stock}
          id={id}
          title={title}
          price={price}
          discounted_price={discounted_price}
          thumbnail={thumbnail}
          thumbnail_link={thumbnail_link}
          slug={slug}
          hsn={hsn}
          sku={sku}
        />
        <ProductItemInfoWishlistBtn
          is_in_wishlist={is_in_wishlist}
          id={id}
          slug={slug}
        />
      </div>

      <hr className="my-5 border-gray-300" />

      <ProductItemInfoPincodeSection />
    </div>
  );
}

export default ProductItemInfoSection;
