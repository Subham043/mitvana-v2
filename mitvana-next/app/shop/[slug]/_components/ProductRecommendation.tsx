"use client";

import ProductCard from "@/app/shop/_components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flower } from "lucide-react";

const productListData = [
  {
    _id: "678f615d005ab7a560dee572",
    productTitle: "Daily Moisturizing Lotion",
    productSubtitle:
      "Introduce this incredibly moisturizing lotion to your daily skin regime.",
    productCustomUrl: "daily-moisturizing-lotion",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "200ml",
    productBought: "",
    price: "300",
    tax: 18,
    discountedPrice: "270",
    stock: 39,
    name: "Daily Moisturizing Lotion",
    description:
      "<p>Introduce this incredibly moisturizing lotion to your daily skin regime.</p><p><br></p><p>Rapid absorption and a non-sticky formula ensure that your skin gets plenty of hassle-free hydration. Enriched with the natural antioxidants of tea and healthy fats from olive oil, it strengthens the skin’s natural barrier against dryness and polluting agents in the environment. Aloe Vera and wheat germ oil deliver a grease-free moisture balance to deeper dermis levels for a nourished glow from within.</p><p><br></p><p>Why Daily Moisturizing Lotion?</p><ul><li><br></li><li>Makes facial skin soft and supple for a healthy look</li><li>Absorbs quickly and keeps the skin grease-free</li><li>Keeps the skin hydrated for long periods</li><li>Nourishes the skin with antioxidants and healthy fats</li></ul>",
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
      "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India </p><p>Sold by: Matxin Labs Pvt Ltd</p>",
    thumbnail: "public/uploads/thumbnail-MITV-086.jpg",
    images: ["public/uploads/images-MITV-086.jpg"],
    ratings: 0,
    availableColors: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "678f615d005ab7a560dee573",
      },
    ],
    relatedProduct: [
      {
        _id: "678e38192375026c6ed2fdd7",
        productTitle: "Derma Face Wash with Neem and Turmeric 200ml",
        productSubtitle:
          "Our Best-selling Derma Face Wash is designed to promote healthy and flawless skin",
        productCustomUrl: "derma-face-wash-with-neem-and-turmeric-200ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "200ml",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 43,
        name: "Derma Face Wash with Neem and Turmeric 200ml",
        description:
          "<p>Refresh your skin and restore its natural brightness with Mitvana’s Derma Face Wash formulated with the goodness of Neem and Turmeric. Removes the last traces of dust, grime, and make-up residue. Detoxifies and tones, while maintaining the natural pH of the skin.</p><p><br></p><p>Why Derma Face Wash?</p><p><br></p><ul><li>Powerful antioxidants and melanin blockers ensure skin radiance.</li><li>Clears clogged pores while replenishing the skin’s natural moisture.</li><li>Purifies and adds a natural glow to the complexion.</li><li>Leaves the skin clean, soft, and supple.</li><li>Improves the complexion by protecting the skin from sun damage.</li><li>Acts as a natural antiseptic and aids in healing acne.</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/MITV-022-1.jpg",
        images: [
          "public/uploads/images-3.jpg",
          "public/uploads/images-4.jpg",
          "public/uploads/images-5.jpg",
          "public/uploads/images-6.jpg",
          "public/uploads/images-2.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e375b2375026c6ed2fc92",
          },
        ],
        relatedProduct: [
          "678f5cfe005ab7a560dee52f",
          "678f69a2005ab7a560deea50",
          "6790f9e7ce0007fe8e3639ff",
          "6790f566ce0007fe8e363695",
        ],
        productSelected: "678e375b2375026c6ed2fc91",
        howToUse: {
          description:
            "<p>Step One:</p><p>Squeeze a pea-sized amount of this natural face wash in your palm</p><p><br></p><p>Step Two:</p><p>Add a splash of water and gently rub the face wash with both your palms to emulsify and activate the ingredients. Then apply it all over the face.</p><p><br></p><p>Step Three:</p><p>Use your fingertips to lather it on your cheeks, forehead, and neck area avoiding</p><p>the eye contour. Gently massage for a few minutes.</p><p><br></p><p>Step Four:</p><p>Rinse off with water and pat dry using a soft, clean face towel.</p><p><br></p><p>Use twice daily.</p>",
          _id: "67de48b53234420e684df092",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["678e239e2375026c6ed2f9a0", "678e2a8f2375026c6ed2fa77"],
        createdAt: "2025-01-20T11:48:41.243Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "678f5cfe005ab7a560dee52f",
        productTitle: "Daily Nourishing Cream",
        productSubtitle:
          "Nurture and nourish your skin everyday with a feeling of ultimate relaxation with this daily nourishing cream.",
        productCustomUrl: "daily-nourishing-cream",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100gm",
        productBought: "",
        price: "425",
        tax: 18,
        discountedPrice: "383",
        stock: 44,
        name: "Daily Nourishing Cream",
        description:
          "<p>A non-greasy formula that reduces dryness and helps it revitalise. Combining the anti-oxidant rich camellia sinensis – tea – with the floral and nourishing rose and the goodness of almond, leaves your skin feeling silky soft to the touch. It helps to balance out the skin moisture by reducing oil content and increase the moisture.</p><p><br></p><p>Why DAILY NOURISHING CREAM ?</p><ul><li><br></li><li>Non greasy formula that nourishes the skin</li><li>Hydrates and removes skin dryness</li><li>Can be used for body also</li><li>For daily use throughout the year</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India </p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-010.jpg",
        images: [
          "public/uploads/images-DAILY-NOURISHING-CREAM-2.jpg",
          "public/uploads/images-DAILY-NOURISHING-CREAM-3.jpg",
          "public/uploads/images-DAILY-NOURISHING-CREAM-4.jpg",
          "public/uploads/images-DAILY-NOURISHING-CREAM-5.jpg",
          "public/uploads/images-DAILY-NOURISHING-CREAM-6.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678f5cfe005ab7a560dee530",
          },
        ],
        relatedProduct: [
          "678e2dc42375026c6ed2fab2",
          "678f6d32005ab7a560deed1c",
          "6791f13fce0007fe8e366d95",
          "678e50052375026c6ed3079d",
        ],
        productSelected: null,
        howToUse: {
          description:
            "<p> Step One: Take an adequate quantity of MITVANA Daily Nourishing Cream and apply it on the face and neck.</p><p> </p><p> Step Two: Gently massage till it gets completely absorbed.</p><p> </p><p> Use regularly and suitable to moisturize skin throughout the year.</p>",
          _id: "67de47e63234420e684de17f",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [
          "678f5942005ab7a560dedd9b",
          "678f5967005ab7a560dedd9f",
          "678e4eff2375026c6ed305f9",
        ],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-21T08:38:22.501Z",
        __v: 0,
        HSN: "33049910",
      },
      {
        _id: "6791f13fce0007fe8e366d95",
        productTitle: "Natural Scrub Cream with Cucumber & Walnut 150 ML",
        productSubtitle:
          "A freshness-infused cream with a unique texture scrubs away dead skin cells while toning and hydrating the dermis.",
        productCustomUrl: "natural-scrub-cream-with-cucumber-walnut-150-ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "150 ML",
        productBought: "",
        price: "330",
        tax: 18,
        discountedPrice: "297",
        stock: 0,
        name: "Natural Scrub Cream with Cucumber & Walnut 150 ML",
        description:
          "<p>Carefully formulated to love your skin with soothing, potent ingredients and moderate exfoliation. Moisturizing walnut oil brings nourishing vitamins &amp; anti-oxidants while cucumber + aloe delivers a soothing freshness to your facial skin after each use.</p><p><br></p><p>Why NATURAL SCRUB CREAM?</p><p><br></p><ul><li>Removes dead skin cells and helps the skin regenerate</li><li>Mild Gentle ensures that the skin feels fresh after application</li><li>Cucumber and walnut help in skin toning</li><li>Maintains softness of facial skin</li><li>Cleanses skin naturally</li><li>Gives glow</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India </p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-133.jpg",
        images: [
          "public/uploads/images-MIT-WITBK-083.jpg",
          "public/uploads/images-MIT-WITBK-082.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "6791f129ce0007fe8e366d5f",
          },
        ],
        relatedProduct: [
          "6790f566ce0007fe8e363695",
          "6790f74dce0007fe8e363739",
          "6790f9e7ce0007fe8e3639ff",
          "678e38192375026c6ed2fdd7",
        ],
        productSelected: "6791f129ce0007fe8e366d5e",
        howToUse: {
          description:
            "<p><br></p><p>Step One</p><p><br></p><p>Take a generous amount of MITVANA NATURAL SCRUB CREAM on the palm of your hand and apply to the face &amp; neck.</p><p><br></p><p>Step Two</p><p><br></p><p>Gently massage in circular motions for about 2-3 minutes.</p><p><br></p><p>Step Three</p><p>Wipe off with a moist soft towel and rinse with cool water.</p><p>Use twice a week.</p><p>Keep it for 10 minutes.</p>",
          _id: "67de45bc3234420e684dc21a",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["6791ea06ce0007fe8e366c25", "6791ea33ce0007fe8e366c29"],
        createdAt: "2025-01-23T07:35:27.123Z",
        isDraft: false,
        __v: 0,
        HSN: "33049990",
      },
      {
        _id: "678e4bcd2375026c6ed30494",
        productTitle: "Sunguard SPF 50 100gm",
        productSubtitle:
          " Fight the harmful effects of extreme sun exposure and UV rays with this sun guard featuring SPF 50.",
        productCustomUrl: "sunguard-spf-50-100gm",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100gm",
        productBought: "",
        price: "625",
        tax: 18,
        discountedPrice: "563",
        stock: 44,
        name: "Sunguard SPF 50 100gm",
        description:
          "<p>A rich, hydrating sun guard cream that is rapidly absorbed by your skin, it features an advanced sun-protection formula with SPF 50 containing a powerful natural anti-oxidant complex with palash, grapes, and sunflower.</p><p><br></p><p>It helps reduce the effects of sunburn, while protecting against broad spectrum UV rays. Packed with vitamin C &amp; E which increase skin elasticity and reduce scarring and redness due to sun exposure.</p><p><br></p><p>Why SUNGUARD SPF 50?</p><p><br></p><ul><li>Non-greasy and easily absorbed by the skin</li><li>No white cast on the face</li><li>Broad spectrum protection from UVA &amp; UVB rays</li><li>UVA-1 &amp; UVA-2 protection</li><li>PA ++++</li><li>Light weight formula that is water &amp; sweat resistant</li><li>Protects against pre-mature ageing/sunburn/skin tan</li><li>Benzophenone &amp; PABA free</li></ul>",
        category: ["678e48fc2375026c6ed3047d"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-099.jpg",
        images: [
          "public/uploads/images-MITV-099.jpg",
          "public/uploads/images-MITV-100.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e4bcd2375026c6ed30495",
          },
        ],
        relatedProduct: [
          "678e38192375026c6ed2fdd7",
          "678e41cb2375026c6ed30144",
          "6791f13fce0007fe8e366d95",
          "678f69a2005ab7a560deea50",
        ],
        productSelected: null,
        howToUse: {
          description:
            "<p>Step One: Take a generous amount of MITVANA SUNGUARD SPF 50 on the palm of your hand and apply on the face &amp; neck.</p><p><br></p><p>Step Two: Gently massage till absorbed.</p><p><br></p><p>Use 20-30 mins before stepping out in the sun. Keep handy for long days of sun exposure and outdoor activities.</p>",
          _id: "67de48823234420e684dec10",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [
          "678e45f62375026c6ed3044f",
          "678e48982375026c6ed30474",
          "678e48be2375026c6ed30478",
        ],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-20T13:12:45.650Z",
        __v: 0,
        HSN: "33049990",
      },
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One: Take a generous amount of MITVANA DAILY MOISTURIZING LOTION on the palm of your hand and apply to the face &amp; neck and any other parts of the body that need hydration such as arms and legs, elbows, and knees.</p><p><br></p><p>Step Two: Gently massage till absorbed.</p><p><br></p><p>Use twice daily in the morning after bath and once at night before going to bed.</p>",
      _id: "67de47bf3234420e684de0be",
    },
    tags: [
      {
        _id: "67911ea6ce0007fe8e3646f1",
        name: "Trending",
        createdAt: "2025-01-22T16:36:54.295Z",
        __v: 0,
      },
    ],
    ingredients: [
      {
        _id: "678f5f7c005ab7a560dee54f",
        title: "Aloe vera",
        description:
          " contains amino acids ,useful minerals, enzymes and polysaccharides that moisturise the bottom levels of skin. It repairs damaged skin and helps in reducing skin redness and irritation. It’s anti-inflammatory properties help soothe sensitive skin",
        image: "public/uploads/image-aloevera-100x100.png",
        __v: 0,
      },
      {
        _id: "678f5fe2005ab7a560dee553",
        title: "Triticum vulgare (Common wheat)",
        description:
          "Wheat germ oil extracted from the centre of the wheat has over 23 different nutrients that are vital in keeping the skin looking and feeling healthy.The oil’s natural ability to be easily absorbed in the skin, makes it incredibly versatile. Wheat germ oil is also rich in vitamin A,B,D and E and high in antioxidants.",
        image: "public/uploads/image-Common-wheat-100x100.png",
        __v: 0,
      },
      {
        _id: "678f5967005ab7a560dedd9f",
        title: "Camellia sinensis (Tea) ",
        description:
          "Camellia sinensis (Tea) is rich in catechins, polyphenols two well known anti oxidants. It is also rich in vitamin B2. It helps to hydrate the skin and keep it moisturized.",
        image: "public/uploads/image-tea-leaves-150x150.png",
        __v: 0,
      },
      {
        _id: "678e395f2375026c6ed2fe65",
        title: "Olea europaea (Olive)",
        description:
          "A natural moisturizer and packed with antioxidants, healthy vitamins, and fats that cleanse, protect & restore skin elasticity.",
        image: "public/uploads/image-olive-150x150.png",
        __v: 0,
      },
    ],
    isDraft: false,
    reviews: [],
    createdAt: "2025-01-21T08:57:01.834Z",
    __v: 0,
    HSN: "33049990",
  },
  {
    _id: "6790f575ce0007fe8e3636a8",
    productTitle: "Anti Ageing Serum 30 ML",
    productSubtitle:
      "A super formulation that helps recreate and restructure the skin’s elastic fibers, leaving the face visibly younger looking and radiantly beautiful.",
    productCustomUrl: "anti-ageing-serum-30-ml",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "30 ML ",
    productBought: "",
    price: "600",
    tax: 18,
    discountedPrice: "540",
    stock: 47,
    name: "Anti Ageing Serum 30 ML",
    description:
      "<p>Mitvana Anti Age Serum is a 100% active serum that prolongs youthfulness with powerful ingredients like apricot, Pomegranate &amp; lemon The age- defying formulation helps dry, oily &amp; mature skin regain its natural glow by deeply moisturizing &amp; rejuvenating it. Our anti-ageing serum reduces pigmentation, promotes cell renewal and gives your skin a radiant glow, making it look visibly younger and softer.</p><p><br></p><p>Scientifically proven face serum which is Fragrance free,&nbsp;silicones free, paraben free with alcohol free formulation.</p>",
    category: [
      {
        _id: "6790f48cce0007fe8e3635ac",
        name: "Serum & Treatment",
        description: "",
        customURL: "serum-treatment",
        isVisibleInNavigation: true,
        createdAt: "2025-01-22T13:37:16.340Z",
        __v: 0,
      },
    ],
    features:
      "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
    thumbnail: "public/uploads/thumbnail-anti-ageing-serum-img.jpg",
    images: ["public/uploads/images-9b861d24-d4e7-4c44-a499-2288cce76ac8.jpg"],
    ratings: 0,
    availableColors: [],
    reviews: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "6790f566ce0007fe8e363696",
      },
    ],
    relatedProduct: [
      {
        _id: "678f69a2005ab7a560deea50",
        productTitle: "Radiant Face Serum 100 GM",
        productSubtitle:
          "Bring out your healthy and natural glow with this amazing Mitvana Radiant Serum.",
        productCustomUrl: "radiant-face-serum-100-gm",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100 GM ",
        productBought: "",
        price: "1299",
        tax: 18,
        discountedPrice: "1299",
        stock: 0,
        name: "Radiant Face Serum 100 GM",
        description:
          "<p>Mitvana Radiant serum is an easy to apply, non-greasy serum formula with the goodness of Amla, Tea &amp; Apple that makes your skin look radiant and naturally glow. It is a hardworking, light weight serum designed to reduce body pigmentation. It gets easily absorbed into the skin and provides deep nourishment, delays the signs of ageing and reduces pigmentation and dark spots on the skin.</p><p><br></p><p>Dermatologically tested the serum is free from sulphates, Paraben, SLS &amp; other chemical items. The face serum is a must-have in your daily skincare routine and is suitable for all Skin types.</p>",
        category: ["678f6860005ab7a560deea3a", "678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India </p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-radient-face-serum-img.jpg",
        images: [
          "public/uploads/images-RADIANT-FACE-SERUM-5.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-6.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-2.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-3.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-4.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678f69a2005ab7a560deea51",
          },
        ],
        relatedProduct: [
          "678e561a2375026c6ed30aac",
          "678f615d005ab7a560dee572",
          "6791f504ce0007fe8e366fcd",
          "678f6d32005ab7a560deed1c",
        ],
        productSelected: "67ca80d5a02c3054d712b332",
        howToUse: {
          description:
            "<p>Step One:&nbsp;Wash your face &amp; neck and dab it dry.</p><p><br></p><p>Step Two:&nbsp;Take a small quantity of Mitvana Radiant face serum and apply gently on the face &amp; neck.</p><p><br></p><p>Step Three:&nbsp;Massage in circular motion for 1-2 minutes till it’s completely absorbed.</p>",
          _id: "67de47903234420e684ddcf2",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [
          "678f67fa005ab7a560dee9df",
          "678f681b005ab7a560deea35",
          "678f5967005ab7a560dedd9f",
        ],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-21T09:32:18.595Z",
        __v: 0,
        HSN: "33049910",
      },
      {
        _id: "678f6d32005ab7a560deed1c",
        productTitle: "Face Wash With Aloe Vera and Chamomile 200 ML ",
        productSubtitle:
          "This Face Wash is formulated with aloe and chamomile to soothe and hydrate skin",
        productCustomUrl: "face-wash-with-aloe-vera-and-chamomile-200-ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: " 200 ML ",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 47,
        name: "Face Wash With Aloe Vera and Chamomile 200 ML ",
        description:
          "<p>A skin-vitalizing face wash, with aloe vera that moisturizes the skin with the essence extracted from aloe flesh. This naturally strengthens the skin barrier and prevents moisture loss while soothing chamomile gently neutralizes skin irritants with its anti-inflammatory nature. Refreshes rehydrates and prepares your skin for the rest of your skincare routine.</p><p><br></p><p>Why Aloe + Chamomile Face Wash?</p><p><br></p><ul><li>Soothes irritated skin</li><li>Anti-inflammatory</li><li>Builds and maintains skin barrier</li><li>Locks in moisture to keep skin supple</li><li>Good for all skin types to keep the face hydrated</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
        thumbnail:
          "public/uploads/thumbnail-5b230406-971e-42ea-9293-c987c5144131.jpg",
        images: [
          "public/uploads/images-MITV-090.jpg",
          "public/uploads/images-MITV-089-1.jpg",
          "public/uploads/images-MIT-WITBK-076.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678f6cd8005ab7a560deecda",
          },
        ],
        relatedProduct: [
          "6790f9e7ce0007fe8e3639ff",
          "6790fe9fce0007fe8e363f90",
          "6791fc56ce0007fe8e36722f",
          "678e38192375026c6ed2fdd7",
        ],
        productSelected: "678f6cd8005ab7a560deecd9",
        howToUse: {
          description:
            "<p> Step One: Moisten face and neck. </p><p> </p><p> Step Two: Squeeze a pea-sized amount of this natural face wash in your palm</p><p> </p><p> Step Three: Use your fingertips to lather it on your face and neck, avoiding the eye contour. </p><p> </p><p> Step Four: Gently massage for a few minutes. Rinse with water and pat dry using a soft, clean towel.</p><p> </p><p> Use twice daily.</p>",
          _id: "67de475a3234420e684dd9fd",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["678f6b55005ab7a560deec94", "678f5f7c005ab7a560dee54f"],
        createdAt: "2025-01-21T09:47:30.198Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "6790fc90ce0007fe8e363bf8",
        productTitle: "Mud Pack 150 gm ",
        productSubtitle:
          "Elevate your skincare ritual and stimulate your senses with this mud pack.",
        productCustomUrl: "mud-pack-150-gm",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "150 gm ",
        productBought: "",
        price: "450",
        tax: 18,
        discountedPrice: "340",
        stock: 0,
        name: "Mud Pack 150 gm ",
        description:
          "<p>Refreshing rosemary soothes skin attributing to its anti-oxidant rich and anti-inflammatory nature. Enriched with vitamin C, green apple defends the skin from external environmental damages while restoring and rebuilding healthy skin cells to illuminate your face.</p><p><br></p><p>Why Mud Pack with Rosemary &amp; Green Apple?</p><p><br></p><ul><li>Clarifies and restores skin radiance</li><li>Anti-fungal, anti-bacterial and anti-inflammatory</li><li>Protects skin and makes it less prone to environmental damages</li><li>Improves texture to make skin smooth and supple</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
        thumbnail: "public/uploads/thumbnail-MITV-132.jpg",
        images: [
          "public/uploads/images-MITV-069-scaled.jpg",
          "public/uploads/images-MIT-WITBK-090.jpg",
          "public/uploads/images-MIT-WITBK-091.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "6790fc8cce0007fe8e363be6",
          },
        ],
        relatedProduct: [
          "6790f9e7ce0007fe8e3639ff",
          "6791df5ece0007fe8e366661",
          "6791f504ce0007fe8e366fcd",
          "678e4bcd2375026c6ed30494",
        ],
        productSelected: "6790fc8cce0007fe8e363be5",
        howToUse: {
          description:
            "<p>Step One: Moisten face and neck.</p><p><br></p><p>Step Two: Take an adequate amount of mud pack and use fingertips or an applicator brush to spread evenly across the face and neck area avoiding the eye contour.</p><p><br></p><p>Step Three: Leave it for 10-15 minutes to dry off. Remove with a wet towel.</p><p><br></p><p>Step Four: Rinse off with water and pat dry. Use once or twice a week for best results.</p>",
          _id: "67de463e3234420e684dcc6b",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["6790fb27ce0007fe8e363b87"],
        createdAt: "2025-01-22T14:11:28.449Z",
        isDraft: false,
        __v: 0,
        HSN: "33049990",
      },
      {
        _id: "678e4bcd2375026c6ed30494",
        productTitle: "Sunguard SPF 50 100gm",
        productSubtitle:
          " Fight the harmful effects of extreme sun exposure and UV rays with this sun guard featuring SPF 50.",
        productCustomUrl: "sunguard-spf-50-100gm",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100gm",
        productBought: "",
        price: "625",
        tax: 18,
        discountedPrice: "563",
        stock: 44,
        name: "Sunguard SPF 50 100gm",
        description:
          "<p>A rich, hydrating sun guard cream that is rapidly absorbed by your skin, it features an advanced sun-protection formula with SPF 50 containing a powerful natural anti-oxidant complex with palash, grapes, and sunflower.</p><p><br></p><p>It helps reduce the effects of sunburn, while protecting against broad spectrum UV rays. Packed with vitamin C &amp; E which increase skin elasticity and reduce scarring and redness due to sun exposure.</p><p><br></p><p>Why SUNGUARD SPF 50?</p><p><br></p><ul><li>Non-greasy and easily absorbed by the skin</li><li>No white cast on the face</li><li>Broad spectrum protection from UVA &amp; UVB rays</li><li>UVA-1 &amp; UVA-2 protection</li><li>PA ++++</li><li>Light weight formula that is water &amp; sweat resistant</li><li>Protects against pre-mature ageing/sunburn/skin tan</li><li>Benzophenone &amp; PABA free</li></ul>",
        category: ["678e48fc2375026c6ed3047d"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-099.jpg",
        images: [
          "public/uploads/images-MITV-099.jpg",
          "public/uploads/images-MITV-100.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e4bcd2375026c6ed30495",
          },
        ],
        relatedProduct: [
          "678e38192375026c6ed2fdd7",
          "678e41cb2375026c6ed30144",
          "6791f13fce0007fe8e366d95",
          "678f69a2005ab7a560deea50",
        ],
        productSelected: null,
        howToUse: {
          description:
            "<p>Step One: Take a generous amount of MITVANA SUNGUARD SPF 50 on the palm of your hand and apply on the face &amp; neck.</p><p><br></p><p>Step Two: Gently massage till absorbed.</p><p><br></p><p>Use 20-30 mins before stepping out in the sun. Keep handy for long days of sun exposure and outdoor activities.</p>",
          _id: "67de48823234420e684dec10",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [
          "678e45f62375026c6ed3044f",
          "678e48982375026c6ed30474",
          "678e48be2375026c6ed30478",
        ],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-20T13:12:45.650Z",
        __v: 0,
        HSN: "33049990",
      },
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One:&nbsp;Wash the face with water &amp; dab it dry.</p><p><br></p><p>Step Two:&nbsp;Take a small amount of Mitvana Anti-ageing serum and spread all over neck &amp; face, avoiding the eyes.</p><p><br></p><p>Step Three:&nbsp;Massage gently till it is absorbed. After a couple of minutes one can apply makeup or any other cream.</p><p><br></p><p>For best results apply in the morning and night, two or three times a week.</p>",
      _id: "67de46883234420e684dd1b6",
    },
    tags: [
      {
        _id: "67911ea6ce0007fe8e3646f1",
        name: "Trending",
        createdAt: "2025-01-22T16:36:54.295Z",
        __v: 0,
      },
    ],
    ingredients: [
      {
        _id: "6790f427ce0007fe8e36355e",
        title: "Prunus Armeniaca (Apricot):",
        description:
          "Apricot seed powder is a mild exfoliator that removes dead skin and debris. It promotes clear and healthy skin.",
        image: "public/uploads/image-apricot-150x150.png",
        __v: 0,
      },
      {
        _id: "678f6e53005ab7a560deef16",
        title: "Punica granatum / Pomegranate:",
        description:
          "Rich in anti oxidants, tannins, ellagitannins, anthocyanins, and other phytochemicals.",
        image: "public/uploads/image-pomegranate-150x150.png",
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
    createdAt: "2025-01-22T13:41:09.515Z",
    isDraft: false,
    __v: 0,
    HSN: "33049910",
  },
  {
    _id: "6791f500ce0007fe8e366fba",
    productTitle: "Peel Off Face Mask 100 ml",
    productSubtitle:
      "A unique concoction with anti-oxidants that boosts skin renewal and restores moisture.",
    productCustomUrl: "peel-off-face-mask-100-ml",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "100 ml",
    productBought: "",
    price: "270",
    tax: 18,
    discountedPrice: "243",
    stock: 38,
    name: "Peel Off Face Mask 100 ml",
    description:
      "<p>A peel-off mask packed to the brim with a regenerative formulation comprising vitamin E and ellagic acid from walnut oil paired with the goodness of Indian nettle to give your skin a sprightly appearance. This mask heals, balances, and nourishes cells for a lush &amp; luminous look.</p><p><br></p><p>Why peel-off mask with walnut and nettle?</p><p><br></p><ul><li>Purifies pores to give the face clarity and balance</li><li>Rich in oils that hydrate and nourish the skin</li><li>Adds a youthful energy and glow to the face</li></ul>",
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
    thumbnail: "public/uploads/thumbnail-MITV-134-1.jpg",
    images: [
      "public/uploads/images-MITV-050-scaled.jpg",
      "public/uploads/images-MITV-075.jpg",
      "public/uploads/images-MITV-076.jpg",
    ],
    ratings: 0,
    availableColors: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "6791f500ce0007fe8e366fbb",
      },
    ],
    relatedProduct: [
      {
        _id: "678e50052375026c6ed3079d",
        productTitle: "Charcoal Face Wash 200ml",
        productSubtitle:
          "A purifying treatment for deep cleansing and exfoliation of the skin.",
        productCustomUrl: "charcoal-face-wash-200ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "200ml",
        productBought: "",
        price: "365",
        tax: 18,
        discountedPrice: "329",
        stock: 47,
        name: "Charcoal Face Wash 200ml",
        description:
          "<p>This face wash with activated bamboo charcoal – famous for its anti-oxidant properties – removes impurities and dirt, exfoliates dead skin cells, and stimulates cell renewal. The result: deeply cleansed, soft, and smooth skin. Packed with rose, it maintains the moisture balance of skin post wash and nutmeg removes excess oil to reveal glowing skin.</p><p><br></p><p>Why Face Wash with Charcoal?</p><p><br></p><ul><li>Draws out dirt and cleanses the skin</li><li>Removes impurities to reveal healthy skin</li><li>Maintains moisture balance and restores skin radiance</li><li>Reduces excess oil and resultant acne</li></ul>",
        category: ["678e4cf62375026c6ed3053a", "678e48fc2375026c6ed3047d"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-114.jpg",
        images: [
          "public/uploads/images-CHARCOAL-Fash-wash-3-600x600.jpg",
          "public/uploads/images-CHARCOAL-Fash-wash-4-600x600.jpg",
          "public/uploads/images-CHARCOAL-Fash-wash-5-600x600.jpg",
          "public/uploads/images-CHARCOAL-Fash-wash-6-600x600.jpg",
          "public/uploads/images-MITV-114 (1).jpg",
          "public/uploads/images-CHARCOAL-Fash-wash-2-600x600.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e4ed12375026c6ed305d7",
          },
        ],
        relatedProduct: [
          "678e561a2375026c6ed30aac",
          "6790f566ce0007fe8e363695",
          "6791f13fce0007fe8e366d95",
          "6790fe9fce0007fe8e363f90",
        ],
        productSelected: "678e4ed12375026c6ed305d6",
        howToUse: {
          description:
            "<p>Step One: Squeeze a pea-sized amount of this face wash in your palm</p><p><br></p><p>Step Two: Add a splash of water and gently rub the face wash with both your palms to</p><p>emulsify and activate the ingredients. Then apply it all over the face.</p><p><br></p><p>Step Three: Use your fingertips to lather it on your cheeks, forehead, and neck area avoiding</p><p>the eye contour. Gently massage for a few minutes.</p><p><br></p><p>Step Four: Rinse off with water and pat dry using a soft, clean face towel.</p><p><br></p><p>Use twice daily.</p>",
          _id: "67de48603234420e684de90c",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["678e45632375026c6ed3044b"],
        createdAt: "2025-01-20T13:30:45.148Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "678f69a2005ab7a560deea50",
        productTitle: "Radiant Face Serum 100 GM",
        productSubtitle:
          "Bring out your healthy and natural glow with this amazing Mitvana Radiant Serum.",
        productCustomUrl: "radiant-face-serum-100-gm",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100 GM ",
        productBought: "",
        price: "1299",
        tax: 18,
        discountedPrice: "1299",
        stock: 0,
        name: "Radiant Face Serum 100 GM",
        description:
          "<p>Mitvana Radiant serum is an easy to apply, non-greasy serum formula with the goodness of Amla, Tea &amp; Apple that makes your skin look radiant and naturally glow. It is a hardworking, light weight serum designed to reduce body pigmentation. It gets easily absorbed into the skin and provides deep nourishment, delays the signs of ageing and reduces pigmentation and dark spots on the skin.</p><p><br></p><p>Dermatologically tested the serum is free from sulphates, Paraben, SLS &amp; other chemical items. The face serum is a must-have in your daily skincare routine and is suitable for all Skin types.</p>",
        category: ["678f6860005ab7a560deea3a", "678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India </p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-radient-face-serum-img.jpg",
        images: [
          "public/uploads/images-RADIANT-FACE-SERUM-5.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-6.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-2.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-3.jpg",
          "public/uploads/images-RADIANT-FACE-SERUM-4.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678f69a2005ab7a560deea51",
          },
        ],
        relatedProduct: [
          "678e561a2375026c6ed30aac",
          "678f615d005ab7a560dee572",
          "6791f504ce0007fe8e366fcd",
          "678f6d32005ab7a560deed1c",
        ],
        productSelected: "67ca80d5a02c3054d712b332",
        howToUse: {
          description:
            "<p>Step One:&nbsp;Wash your face &amp; neck and dab it dry.</p><p><br></p><p>Step Two:&nbsp;Take a small quantity of Mitvana Radiant face serum and apply gently on the face &amp; neck.</p><p><br></p><p>Step Three:&nbsp;Massage in circular motion for 1-2 minutes till it’s completely absorbed.</p>",
          _id: "67de47903234420e684ddcf2",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [
          "678f67fa005ab7a560dee9df",
          "678f681b005ab7a560deea35",
          "678f5967005ab7a560dedd9f",
        ],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-21T09:32:18.595Z",
        __v: 0,
        HSN: "33049910",
      },
      {
        _id: "6790fc8cce0007fe8e363be5",
        productTitle: "Mud Pack 100 ml ",
        productSubtitle:
          "Elevate your skincare ritual and stimulate your senses with this mud pack.",
        productCustomUrl: "mud-pack-100-ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100 ml ",
        productBought: "",
        price: "265",
        tax: 18,
        discountedPrice: "239",
        stock: 50,
        name: "Mud Pack 100 ml ",
        description:
          "<p>Refreshing rosemary soothes skin attributing to its anti-oxidant rich and anti-inflammatory nature. Enriched with vitamin C, green apple defends the skin from external environmental damages while restoring and rebuilding healthy skin cells to illuminate your face.</p><p><br></p><p>Why Mud Pack with Rosemary &amp; Green Apple?</p><p><br></p><ul><li>Clarifies and restores skin radiance</li><li>Anti-fungal, anti-bacterial and anti-inflammatory</li><li>Protects skin and makes it less prone to environmental damages</li><li>Improves texture to make skin smooth and supple</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
        thumbnail: "public/uploads/thumbnail-MITV-132.jpg",
        images: [
          "public/uploads/images-MITV-069-scaled.jpg",
          "public/uploads/images-MIT-WITBK-090.jpg",
          "public/uploads/images-MIT-WITBK-091.jpg",
        ],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "6790fc8cce0007fe8e363be6",
          },
        ],
        relatedProduct: [
          "6790f9e7ce0007fe8e3639ff",
          "6791df5ece0007fe8e366661",
          "6791f504ce0007fe8e366fcd",
          "678e4bcd2375026c6ed30494",
        ],
        productSelected: null,
        howToUse: {
          description:
            "<p>Step One: Moisten face and neck.</p><p><br></p><p>Step Two: Take an adequate amount of mud pack and use fingertips or an applicator brush to spread evenly across the face and neck area avoiding the eye contour.</p><p><br></p><p>Step Three: Leave it for 10-15 minutes to dry off. Remove with a wet towel.</p><p><br></p><p>Step Four: Rinse off with water and pat dry. Use once or twice a week for best results.</p>",
          _id: "67de46483234420e684dcd2c",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["6790fb27ce0007fe8e363b87"],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-22T14:11:24.947Z",
        __v: 0,
        HSN: "33049990",
      },
      {
        _id: "678e41cb2375026c6ed30144",
        productTitle: "Face Wash with Micro-Scrubbers 200ml",
        productSubtitle:
          "This face wash with micro scrubbers, olive oil, and tulsi is designed to heal and hydrate the skin while gently exfoliating.",
        productCustomUrl: "face-wash-with-micro-scrubbers-200ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "200ml",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 46,
        name: "Face Wash with Micro-Scrubbers 200ml",
        description:
          "<p>Start your day with a sacred skincare ritual; holy basil or tulsi – revered as a healing herb in India – restores and heals the skin to reveal its natural glow while micro scrubbers remove dead skin cells and greasiness from exposure to city pollution and environment. Nourishing olive oil gently moisturizes and restores skin elasticity.</p><p><br></p><p>Why Micro Scrubber Face Wash?</p><p><br></p><ul><li>Removes dead skin cells, dirt, and excess sebum that causes greasiness</li><li>Purifies and Restores natural glow to reveal smooth skin</li><li>Leaves the skin clean, soft, and supple.</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-016.jpg",
        images: [],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e3b1e2375026c6ed2fea5",
          },
        ],
        relatedProduct: [
          "678e4bcd2375026c6ed30494",
          "678e561a2375026c6ed30aac",
          "6791f504ce0007fe8e366fcd",
          "678f6d32005ab7a560deed1c",
        ],
        productSelected: "678e3b1e2375026c6ed2fea4",
        howToUse: {
          description:
            "<p>Step One: Moisten face and neck. Squeeze a pea-sized amount of this scrubbing face wash in your palm</p><p><br></p><p>Step Two: Use your fingertips to lather it on your cheeks, forehead, and neck area avoiding</p><p>the eye contour. Gently massage and exfoliate for a few minutes.</p><p><br></p><p>Step Three: Rinse off with water and pat dry using a soft, clean face towel.</p><p><br></p><p>Use twice daily.</p>",
          _id: "67de48983234420e684dee52",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [],
        createdAt: "2025-01-20T12:30:03.843Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One:</p><p><br></p><p>Moisten face and neck.</p><p><br></p><p>Step Two:</p><p><br></p><p>Take an adequate amount and use fingertips to apply evenly across the face and neck area avoiding the eye contour.</p><p><br></p><p>Step Three:</p><p><br></p><p>Leave it for 10-15 minutes to dry off. Peel slowly without stretching or pulling excessively.</p><p><br></p><p>Step Four:</p><p><br></p><p>Use after MITVANA face scrub for best results. Once a week only.</p>",
      _id: "67de45993234420e684dbfd7",
    },
    tags: [
      {
        _id: "67911ea6ce0007fe8e3646f1",
        name: "Trending",
        createdAt: "2025-01-22T16:36:54.295Z",
        __v: 0,
      },
    ],
    ingredients: [
      {
        _id: "6791f3fbce0007fe8e366fb1",
        title: " Walnut (Juglans regia)",
        description:
          "oil is high in essential vitamins & minerals for the skin. Vitamin E and ellagic acid, and anti-oxidants combat skin aging by renewing cells and providing nourishment.",
        image: "public/uploads/image-walnut-150x150.png",
        __v: 0,
      },
      {
        _id: "6791f419ce0007fe8e366fb5",
        title: "Indian Nettle (Acalypha Indica)",
        description:
          "leaves regulate sebum production and act as a natural astringent which heals acne-prone skin.",
        image: "public/uploads/image-Nettle-Plant-150x150.png",
        __v: 0,
      },
    ],
    isDraft: false,
    reviews: [],
    createdAt: "2025-01-23T07:51:28.984Z",
    __v: 0,
    HSN: "33049990",
  },
  {
    _id: "6791fc56ce0007fe8e36722f",
    productTitle: "Oil Control Face Wash For Men - 100 ML",
    productSubtitle:
      "An oil control wash for the urban man’s skin to help battle pollution, dirt, and grime that cause stickiness.",
    productCustomUrl: "oil-control-face-wash-for-men",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "100 ML",
    productBought: "",
    price: "249",
    tax: 18,
    discountedPrice: "224",
    stock: 44,
    name: "Oil Control Face Wash For Men - 100 ML",
    description:
      "<p>Give your face a fresh start every morning with this oil control face wash for men. It deep cleans your pores and controls excess sebum while battling urban pollution and giving your skin a fresh, healthy feeling. Formulated with natural ingredients – Licorice that helps control oil and acts as an astringent and chamomile that soothes the skin and has potent anti-inflammatory activity.</p><p><br></p><p>Why Oil Control Face Wash?</p><p><br></p><p>● Removes excess oil from the skin</p><p>● Deep cleanses clogged pores</p><p>● Reduces risk of acne and pimples</p><p>● Acts as an antiseptic for the skin</p>",
    category: [
      {
        _id: "6790fd80ce0007fe8e363f6f",
        name: "Men's Range",
        description: "",
        customURL: "mens-range",
        isVisibleInNavigation: true,
        createdAt: "2025-01-22T14:15:28.561Z",
        __v: 0,
      },
    ],
    features:
      "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
    thumbnail: "public/uploads/thumbnail-MITV-096.jpg",
    images: [
      "public/uploads/images-MITV-061-1-scaled.jpg",
      "public/uploads/images-MIT-WITBK-078-scaled.jpg",
      "public/uploads/images-MIT-WITBK-079-scaled.jpg",
    ],
    ratings: 0,
    availableColors: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "6791fc56ce0007fe8e367230",
      },
    ],
    relatedProduct: [
      {
        _id: "678e38192375026c6ed2fdd7",
        productTitle: "Derma Face Wash with Neem and Turmeric 200ml",
        productSubtitle:
          "Our Best-selling Derma Face Wash is designed to promote healthy and flawless skin",
        productCustomUrl: "derma-face-wash-with-neem-and-turmeric-200ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "200ml",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 43,
        name: "Derma Face Wash with Neem and Turmeric 200ml",
        description:
          "<p>Refresh your skin and restore its natural brightness with Mitvana’s Derma Face Wash formulated with the goodness of Neem and Turmeric. Removes the last traces of dust, grime, and make-up residue. Detoxifies and tones, while maintaining the natural pH of the skin.</p><p><br></p><p>Why Derma Face Wash?</p><p><br></p><ul><li>Powerful antioxidants and melanin blockers ensure skin radiance.</li><li>Clears clogged pores while replenishing the skin’s natural moisture.</li><li>Purifies and adds a natural glow to the complexion.</li><li>Leaves the skin clean, soft, and supple.</li><li>Improves the complexion by protecting the skin from sun damage.</li><li>Acts as a natural antiseptic and aids in healing acne.</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/MITV-022-1.jpg",
        images: [
          "public/uploads/images-3.jpg",
          "public/uploads/images-4.jpg",
          "public/uploads/images-5.jpg",
          "public/uploads/images-6.jpg",
          "public/uploads/images-2.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e375b2375026c6ed2fc92",
          },
        ],
        relatedProduct: [
          "678f5cfe005ab7a560dee52f",
          "678f69a2005ab7a560deea50",
          "6790f9e7ce0007fe8e3639ff",
          "6790f566ce0007fe8e363695",
        ],
        productSelected: "678e375b2375026c6ed2fc91",
        howToUse: {
          description:
            "<p>Step One:</p><p>Squeeze a pea-sized amount of this natural face wash in your palm</p><p><br></p><p>Step Two:</p><p>Add a splash of water and gently rub the face wash with both your palms to emulsify and activate the ingredients. Then apply it all over the face.</p><p><br></p><p>Step Three:</p><p>Use your fingertips to lather it on your cheeks, forehead, and neck area avoiding</p><p>the eye contour. Gently massage for a few minutes.</p><p><br></p><p>Step Four:</p><p>Rinse off with water and pat dry using a soft, clean face towel.</p><p><br></p><p>Use twice daily.</p>",
          _id: "67de48b53234420e684df092",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["678e239e2375026c6ed2f9a0", "678e2a8f2375026c6ed2fa77"],
        createdAt: "2025-01-20T11:48:41.243Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "678f6d32005ab7a560deed1c",
        productTitle: "Face Wash With Aloe Vera and Chamomile 200 ML ",
        productSubtitle:
          "This Face Wash is formulated with aloe and chamomile to soothe and hydrate skin",
        productCustomUrl: "face-wash-with-aloe-vera-and-chamomile-200-ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: " 200 ML ",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 47,
        name: "Face Wash With Aloe Vera and Chamomile 200 ML ",
        description:
          "<p>A skin-vitalizing face wash, with aloe vera that moisturizes the skin with the essence extracted from aloe flesh. This naturally strengthens the skin barrier and prevents moisture loss while soothing chamomile gently neutralizes skin irritants with its anti-inflammatory nature. Refreshes rehydrates and prepares your skin for the rest of your skincare routine.</p><p><br></p><p>Why Aloe + Chamomile Face Wash?</p><p><br></p><ul><li>Soothes irritated skin</li><li>Anti-inflammatory</li><li>Builds and maintains skin barrier</li><li>Locks in moisture to keep skin supple</li><li>Good for all skin types to keep the face hydrated</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
        thumbnail:
          "public/uploads/thumbnail-5b230406-971e-42ea-9293-c987c5144131.jpg",
        images: [
          "public/uploads/images-MITV-090.jpg",
          "public/uploads/images-MITV-089-1.jpg",
          "public/uploads/images-MIT-WITBK-076.jpg",
        ],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678f6cd8005ab7a560deecda",
          },
        ],
        relatedProduct: [
          "6790f9e7ce0007fe8e3639ff",
          "6790fe9fce0007fe8e363f90",
          "6791fc56ce0007fe8e36722f",
          "678e38192375026c6ed2fdd7",
        ],
        productSelected: "678f6cd8005ab7a560deecd9",
        howToUse: {
          description:
            "<p> Step One: Moisten face and neck. </p><p> </p><p> Step Two: Squeeze a pea-sized amount of this natural face wash in your palm</p><p> </p><p> Step Three: Use your fingertips to lather it on your face and neck, avoiding the eye contour. </p><p> </p><p> Step Four: Gently massage for a few minutes. Rinse with water and pat dry using a soft, clean towel.</p><p> </p><p> Use twice daily.</p>",
          _id: "67de475a3234420e684dd9fd",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["678f6b55005ab7a560deec94", "678f5f7c005ab7a560dee54f"],
        createdAt: "2025-01-21T09:47:30.198Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "6790fe9fce0007fe8e363f90",
        productTitle: "After Shave Face Wash For Men",
        productSubtitle:
          "An after-shave wash to soothe the skin and awaken the senses in the morning.",
        productCustomUrl: "after-shave-face-wash-for-men",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "100ml",
        productBought: "",
        price: "250",
        tax: 18,
        discountedPrice: "225",
        stock: 50,
        name: "After Shave Face Wash For Men",
        description:
          "<p>Complete the perfect shave with this After-shave wash. It leaves your face feeling refreshed and is formulated with natural ingredients like mint leaves, almonds, and got kola to support the ultimate cleanse. Suitable for all skin types: sensitive, dry, oily, or combination.</p><p><br></p><p>Why After Shave Face Wash?</p><p><br></p><p>● Hydrates the skin and maintains moisture balance</p><p>● Has a cooling effect on the face</p><p>● Helps reduce redness and inflammation aftershave</p>",
        category: ["6790fd80ce0007fe8e363f6f"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
        thumbnail:
          "public/uploads/thumbnail-62c01d92-6293-4173-90f0-fb72fe5b68dc.jpg",
        images: ["public/uploads/images-MITV-097.jpg"],
        ratings: 0,
        availableColors: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "6790fe9fce0007fe8e363f91",
          },
        ],
        relatedProduct: [
          "678e41cb2375026c6ed30144",
          "678e4ed52375026c6ed305ec",
          "678f6d32005ab7a560deed1c",
          "6791fc56ce0007fe8e36722f",
        ],
        productSelected: null,
        howToUse: {
          description:
            "<p>Step One:</p><p><br></p><p>Moisten the face. Apply MITVANA After Shave Face Wash on the face and neck.</p><p><br></p><p>Step Two:</p><p><br></p><p>Gently massage in a circular motion till a good lather develops.</p><p><br></p><p>Step Three:</p><p><br></p><p>Wash it off with cool water. Use at least two times a day</p>",
          _id: "67de46353234420e684dcbaa",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: ["6790fdd7ce0007fe8e363f83", "6790fdfbce0007fe8e363f87"],
        isDraft: false,
        reviews: [],
        createdAt: "2025-01-22T14:20:15.699Z",
        __v: 0,
        HSN: "34013019",
      },
      {
        _id: "678e41cb2375026c6ed30144",
        productTitle: "Face Wash with Micro-Scrubbers 200ml",
        productSubtitle:
          "This face wash with micro scrubbers, olive oil, and tulsi is designed to heal and hydrate the skin while gently exfoliating.",
        productCustomUrl: "face-wash-with-micro-scrubbers-200ml",
        productMetaDiscription: "",
        productCustomScript: "",
        productSku: "",
        productOGSiteName: "",
        productTwitterDescription: "",
        productFacebookDescription: "",
        sizeOrColor: "200ml",
        productBought: "",
        price: "350",
        tax: 18,
        discountedPrice: "315",
        stock: 46,
        name: "Face Wash with Micro-Scrubbers 200ml",
        description:
          "<p>Start your day with a sacred skincare ritual; holy basil or tulsi – revered as a healing herb in India – restores and heals the skin to reveal its natural glow while micro scrubbers remove dead skin cells and greasiness from exposure to city pollution and environment. Nourishing olive oil gently moisturizes and restores skin elasticity.</p><p><br></p><p>Why Micro Scrubber Face Wash?</p><p><br></p><ul><li>Removes dead skin cells, dirt, and excess sebum that causes greasiness</li><li>Purifies and Restores natural glow to reveal smooth skin</li><li>Leaves the skin clean, soft, and supple.</li></ul>",
        category: ["678e21712375026c6ed2f986"],
        features:
          "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
        thumbnail: "public/uploads/thumbnail-MITV-016.jpg",
        images: [],
        ratings: 0,
        availableColors: [],
        reviews: [],
        productFaq: [
          {
            question: "",
            answer: "",
            _id: "678e3b1e2375026c6ed2fea5",
          },
        ],
        relatedProduct: [
          "678e4bcd2375026c6ed30494",
          "678e561a2375026c6ed30aac",
          "6791f504ce0007fe8e366fcd",
          "678f6d32005ab7a560deed1c",
        ],
        productSelected: "678e3b1e2375026c6ed2fea4",
        howToUse: {
          description:
            "<p>Step One: Moisten face and neck. Squeeze a pea-sized amount of this scrubbing face wash in your palm</p><p><br></p><p>Step Two: Use your fingertips to lather it on your cheeks, forehead, and neck area avoiding</p><p>the eye contour. Gently massage and exfoliate for a few minutes.</p><p><br></p><p>Step Three: Rinse off with water and pat dry using a soft, clean face towel.</p><p><br></p><p>Use twice daily.</p>",
          _id: "67de48983234420e684dee52",
        },
        tags: ["678e2bc22375026c6ed2fa8e"],
        ingredients: [],
        createdAt: "2025-01-20T12:30:03.843Z",
        isDraft: false,
        __v: 0,
        HSN: "34013019",
      },
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One: Moisten the face. Apply MITVANA Oil Control Face Wash on the face and neck.</p><p><br></p><p>Step Two: Gently massage in a circular motion till a good lather develops.</p><p><br></p><p>Step Three: Wash it off with cool water. Use at least two times a day</p>",
      _id: "6819993b3234420e686736a3",
    },
    tags: [
      {
        _id: "67911ea6ce0007fe8e3646f1",
        name: "Trending",
        createdAt: "2025-01-22T16:36:54.295Z",
        __v: 0,
      },
    ],
    ingredients: [
      {
        _id: "6791fb79ce0007fe8e367221",
        title: "Mulethi (Glycyrrhiza glabra)",
        description:
          "It has strong anti-inflammatory properties that will both soothe the skin and inhibit the production of irritants that contribute to skin conditions such as acne.",
        image: "public/uploads/image-mulethi-150x150.png",
        __v: 0,
      },
      {
        _id: "6791fba7ce0007fe8e367225",
        title: "Babul (Acacia Arabica)",
        description:
          "Controls oil secretion due to its strong astringent activity.",
        image: "public/uploads/image-babul-150x150.png",
        __v: 0,
      },
      {
        _id: "6791fbcbce0007fe8e367229",
        title: "Chamomile (Matricaria chamomilla)",
        description:
          "Removes traces of grime that can contribute to breakouts. Controls oil secretion, ",
        image: "public/uploads/image-Chamomile-Seeds-150x150.png",
        __v: 0,
      },
    ],
    isDraft: false,
    reviews: [],
    createdAt: "2025-01-23T08:22:46.378Z",
    __v: 0,
    HSN: "34013019",
  },
  {
    _id: "6791f500ce0007fe8e366fbc",
    productTitle: "Peel Off Face Mask 100 ml",
    productSubtitle:
      "A unique concoction with anti-oxidants that boosts skin renewal and restores moisture.",
    productCustomUrl: "peel-off-face-mask-100-ml",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "100 ml",
    productBought: "",
    price: "270",
    tax: 18,
    discountedPrice: "243",
    stock: 38,
    name: "Peel Off Face Mask 100 ml",
    description:
      "<p>A peel-off mask packed to the brim with a regenerative formulation comprising vitamin E and ellagic acid from walnut oil paired with the goodness of Indian nettle to give your skin a sprightly appearance. This mask heals, balances, and nourishes cells for a lush &amp; luminous look.</p><p><br></p><p>Why peel-off mask with walnut and nettle?</p><p><br></p><ul><li>Purifies pores to give the face clarity and balance</li><li>Rich in oils that hydrate and nourish the skin</li><li>Adds a youthful energy and glow to the face</li></ul>",
    category: ["678e21712375026c6ed2f986"],
    features:
      "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p>",
    thumbnail: "public/uploads/thumbnail-MITV-134-1.jpg",
    images: [
      "public/uploads/images-MITV-050-scaled.jpg",
      "public/uploads/images-MITV-075.jpg",
      "public/uploads/images-MITV-076.jpg",
    ],
    ratings: 0,
    availableColors: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "6791f500ce0007fe8e366fbb",
      },
    ],
    relatedProduct: [
      "678e50052375026c6ed3079d",
      "678f69a2005ab7a560deea50",
      "6790fc8cce0007fe8e363be5",
      "678e41cb2375026c6ed30144",
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One:</p><p><br></p><p>Moisten face and neck.</p><p><br></p><p>Step Two:</p><p><br></p><p>Take an adequate amount and use fingertips to apply evenly across the face and neck area avoiding the eye contour.</p><p><br></p><p>Step Three:</p><p><br></p><p>Leave it for 10-15 minutes to dry off. Peel slowly without stretching or pulling excessively.</p><p><br></p><p>Step Four:</p><p><br></p><p>Use after MITVANA face scrub for best results. Once a week only.</p>",
      _id: "67de45993234420e684dbfd7",
    },
    tags: ["67911ea6ce0007fe8e3646f1"],
    ingredients: ["6791f3fbce0007fe8e366fb1", "6791f419ce0007fe8e366fb5"],
    isDraft: false,
    reviews: [],
    createdAt: "2025-01-23T07:51:28.984Z",
    __v: 0,
    HSN: "33049990",
  },
  {
    _id: "6790f575ce0007fe8e3636a9",
    productTitle: "Anti Ageing Serum 30 ML",
    productSubtitle:
      "A super formulation that helps recreate and restructure the skin’s elastic fibers, leaving the face visibly younger looking and radiantly beautiful.",
    productCustomUrl: "anti-ageing-serum-30-ml",
    productMetaDiscription: "",
    productCustomScript: "",
    productSku: "",
    productOGSiteName: "",
    productTwitterDescription: "",
    productFacebookDescription: "",
    sizeOrColor: "30 ML ",
    productBought: "",
    price: "600",
    tax: 18,
    discountedPrice: "540",
    stock: 47,
    name: "Anti Ageing Serum 30 ML",
    description:
      "<p>Mitvana Anti Age Serum is a 100% active serum that prolongs youthfulness with powerful ingredients like apricot, Pomegranate &amp; lemon The age- defying formulation helps dry, oily &amp; mature skin regain its natural glow by deeply moisturizing &amp; rejuvenating it. Our anti-ageing serum reduces pigmentation, promotes cell renewal and gives your skin a radiant glow, making it look visibly younger and softer.</p><p><br></p><p>Scientifically proven face serum which is Fragrance free,&nbsp;silicones free, paraben free with alcohol free formulation.</p>",
    category: ["6790f48cce0007fe8e3635ac"],
    features:
      "<p>Shelf Life: Best before 36 months from the date of manufacturing.</p><p>Country of Origin: India</p><p>Sold by: Matxin Labs Pvt Ltd</p><p><br></p><p><br></p>",
    thumbnail: "public/uploads/thumbnail-anti-ageing-serum-img.jpg",
    images: ["public/uploads/images-9b861d24-d4e7-4c44-a499-2288cce76ac8.jpg"],
    ratings: 0,
    availableColors: [],
    reviews: [],
    productFaq: [
      {
        question: "",
        answer: "",
        _id: "6790f566ce0007fe8e363696",
      },
    ],
    relatedProduct: [
      "678f69a2005ab7a560deea50",
      "678f6d32005ab7a560deed1c",
      "6790fc90ce0007fe8e363bf8",
      "678e4bcd2375026c6ed30494",
    ],
    productSelected: null,
    howToUse: {
      description:
        "<p>Step One:&nbsp;Wash the face with water &amp; dab it dry.</p><p><br></p><p>Step Two:&nbsp;Take a small amount of Mitvana Anti-ageing serum and spread all over neck &amp; face, avoiding the eyes.</p><p><br></p><p>Step Three:&nbsp;Massage gently till it is absorbed. After a couple of minutes one can apply makeup or any other cream.</p><p><br></p><p>For best results apply in the morning and night, two or three times a week.</p>",
      _id: "67de46883234420e684dd1b6",
    },
    tags: ["67911ea6ce0007fe8e3646f1"],
    ingredients: [
      "6790f427ce0007fe8e36355e",
      "678f6e53005ab7a560deef16",
      "678e2b2e2375026c6ed2fa7f",
    ],
    createdAt: "2025-01-22T13:41:09.515Z",
    isDraft: false,
    __v: 0,
    HSN: "33049910",
  },
];

function ProductRecommendation() {
  return (
    <div className=" mt-10 mb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#193a43] mb-2">
          You May Also Like
        </h1>
        <span className="flex items-center justify-center gap-2">
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
          <Flower className="w-5 h-5 text-[#878787]" />
          <span className="w-10 h-[3px] bg-[#dddddd]"></span>
        </span>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {productListData.map((item) => (
            <CarouselItem
              key={item._id}
              className="basis-1/2 pl-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard product={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ProductRecommendation;
