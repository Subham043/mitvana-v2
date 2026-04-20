"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const location = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchPage = location === "/search";

  const searchFromURL = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(searchFromURL);

  useEffect(() => {
    if (isSearchPage) {
      inputRef.current?.focus();
    }
  }, [isSearchPage]);

  // ✅ Sync UI when URL changes (IMPORTANT)
  useEffect(() => {
    setSearchValue(searchFromURL);
  }, [searchFromURL]);

  // ✅ Stable debounce
  const updateURL = useMemo(
    () =>
      debounce((search: string) => {
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("page", "1");
        newParams.set("limit", newParams.get("limit") || "10");
        newParams.set("search", search);

        router.push(`/search?${newParams.toString()}`);
      }, 500),
    [searchParams, router],
  );

  // ✅ Cleanup debounce (important)
  useEffect(() => {
    return () => {
      if (!isSearchPage) {
        updateURL.cancel();
        setSearchValue("");
      }
    };
  }, [updateURL]);

  // ===============================
  // 🔹 NOT on /search → dummy version
  // ===============================
  if (!isSearchPage) {
    return (
      <Link href="/search" className="block md:w-full">
        <div className="w-full flex items-center md:h-10 h-8 cursor-text">
          <div className="flex-1 md:w-[300px] lg:w-[500px] border border-[#e5e7eb] text-gray-400 flex items-center gap-2 px-2 h-full rounded-l-md rounded-r-md md:rounded-r-none">
            <Search size={18} />
            <span className="text-gray-400 text-base font-medium tracking-wide">
              Search For Products...
            </span>
          </div>

          {/* Dummy button span */}
          <span className="hidden md:flex h-full w-32 rounded-r-md bg-[#193a43] border border-[#193a43] text-white text-base font-medium items-center justify-center cursor-pointer">
            Search
          </span>
        </div>
      </Link>
    );
  }

  // ===============================
  // 🔹 On /search → real input
  // ===============================
  return (
    <div className="block">
      <div className="w-full flex items-center md:h-10 h-8">
        <div className="flex-1 md:w-[300px] lg:w-[500px] border border-[#e5e7eb] flex items-center gap-2 px-2 h-full rounded-l-md rounded-r-md md:rounded-r-none">
          <Search size={18} className="text-gray-400" />

          <input
            ref={inputRef}
            type="text"
            className="w-full h-full outline-none text-zinc-600 text-base font-medium tracking-wide"
            placeholder="Search For Products..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              updateURL(e.target.value);
            }}
          />

          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                updateURL("");
              }}
              className="min-w-4 h-4 rounded-full bg-gray-400 text-white grid place-items-center"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button className="hidden md:flex h-full w-32 rounded-r-md bg-[#193a43] border border-[#193a43] text-white text-base font-medium items-center justify-center cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
}
