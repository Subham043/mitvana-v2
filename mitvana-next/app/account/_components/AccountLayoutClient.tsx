"use client";

import HeroSection from "@/components/HeroSection";
import { useLogoutMutation } from "@/lib/data/mutations/profile";
import { useAuthStore } from "@/lib/store/auth.store";
import { LogOutIcon, MapPinned, Package, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function AccountLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const authUser = useAuthStore((state) => state.authUser);

  const titleMap: Record<string, string> = {
    "/account/profile": "My Account",
    "/account/order": "Order",
    "/account/address": "Address",
  };

  const title = useMemo(() => {
    const matched = Object.keys(titleMap)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathname === key || pathname.startsWith(key + "/"));

    return matched ? titleMap[matched] : "My Account";
  }, [pathname]);

  const active = useCallback(
    (path: string) => {
      const matched = Object.keys(titleMap)
        .sort((a, b) => b.length - a.length)
        .find(
          (key) =>
            (pathname === key || pathname.startsWith(key + "/")) &&
            key === path,
        );

      return matched ? "bg-[#194455] text-white" : "";
    },
    [pathname],
  );

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  }, [logoutMutation]);

  return (
    <>
      <HeroSection title={title} />
      <div className="w-full py-10">
        <div className="container mx-auto max-w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-2">
              <div className="flex gap-2 items-center">
                <div className="bg-black w-10 h-10 rounded-full"></div>
                <div>
                  <span className="text-xs text-[#194455] ">Hello 👋</span>
                  <p className="text-sm font-semibold text-[#194455] ">
                    {authUser?.name}
                  </p>
                </div>
              </div>
              <hr className="mt-3 custom-hr-color nav flex-column gap-2 " />
              <ul className="flex flex-row flex-wrap md:flex-col md:gap-3 mt-3 fw-semibold small md:justify-evenly">
                <li className="w-1/2 md:w-full">
                  <Link
                    href="/account/profile"
                    className={`flex justify-center md:justify-start text-xs md:text-base rounded-sm md:rounded-none items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active("/account/profile")}`}
                  >
                    <UserIcon />
                    ACCOUNT
                  </Link>
                </li>
                <li className="w-1/2 md:w-full">
                  <Link
                    href="/account/order"
                    className={`flex justify-center md:justify-start text-xs md:text-base rounded-sm md:rounded-none items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active("/account/order")}`}
                  >
                    <Package />
                    ORDERS
                  </Link>
                </li>
                <li className="w-1/2 md:w-full">
                  <Link
                    href="/account/address"
                    className={`flex justify-center md:justify-start text-xs md:text-base rounded-sm md:rounded-none items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active("/account/address")}`}
                  >
                    <MapPinned />
                    ADDRESS
                  </Link>
                </li>
                <li className="w-1/2 md:w-full">
                  <button
                    className="flex justify-center md:justify-start text-xs md:text-base rounded-sm md:rounded-none items-center gap-2 tracking-wider cursor-pointer p-2 w-full text-[#194455] hover:bg-[#194455] hover:text-white"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOutIcon />
                    {logoutMutation.isPending ? "Logging out..." : "LOGOUT"}
                  </button>
                </li>
              </ul>
              <hr className="mt-3 custom-hr-color nav flex-column gap-2 md:hidden" />
            </div>

            <div className="col-span-12 md:col-span-10">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
