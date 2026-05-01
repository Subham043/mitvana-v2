import { type ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type AuthType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
  is_admin: boolean;
  is_verified: boolean;
}

export type TokenType = {
  access_token: string;
  refresh_token: string;
}

export type ProfileType = AuthType;

export type SubscriptionType = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SettingType = {
  admin_email: string | null;
  top_banner_text: string | null;
  min_cart_value_for_free_shipping: number | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddressType = {
  address: string | null;
  id: string;
  address_2: string | null;
  shipping_note: string | null;
  city: string | null;
  state: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  postal_code: number;
  createdAt: Date;
  updatedAt: Date;
  address_type: string | null;
  country: string | null;
  company_name: string | null;
  alternate_phone: string | null;
  user_id: string;
}


export type ProductListType = {
  id: string;
  title: string;
  sub_title: string | null;
  slug: string;
  name: string | null;
  hsn: number | null;
  sku: string | null;
  price: number;
  discounted_price: number;
  tax: number;
  stock: number;
  description: string | null;
  thumbnail: string | null;
  thumbnail_link?: string | undefined;
  size_or_color: string | null;
  saved_price: number;
  saved_percentage: number;
  reviews_count: number;
  comments_count: number;
  is_in_wishlist: boolean;
  tags: {
    id: string;
    name: string;
  }[];
  product_images: {
    id: string;
    image: string;
    image_link: string;  // ✅ computed field
  }[];
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductType = ProductListType & {
  og_site_name: string | null;
  how_to_use: string | null;
  features: string | null;
  meta_description: string | null;
  facebook_description: string | null;
  twitter_description: string | null;
  custom_script: string | null;
  child_products: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    tax: number;
    stock: number;
    size_or_color: string | null;
    saved_price: number;
    saved_percentage: number;
    is_draft: boolean;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
    is_selected: boolean;
  }[];
  related_products: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: number | null;
    price: number;
    discounted_price: number | null;
    tax: number;
    stock: number;
    size_or_color: string | null;
    is_draft: boolean;
    saved_price: number;
    saved_percentage: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
    is_in_wishlist: boolean;
    tags: {
      id: string;
      name: string;
    }[];
    product_images: {
      id: string;
      image: string;
      image_link: string;  // ✅ computed field
    }[];
  }[];
  colors: {
    id: string;
    name: string;
  }[];
  ingredients: {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    thumbnail_link: string | null;
  }[];
  product_faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export type PincodeType = {
  pincode: number;
  is_delivery_available: boolean;
  shipping_charges: number;
}

export type ProductReviewType = {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  product: ProductType | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type ProductReviewStatsType = {
  oneRating: number;
  twoRating: number;
  threeRating: number;
  fourRating: number;
  fiveRating: number;
  total: number;
  averageRating: number;
  percentages: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
}

export type OrderListType = {
  status: string;
  cancellation_reason: string | null;
  id: string;
  orderId: string;
  user_id: string;
  shipping_charges: number;
  is_igst_applicable: boolean;
  tax: number;
  total_price: number;
  discounted_price: number;
  payment_method: string;
  is_paid: boolean;
  paid_at: Date | null;
  is_delivered: boolean;
  delivered_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  razorpay_payment: {
    status: string;
    createdAt: Date;
    updatedAt: Date;
    order_id: string;
    payment_data: string | null;
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
    razorpay_payment_signature: string | null;
  } | null;
  total_order_products: number
}

export type OrderInfoType = OrderListType & {
  order_items: {
    createdAt: Date;
    updatedAt: Date;
    order_id: string;
    product_id: string;
    product_title: string;
    product_slug: string;
    product_sku: string;
    product_hsn: string;
    product_price: number;
    product_discounted_price: number;
    product_image: string;
    product_image_link: string | null;
    quantity: number;
    color_id: string | null;
    color_name: string | null;
    color_code: string | null;
  }[];
  order_address: {
    createdAt: Date;
    updatedAt: Date;
    order_id: string;
    address: string | null;
    address_2: string | null;
    shipping_note: string | null;
    city: string | null;
    state: string | null;
    phone_number: string | null;
    first_name: string | null;
    last_name: string | null;
    postal_code: number;
    country: string | null;
    company_name: string | null;
    alternate_phone: string | null;
  } | null;
  coupon: {
    createdAt: Date;
    updatedAt: Date;
    order_id: string;
    coupon_code: string;
    discount_percentage: number;
  } | null;
  shipment: {
    createdAt: Date;
    updatedAt: Date;
    order_id: string;
    tracking_link: string | null;
    expected_delivery_date: Date;
    tracking_numbers: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      order_id: string;
      tracking_no: string;
    }[];
    shipment_checkpoints: {
      date: Date;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      order_id: string;
      city: string | null;
      state: string | null;
      remark: string | null;
      sub_tag: string | null;
      tag: string | null;
    }[];
  } | null;
}

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  thumbnail_link?: string | undefined;
  is_visible_in_navigation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CartType = {
  user_id: string,
  is_mail_sent: boolean,
  createdAt: string,
  updatedAt: string,
  sub_total: number;
  shipping_charges: number;
  discount: number;
  total_price: number;
  products: {
    color: {
      id: string,
      name: string,
      code: string
    } | null,
    product: {
      id: string,
      hsn: number | null,
      sku: string | null,
      slug: string,
      price: number,
      stock: number,
      title: string,
      thumbnail?: string,
      thumbnail_link?: string,
      discounted_price: number
    },
    quantity: number
    total_price_per_product: number,
  }[],
  user: {
    id: string,
    name: string,
    email: string
  },
  coupon: {
    id: string;
    code: string;
    discount_percentage: number;
    min_cart_value: number;
    maximum_redemptions: number;
    times_redeemed: number;
    expiration_date: Date;
    is_draft: boolean;
  } | null,
  address: {
    id: string;
    address: string | null;
    address_2: string | null;
    shipping_note: string | null;
    city: string | null;
    state: string | null;
    phone_number: string | null;
    first_name: string | null;
    last_name: string | null;
    postal_code: number;
    address_type: string | null;
    country: string | null;
    company_name: string | null;
    alternate_phone: string | null;
    pincode_info: {
      shipping_charges: number;
      is_delivery_available: boolean;
    } | null;
  } | null,
}

export type WishlistType = {
  user_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: number | null;
    price: number;
    discounted_price: number | null;
    saved_price: number | null;
    saved_percentage: number | null;
    tax: number | null;
    stock: number | null;
    size_or_color: string | null;
    is_draft: boolean;
    thumbnail: string | null;
    thumbnail_link: string | null;
    product_images: {
      id: string;
      image: string;
      image_link: string;  // ✅ computed field
    }[];
    tags: {
      id: string;
      name: string;
    }[];
  };
  user: {
    id: string,
    name: string,
    email: string
  };
};


export type AxiosErrorResponseType = {
  message: string;
  errors?: {
    message: string;
    field: string;
    rule: string;
  }[];
};

export type PaginationMetaType = {
  page: number;
  limit: number;
  total: number;
  search: string;
};

export type PaginationType<T> = {
  data: T[];
  meta: PaginationMetaType;
};

export type PaginationQueryType = {
  page?: number;
  limit?: number;
  search?: string;
}

export type ModalProps<T> =
  | {
    show: false;
  }
  | ({
    show: true;
  } & T);

export type ExtendedModalProps<T> =
  | {
    show: boolean;
    type: "create";
  }
  | ({
    show: boolean;
    type: "update";
  } & T);

export type SearchParamType = { [key: string]: string | string[] | undefined }

declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}