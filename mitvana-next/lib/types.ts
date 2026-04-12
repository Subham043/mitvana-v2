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