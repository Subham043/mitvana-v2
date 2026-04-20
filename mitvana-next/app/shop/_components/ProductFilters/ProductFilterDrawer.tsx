"use client";

import { SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProductFilters from "./";
import Link from "next/link";

function ProductFilterDrawer() {
  return (
    <>
      <button className="text-[#878787] fs-16 items-center gap-1 hidden md:flex">
        <SlidersVertical className="w-4 h-4" />
        <p className="mb-0">Filter</p>
      </button>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="text-[#878787] fs-16 items-center flex gap-1 md:hidden">
            <SlidersVertical className="w-4 h-4" />
            <p className="mb-0">Filter</p>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-[95%]">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Set your filters</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <ProductFilters />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Apply</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline" asChild>
                  <Link href="/shop">Clear Filter</Link>
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProductFilterDrawer;
