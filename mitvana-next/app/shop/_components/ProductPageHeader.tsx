"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersVertical } from "lucide-react";
import Link from "next/link";

function ProductPageHeader() {
  return (
    <div className=" mt-5 flex justify-between items-center">
      <button className="text-[#878787] fs-16 items-center flex gap-1">
        <SlidersVertical className="w-4 h-4" />
        <p className="mb-0">Filter</p>
      </button>

      <div className="flex justify-center items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle"
          >
            <Button variant="outline">Sort By</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-menu filter-dropdown">
            <DropdownMenuItem asChild>
              <Link href="#">Price, low to high</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">Price, high to low</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">Date, old to new</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">Date, new to old</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" asChild>
          <Link href="/shop">Clear Filter</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductPageHeader;
