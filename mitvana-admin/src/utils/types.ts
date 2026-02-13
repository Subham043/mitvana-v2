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
  tat: number | null;
  service: string | null;
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
  expiration_date: Date;
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
  stock: number;
  tax: number;
  description: string | null;
  thumbnail: string | null;
  thumbnail_link?: string | undefined;
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
  meta_description: string | null;
  facebook_description: string | null;
  twitter_description: string | null;
  custom_script: string | null;
  product_selected: {
    id: number;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    tax: number | null;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
  } | null;
  related_product: {
    id: number;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    tax: number | null;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
  }[];
  category: {
    id: number;
    name: string;
    slug: string;
  }[];
  color: {
    id: number;
    name: string;
  }[];
  ingredient: {
    id: number;
    name: string;
  }[];
  tag: {
    id: number;
    name: string;
  }[];
  product_image: {
    id: number;
    image: string;
    image_link: string | null;  // ✅ computed field
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