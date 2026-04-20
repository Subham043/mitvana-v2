"use client";

import ProductInfoTopSection from "./ProductInfoTopSection";
import ProductTabSection from "./ProductTabSection";
import ProductRecommendation from "./ProductRecommendation";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ProductSlugQueryFn,
  ProductSlugQueryKey,
} from "@/lib/data/queries/product";
import ProductInfoPageSkeleton from "./ProductInfoPageSkeleton";

const productInfoData = {
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
  category: [
    {
      _id: "678e21712375026c6ed2f986",
      name: "Skin Care",
      description: "",
      customURL: "skin-care",
      isVisibleInNavigation: true,
      createdAt: "2025-01-20T10:12:01.993Z",
      __v: 0,
    },
  ],
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
    {
      price: 170,
      discountedPrice: 153,
      thumbnail: "public/uploads/thumbnail-MITV-045.jpg",
      name: "Acne and Pimple Gel",
      sizeOrColor: "30gm",
      stock: 27,
      _id: "678e2dc42375026c6ed2fab2",
    },
    {
      price: 170,
      discountedPrice: 153,
      thumbnail: "public/uploads/thumbnail-MITV-045.jpg",
      name: "Acne and Pimple Gel",
      sizeOrColor: "30gm",
      stock: 27,
      _id: "678e4bcd2375026c6ed30494",
    },
    {
      price: 170,
      discountedPrice: 153,
      thumbnail: "public/uploads/thumbnail-MITV-045.jpg",
      name: "Acne and Pimple Gel",
      sizeOrColor: "30gm",
      stock: 27,
      _id: "678e561a2375026c6ed30aac",
    },
    {
      price: 170,
      discountedPrice: 153,
      thumbnail: "public/uploads/thumbnail-MITV-045.jpg",
      name: "Acne and Pimple Gel",
      sizeOrColor: "30gm",
      stock: 27,
      _id: "6790f9e7ce0007fe8e3639ff",
    },
  ],
  productSelected: null,
  howToUse: {
    description:
      "<p>Step One: Cleanse your face with water and pat dry.</p><p><br></p><p>Step Two: Take an adequate amount of MITVANA ACNE AND PIMPLE GEL and spot treat by applying directly to the affected area (pimples).</p><p><br></p><p>Use twice a day after washing your face.</p>",
    _id: "67de49033234420e684df64b",
  },
  tags: [
    {
      _id: "678e2bc22375026c6ed2fa8e",
      name: "On Sale",
      createdAt: "2025-01-20T10:56:02.855Z",
      __v: 0,
    },
  ],
  ingredients: [
    {
      _id: "678e239e2375026c6ed2f9a0",
      title: "Neem (Azadirachta indica)",
      description:
        "It’s antibacterial properties helps fight acne-causing bacteria, pacifies irritated skin, and reduces blackheads or whiteheads.",
      image: "public/uploads/image-neem-150x150.png",
      __v: 0,
    },
    {
      _id: "678e2a8f2375026c6ed2fa77",
      title: "Turmeric (Curcuma longa) ",
      description:
        "Another anti-bacterial ingredient with qualities that can target inflammation and calm the skin. Reduces risk of scarring and brightens the appearance of skin.",
      image: "public/uploads/image-Turmeric-150x150.png",
      __v: 0,
    },
    {
      _id: "678e2aea2375026c6ed2fa7b",
      title: "Cucumber (Cucumis sativus)",
      description:
        "A natural toner with cooling properties. It improves dull and greasy complexions and keeps the skin soft and supple.",
      image: "public/uploads/image-cucumber-150x150.png",
      __v: 0,
    },
    {
      _id: "678e2b2e2375026c6ed2fa7f",
      title: "Lemon (Citrus medica limonium)",
      description:
        " loaded with vitamin C, it acts as a skin-brightening agent and is characterized by rich amounts of antioxidants such as glutathione, ascorbic acid, and alpha-tocopherol, which can help fight against skin-damaging lipid peroxidation.",
      image: "public/uploads/image-lemon-150x150.png",
      __v: 0,
    },
  ],
  isDraft: false,
  reviews: [],
  createdAt: "2025-01-20T11:04:36.229Z",
  __v: 0,
  HSN: "33049910",
  avgReview: 0,
  totalReview: 0,
};

function ProductInfoSection({ slug }: { slug: string }) {
  const { data, isFetching, isRefetching } = useSuspenseQuery({
    queryKey: ProductSlugQueryKey(slug),
    queryFn: ({ signal }) =>
      ProductSlugQueryFn({
        slug,
        signal,
      }),
  });

  if (isFetching || isRefetching) {
    return <ProductInfoPageSkeleton />;
  }

  return (
    <div>
      <div className="container mx-auto max-w-[90%]">
        <ProductInfoTopSection productInfoData={data} />
      </div>
      <div className="bg-[#f6f6f8]">
        <div className="container mx-auto max-w-[90%]">
          <ProductTabSection productInfoData={data} />
        </div>
      </div>
      <div className="container mx-auto max-w-[90%]">
        <ProductRecommendation relatedProducts={[]} />
      </div>
    </div>
  );
}

export default ProductInfoSection;
