"use client";

import { useSetting } from "@/lib/context/setting.context";

function HeaderBanner() {
  const setting = useSetting();
  if (!setting.top_banner_text) return null;
  return (
    <div className="w-full bg-[#e91e63] text-white text-center py-3">
      <div className="container mx-auto max-w-[90%]">
        <p className="text-sm p-0 m-0">{setting.top_banner_text}</p>
      </div>
    </div>
  );
}

export default HeaderBanner;
