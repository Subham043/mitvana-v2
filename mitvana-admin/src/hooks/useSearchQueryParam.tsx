import { useSearchParams } from "react-router";
import { useCallback } from "react";
import { useDebouncedCallback } from "@mantine/hooks";

type SearchQueryParamHookType = (key?: string) => {
  search: string;
  setSearch: (value: string) => void;
};

export const useSearchQueryParam: SearchQueryParamHookType = (key = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = `search${key}`;

  const search = searchParams.get(searchKey) ?? "";

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(searchKey, value) : params.delete(searchKey);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, searchKey],
  );

  const debouncedSetSearch = useDebouncedCallback(setSearch, 500);

  return {
    search,
    setSearch: debouncedSetSearch,
  };
};
