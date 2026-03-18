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

export type AddressType = {
  id: string;
  address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  city: string;
  state: string;
  postal_code: number;
  address_2: string | null;
  company_name: string | null;
  address_type: "Home" | "Work";
  shipping_note: string | null;
  createdAt: Date;
  updatedAt: Date;
  alternate_phone: string | null;
  user_id: string;
};


export type ExtendedModalProps<T> =
  | {
    show: boolean;
    type: "create";
  }
  | ({
    show: boolean;
    type: "update";
  } & T);



export type ApiResponse<T> = {
  error: boolean;
  status: number;
  message?: string;
} & T;

export type PaginationResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    search: string;
  };
};