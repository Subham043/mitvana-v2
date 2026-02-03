import { useSearchParams } from "react-router";
import {
  QueryInitialPageParam,
  QueryTotalCount,
} from "@/utils/constants/query";
import { useCallback } from "react";

type PaginationQueryParamHookType = () => {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
};

export const PAGEKEY = "page";
export const LIMITKEY = "limit";

export const usePaginationQueryParam: PaginationQueryParamHookType = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(PAGEKEY) || QueryInitialPageParam);
  const limit = Number(searchParams.get(LIMITKEY) || QueryTotalCount);

  const setPage = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(PAGEKEY, String(value)) : params.delete(PAGEKEY);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams],
  );

  const setLimit = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(LIMITKEY, String(value)) : params.delete(LIMITKEY);
          if (params.has(PAGEKEY)) {
            params.set(PAGEKEY, String(QueryInitialPageParam));
          }
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams],
  );

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
};
