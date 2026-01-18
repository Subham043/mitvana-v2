import { useSearchParams } from "react-router";
import { useCallback } from "react";

type SearchQueryParamHookType = (
  key?: string
) => {
  search: string,
  setSearch:  (value: string) => void
};

export const useSearchQueryParam: SearchQueryParamHookType = (key = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = `search${key}`;

  const search = String(searchParams.get(searchKey) || "");

  const setSearch = useCallback((value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set(searchKey, String(value));
      return newParams;
    });
  }, []);

  return {
    search,
    setSearch,
  };
};