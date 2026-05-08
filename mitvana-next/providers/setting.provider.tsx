"use client";

import { SettingContext } from "@/lib/context/setting.context";
import type { SettingType } from "@/lib/types";

export default function SettingProvider({
  children,
  setting,
}: {
  children: React.ReactNode;
  setting: SettingType;
}) {
  return (
    <SettingContext.Provider value={setting}>
      {children}
    </SettingContext.Provider>
  );
}
