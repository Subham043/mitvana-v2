"use client";

import { MapPin, User } from "lucide-react";
import { Package, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogoutMutation } from "@/lib/data/mutations/profile";
import { useAuthStore } from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function AccountButton() {
  const logoutMutation = useLogoutMutation();
  const authToken = useAuthStore((state) => state.authToken);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        router.replace("/auth/login");
        router.refresh();
      },
    });
  }, [logoutMutation]);

  if (!authToken) {
    return (
      <Link href="/auth/login" className="d-md-block text-black cursor-pointer">
        <User />
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="d-md-block text-black cursor-pointer"
          id="account-button"
        >
          <User />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/account/profile">
            <UserIcon />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/account/order">
            <Package />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/account/address">
            <MapPin />
            Addresses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountButton;
