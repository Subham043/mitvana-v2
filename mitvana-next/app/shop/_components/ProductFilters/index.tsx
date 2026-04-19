import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductPriceFilter from "./ProductPriceFilter";

function ProductFilters() {
  return (
    <div className="w-full">
      {/* <!-- Category --> */}
      <div className="mb-4">
        <hr />
        <h5 className="font-semibold text-md my-2"> By Category </h5>
        {/* <div className="filter-title"></div> */}
        <ProductCategoryFilter />
      </div>
      {/* <!-- title--> */}
      <div>
        <hr />
        <h5 className="font-semibold text-md my-2">By Price</h5>
        <ProductPriceFilter />
      </div>
    </div>
  );
}

export default ProductFilters;
