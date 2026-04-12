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

export type FaqType = {
  id: number;
  question: string;
  answer: string;
  answer_unfiltered: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserType = {
  email: string;
  name: string;
  phone: string;
  id: string;
  is_blocked: boolean;
  is_admin: boolean;
  email_verified_at: Date | null;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ColorType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
}

export type TagType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionType = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PincodeType = {
  pincode: number;
  id: string;
  shipping_charges: number;
  is_delivery_available: boolean;
  is_igst_applicable: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export type IngredientType = {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  thumbnail_link?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type HeroImageType = {
  id: string;
  content: string;
  image: string;
  image_link: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CouponCodeType = {
  id: string;
  code: string;
  discount_percentage: number;
  min_cart_value: number;
  maximum_redemptions: number;
  times_redeemed: number;
  expiration_date: Date;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type OfferType = {
  id: string;
  title: string;
  description?: string;
  discount_percentage: number;
  min_cart_value?: number;
  max_discount?: number;
  is_draft: boolean;
  products: {
    id: string;
    title: string;
    slug: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProductListType = {
  id: string;
  title: string;
  sub_title: string | null;
  slug: string;
  name: string | null;
  hsn: string | null;
  sku: string | null;
  price: number;
  discounted_price: number;
  tax: number;
  stock: number;
  description: string | null;
  thumbnail: string | null;
  thumbnail_link?: string | undefined;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductType = ProductListType & {
  size_or_color: string | null;
  bought_text: string | null;
  product_bought: string | null;
  og_site_name: string | null;
  how_to_use: string | null;
  features: string | null;
  meta_description: string | null;
  facebook_description: string | null;
  twitter_description: string | null;
  custom_script: string | null;
  parent_product: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    tax: number;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
  } | null;
  related_products: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    tax: number;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
  }[];
  colors: {
    id: string;
    name: string;
  }[];
  ingredients: {
    id: string;
    title: string;
  }[];
  tags: {
    id: string;
    name: string;
  }[];
  product_images: {
    id: string;
    image: string;
    image_link: string;  // ✅ computed field
  }[];
  product_faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export type SettingType = {
  admin_email: string | null;
  top_banner_text: string | null;
  min_cart_value_for_free_shipping: number | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductReviewType = {
  id: string;
  rating: number;
  title: string;
  comment?: string;
  status: "pending" | "approved" | "rejected";
  product: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
  }
  user: {
    id: string;
    name: string;
    email: string;
  },
  createdAt: Date;
  updatedAt: Date;
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
}

export type OrderInfoType = OrderListType & {
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

export type PaymentListType = {
  order_id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  payment_data: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_payment_signature: string | null;
  order: {
    orderId: string;
    total_price: number;
    user: {
      id: string;
      name: string;
      email: string;
    } | null;
  } | null;
}

export type TexteditorImageType = {
  id: number;
  image: string;
  image_link: string;
  created_at: string;
  updated_at: string;
};

export type AvailableRoles = "Admin" | "User";


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