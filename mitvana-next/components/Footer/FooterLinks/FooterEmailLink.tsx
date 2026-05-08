"use client";

import { useSetting } from "@/lib/context/setting.context";

function FooterEmailLink() {
  const setting = useSetting();
  return (
    <span className="text-zinc-700 font-light">{setting.admin_email}</span>
  );
}

export default FooterEmailLink;
