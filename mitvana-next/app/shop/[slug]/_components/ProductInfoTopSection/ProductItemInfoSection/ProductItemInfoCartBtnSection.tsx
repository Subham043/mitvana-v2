import { Button } from "@/components/ui/button";

function ProductItemInfoCartBtnSection() {
  return (
    <>
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
    </>
  );
}

export default ProductItemInfoCartBtnSection;
