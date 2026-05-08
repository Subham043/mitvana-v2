"use client";

import { createContext, useContext } from "react";
import type { SettingType } from "@/lib/types";

export const SettingContext = createContext<SettingType>({
  id: "",
  admin_email: "info@matxinlabs.com",
  top_banner_text: "",
  min_cart_value_for_free_shipping: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export function useSetting() {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error("useSetting must be used inside SettingProvider");
  }

  return context;
}
