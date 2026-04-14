"use client";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const categoryData = [
  {
    _id: "678e21712375026c6ed2f986",
    name: "Skin Care",
    description: "",
    customURL: "skin-care",
    isVisibleInNavigation: true,
    createdAt: "2025-01-20T10:12:01.993Z",
    __v: 0,
  },
  {
    _id: "678e2e432375026c6ed2fb13",
    name: "Hair Care",
    description: "",
    customURL: "hair-care",
    isVisibleInNavigation: true,
    createdAt: "2025-01-20T11:06:43.889Z",
    __v: 0,
  },
  {
    _id: "678e43862375026c6ed30348",
    name: "Hair Cleanser",
    description: "",
    customURL: "hair-cleanser",
    isVisibleInNavigation: true,
    createdAt: "2025-01-20T12:37:26.539Z",
    __v: 0,
  },
  {
    _id: "678e48fc2375026c6ed3047d",
    name: "Face Creams & Moisturizers",
    description: "",
    customURL: "face-creams-moisturizers",
    isVisibleInNavigation: false,
    createdAt: "2025-01-20T13:00:44.271Z",
    __v: 0,
  },
  {
    _id: "678e4cf62375026c6ed3053a",
    name: "International Best Sellers",
    description: "",
    customURL: "international-best-sellers",
    isVisibleInNavigation: false,
    createdAt: "2025-01-20T13:17:42.238Z",
    __v: 0,
  },
  {
    _id: "678e50af2375026c6ed308ed",
    name: "Body & Bath",
    description: "",
    customURL: "body-bath",
    isVisibleInNavigation: true,
    createdAt: "2025-01-20T13:33:35.280Z",
    __v: 0,
  },
  {
    _id: "678f65fe005ab7a560dee849",
    name: "Oils & Treatment",
    description: "",
    customURL: "oils-treatment",
    isVisibleInNavigation: true,
    createdAt: "2025-01-21T09:16:46.243Z",
    __v: 0,
  },
  {
    _id: "678f6860005ab7a560deea3a",
    name: "Face Care",
    description: "",
    customURL: "face-care",
    isVisibleInNavigation: true,
    createdAt: "2025-01-21T09:26:56.401Z",
    __v: 0,
  },
  {
    _id: "678faa22aeacdadf27c839c4",
    name: "Uncategorized",
    __v: 0,
    createdAt: "2025-01-21T14:07:29.843Z",
    description: "Default category for uncategorized items",
    isVisibleInNavigation: false,
    thumbnail: "",
  },
  {
    _id: "67909f5343617b825293b12a",
    name: "Body Butters",
    description: "",
    customURL: "body-butters",
    isVisibleInNavigation: true,
    createdAt: "2025-01-22T07:33:39.932Z",
    __v: 0,
  },
  {
    _id: "6790f48cce0007fe8e3635ac",
    name: "Serum & Treatment",
    description: "",
    customURL: "serum-treatment",
    isVisibleInNavigation: true,
    createdAt: "2025-01-22T13:37:16.340Z",
    __v: 0,
  },
  {
    _id: "6790fd80ce0007fe8e363f6f",
    name: "Men's Range",
    description: "",
    customURL: "mens-range",
    isVisibleInNavigation: true,
    createdAt: "2025-01-22T14:15:28.561Z",
    __v: 0,
  },
  {
    _id: "6791dfd1ce0007fe8e366731",
    name: "Hair Creams",
    description: "",
    customURL: "hair-creams",
    isVisibleInNavigation: true,
    createdAt: "2025-01-23T06:21:05.965Z",
    __v: 0,
  },
  {
    _id: "6791e1c1ce0007fe8e366936",
    name: "Hand Care",
    description: "",
    customURL: "hand-care",
    isVisibleInNavigation: true,
    createdAt: "2025-01-23T06:29:21.563Z",
    __v: 0,
  },
  {
    _id: "6791e639ce0007fe8e3669a7",
    name: "Hair Serums",
    description: "",
    customURL: "hair-serums",
    isVisibleInNavigation: true,
    createdAt: "2025-01-23T06:48:25.412Z",
    __v: 0,
  },
  {
    _id: "6791f5b7ce0007fe8e3670b4",
    name: "Hair Conditioners",
    description: "",
    customURL: "hair-conditioners",
    isVisibleInNavigation: true,
    createdAt: "2025-01-23T07:54:31.050Z",
    __v: 0,
  },
  {
    _id: "6791fa18ce0007fe8e367158",
    name: "Dental Care",
    description: "",
    customURL: "dental-care",
    isVisibleInNavigation: true,
    createdAt: "2025-01-23T08:13:12.056Z",
    __v: 0,
  },
];

function ProductFilter() {
  const params = useSearchParams();
  const maxPrice = Number(params.get("maxPrice") || 1000);
  const minPrice = Number(params.get("minPrice") || 120);
  const router = useRouter();
  return (
    <div className="w-full">
      {/* <!-- Category --> */}
      <div className="mb-4">
        <hr />
        <h5 className="font-semibold text-md my-2"> By Category </h5>
        {/* <div className="filter-title"></div> */}
        <div className="flex flex-col gap-3 overflow-hidden max-h-[350px] overflow-y-auto">
          {categoryData.map((item, index) => {
            return (
              <Link
                className="text-sm"
                href={`/shop?category=${item.customURL}`}
                key={index}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      {/* <!-- title--> */}
      <div>
        <hr />
        <h5 className="font-semibold text-md my-2">By Price</h5>
        <div className="slider-area w-full mt-3">
          <Slider
            step={5}
            min={120}
            max={1000}
            value={[minPrice, maxPrice]}
            onValueChange={(value) => {
              const [min, max] = value;
              const newParams = new URLSearchParams(params);
              newParams.set("minPrice", min.toString());
              newParams.set("maxPrice", max.toString());
              router.push(`/shop?${newParams.toString()}`);
            }}
            className="mx-auto w-full max-w-xs"
          />
          <div className="flex items-center mt-4 py-2 gap-2">
            <span className="text-[#878787] text-sm">Price: </span>
            <span className="text-sm font-semibold">{`₹${minPrice.toFixed(2)}`}</span>
            <span>-</span>
            <span className="text-sm font-semibold">{`₹${maxPrice.toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
