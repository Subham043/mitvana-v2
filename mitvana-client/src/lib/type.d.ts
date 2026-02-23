import { type ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type AuthType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
  isAdmin: boolean;
  isVerified: boolean;
}

export type TokenType = {
  token: string;
}

export type ProfileType = AuthType;