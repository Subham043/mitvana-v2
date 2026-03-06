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
  address: string,
  address2: string | null,
  companyName: string | null,
  city: string,
  state: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  postalCode: string,
  addressType: "Home" | "Office",
  country: string,
  _id: string
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