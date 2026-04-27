"use client";

import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";
import { AuthType, CartType, TokenType } from "@/lib/types";
import React, { useRef } from "react";

export default function AuthProvider({
  session,
  children,
  cart,
}: {
  session: (AuthType & TokenType) | null;
  children: React.ReactNode;
  cart: CartType | null;
}) {
  const initialized = useRef(false);
  const cartInitialized = useRef(false);
  const currentToken = useAuthStore((s) => s.authToken);

  if (
    !initialized.current &&
    session
    // || (session?.access_token && session.access_token !== currentToken)
  ) {
    queueMicrotask(() => {
      useAuthStore.getState().setAuth(session, session?.access_token ?? null);
    });

    initialized.current = true;
  }

  if (!cartInitialized.current) {
    if (session) {
      queueMicrotask(() => {
        useCartStore.getState().setCart(cart);
      });
    }
    cartInitialized.current = true;
  }

  return children;
}
