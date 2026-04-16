import CartProductList from "./CartProductList";
import CartSummary from "./CartSummary";

const cartInfo = [
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

function CartSection() {
  return (
    <div className="w-full py-10">
      <CartProductList cartDetail={cartInfo} />
      <CartSummary cartDetail={cartInfo} />
    </div>
  );
}

export default CartSection;
