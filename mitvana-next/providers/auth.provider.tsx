"use client";

import { useAuthStore } from "@/lib/store/auth.store";
import { AuthType, TokenType } from "@/lib/types";
import React, { useRef } from "react";

export default function AuthProvider({
  session,
  children,
}: {
  session: (AuthType & TokenType) | null;
  children: React.ReactNode;
}) {
  const initialized = useRef(false);
  const currentToken = useAuthStore((s) => s.authToken);

  if (
    (!initialized.current && session) ||
    (session?.access_token && session.access_token !== currentToken)
  ) {
    queueMicrotask(() => {
      useAuthStore.getState().setAuth(session, session?.access_token ?? null);
    });

    initialized.current = true;
  }

  return children;
}
