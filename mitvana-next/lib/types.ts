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
  hsn: string | null;
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
  }[];
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
    size_or_color: string | null;
    is_draft: boolean;
    saved_price: number;
    saved_percentage: number;
    thumbnail: string | null;
    thumbnail_link: string | null;  // ✅ computed field
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